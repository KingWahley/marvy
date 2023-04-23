const apiKey = "b81303888057d45a55b44947d03c6710";

const searchButton = document.getElementById("search-button");
const next = document.querySelector(".next");
const prev = document.querySelector(".next1");
const welcomeMessage = document.querySelector(".mess");
const intro = document.querySelector(".text");
const loader = document.querySelector(".loader");

text = `Hello!... I'm Marvy and I have been specially designed to help you find
              information on movies by providing their summaries and cover
              posters based on your inputs. I'll do my best to give you accurate
              and helpful information. Enter a movie title below to give me a try`;
let w = -1;
function typeWriter() {
  if (w < text.length) {
    intro.textContent += text.charAt(w);
    w++;
    setTimeout(typeWriter, 0.5);
  }
}
typeWriter(text);

let aid;
let previous;
let movieId = "";
let i = 0;
let Marvy = 0;

searchButton.addEventListener("click", searchMovie);
async function searchMovie() {
  loader.style.opacity = 1;
  const searchInput = document.getElementById("search-input").value;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
      // console.log(data);

      aid = () => {
        prev.style.opacity = 1;
        i < data.results.length - 1 ? (i += 1) : (i = 0);
        console.log(i);
        Marvy = i;
        searchMovie();
      };
      previous = () => {
        Marvy > 0 ? (Marvy -= 1) : (Marvy = 0);
        // console.log(Marvy);
        Marvy == 0 ? (prev.style.opacity = 0) : (prev.style.opacity = 1);
        searchMovie();
      };
      document
        .getElementById("search-input")
        .addEventListener("change", function () {
          Marvy = 0;
        });
      // console.log(i);
      // document.getElementById("search-input").value= "";
      welcomeMessage.remove();
      const movieId = data.results[Marvy].id;
      console.log(Marvy);
      const movieInfoUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
      const movieResponse = await fetch(movieInfoUrl);
      const movieData = await movieResponse.json();
      const movieInfo = document.getElementById("movie-info");
      console.log(data.results);
      next.style.opacity = 1;
      movieInfo.innerHTML = `
          <h2 class="title">${movieData.title} (${movieData.release_date.slice(
        0,
        4
      )})</h2>
          <p><span class="red-text"> &#x1F916 Marvy : </span>  ${
            movieData.overview
          }</p>
          <img class="poster" src="https://image.tmdb.org/t/p/w500${
            movieData.poster_path
          }" alt="Poster for ${movieData.title}">
        `;
      loader.style.opacity = 0;
    } else {
      prev.style.opacity = 0;
      welcomeMessage.remove();
      loader.style.opacity = 0;
      document.getElementById("search-input").value = "";
      const movieInfo = document.getElementById("movie-info");
      movieInfo.innerHTML = `<p> <span class="red-text"> &#x1F916 Marvy : </span> I'm so sorry, I could not find a movie with the provided title, please another title. &#x1F60A;</p>`;
    }
  } catch (error) {
    prev.style.opacity = 0;
    loader.style.opacity = 0;
    welcomeMessage.remove();
    document.getElementById("search-input").value = "";
    document.getElementById(
      "movie-info"
    ).innerHTML = `<p> <span class="red-text"> &#x1F916 Marvy : </span> I'm so sorry, I can not process your request, because you are not connected to the internet, check your connection and try again. &#x1F60A;</p>`;
    // console.error(error);
  }
}
