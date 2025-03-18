const moviesUrl = "http://localhost:3000/movies"

fetch(moviesUrl)
.then(res =>   res.json())

  // console.log(res)
// .then(text => {
//   console.log(text)
// })

// .catch(error => {
//   console.log("sth wrong", error)
// })
 
.then(data=> {
    let  movieList = document.getElementById("list")
    movieList.innerHTML =""

    data.forEach(movie => {
      //  movie = data.poster

      let movieItem = document.createElement("li")
      let poster = document.createElement("img")

       poster.src = movie.Poster
       poster.alt = movie.Title

       movieItem.appendChild(poster)
       movieList.appendChild(movieItem)
    })
     })

