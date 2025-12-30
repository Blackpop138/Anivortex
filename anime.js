
const params = new URLSearchParams(location.search);
const id = params.get("id");
const container = document.getElementById("animeDetails");

fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
  .then(res => res.json())
  .then(data => {
    const a = data.data;
    container.innerHTML = `
      <h1>${a.title}</h1>
      <img src="${a.images.jpg.image_url}" style="width:300px">
      <p>${a.synopsis}</p>
      <p><strong>Episodes:</strong> ${a.episodes}</p>
      <p><strong>Score:</strong> ${a.score}</p>
    `;
  });
