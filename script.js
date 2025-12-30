
let page = 1;
let loading = false;
let query = "";

const list = document.getElementById("animeList");
const login = document.getElementById("login");

function toggleLogin() {
  login.style.display = login.style.display === "flex" ? "none" : "flex";
}

async function loadAnime() {
  if (loading) return;
  loading = true;

  const url = query
    ? `https://api.jikan.moe/v4/anime?q=${query}&page=${page}`
    : `https://api.jikan.moe/v4/top/anime?page=${page}`;

  const res = await fetch(url);
  const data = await res.json();

  data.data.forEach(a => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => location.href = `anime.html?id=${a.mal_id}`;
    card.innerHTML = `
      <img src="${a.images.jpg.image_url}">
      <h3>${a.title}</h3>
    `;
    list.appendChild(card);
  });

  page++;
  loading = false;
}

function searchAnime() {
  query = document.getElementById("searchInput").value;
  list.innerHTML = "";
  page = 1;
  loadAnime();
}

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
    loadAnime();
  }
});

loadAnime();
