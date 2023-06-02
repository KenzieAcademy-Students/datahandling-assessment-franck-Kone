// Your Code Here!

//find movies data titles matching movieDetails data titles
const moviesTitlesMatchingDetailsTitles = movieDetails.map(detail => movies.find(movieCopy => movieCopy.title === detail.title)).filter(title => title !== undefined)

// create a deep copy of moviesTitlesMatchingDetailsTitles
let combinedData = []

const createMatchedDataCopy = function (data) {

    for (let dataElement of data) {
        let matchingDataCopy = {}
        let dataElementKeys = Object.keys(dataElement)

        for (let dataElementKey of dataElementKeys) {
            matchingDataCopy[dataElementKey] = dataElement[dataElementKey]

            if (combinedData[combinedData.length - 1] !== matchingDataCopy) {
                combinedData.push(matchingDataCopy)
            }
        }
    }
}

createMatchedDataCopy(moviesTitlesMatchingDetailsTitles)

// combine datas to get all movies informations setted in different objects
const combineDatasFunction = function () {

    for (let movie of combinedData) {
        const movieTitle = movie.title

        for (let detail of movieDetails) {

            const detailTitle = detail.title
            const matchingKeys = Object.keys(detail)

            if (movieTitle === detailTitle) {

                matchingKeys.forEach(key => {
                    movie[key] = detail[key]
                })
            }
        }
    }
}

combineDatasFunction()

// displaying searching part of the page and title
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


// display all movies by clicking the seach button
const submitButton = document.querySelector('button');

submitButton.addEventListener('click', () => {
   
    displayMovies()
})


// display movies function
function displayMovies() {

    const moviesContainer = document.createElement('div')
    moviesContainer.setAttribute('class', 'movies-container')

    for (let film of combinedData) {

        // create nodes
        let movieCard = document.createElement('div')
        movieCard.setAttribute('class', 'movie-card')

        let titleNode = document.createElement('h3')
        let castMembersNode = document.createElement('p')
        let genresNode = document.createElement('p')
        let yearNode = document.createElement('p')
        let popularityNode = document.createElement('h4')
        let imageNode = document.createElement('img')

        // add contents to nodes
        imageNode.src = film.imageUrl
        titleNode.innerText = film.title
        castMembersNode.innerText = film.cast
        genresNode.innerText = film.genres
        yearNode.innerText = film.year
        popularityNode.innerText = `Popularity: ${film.popularity}`

        // showing up on the screen
        movieCard.append(imageNode, titleNode, castMembersNode, yearNode, genresNode, popularityNode)
        moviesContainer.append(movieCard)
        document.body.append(moviesContainer)
    }
}
