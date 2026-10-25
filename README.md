# 🎁 3D Birthday Surprise

## Run locally
    npm install
    npm run dev        # open the printed URL
    npm run build      # production build -> dist/

## Personalise (only edit `src/data/birthdayConfig.ts`)
- Names: change `friendName` and `yourName`. The letter and headings update automatically.
- Letter/messages: edit `birthdayLetter`, `birthdayMessage`, `wishText`.
- Photos: copy pictures into `public/images/`, then set `file` and `caption` for each entry in `photos`. Missing files show a pretty placeholder.
- Music: copy your own song to `public/audio/music.mp3` (or change `musicFile`). Without it, the player shows "no song yet".
- Colours: `themeColors`.

## Publish with GitHub Pages
1. Create a new GitHub repository (any name, e.g. `birthday-surprise`). No setting needs changing: the build uses relative paths.
2. In this folder run: `git init && git add . && git commit -m "birthday" && git branch -M main && git remote add origin https://github.com/USERNAME/REPOSITORY.git && git push -u origin main`
3. On GitHub: Settings → Pages → Source: **GitHub Actions**.
4. Open the Actions tab and wait for "Deploy to GitHub Pages" to turn green.
5. Your link is `https://USERNAME.github.io/REPOSITORY/` (also shown in Settings → Pages).
6. To update: edit files, then `git add . && git commit -m update && git push`.

## Troubleshooting
- Blank page: check the Actions log; run `npm run build` locally to see errors. Try `npm run typecheck`.
- 404: confirm Pages source is "GitHub Actions" and the workflow finished.
- Photos missing: filenames are case-sensitive and must match `birthdayConfig.ts`.
- Audio silent: browsers need a click first; press Play.

## Checklist
Open gift → confetti → 3-2-1 → cake spins → click candles/blow button → wish → click 3 gifts → gallery modal → open letter → final fireworks → Celebrate Again → music play/mute/volume → resize to phone width.
