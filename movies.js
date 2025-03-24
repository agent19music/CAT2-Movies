const moviesUrl = "./movies.json"

//arrays to store movies 
let watchList = JSON.parse(localStorage.getItem('watchList')) || []
let favourites = JSON.parse(localStorage.getItem('favourites'))|| []

const renderMovies = (movies, container, isWatchList = false , isFavourites = false) => {
  container.innerHTML = ""
  movies.forEach(movie => { 

    let movieCard = document.createElement("li")
    movieCard.classList.add("movie-card")
   
    let poster = document.createElement("img")
    let title = document.createElement("h3")
    let releaseYear = document.createElement("p")
    releaseYear.classList.add("year")
    
    poster.src = movie.Poster
    poster.alt = movie.Title
    title.textContent = movie.Title
    releaseYear.textContent = movie.Year

    //buttons
    let plusButton = document.createElement("button")
    plusButton.className = 'button';
    let likeButton = document.createElement("button")
    likeButton.className = 'button';
    let deleteButton = document.createElement("button")
    deleteButton.className = 'button';
    
    plusButton.innerHTML = '<i class="fas fa-plus"></i> Add to Watchlist';
    //click functionality
    plusButton.addEventListener("click" ,() => {
      watchList.push(movie)
      localStorage.setItem('watchList', JSON.stringify(watchList))

      console.log("Added to watchlist", movie.Title)

      Toastify({
        text: (`${movie.Title} added to watchlist!`),
        duration: 3000,
        gravity: "top", // Position the toast at the top
        position: "center", // Center the toast horizontally
        style: {
          background: "black",
          color: "white"
        },
        avatar: "/checkmark.png" // Checkmark icon
      }).showToast();
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
    movieCard.appendChild(releaseYear) // Add year before buttons
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
    renderMovies(watchList, watchListContainer, true, false)
  }
  
}
const renderFavourites = () => {
  let favouritesContainer = document.querySelector(".favourites-list")
  if(favouritesContainer) {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || []
    console.log("rendering favourites", favourites)
    renderMovies(favourites, favouritesContainer, false , true)
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
      darkModeToggle.addEventListener("click", darkMode);
  
  fetch(moviesUrl) 
   .then( res => res.json())
   .then( data => {

    let moviesList = document.querySelector(".movies-list")
    renderMovies(data, moviesList)   
    renderWatchlist()
    renderFavourites()
  
    // Live search implementation
    const searchInput = document.getElementById("search")
    searchInput.addEventListener("input", (e) => {
      const search = e.target.value.toLowerCase()
      const filteredMovies = data.filter((movie) => 
        movie.Title.toLowerCase().includes(search)
      )
      renderMovies(filteredMovies, moviesList)
    })
  })
})




