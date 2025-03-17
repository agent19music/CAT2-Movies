const moviesUrl = "https://moviesminidatabase.p.rapidapi.com/movie/order/byRating/"

fetch(moviesUrl)
.then(res => res.json())
.then(data=> {
    let  movieList = document.getElementById("list")
    movieList.innerHTML =""
  
   

       let  moviePoster = data.poster
        let movieItem = document.createElement("li")
        let poster = document.createElement("img")

        poster.src = moviePoster
        poster.alt ="movie"

        movieItem.appendChild(poster)
        movieList.appendChild(movieItem)


      })

