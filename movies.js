const moviesUrl = "http://localhost:3000/"

// Convert list to grid
const movieGrid = document.getElementById("list")
movieGrid.className = "movie-grid"

let movies = []

function renderMovies(movieData) {
  movieGrid.innerHTML = ""
  movieData.forEach(movie => {
    const movieCard = document.createElement("div")
    movieCard.className = "movie-card"
    
    const poster = document.createElement("img")
    poster.src = movie.Poster
    poster.alt = movie.Title
    
    const movieInfo = document.createElement("div")
    movieInfo.className = "movie-info"
    
    const title = document.createElement("h3")
    title.textContent = movie.Title
    
    const year = document.createElement("p")
    year.textContent = movie.Year
    
    const actions = document.createElement("div")
    actions.className = "movie-actions"
    
    const favoriteBtn = document.createElement("button")
    favoriteBtn.className = "btn favorite-btn"
    favoriteBtn.textContent = "♥ Favorite"
    favoriteBtn.onclick = () => toggleFavorite(movie)
    
    const watchlistBtn = document.createElement("button")
    watchlistBtn.className = "btn watchlist-btn"
    watchlistBtn.textContent = "+ Watchlist"
    watchlistBtn.onclick = () => toggleWatchlist(movie)
    
    movieInfo.appendChild(title)
    movieInfo.appendChild(year)
    actions.appendChild(favoriteBtn)
    actions.appendChild(watchlistBtn)
    
    movieCard.appendChild(poster)
    movieCard.appendChild(movieInfo)
    movieCard.appendChild(actions)
    
    movieGrid.appendChild(movieCard)
  })
}

// // Search functionality
// searchInput.addEventListener("input", (e) => {
//   const searchTerm = e.target.value.toLowerCase()
//   const filteredMovies = movies.filter(movie => 
//     movie.Title.toLowerCase().includes(searchTerm)
//   )
//   renderMovies(filteredMovies)
// })

// Favorites and Watchlist management
let favorites = JSON.parse(localStorage.getItem("favorites")) || []
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

function toggleFavorite(movie) {
  const index = favorites.findIndex(m => m.Title === movie.Title)
  if (index === -1) {
    favorites.push(movie)
  } else {
    favorites.splice(index, 1)
  }
  localStorage.setItem("favorites", JSON.stringify(favorites))
  // Re-render the current view
  if (document.querySelector(".tab-btn:nth-child(2)").classList.contains("active")) {
    showFavorites()
  }
}

function toggleWatchlist(movie) {
  const index = watchlist.findIndex(m => m.Title === movie.Title)
  if (index === -1) {
    watchlist.push(movie)
  } else {
    watchlist.splice(index, 1)
  }
  localStorage.setItem("watchlist", JSON.stringify(watchlist))
  // Re-render the current view
  if (document.querySelector(".tab-btn:nth-child(3)").classList.contains("active")) {
    showWatchlist()
  }
}

// Fetch and render movies
fetch(moviesUrl)
  .then(res => res.json())
  .then(data => {
    movies = data
    renderMovies(movies)
  })
  .catch(error => console.error("Error fetching movies:", error))

// Add these functions after your existing code

function showAllMovies() {
  renderMovies(movies)
}

function showFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || []
  renderMovies(favorites)
}

function showWatchlist() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || []
  renderMovies(watchlist)
}

