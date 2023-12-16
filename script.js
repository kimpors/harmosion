import Themes from './themes.js';

const themes = Themes();
let theme = themes.catppuccin;
let defaultImage = null;

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
        Start();
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

function Start()
{
  let image = context.getImageData(0, 0, canvas.width, canvas.height);
  let pixels = image.data;
  let buf = -1;
  let min = 0;

  for (let i = 0; i < pixels.length; i += 4)
  {
    min = 0;
    buf = -1;

    for (let j = 0; j < theme.length; j += 3)
    {
      let temp = Math.sqrt(
                    Math.pow(pixels[i] - theme[j], 2) +
                    Math.pow(pixels[i + 1] - theme[j + 1], 2) +
                    Math.pow(pixels[i + 2] - theme[j + 2], 2));

      if (buf == -1 || buf > temp)
      {
        min = j;
        buf = temp;
      }
    }

    pixels[i] = theme[min];
    pixels[i + 1] = theme[min + 1];
    pixels[i + 2] = theme[min + 2];
  }

  context.putImageData(image, 0, 0);
};

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
