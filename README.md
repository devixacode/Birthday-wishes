# Birthday Surprise Website 💗

## Run it
1. Extract the ZIP folder.
2. Open the `birthday_surprise` folder in VS Code.
3. Install/enable **Live Server** if needed.
4. Right-click `index.html` → **Open with Live Server**.

## Add the birthday song
Put an MP3 file named `birthday-song.mp3` inside `assets/audio/`.
The website starts music after the names form is submitted (browser audio rules require user interaction).
If you use a different filename, update `birthdaySongPath` near the top of `script.js`.

## Replace photos
Replace `photo1.jpg` ... `photo6.jpg` in `assets/images/` with your photos, keeping the same names.
If the local image doesn't exist, the gallery shows a fallback image. Update captions in `photoCaptions` in `script.js` and the labels in the gallery HTML.

## Personalize the text
- Love letter: edit `birthdayLetter` near the top of `script.js`.
- Your names: type both names on the login screen. They personalize the site automatically.
- Birthday wishes: edit the text in `index.html` and the wish handler in `script.js`.
- Love story: edit the four timeline cards in `index.html`.
- Reasons cards: edit the eight `.reason-card` blocks in `index.html`.

## Pages and features
- Automatic 3–2–1 countdown
- Birthday welcome screen and name entry
- 8 navigable sections with Previous / Next / Home and top dots
- Looping music button (play/pause)
- Animated letter, photo lightbox, reveal cards, cute messages, confetti
- Logout resets the names and music and returns to countdown
- Responsive design and reduced-motion accessibility support

Note: Google Fonts and fallback gallery images require internet access. The core site works locally; the chosen music file and your own photos are optional assets.
