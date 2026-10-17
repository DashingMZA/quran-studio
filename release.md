# Release Guide — Quran Studio

This document covers the full release process: desktop installers (Windows /
macOS / Linux via GitHub Actions) and the web deployment (Vercel).

## 1. Versioning

Keep these four in sync before tagging a release:

| File | Field |
|------|-------|
| `package.json` | `"version"` |
| `src-tauri/tauri.conf.json` | `"version"` |
| `src-tauri/Cargo.toml` | `version` under `[package]` |
| `src/config/app-info.json` | `"version"` (displayed in the About overlay, e.g. `"v1.0.0"`) |

## 2. Desktop releases (GitHub Actions)

### How it works

`.github/workflows/release.yml` runs when you push a git tag starting with
`v` (e.g. `v1.0.0`), or manually via **Actions → Release → Run workflow**.
It builds on four runners in parallel:

- Windows (`x86_64-pc-windows-msvc`) → `.msi` / `.exe` (NSIS)
- macOS Apple Silicon (`aarch64-apple-darwin`) → `.dmg`
- macOS Intel (`x86_64-apple-darwin`, cross-compiled) → `.dmg`
- Linux (`x86_64-unknown-linux-gnu`) → `.AppImage` / `.deb`

Each job downloads the matching `ffmpeg`/`ffprobe` sidecar binaries
(`scripts/fetch-ffmpeg.mjs`), prepares the Tauri sidecar names
(`scripts/prepare-ffmpeg.mjs`), then builds with `tauri-action`. The result
is a **draft** GitHub Release containing every installer plus the
auto-updater artifacts (`latest.json` + signature files).

The in-app updater (`src-tauri/tauri.conf.json` → `plugins.updater`) polls
`https://github.com/DashingMZA/quran-studio/releases/latest/download/latest.json`,
so publishing the draft release is what ships the update to existing
desktop installs.

### One-time setup: signing keys

The updater artifacts must be signed. Generate a keypair once on your own
machine (never commit these files):

```bash
pnpm tauri signer generate -w ~/.tauri/quran-studio.key
```

This prints the **public key** — it must match the `pubkey` already stored
in `src-tauri/tauri.conf.json` (`plugins.updater.pubkey`). If you generate
a fresh keypair, update that field and commit it.

For local signed builds, copy `.env.example` to `.env` and set:

```env
TAURI_SIGNING_PRIVATE_KEY=/path/to/your/quran-studio.key
TAURI_SIGNING_PRIVATE_KEY_PASSWORD=
```

### One-time setup: GitHub Secrets

Repository → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value |
|--------|-------|
| `TAURI_SIGNING_PRIVATE_KEY` | Contents (or path contents) of the private `.key` file |
| `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` | The password set at generation time (empty if none) |

`GITHUB_TOKEN` is provided automatically; the workflow already requests
`permissions: contents: write` so it can create the release.

### Triggering a release

```bash
# 1. Make sure the working tree is clean and versions are bumped (see §1)
# 2. Commit and push to master
git push origin master

# 3. Tag and push the tag — this starts the workflow
git tag v1.0.0
git push origin v1.0.0
```

Then:

1. Watch progress under **Actions → Release**.
2. When all four jobs finish, open **Releases** — you'll find a **draft**
   release named `Quran Studio v1.0.0` with all installers attached.
3. Review the artifacts, edit the release notes if needed, and click
   **Publish release**. Publishing makes `latest.json` live, which is what
   the auto-updater reads.

> **Note:** `pnpm install --frozen-lockfile` runs in CI, so `pnpm-lock.yaml`
> must be committed and in sync with `package.json`, otherwise the workflow
> fails before building.

## 3. Web deployment (Vercel)

The web version is a static Vite SPA. `vercel.json` already sets:

- Build command: `pnpm build`
- Output directory: `dist`
- Install command: `pnpm install` (Vercel also auto-detects pnpm via
  `packageManager` + `pnpm-lock.yaml`)

Steps:

1. In Vercel, **Add New → Project → Import** this repository.
2. Framework preset is auto-detected as **Vite** — keep the defaults.
3. Add the environment variable **`VITE_PIXABAY_API_KEY`** (Project
   Settings → Environment Variables) so the Image/Video background tabs
   can fetch from Pixabay. The app runs without it, but those tabs will be
   empty.
4. Deploy. Every push to `master` redeploys automatically (can be changed
   in the Vercel project settings).

The app detects Tauri vs. web at runtime
(`src/shared/utils/platform.ts` → `isTauri()`), so the identical build
output runs on Vercel and inside the desktop shell — no separate web
codebase is needed.

## 4. Checklist before tagging

- [ ] Versions bumped in all four files (§1)
- [ ] `pnpm install` clean, `pnpm-lock.yaml` committed
- [ ] `pnpm typecheck`, `pnpm lint`, `pnpm build`, `pnpm test` all pass
- [ ] Desktop smoke test via `pnpm app:dev` (if a Rust toolchain is available)
- [ ] Release notes drafted (what's new / fixed)
