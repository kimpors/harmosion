const input = document.getElementById('input');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d'); 

input.addEventListener('change', event => 
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
      }

      image.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
});
