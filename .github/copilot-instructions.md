# Copilot Instructions for Plugs and Sockets

## Architecture

Static site with no build step. All data lives in `data/countries.json` and is loaded at runtime by `js/app.js`.

### Data Flow
1. `index.html` loads `js/app.js` on DOMContentLoaded
2. `app.js` fetches `data/countries.json` and stores it in `countriesData`
3. UI is rendered from this data (dropdowns, plug cards, country grid)

### Key Files
- `data/countries.json` - All plug/socket data (plug types A-N, 60+ countries with voltage/frequency)
- `js/app.js` - Single JS file with all application logic
- `css/styles.css` - All styling with CSS variables in `:root`

## Development

```bash
# Local preview (no build required)
open index.html
# or use any HTTP server:
python -m http.server 8000
```

## Deployment

Push to `main` triggers GitHub Actions which rsync's to `plugsandsockets.org` via SSH.

Required GitHub secrets: `SSH_PRIVATE_KEY`, `SERVER_HOST`, `SERVER_USER`

## Data Conventions

### Adding a Country
Add to `countries` object in `data/countries.json`:
```json
"CountryName": {
  "name": "CountryName",
  "code": "XX",           // ISO 3166-1 alpha-2
  "plugTypes": ["C", "F"], // Array of type letters
  "voltage": "230V",
  "frequency": "50Hz",
  "region": "Europe",     // Used for filtering
  "notes": "Optional tip"
}
```
Then add flag emoji to `countryFlags` in `js/app.js`.

### Adding a Plug Type
Add to `plugTypes` object in `data/countries.json`, then add icon to `plugIcons` in `js/app.js`.

### Priority Countries
Countries in `priorityCountries` array (in `app.js`) appear first in dropdowns.
