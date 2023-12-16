const options = document.getElementById("themes").children;

let prev = 'catppuccin';
options.namedItem("catppuccin").classList.add("active");

for(let i = 0; i < options.length; i++)
{
  options[i].addEventListener("click", () =>
  {
      switch (options[i].id) 
      {
        case "catppuccin":
        case "gruvbox":
        case "dracula":
        case "nord":
          options.namedItem(prev).classList.remove("active");
          options.namedItem(options[i].id).classList.add("active");
          prev = options[i].id;
          break;
      }
  })
}
