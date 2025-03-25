const moviesUrl = "./movies.json"

//arrays to store movies 
let watchList = JSON.parse(localStorage.getItem('watchList')) || []
let favourites = JSON.parse(localStorage.getItem('favourites'))|| []
let watched = JSON.parse(localStorage.getItem('watched')) || []

const renderMovies = (movies, container, isWatchList = false , isFavourites = false , isWatched = false) => {
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

    const isInWatchlist = watchList.some(item => item.Title === movie.Title);
    const isInFavorites = favourites.some(item => item.Title === movie.Title);
    const isInWatched = watched.some(item=> item.Title === movie.Title)

    //buttons
    let plusButton = document.createElement("button")
    let likeButton = document.createElement("button")
    let deleteButton = document.createElement("button")
    let watchedButton = document.createElement("button")
    deleteButton.className = 'button';
    
    if (!isInWatchlist) {
      plusButton.className = 'button'; 
      plusButton.innerHTML = '<i class="fas fa-plus"></i> Add to Watchlist';
      plusButton.addEventListener("click", () => {
        if (!watchList.some(item => item.Title === movie.Title)) {
          watchList.push(movie);
          localStorage.setItem('watchList', JSON.stringify(watchList));
          
          Toastify({
            text: `${movie.Title} added to watchlist!`,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
              background: "var(--button-bg)",
              color: "var(--button-text)"
            },
            avatar: "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/assets/checkmark.png"
          }).showToast();
          
          renderWatchlist();
          renderMovies(movies, container, isWatchList, isFavourites); // Re-render to update buttons
        }
      });
    } else {
      plusButton = document.createElement("span");
      plusButton.className = 'added-tag';
      plusButton.innerHTML = '<i class="fas fa-check"></i> Added to Watchlist';
    }

    likeButton.className = 'button';
    likeButton.innerHTML = '<i class="fas fa-heart"></i> Add to Favourites';
    likeButton.addEventListener("click", () => {
      if (!isInFavorites) {
        favourites.push(movie);
        localStorage.setItem('favourites', JSON.stringify(favourites));

        Toastify({
          text: `${movie.Title} added to favourites!`,
          duration: 3000,
          gravity: "top",
          position: "center",
          style: {
            background: "var(--button-bg)",
            color: "var(--button-text)"
          },
          avatar: "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/assets/checkmark.png"
        }).showToast();
        
        renderFavourites();
      }
    });

    deleteButton.innerHTML = '<i class="fas fa-trash"></i> Delete';
    deleteButton.addEventListener("click", () => {
      if(isWatchList){
        watchList = watchList.filter((item) => item.Title !== movie.Title);
        localStorage.setItem('watchList', JSON.stringify(watchList));
        
        Toastify({
          text: `${movie.Title} removed!`,
          duration: 3000,
          gravity: "top",
          position: "center",
          style: {
            background: "#1e1e1e",
            color: "#ffffff"
          },
          avatar: "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/assets/bin.png"
        }).showToast();
        
        renderWatchlist();
      }
      else if (isFavourites){
        favourites = favourites.filter((item) => item.Title !== movie.Title)
        localStorage.setItem('favourites', JSON.stringify(favourites))
        renderFavourites() //re-render the watchlist
      }
    })


   
      if (!isInWatched) {
        watchedButton.className ='button'
        watchedButton.innerHTML = '<i class="fas fa-plus"></i> Add to watched'; 

        watchedButton.addEventListener("click", () => {
        if(!watched.some(item => item.Title === movie.Title)){
        watched.push(movie);
        localStorage.setItem('watched', JSON.stringify(watched));

        Toastify({
          text: `${movie.Title} added to watched movies!`,
          duration: 3000,
          gravity: "top",
          position: "center",
          style: {
            background: "var(--button-bg)",
            color: "var(--button-text)"
          },
          avatar: "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/assets/checkmark.png"
          }).showToast();
            
            renderWatchedPage();
            renderMovies(movies, container, isWatchList, isFavourites, isWatched); // Re-render to update buttons

          }
        });
      } else {
        watchedButton = document.createElement("span")
        watchedButton.className = 'added-tag'
        watchedButton.innerHTML = '<i class="fas fa-check"></i> Added to Watchlist';
      }
  

    //append data to the list
    movieCard.appendChild(poster)
    movieCard.appendChild(title)
    movieCard.appendChild(releaseYear)
     // Add year before buttons
    if(!isWatchList && !isFavourites){
      movieCard.appendChild(plusButton)
      movieCard.appendChild(watchedButton) // Append watched button before favourites
      if (!isInFavorites) {
        movieCard.appendChild(likeButton);
      }
    } else {
      movieCard.appendChild(deleteButton)
      if (!isInFavorites && !isWatched) { // Ensure favourites button shows on watched tab
        movieCard.appendChild(likeButton);
      }
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
    renderWatchedPage()
  
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




