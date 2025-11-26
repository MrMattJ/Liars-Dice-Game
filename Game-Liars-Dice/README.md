# Liar's Dice

Static single-page Liar's Dice game. Contains the HTML, CSS, and JavaScript needed to run locally or host via Firebase.

## Structure
- `index.html`, `style.css`, `script.js`: core app
- `Die *.png`, `Mystery Die.jpeg`, `red x.png`: dice assets
- `firebase.json`, `.firebaserc`: Firebase Hosting configuration
- `app.yaml`: optional App Engine static config

## Run locally
From `Game-Liars-Dice`:
```bash
python3 -m http.server 6100
```
Visit http://localhost:6100.

## Deploy (Firebase Hosting)
Configured for project `liarsdice-8e578`.
```bash
npx firebase-tools@13.15.0 deploy --only hosting --project liarsdice-8e578
```
Live site: https://liarsdice-8e578.web.app

## Notes
- No API keys or secrets are stored in this repo.
- `.firebase/` cache and OS cruft are ignored via `.gitignore`.
