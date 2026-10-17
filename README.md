# Quran Studio

Quran Studio is a web and desktop-ready editor for creating Quran recitation videos. It combines Quran text, translations, timed recitation audio, typography controls, and visual backgrounds into an exportable MP4 canvas workflow.

Created with thanks for this work: https://github.com/quran8vs/Quran-Video-Studio

The app is built with React, Vite, TypeScript, Tailwind CSS, Bun, and Tauri.


## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [⚠️ Troubleshooting](#️-troubleshooting)
- [📁 Project Structure](#-project-structure)
- [🖥️ Desktop App Setup (Tauri)](#️-desktop-app-setup-tauri)
- [📝 License](#-license)

---

## ✨ Features

### 📖 Content Selection
- **Surah & Verse Navigation** - Easily browse and select any Surah and verse range
- **Multiple Reciters** - Choose from renowned Quran reciters with high-quality audio

### 🎵 Audio Tools
- **Waveform Visualization** - See your audio in real-time
- **Playback Controls** - Full control over audio timing and synchronization
- **Audio Synchronization** - Perfectly aligned audio with text display

### 🎨 Video Customization
- **Typography** - Multiple Arabic and English font options
- **Color Control** - Customize text colors, backgrounds, and highlighting
- **Background Support** - Solid colors or custom uploaded images
- **Layout Options** - Toggle Surah headers, Bismillah, and translations
- **Aspect Ratios** - `9:16` (Story/TikTok), `1:1` (Instagram), `16:9` (YouTube)

### 💾 Export & Production
- **MP4 Export** - High-quality video generation
- **Client-Side Processing** - Fast processing with `mp4-muxer`
- **No Server Upload** - Your videos stay private

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |
| **Video Processing** | mp4-muxer |
| **State Management** | React Hooks |
| **Desktop (Optional)** | Tauri 2.0 |

---

## Requirements

- [Bun](https://bun.sh/)
- A Pixabay API key
- A browser with WebCodecs support for MP4 export

## Environment

Create a `.env.local` file in the project root:

```env
VITE_PIXABAY_API_KEY=your_pixabay_api_key_here
```

The key is used by the Image and Video background tabs to fetch results from Pixabay.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn installed


The app will open at `http://localhost:3000` with Hot Module Replacement (HMR).

### Production Build

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite is configured to run on port `3000` by default:

```text
http://localhost:3000
```

## Scripts

```bash
npm run dev
```

Start the Vite development server.

```bash
npm run build
```

Type-check and build the production app.

```bash
npm run preview
```

Preview the production build locally.

```bash
npm run lint
```

Run ESLint.

```bash
npm run tauri
```

Run Tauri CLI commands.

---

## ⚠️ Troubleshooting

### Issue: MIME Type Error - "Expected a JavaScript module script but the server responded with a MIME type of ''"

This error occurs when your dev server isn't properly serving `.ts` or `.js` files.

---

## Backgrounds

The Image tab is the default background mode. On initial load, the app automatically fetches Pixabay image results and applies a random image as the canvas background.

The Video tab fetches Pixabay videos on initial load as well. Until a video is selected, the editor keeps the current image background instead of falling back to a solid color. Selecting a video applies its poster as the preview and uses the MP4 stream while rendering the canvas.

## Export Notes

MP4 export is rendered from the canvas at 30 FPS with H.264 video and AAC audio. The exported file name includes the surah, ayah range, and reciter.

For best results:

- Wait for audio, fonts, and background assets to load before exporting.
- Use same-origin or CORS-enabled visual assets for canvas export.
- Keep the browser tab active while exporting long videos.

## 📁 Project Structure

```text
src/
  app/                         Main application shell
  features/
    audio/                     Audio playback and recording hooks
    quran/                     Quran data, surah data, and fetching hooks
    video-editor/              Canvas, export hooks, media loading, rendering
  layouts/                     Left/right sidebars and editor controls
  shared/                      Reusable components, constants, utilities
public/
  fonts/                       Local font assets
  icon/                        App icons and manifest files
```

## 🖥️ Desktop App Setup (Tauri)

### ⚠️ Important: Pre-Configuration Exists

**DO NOT run `npx tauri init` directly!** This project has custom Tauri configurations. Follow these steps:

### Step 1: Initialize Tauri

```bash
npx tauri init
```

Answer the prompts as follows:
```
App name: quran-video-studio
Window title: quran-video-studio
Web assets path: ../build
Dev server URL: http://localhost:3000
Frontend dev command: npm run dev
Frontend build command: npm run build
```

### Step 2: Apply Custom Configuration

1. Navigate to `src-tauri-config/` folder in project root
2. Copy all contents (files, folders, icons)
3. Paste into newly created `src-tauri/` folder
4. Click **Yes to All** when prompted to replace existing files

### Step 3: Install Tauri Dependencies

```bash
npm install @tauri-apps/api@2.0.0

npx tauri add path
npx tauri add fs
npx tauri add dialog
npx tauri add opener
npx tauri add log

cd src-tauri && cargo add log && cd ..
```

### Step 4: Run Desktop App

```bash
# Development with hot reload
npm run tauri dev

# Build native executable
npm run tauri build
```

---

## 📝 License

This project is open source and available for personal .

---

<<<<<<< HEAD
**Happy creating! 🎬✨**
=======
**Happy creating! 🎬✨**
>>>>>>> b707d010a2b31f0ff268aac00006e621b62891be
