Recipe App - Ionic React

A mobile-friendly recipes app built with Ionic React, TypeScript, and Vite. Browse recipes, view details (ingredients, steps, duration, difficulty), and enjoy a responsive UI ready for the web, iOS, and Android via Capacitor.

## Features
- Recipe listing and detail pages
- Ingredients and steps with clear, readable presentation
- Difficulty and duration badges with icons
- Responsive Ionic UI components
- Cross-platform build (Web, iOS, Android)
- Unit tests (Vitest + Testing Library)
- E2E tests (Cypress)
- TypeScript + ESLint for safer, cleaner code

## Tech Stack
- Framework: React + Ionic React
- Language: TypeScript
- Bundler/Dev Server: Vite
- Mobile bridge: Capacitor
- Unit testing: Vitest, @testing-library/react
- E2E testing: Cypress
- Linting: ESLint

## Prerequisites
- Node.js (LTS recommended)
- npm (comes with Node.js)
- For native builds:
    - Xcode + CocoaPods (macOS) for iOS
    - Android Studio + SDK for Android

## Quick Start
1. Install dependencies:
``` 
   npm install
```
1. Start the Ionic server:
``` 
   ionic serve
```
1. Open the app in your browser: http://localhost:8100/.

## Mobile (Capacitor)
1. Sync web build to native projects:
``` bash
   npx cap sync
```
1. Open the native project:
    - Android:
``` bash
     npx cap open android
```
- iOS:
``` bash
     npx cap open ios
```
1. Build and run from Android Studio/Xcode as usual.

Tip: After each web build (npm run build), run npx cap copy or npx cap sync to update native platforms.
## Testing
- Unit tests (Vitest):
``` bash
  npm run test
```
Recommended libraries:
- @testing-library/react
- @testing-library/jest-dom

- E2E tests (Cypress):
    - Open Cypress runner:
``` bash
    npx cypress open
```
- Run headless:
``` bash
    npx cypress run
```
## Linting
Run ESLint to catch issues:
``` bash
npm run lint
```
## Project Structure (high level)
- public/ – Static assets
- src/ – Application source
    - pages/ – Top-level screens
    - components/ – Reusable UI components
    - data/ – Simple data helpers/models
    - theme/ – Ionic theme variables

- cypress/ – E2E tests and config
- capacitor.config.ts – Capacitor configuration
- vite.config.ts – Vite configuration

## Environment Tips
- Ionic theming can be customized via CSS variables in the theme folder.
- Use Ion components for consistent platform UI and accessibility.
- Keep state and types in sync via TypeScript models for recipes.

## Troubleshooting
- If native changes don’t appear, ensure you:
    1. npm run build
    2. npx cap sync

- iOS build issues on Apple Silicon: ensure CocoaPods is installed and updated.
- Android SDK issues: verify ANDROID_HOME/SDK path in Android Studio.

## License
This project is provided as-is for educational and development use. Add your preferred license if distributing.
