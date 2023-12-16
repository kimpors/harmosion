import Themes from './themes.js';

const themes = Themes();
let theme = themes.catppuccin;
let defaultImage = null;

const worker = new Worker('worker.js');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d'); 

const options = document.getElementsByTagName("button");

for (const option of options)
{
  option.addEventListener("click", () =>
  {
    switch(option.id)
    {
      case 'start':
        worker.postMessage([theme, context.getImageData(0, 0, canvas.width, canvas.height).data]);
        break;

      case 'download':
        Download();
        break;

      case 'reset':
        Reset();
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

document.querySelector("#dialog").
  addEventListener("change", (event => 
{
  const file = event.target.files[0];

  if (file)
  {
    let reader = new FileReader();

    reader.onload = function (e) 
    {
      let image = new Image();

      image.onload = function()
      {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);
        defaultImage = context.getImageData(0, 0, canvas.width, canvas.height);
      };

      image.src = e.target.result;

    };
      reader.readAsDataURL(file);
  }
}));

worker.onmessage = function (pixels) 
{
  context.putImageData(
    new ImageData(pixels.data, canvas.width, canvas.height), 0, 0);
}

function Download()
{
  let a = document.createElement('a');
  a.href = canvas.toDataURL("image/png");
  a.download = 'image.png';
  a.click();
}

function Reset()
{
  if (defaultImage)
  {
    context.putImageData(defaultImage, 0, 0);
  }
};
