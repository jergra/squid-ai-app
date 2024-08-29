August 24, 2024

dev/trip-planner/frontend

from tutorial:
Full Stack AI Web App Tutorial (TypeScript/React/AI/LLMs)
https://www.youtube.com/watch?v=kel893RIvHA

by Tech With Tim

This is the frontend of a trip-planning app using Squid AI. The complete project is at dev/trip-planner and at https://github.com/jergra/squid-ai-project.

local start:
  npm run dev

Squid console:
https://console.squid.cloud/application/8xj1s2g1ozvwomh5xf-dev

Deployed:
  https://squid-ai-project-frontend.vercel.app/

The backend is deployed by going to dev/trip-planner/backend and typing 'npm run deploy'

The frontend is deployed by going to dev/trip-planner/frontend and putting this code on github then deploying using vercel.

Prior to deploying the project, it was run locally by going to dev/trip-planner and typing 'npm run start'.

Once the backend has been deployed, line 12 at dev/trip-planner/frontend/src/main.tsx is commented out and 'npm run dev' is typed at dev/trip-planner/frontend for local development.






# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
