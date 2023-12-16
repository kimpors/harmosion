onmessage = (event) => 
{
  let theme = event.data[0];
  let pixels = event.data[1];
  let min = 0, buf = -1;

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

  postMessage(pixels);
};

