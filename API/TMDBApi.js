//API/TMDBApi.js

const API_TOKEN = "867bacfff3633580d64e951ab70fa3c9";

export function getFilmsFromApiWithSearchedText (text){
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.error(error))
}
