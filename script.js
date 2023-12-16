import Themes from './themes.js';

const themes = Themes();
let theme = themes.catppuccin;
let defaultImage = null;

const dialog = document.getElementById("dialog");
const options = document.getElementsByTagName("button");

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d'); 


for(let i = 0; i < options.length; i++)
{
  options[i].addEventListener("click", () =>
  {
    switch(options[i].id)
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
        theme = themes.catppuccin;
        break;

      case 'gruvbox':
        theme = themes.gruvbox;
        break;

      case 'dracula':
        theme = themes.dracula;
        break;

      case 'nord':
        theme = themes.nord;
        break;
    }
  })
}

dialog.addEventListener("change", (event) => 
{
  const file = event.target.files[0];

  if (file)
  {
    var reader = new FileReader();

    reader.onload = function (e) 
    {
      var image = new Image();

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
});

function Start()
{
  let image = context.getImageData(0, 0, canvas.width, canvas.height);
  let pixels = image.data;
  let offset = 3;

  let lengths = [];

  for (let i = 0, min = 0; i < pixels.length; i += 4)
  {
    min = 0;

    for (let j = 0, k = 0; j < theme.length; j += 3, k++)
    {
      lengths[k] = Math.sqrt(
                    Math.pow(pixels[i] - theme[j], 2) +
                    Math.pow(pixels[i + 1] - theme[j + 1], 2) +
                    Math.pow(pixels[i + 2] - theme[j + 2], 2));

      if (lengths[min] > lengths[k])
      {
        min = k;
      }
    }

    pixels[i] = theme[min * offset];
    pixels[i + 1] = theme[min * offset + 1];
    pixels[i + 2] = theme[min * offset + 2];
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
