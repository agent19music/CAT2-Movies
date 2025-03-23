const moviesUrl = "./movies.json"

//arrays to store movies 
let watchList = JSON.parse(localStorage.getItem('watchList')) || []
let favourites = JSON.parse(localStorage.getItem('favourites'))|| []



  const renderMovies = (movies, container, isWatchList = false , isFavourites = false) => {
    container.innerHTML = ""
    movies.forEach(movie => {
  
      // console.log(data)
  
      let movieCard = document.createElement("li")
      movieCard.classList.add("movie-card")
     
      let poster = document.createElement("img")
      let title = document.createElement("h3")
  
      //buttons
      let plusButton = document.createElement("button")
      let likeButton = document.createElement("button")
      let deleteButton = document.createElement("button")
      
      poster.src = movie.Poster
      poster.alt = movie.Title
      title.textContent = movie.Title
  
      plusButton.innerHTML = '<i class="fas fa-plus"></i> Add to Watchlist';
      //click functionality
      plusButton.addEventListener("click" ,() => {
        watchList.push(movie)
        localStorage.setItem('watchList', JSON.stringify(watchList))

        console.log("Added to watchlist", movie.Title)

        alert(`${movie.Title} added to watchlist!`)
        renderWatchlist()
      })
  
      likeButton.innerHTML = '<i class="fas fa-heart"></i> Add to Favourites';
      likeButton.addEventListener("click", () => {
        favourites.push(movie);
        localStorage.setItem('favourites', JSON.stringify(favourites))

        console.log("Added to favorites:", movie.Title);

        alert(`${movie.Title} added to favorites!`);
        renderFavourites()
      });

      deleteButton.innerHTML = '<i class="fas fa-trash"></i> Delete';
      deleteButton.addEventListener("click", () => {
        if(isWatchList){
          watchList = watchList.filter((item) => item.Title !== movie.Title)
          localStorage.setItem('watchList', JSON.stringify(watchList))
          renderWatchlist() //re-render the watchlist
        }
        else if (isFavourites){
          favourites = favourites.filter((item) => item.Title !== movie.Title)
          localStorage.setItem('favourites', JSON.stringify(favourites))
          renderFavourites() //re-render the watchlist
        }
        console.log("Deleted", movie.TItle)
        alert(`${movie.Title} deleted!`)
      })

  
//append data to the list
  
      movieCard.appendChild(poster)
      movieCard.appendChild(title)
      if(!isWatchList && !isFavourites){
        movieCard.appendChild(plusButton)
        movieCard.appendChild(likeButton)
      } else{
        movieCard.appendChild(deleteButton)
      }
     

      //append card to thhe container
      container.appendChild(movieCard)
  
  })

  }
const renderWatchlist = () => {
  let watchListContainer = document.querySelector(".watchlist-list")
  if(watchListContainer) {
    const watchList = JSON.parse(localStorage.getItem('watchList')) || []
    console.log("rendering watchlist", watchList)
    renderMovies(watchList, watchListContainer)
  }
  
}
const renderFavourites = () => {
  let favouritesContainer = document.querySelector(".favourites-list")
  if(favouritesContainer) {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || []
    console.log("rendering favourites", favourites)
    renderMovies(favourites, favouritesContainer)
  }

}

const darkMode = () => {
  const body = document.body
  body.classList.toggle("dark-mode")
  localStorage.setItem("dark-mode", body.classList.contains("dark-mode"))
}

const initializeDarkMode = () => {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
    }

}


document.addEventListener("DOMContentLoaded", () => {
  initializeDarkMode()

  const darkModeToggle = document.getElementById("dark-mode-toggle");
  if (darkModeToggle) {
      darkModeToggle.addEventListener("click", toggleDarkMode);
  }

  fetch(moviesUrl) 
   .then( res => res.json())
   .then( data => {

    let moviesList = document.querySelector(".movies-list")
    renderMovies(data, moviesList)
    // let watchList = document.querySelector(".watchlist-list")
    // let favouritesList = document.querySelector(".favorites-list")

   
      renderWatchlist()
      renderFavourites()
    

  
//search func
  
const searchForm = document.getElementById("search-form")
const searchInput =  document.getElementById("search")

searchForm.addEventListener("submit", (e) => {
  e.preventDefault() //prevent form submission
  const search = searchInput.value.toLowerCase()

  const filteredMovies = data.filter ((movie) => movie.Title.toLowerCase().includes(search))

  renderMovies(filteredMovies,moviesList)

})
})
})
 



