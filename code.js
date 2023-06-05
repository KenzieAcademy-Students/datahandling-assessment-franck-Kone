// Your Code Here!

// Step One - Combine the two data sets
const moviesContainer = document.createElement('div')

const combinedDatas = movieDetails.map(movieDetail => {

    const matchedMovie = movies.find(movie => movie.title === movieDetail.title)

    return { ...matchedMovie, ...movieDetail }
})


// Step Two - Render the movies

// displaying searching part of the page and title
function displaySearchContainer() {
    document.body.textContent = ''
    const searchMoviesContainer = document.createElement('div')
    searchMoviesContainer.setAttribute('class', 'searchDiv')
    const pageTitle = document.createElement('h1')
    pageTitle.innerText = "Kenzie Movie Catalog"


    const searchByMoviesTitle = `<label for="movieTitleId">Search by Movie Title: <input type = "text" id ="movieTitleId" name = "movieTitle" placeholder = "Enter a movie title" autocomplete = "off"></label>`
    const searchByActors = `<label for="actorsNameId">Search by Actor/Actress: <input type = "text" id ="actorsNameId" name = "actorsName" placeholder = "Enter an actor name" autocomplete = "off"></label>`
    const submitButton = `<button>Search</button>`

    searchMoviesContainer.innerHTML = searchByMoviesTitle
    searchMoviesContainer.innerHTML += searchByActors
    searchMoviesContainer.innerHTML += submitButton

    document.body.append(pageTitle, searchMoviesContainer)

}

displaySearchContainer()

const submitButton = document.querySelector('button');

// display all movies by clicking the search button
submitButton.addEventListener('click', () => {

    moviesContainer.textContent = ''
    document.getElementById('actorsNameId').value = ''
    document.getElementById('movieTitleId').value = ''

    displayMovies()
})

// display movies function
function displayMovies() {

    for (let film of combinedDatas) {

        createMoviesNodes(film)
    }
}

// i particulary created this function cause codes inside of it was repeated more than once in functions, so creating it was necessary to prevent repetition
function createMoviesNodes(aMovie) {

    moviesContainer.setAttribute('class', 'movies-container')

    // create nodes
    let movieCard = document.createElement('div')
    movieCard.setAttribute('class', 'movie-card')

    let titleNode = document.createElement('h3')
    let castMembersNode = document.createElement('p')
    let genresNode = document.createElement('p')
    let yearNode = document.createElement('p')
    let popularityNode = document.createElement('p')
    let imageNode = document.createElement('img')

    // add contents to nodes
    imageNode.src = aMovie.imageUrl
    titleNode.innerText = `Title: ${aMovie.title}`
    castMembersNode.innerText = aMovie.cast
    genresNode.innerHTML = `<strong>genres:</strong> ${aMovie.genres}`
    yearNode.innerHTML = `<strong>Year:</strong> ${aMovie.year}`
    popularityNode.innerHTML = `<strong>Popularity:</strong> ${aMovie.popularity}`

    // showing up on the screen
    movieCard.append(imageNode, titleNode, castMembersNode, yearNode, genresNode, popularityNode)
    moviesContainer.append(movieCard)
    document.body.append(moviesContainer)
}


// Step Three - Searching through movies

document.body.addEventListener('input', () => {

    const actorsInput = document.getElementById('actorsNameId')
    const titleInput = document.getElementById('movieTitleId')
    const moviesContainer = document.querySelector('.movies-container')
    let moviesByInputResult = []

    combinedDatas.forEach(movie => {

        let actorsOfMovie = movie.cast.join('')
        let titleOfMovie = movie.title

        if (actorsInput.value && !titleInput.value) {

            if (actorsOfMovie.toLowerCase().indexOf(actorsInput.value.toLowerCase()) > -1) {
                moviesByInputResult.push(movie)
            }
        } else if (!actorsInput.value && titleInput.value) {

            if (titleOfMovie.toLowerCase().indexOf(titleInput.value.toLowerCase()) > -1) {
                moviesByInputResult.push(movie)

            }
        } else if (actorsInput.value && titleInput.value) {

            if (actorsOfMovie.toLowerCase().indexOf(actorsInput.value.toLowerCase()) > -1 && titleOfMovie.toLowerCase().indexOf(titleInput.value.toLowerCase()) > -1) {
                moviesByInputResult.push(movie)

            }
        }

        // to clean up the screen when using backspace to make actors and title inputs be empty
        if (actorsInput.value === '' && titleInput.value === '') {

            moviesContainer.textContent = ''
            moviesByInputResult = []
        }
    })

    // to only show up the single movie matching the title and actors input 
    if (moviesByInputResult.length === 1) {

        moviesContainer.textContent = ''
        createMoviesNodes(moviesByInputResult[0])
    } else {

        // to show up all movies when matching more than a movie
        moviesByInputResult.forEach(movieFound => {

            // this if statement is set to 
            if (moviesContainer.childElementCount > moviesByInputResult.length) {
                moviesContainer.textContent = ''
            }

            createMoviesNodes(movieFound)
        })
    }
})
