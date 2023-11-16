const input = document.getElementById('input');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d'); 
const offset = 3;

var theme = catppuccin; 

input.addEventListener('change', function(event)
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
      };

      image.src = e.target.result;

    };
      reader.readAsDataURL(file);
  }
});

function ChangeTheme(name)
{
  switch (name) {
    case 'catppuccin':
      theme = catppuccin;
      break;
    case 'gruvbox':
      theme = gruvbox;
      break;
    case 'dracula':
      theme = dracula;
      break;
    case 'nord':
      theme = nord;
      break;
  }
}

var catppuccin = 
[
  244, 219, 214,
  240, 198, 198,
  245, 189, 230,
  198, 160, 246,
  237, 135, 150,
  238, 153, 160,
  245, 179, 127,
  238, 212, 159,
  166, 218, 149,
  139, 213, 202,
  145, 215, 227,
  125, 196, 228,
  138, 173, 244,
  183, 189, 248,
  202, 211, 245,
  184, 192, 224,
  165, 173, 203,
  147, 154, 183,
  128, 135, 162,
  110, 115, 141,
  91, 96, 120,
  73, 77, 100,
  54, 58, 79,
  36, 39, 58,
  30, 32, 48,
  24, 25, 38,
];

var gruvbox = 
[
  92, 55, 35,
  214, 58, 62,
  228, 127, 45,
  237, 221, 170,
  105, 180, 178,
];

var dracula = 
[
  40, 42, 54,
  68, 71, 90,
  248, 248, 242,
  98, 114, 164,
  139, 233, 253,
  80, 250, 123,
  255, 184, 108,
  255, 121, 198,
  189, 147, 249,
  255, 85, 85,
  241, 250, 140,
];

var nord = 
[
  143, 188, 187,
  136, 192, 208,
  129, 161, 193,
  94, 129, 172,
];


function Start()
{
  var image = context.getImageData(0, 0, canvas.width, canvas.height);
  var pixels = image.data;

  var index = 0;
  var lengths = [];

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < pixels.length; i += 4)
  {
    for (var j = 0, k = 0; j < theme.length; j += 3, k++)
    {
      lengths[k] = Math.sqrt(
                    Math.pow(pixels[i] - theme[j], 2) +
                    Math.pow(pixels[i + 1] - theme[j + 1], 2) +
                    Math.pow(pixels[i + 2] - theme[j + 2], 2));

      if (lengths[index] > lengths[k])
      {
        index = k;
      }
    }

    for (var j = 0; j < offset; j++)
    {
      pixels[i + j] = theme[index * offset + j];
    }

    index = 0;
  }

  context.putImageData(image, 0, 0);
}
