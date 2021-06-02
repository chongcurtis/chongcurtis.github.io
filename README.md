# Dev Notes
- Use https://resizeimage.net/ to crop header photos to a 2:1 aspect ratio
- https://png2jpg.com/ is also a good site to get compressed jpg files (unlike png)
- Use `python3 -m http.server` so jquery can load html files.
- Go to `http://0.0.0.0:8000/index.html`
- The collage was built on https://www.photocollage.com/
- For lazy loading images we can't lazy load images before the last parallax element (aka we can't lazy load the sf, competitive programming, and kaggle images).
  - This is because it messes up with the height calculation for the parallax image. Maybe we can lazy load and hard code the heights of the image elements in the future to lazy load those images
