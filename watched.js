const renderWatchedPage = (movies) => {
    const container = document.querySelector(".movies-list");
    const searchContainer = document.querySelector(".search-container")
    container.innerHTML = ""

    if(!movies.length) {
        searchContainer.style.display = "none"
        const emptyState = document.createElement('div')
        emptyState.className = 'empty-state'
        emptyState.innerHTML = `
         <img src="https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/assets/empty.png" alt="Empty favourites">
            <h3>Oops! Nothing here yet</h3>
            <p>Let's add some movies to your favourites!</p>
            <a href="index.html" class="button">Browse Movies</a> 
            `;
            container.appendChild(emptyState)
            return; 
    }
    searchContainer.style.display = 'block'

    movies.forEach(movie => {
        let movieCard = document.createElement("li")
        movieCard.classList.add("movie-card")

        let poster = document.createElement("img");
        let title = document.createElement("h3");
        let releaseYear = document.createElement("p");
        releaseYear.classList.add("year");

        // const favourites = JSON.parse(localStorage.getItem('favourites'))|| []
        // const isInFavourites = favourites.some(item => item.Title === movie.Title)

        let likeButton = document.createElement("button")
        likeButton.className = "button"
        likeButton.innerHTML = '<i class="fas fa-heart"></i> Add to Favourites'
        likeButton.addEventListener("click", () => {

         let favourites = JSON.parse(localStorage.getItem('favourites')) || []

              favourites.push(movie);
              localStorage.setItem('favourites', JSON.stringify(favourites));
      
              Toastify({
                text: `${movie.Title} added to favorites!`,
                duration: 3000,
                gravity: "top",
                position: "center",
                style: {
                  background: "var(--button-bg)",
                  color: "var(--button-text)"
                },
                avatar: "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/assets/checkmark.png"
              }).showToast();
              
              renderWatchedPage(movies);
            }
         
      );

        poster.src = movie.Poster;
        poster.alt = movie.Title;
        title.textContent = movie.Title;
        releaseYear.textContent = movie.Year;

        movieCard.appendChild(poster);
        movieCard.appendChild(title);
        movieCard.appendChild(releaseYear);
        movieCard.appendChild(likeButton)
        container.appendChild(movieCard);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const watched = JSON.parse(localStorage.getItem("watched"))|| [];
    renderWatchedPage(watched);

      // Live search implementation
      const searchInput = document.getElementById("search");
      searchInput.addEventListener("input", (e) => {
          const search = e.target.value.toLowerCase();
          const watched = JSON.parse(localStorage.getItem("watched")) || [];
          const filteredMovies = watched.filter(movie => 
              movie.Title.toLowerCase().includes(search)
          );
          renderWatchedPage(filteredMovies);
      });
    

      //initialize dark mode

      const isDarkMode = localStorage.getItem('darkMode') === 'true';
      if (isDarkMode) {
          document.body.classList.add("dark-mode");
      }
  
      const darkModeToggle = document.getElementById("dark-mode-toggle");
      darkModeToggle.addEventListener("click", () => {
          document.body.classList.toggle("dark-mode");
          localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
      });



})
