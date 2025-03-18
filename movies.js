const moviesUrl = "http://localhost:3000/movies"

fetch(moviesUrl)
.then(res => {
  console.log(res)
  return res.text()

}) 
.then(text => {
  console.log(text)
})

.catch(error => {
  console.log("sth wrong", error)
})
 
// .then(data=> {
//     let  movieList = document.getElementById("list")
//     movieList.innerHTML =""
  
   

//        let  moviePoster = data.poster
//         let movieItem = document.createElement("li")
//         let poster = document.createElement("img")

//         poster.src = moviePoster
//         poster.alt ="movie"

//         movieItem.appendChild(poster)
//         movieList.appendChild(movieItem)


//       })

