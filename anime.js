
const id = new URLSearchParams(location.search).get("id");
const details = document.getElementById("details");
const episodes = document.getElementById("episodes");
let language = "sub";

function setLang(l) {
  language = l;
  alert("Language set to " + l.toUpperCase());
}

fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
  .then(res => res.json())
  .then(data => {
    const a = data.data;
    details.innerHTML = `
      <h1>${a.title_english || a.title}</h1>
      <p><strong>Season:</strong> ${a.season || "N/A"} ${a.year || ""}</p>
      <p>${a.synopsis}</p>
    `;
  });

fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`)
  .then(res => res.json())
  .then(data => {
    data.data.forEach(ep => {
      const li = document.createElement("li");
      li.textContent = `Episode ${ep.mal_id} - ${ep.title}`;
      li.onclick = () =>
        location.href = `watch.html?ep=${ep.mal_id}&lang=${language}`;
      episodes.appendChild(li);
    });
  });
📄 watch.html (watch page layout)
html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Watch Episode</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<header>
  <h1 class="logo" onclick="location.href='index.html'">🌸 AnimeVerse+</h1>
</header>

<h2>Episode Player</h2>

<div class="player">
  <p>▶ Video Player Placeholder</p>
  <p>Add your legal video source here</p>
</div>
</body>
</html>
📄 login.html (sign-in page)
html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sign In</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="login">
  <h2>Sign In</h2>
  <input placeholder="Email">
  <input type="password" placeholder="Password">
  <button>Login</button>
</div>
</body>
</html>
