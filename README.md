# HR Portal - Vue 3 Migration

This project has been migrated from Vue 2 to Vue 3 with modern tooling and styling.

## 🚀 Tech Stack

- **Vue 3** with Composition API
- **Pinia** for state management
- **Tailwind CSS v4** for styling
- **Vite** for build tooling
- **Vue Router 4** for routing

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📋 Migration Summary

### What Changed

1. **Vue 2 → Vue 3**
   - Options API → Composition API
   - `new Vue()` → `createApp()`
   - Updated component syntax

2. **Vuex → Pinia**
   - Simpler state management
   - Better TypeScript support
   - Composition API integration

3. **SCSS/Bulma → Tailwind CSS v4**
   - Utility-first CSS framework
   - Better performance
   - Smaller bundle size
   - Custom design system

4. **Vue CLI → Vite**
   - Faster development server
   - Better build performance
   - Modern ES modules

### Key Features

- **Responsive Design**: Mobile-first approach with Tailwind
- **Dark Mode**: Toggle between light and dark themes
- **PWA Ready**: Service worker and manifest included
- **Modern JavaScript**: ES modules and latest syntax
- **State Persistence**: LocalForage integration maintained

### File Structure

```
src/
├── components/     # Vue components
├── views/         # Page components
├── stores/        # Pinia stores
├── router/        # Vue Router configuration
├── style.css      # Global Tailwind styles
└── main.js        # App entry point
```

## 🎨 Styling Migration

The project has been converted from SCSS with Bulma to Tailwind CSS v4:

- **Color System**: Custom color palette matching the original design
- **Typography**: Font families and sizes preserved
- **Spacing**: Custom spacing utilities for existing margins/paddings
- **Components**: Rebuilt with Tailwind utility classes

## 🔧 Development Notes

- All SCSS files have been removed
- Bulma dependency removed
- Vue CLI configuration replaced with Vite
- ESLint configuration updated for Vue 3
- Modern browser targets

## 🚀 Next Steps

1. Update remaining components to use Composition API
2. Add TypeScript support (optional)
3. Implement unit tests with Vitest
4. Add E2E tests with Playwright
5. Optimize bundle size and performance
