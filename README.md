Feel free to pirate any piece of code you find on this site. Beware, I don't really comment so sorry!

Note: Some of my other repositories on github rely on assets being delivered from the domain chongcurtis.com.
If I change my domain name remember to update the READMEs to the Photos/gifs found in the following repos:

- Greenfoot_Physics_Engine
- Musr
- se101
- coworm
- Canadian forest fires
- rehackilation
- Ancient Finders
- Lnews
- Lweb
- Messenger Summarizer
- Messenger Assistant

# Dev Notes
- Use `python3 -m http.server` so jquery can load html files.
- The collage was built on https://www.photocollage.com/
- For lazy loading images we can't lazy load images before the last parallax element (aka we can't lazy load the sf, competitive programming, and kaggle images).
  - This is because it messes up with the height calculation for the parallax image. Maybe we can lazy load and hard code the heights of the image elements in the future to lazy load those images