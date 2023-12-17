import Themes from './themes.js';

const themes = Themes();
let theme = themes.catppuccin;
let defaultImage = null;

const worker = new Worker('worker.js');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d'); 

const dialog = document.getElementById("dialog");
const downloadLink = document.getElementById("download-link");
const options = document.getElementsByTagName("button");

for (const option of options)
{
  option.addEventListener("click", () =>
  {
    switch(option.id)
    {
      case 'generate':
        if (defaultImage)
        {
          worker.postMessage([theme, context.getImageData(0, 0, canvas.width, canvas.height).data]);
        }
        break;

      case 'upload':
        dialog.click();
        break;

      case 'download':
        downloadLink.href = canvas.toDataURL("image/png"); 
        downloadLink.click();
        break;

      case 'reset':
        if (defaultImage)
        {
          context.putImageData(defaultImage, 0, 0);
        }
        break;

      case 'catppuccin':
      case 'gruvbox':
      case 'dracula':
      case 'nord':
        theme = themes[option.id];
        break;
    }
  });
}

worker.onmessage = function (pixels) 
{
  context.putImageData(
    new ImageData(pixels.data, canvas.width, canvas.height), 0, 0);
}

dialog.addEventListener("change", () =>
{
  let reader = new FileReader();

  reader.addEventListener('load', (event) =>
  {
    let image = new Image();

    image.addEventListener("load", () =>
    {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);
      defaultImage = context.getImageData(0, 0, canvas.width, canvas.height);
    });

    image.src = event.target.result;
  });

    reader.readAsDataURL(dialog.files[0]);
});
