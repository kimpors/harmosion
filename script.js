var themes = (function () {
    var json = null;

    $.ajax({
        'async': false,
        'global': false,
        'url': 'themes.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });

    return json;
})(); 

var theme = themes.catppuccin; 
var imagePalete;

var bareImage = null;
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d'); 
const offset = 3;

$("#input").on("change", function (event)
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
        bareImage = context.getImageData(0, 0, canvas.width, canvas.height);
      };

      image.src = e.target.result;

    };
      reader.readAsDataURL(file);
  }
});

$("button").on("click", function ()
{
  switch ($( this ).attr("id")) {
    case "start":
      Start();
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
});

async function Start()
{
  var image = context.getImageData(0, 0, canvas.width, canvas.height);
  var pixels = image.data;

  var lengths = [];

  for (var i = 0, min = 0; i < pixels.length; i += 4, min = 0)
  {
    for (var j = 0, k = 0; j < theme.length; j += 3, k++)
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
}

async function Reset() 
{
  if (bareImage)
  {
    context.putImageData(bareImage, 0, 0);
  }
}
