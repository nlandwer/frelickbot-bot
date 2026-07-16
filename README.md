# FrelickBot

A clean TypeScript console-application foundation for a bot. No web framework
(no Express, no HTTP server) — this is a plain Node.js console app.

## Structure

```
frelickbot/
├── package.json
├── tsconfig.json
├── README.md
└── src/
    ├── index.ts       # Entry point
    ├── config.ts      # Placeholder: configuration
    ├── activity.ts    # Placeholder: activity handling
    ├── parser.ts      # Placeholder: input parsing
    └── commands.ts    # Placeholder: command registry/handling
```

No real API logic, HTTP requests, or external integrations are implemented
yet — every module beyond `index.ts` is a placeholder ready to be filled in.

## Setup

```bash
npm install
```

## Run in dev mode

```bash
npm run dev
```

Expected output:

```
==========================
FrelickBot Bot Started
==========================
```

## Build & run compiled output

```bash
npm run build
npm start
```
