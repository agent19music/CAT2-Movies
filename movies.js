const moviesUrl = "./movies.json"

//arrays to store movies 
let watchList = JSON.parse(localStorage.getItem('watchList')) || []
let favourites = JSON.parse(localStorage.getItem('favourites'))|| []

fetch(moviesUrl) 
.then( res => res.json())
.then( data => {
  let moviesList = document.querySelector(".list")

  const renderMovies = (movies) => {
    // moviesList.innerHTML = ""
    movies.forEach(movie => {
  
      // console.log(data)
  
      let movieList = document.createElement("li")
     
      let poster = document.createElement("img")
      let title = document.createElement("h3")
  
      //buttons
      let plusButton = document.createElement("button")
      let likeButton = document.createElement("button")
      
      poster.src = movie.Poster
      poster.alt = movie.Title
      title.textContent = movie.Title
  
      plusButton.innerHTML = '<i class="fas fa-plus"></i>';
      plusButton.addEventListener("click" ,() => {
        watchList.push(movie)
        localStorage.setItem('watchList', JSON.stringify(watchList))
        console.log("Added to watchlist", movie.Poster)
        alert(`${movie.Title} added to watchlist!`)
      })
  
      likeButton.innerHTML = '<i class="fas fa-heart"></i>';
      likeButton.addEventListener("click", () => {
        favourites.push(movie);
        localStorage.setItem('favourites', JSON.stringify(favourites))
        console.log("Added to favorites:", movie.Title);
        alert(`${movie.Title} added to favorites!`);
      });
  
//append data to the list
  
      movieList.appendChild(poster)
      movieList.appendChild(title)
      movieList.appendChild(plusButton)
      movieList.appendChild(likeButton)
      moviesList.appendChild(movieList)
  
  })

  }
  renderMovies(data)

  
const searchForm = document.getElementById("search-form")
const searchInput =  document.getElementById("search")

searchForm.addEventListener("submit", (e) => {
  e.preventDefault() //prevent form submission
  const search = searchInput.value.toLowerCase()

  const filteredMovies = data.filter ((movie) => movie.Title.toLowerCase().includes(search))

  renderMovies(filteredMovies)

})


 
})


