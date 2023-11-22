# PosterA11y

This project grades a given poster's accessibility rating.

### How Its Done

An image is uploaded view file or URL input on the main page. This image is read and sent to the backend API which starts the processing. The backend uses [ImageMagick](https://imagemagick.org/index.php) to prepare the image for analysis. The image is optimized by enhancing the DPI, changing the color to grey-scale, removing blur, removing noise, and adding borders.

**Text Grading**
Red boxes around an area show that the text within is not easily readable.

Green boxes mean the text within that area is good.

Grading text is a complex task when given an image that contains background designs. You will see here that red boxes can be drawn around background images that contain no text. Please note that these do affect the text grade of the image, but only by a small amount. On the other hand, red boxes that are drawn around text means you may want to make some changes to how that text is displayed (font size, color, font family, etc...).

If some text has no box outline at all, then that text was not able to be read by the application. The text parser is far from perfect and will miss some text but this is not counted against your score.

**Contrast Grading**
The color contrast of the image is graded by making sure the colors are WCAG compliant. One caveat to this is that there will usually be some form of shading on various colors and designs that will likely not be WCAG compliant due to their nature, but this is taken into account when grading.

**Note:** The resulting image may appear blurry. This is simply because of the size of the image and how it is scaled to fit the page and has nothing to do with the actual image quality.

### How to run

- `npm i` to install needed dependencies
- `npm run dev` to start dev server on localhost:3000
- `node api/app.js` to start API server
