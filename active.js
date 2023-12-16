const themes = document.querySelector(".themes").children;

let prev = 'catppuccin';
themes.namedItem(prev).classList.add("active");

for (const theme of themes) 
{
  theme.addEventListener("click", () =>
  {
    switch (theme.id) 
    {
      case "catppuccin":
      case "gruvbox":
      case "dracula":
      case "nord":
        themes.namedItem(prev).classList.remove("active");
        themes.namedItem(theme.id).classList.add("active");
        prev = theme.id;
        break;
    }
  });
}
