# Kennith's React Portfolio

The original GitHub Pages portfolio recreated with **React and Vite**, preserving its layout, CSS, images, responsive breakpoints, and interactive features.

## Run locally

Install Node.js 22.12+ (Node.js 24 recommended), then run:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The React source needs Vite; opening `index.html` directly is no longer the development workflow.

## Production build

```sh
npm run build
npm run preview
```

Vite creates the deployable site in `dist/`. No backend is required.

## GitHub Pages

1. Push the changes to the `main` or `master` branch of `pioquentokennith/pioquentokennith.github.io`.
2. In the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. The **Deploy React portfolio to GitHub Pages** workflow installs dependencies, builds the app, and publishes `dist/`. It can also be started manually from the Actions tab.
4. After deployment, visit https://pioquentokennith.github.io/.

Vite uses relative asset URLs, supporting both this user site and repository-based Pages URLs. Navigation uses section anchors, so no client-side route fallback is needed.

## Structure

```text
src/
  main.jsx              React entry point and CSS imports
  App.jsx               Page composition, shared state, dialog coordination
  components/           Page sections and reusable UI
  hooks/                Theme, scroll state, and reveal effects with cleanup
  data/                 Products, projects, services, and activities
  utils.js              Asset URLs, reduced-motion scrolling, clipboard helper
css/                    Original design, animations, and responsive styles
public/Assets/          Original photos, logos, and posters
tests/                  Browser regression checks
.github/workflows/      GitHub Pages deployment
```

Reusable components include `Section`, `SectionHeading`, `FilterPills`, `Modal`, `ProductCard`, and `ProjectCard`. React state drives menus, filters, search, posters, themes, dialogs, and notifications. Browser effects manage scrolling, focus, and animation with cleanup on unmount. Dialogs trap keyboard focus, support Escape, and restore focus to their trigger.

## Updating content

- Edit `src/data/products.js` for the perfume collection.
- Edit `src/data/projects.js` for projects and services.
- Add teacher-provided activities to the array in `src/data/activities.js`. The initial collection is empty, matching the original website. Entries use this format:

```js
{
  id: 1,
  number: 'Activity 1',
  name: 'Your activity title',
  category: 'midterm', // 'midterm' or 'finalterm'
  subject: 'Your subject',
  date: '2026-10-28',
  icon: '</>',
  description: 'What you built or learned.',
  technologies: ['React', 'CSS'],
  instructions: 'The teacher-provided activity instructions.',
}
```

## Browser checks

```sh
npx playwright install chromium
npm test
```

Tests build and preview the production app, then verify responsive layouts, navigation, themes, product filters, dialogs, project tabs, activity controls, image loading, and contact interactions.
