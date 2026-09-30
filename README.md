# Autheo Agent Environment — explanatory website

A standalone, responsive static site by **SolutionsAsService** explaining the agent trust layer and its planned Dev Portal / Layer 0 integration. No backend, wallet connection, keys, sign-in or live authority. The browser policy explorer is educational, independent of the Python enforcement model, and executes nothing.

## Local development

Requires Node 22+ and Python 3 for the optional local server.

```sh
npm ci
npm run build
npm test
npm run dev
# Open http://127.0.0.1:4175/dist/
```

For desktop/mobile and accessibility checks:

```sh
npx playwright install --with-deps chromium
npm run test:e2e
```

## Deploy

- **Vercel:** import this repository; root directory `.`; framework Other; install `npm ci`; build `npm run build`; output `dist`. Root `vercel.json` contains these settings. No environment variables needed.
- **GitHub Pages:** the Pages workflow builds/tests and deploys `dist` from main. Repository Pages source must be GitHub Actions. Relative asset URLs work at the repository subpath.
- Any static host can serve the six allowlisted files in `dist`. There are no SPA rewrites or API routes.

Only public assets are copied into `dist`; source, test artifacts and environment files are excluded. The site uses system fonts, no external scripts, and no analytics.

## Related projects

- [Agent Environment source and integration guide](https://github.com/SolutionsAsService/autheo-agent-environment)
- [Autheo MCP](https://github.com/ThothDivision/autheo-mcp)

The local prototype supports signed identity and mandates, simulated budget decisions, signed receipts and controlled checkpoint handoffs. Dev Portal adapters, Layer 0 execution, real wallets, live process migration and external audit anchoring are **not yet implemented**.
