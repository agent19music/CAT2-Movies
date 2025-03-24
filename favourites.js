const renderFavouritesPage = (movies) => {
    const container = document.querySelector('.movies-list');
    const searchContainer = document.querySelector('.search-container');
    container.innerHTML = "";
    
    if (!movies.length) {
        searchContainer.style.display = 'none';
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <img src="https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/assets/empty.png" alt="Empty favourites">
            <h3>Oops! Nothing here yet</h3>
            <p>Let's add some movies to your favourites!</p>
            <a href="index.html" class="button">Browse Movies</a>
        `;
        container.appendChild(emptyState);
        return;
    }

    searchContainer.style.display = 'block';
    
    movies.forEach(movie => {
        let movieCard = document.createElement("li");
        movieCard.classList.add("movie-card");
        
        let poster = document.createElement("img");
        let title = document.createElement("h3");
        let releaseYear = document.createElement("p");
        releaseYear.classList.add("year");
        let deleteButton = document.createElement("button");
        
        poster.src = movie.Poster;
        poster.alt = movie.Title;
        title.textContent = movie.Title;
        releaseYear.textContent = movie.Year;
        
        deleteButton.className = 'button';
        deleteButton.innerHTML = '<i class="fas fa-trash"></i> Remove from Favourites';
        
        deleteButton.addEventListener("click", () => {
            let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
            favourites = favourites.filter(item => item.Title !== movie.Title);
            localStorage.setItem('favourites', JSON.stringify(favourites));
            
            Toastify({
                text: `${movie.Title} removed from favourites!`,
                duration: 3000,
                gravity: "top",
                position: "center",
                style: {
                    background: "#1e1e1e",
                    color: "#ffffff"
                },
                avatar: "/assets/bin.png"
            }).showToast();
            
            renderFavouritesPage(favourites);
        });

        movieCard.appendChild(poster);
        movieCard.appendChild(title);
        movieCard.appendChild(releaseYear);
        movieCard.appendChild(deleteButton);
        container.appendChild(movieCard);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    renderFavouritesPage(favourites);

    // Live search implementation
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", (e) => {
        const search = e.target.value.toLowerCase();
        const filteredMovies = favourites.filter(movie => 
            movie.Title.toLowerCase().includes(search)
        );
        renderFavouritesPage(filteredMovies);
    });

    // Initialize dark mode
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
    }

    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
    });
});
