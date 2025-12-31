
let page = 1;
let query = "";
const list = document.getElementById("list");

async function loadAnime() {
  const url = query
    ? `https://api.jikan.moe/v4/anime?q=${query}&page=${page}`
    : `https://api.jikan.moe/v4/top/anime?page=${page}`;

  const res = await fetch(url);
  const data = await res.json();

  data.data.forEach(anime => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () =>
      location.href = `anime.html?id=${anime.mal_id}`;

    card.innerHTML = `
      <img src="${anime.images.jpg.image_url}">
      <h3>${anime.title_english || anime.title}</h3>
    `;
    list.appendChild(card);
  });

  page++;
}

function searchAnime() {
  query = document.getElementById("search").value;
  list.innerHTML = "";
  page = 1;
  loadAnime();
}

window.addEventListener("scroll", () => {
  if (innerHeight + scrollY >= document.body.offsetHeight - 200) {
    loadAnime();
  }
});

loadAnime();

