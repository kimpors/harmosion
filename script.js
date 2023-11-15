const input = document.getElementById('input');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d'); 
const offset = 3;

var theme = 
[
  235, 64, 52,
  86, 52, 235,
  81, 73, 115,
];

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
