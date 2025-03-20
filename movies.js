const moviesUrl = "./movies.json"

fetch(moviesUrl) 
.then(
  res => res.json()
  
)
.then( data => {
  // console.log(data)
  let moviesList = document.getElementById("list")


  data.forEach(movie => {

    //  moviesList.insertAdjacentElement = ("beforeend",`<li>${movie.Poster}</li>`)/
     console.log(data)

    let movieList = document.createElement("li")
   

    let poster = document.createElement("img")
    let title = document.createElement("h3")
    
    poster.src = movie.Poster
    poster.alt = movie.Title
    title.textContent = movie.Title

    movieList.appendChild(poster)
    movieList.appendChild(title)
    moviesList.appendChild(movieList)

})
})
