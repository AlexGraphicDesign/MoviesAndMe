//API/TMDBApi.js

const API_TOKEN = "867bacfff3633580d64e951ab70fa3c9";

//récupération de l'image d'un film
export function getImageFromApi (name){
  return 'https://image.tmdb.org/t/p/w300' + name
}

//récupération du film grâce à la recherche
export function getFilmsFromApiWithSearchedText (text, page){
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text +'&page=' + page
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.error(error))
}

//Récupération du détail du film
export function getFilmDetailFromApi (id){
  return fetch ('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
  .then((response) => response.json())
  .catch((error) => console.error(error))
}
