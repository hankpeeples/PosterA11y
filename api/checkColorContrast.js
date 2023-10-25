import { extractColors } from 'extract-colors';
import getPixels from 'get-pixels';
import ColorContrastChecker from 'color-contrast-checker';
import { execSync } from 'node:child_process';

const checkContrast = async (path) => {
  return new Promise(async (resolve, reject) => {
    const ccc = new ColorContrastChecker();

    try {
      let colors = [];
      getPixels('colored-' + path, async (err, pixels) => {
        if (!err) {
          const data = [...pixels.data];
          const width = Math.round(Math.sqrt(data.length / 4));
          const height = width;

          try {
            const cExt = await extractColors({ data, width, height });
            cExt.forEach((color) => {
              colors.push(color.hex);
            });

            const cLen = colors.length - 1;
            let pass = 0;

            // check contrast, each color will be checked with each color except itself
            for (let i = 0; i < cLen; i++) {
              for (let k = 0; k !== cLen + 1; k++) {
                if (k !== i) {
                  // minimum acceptable WCAG ratio is 4.5:1
                  if (ccc.isLevelCustom(colors[i], colors[k], 4.5)) {
                    pass++;
                  }
                }
              }
            }

            await generateColorPalette(colors);

            resolve((pass / (cLen * 2 - 1)) * 100);
          } catch (err) {
            console.log('color contrast inner fun:', err);
            reject(err);
          }
        }
      });
    } catch (err) {
      console.log('color contrast err:', err);
      reject(err);
    }
  });
};

const generateColorPalette = async (colors) => {
  let colStr = '';
  colors.forEach((color) => {
    colStr += `xc:"${color}" `;
  });

  execSync(`convert -size 60x60 ${colStr} +append palette.jpg`);
};

export default checkContrast;
