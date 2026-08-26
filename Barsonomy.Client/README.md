# Barsonomy Client

Next.js client for the Barsonomy API.

## Development

```bash
npm install
npm run dev
```

The client runs at `http://localhost:3000`. Requests under `/api` are rewritten to the .NET API at `http://localhost:5276` by default.

Set `API_URL` to point at another API host when needed:

```powershell
$env:API_URL="https://localhost:7029"
npm run dev
```

## Production

```bash
npm run build
npm run start
```
