// Your Code Here!



const detailsTitlesMatchingMovies = movies.map(movie => movieDetails.find(detail => detail.title === movie.title))
const moviesTitlesMatchingDetailsTitles = movieDetails.map(detail => movies.find(movie => movie.title === detail.title))

const matchingWithoutUndefined = [...moviesTitlesMatchingDetailsTitles, ...detailsTitlesMatchingMovies].filter(title => title !== undefined)



// for (let movie of movies){
//     for (let matchingMovie of detailsTitlesMatchingMovies){

//         if(movie.title === matchingMovie){
//             console.log(movie)
//         }
//     }
// }


// for(let item of detailsTitlesMatchingMovies){
//     console.log(item.title)
// }

function displaySearchContainer() {
    document.body.textContent = ''
    const searchMoviesContainer = document.createElement('div')
    searchMoviesContainer.setAttribute('class', 'searchDiv')
    const pageTitle = document.createElement('h1')
    pageTitle.innerText = "Kenzie Movie Catalog"


    const searchByMoviesTitle = `<label for="moviesTitleId">Search by Movie Title: <input type = "text" id ="moviesTitleId" name = "moviesTitle" placeholder = "Enter a movie title" autocomplete = "off"></label>`
    const searchByActors = `<label for="actorsNameId">Search by Actor/Actress: <input type = "text" id ="actorsNameId" name = "actorsName" placeholder = "Enter an actor name" autocomplete = "off"></label>`
    const submitButton = `<button>Search</button>`

    searchMoviesContainer.innerHTML += searchByMoviesTitle
    searchMoviesContainer.innerHTML += searchByActors
    searchMoviesContainer.innerHTML += submitButton


    document.body.append(pageTitle, searchMoviesContainer)

}

displaySearchContainer()

const submitButton = document.querySelector('button');

submitButton.addEventListener('click', () => {
    const moviesTitleValue = document.getElementById("moviesTitleId").value
    const actorOrActressName = document.getElementById('actorsNameId').value

    console.log(moviesTitleValue, actorOrActressName)

})


function displayMovies() {

    const moviesContainer = document.createElement('div')
    moviesContainer.setAttribute('class', 'movies-container')

    let resultCastMembers
    let resultYear
    let imageSource
    let resultTitle
    let resultGenres

    for (let film of matchingWithoutUndefined) {

        resultTitle = film.title
        

        if (resultTitle === film.title) {

            if (resultTitle === film.title && film.cast && film.year && film.genres) {
                resultCastMembers = film.cast
                resultYear = film.year
                resultGenres = film.genres

            } else if (film.imageUrl) {
                imageSource = film.imageUrl

            } 



        }




        // if (resultTitle === film.title && film.imageUrl) {

        //     imageSource = film.imageUrl

        // }

        // if (resultTitle === film.title && film.cast && film.year && film.genres) {

        //     resultCastMembers = film.cast
        //     resultYear = film.year
        //     resultGenres = film.genres
        // }

        if (resultTitle && resultCastMembers && resultGenres && imageSource && resultYear) {

            let movieCard = document.createElement('div')
            movieCard.setAttribute('class', 'movie-card')

            let titleNode = document.createElement('h4')
            let castMembersNode = document.createElement('p')
            let genresNode = document.createElement('p')
            let yearNode = document.createElement('p')
            let imageNode = document.createElement('img')

            // add contents to nodes
            imageNode.src = imageSource
            titleNode.innerText = resultTitle
            castMembersNode.innerText = resultCastMembers
            genresNode.innerText = resultGenres
            yearNode.innerText = resultYear


            // showing up on the screen
            movieCard.append(imageNode, titleNode, castMembersNode, yearNode, genresNode)
            moviesContainer.append(movieCard)
            document.body.append(moviesContainer)
        }

    }
}
displayMovies()
// console.log(detailsTitlesMatchingMovies)

console.log(matchingWithoutUndefined[matchingWithoutUndefined.length -1])