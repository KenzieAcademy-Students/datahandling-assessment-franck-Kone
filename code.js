// Your Code Here!

// Step One - Combine the two data sets

//find movies data titles matching movieDetails data titles
const moviesTitlesMatchingDetailsTitles = movieDetails.map(detail => movies.find(movieCopy => movieCopy.title === detail.title)).filter(title => title !== undefined)

// create a deep copy of moviesTitlesMatchingDetailsTitles
let combinedData = []
const moviesContainer = document.createElement('div')
let moviesByInputResult = []



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

    searchMoviesContainer.innerHTML += searchByMoviesTitle
    searchMoviesContainer.innerHTML += searchByActors
    searchMoviesContainer.innerHTML += submitButton

    document.body.append(pageTitle, searchMoviesContainer)

}

displaySearchContainer()

const submitButton = document.querySelector('button');

// display all movies by clicking the seach button

submitButton.addEventListener('click', () => {

    moviesContainer.textContent = ''
    document.getElementById('actorsNameId').value = ''
    document.getElementById('movieTitleId').value = ''
    moviesByInputResult = []
    displayMovies()
})


// display movies function
function displayMovies() {

    moviesContainer.setAttribute('class', 'movies-container')

    for (let film of combinedData) {

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
        imageNode.src = film.imageUrl
        titleNode.innerText = `Title: ${film.title}`
        castMembersNode.innerText = film.cast
        genresNode.innerHTML = `<strong>genres:</strong> ${film.genres}`
        yearNode.innerHTML = `<strong>Year:</strong> ${film.year}`
        popularityNode.innerHTML = `<strong>Popularity:</strong> ${film.popularity}`

        // showing up on the screen
        movieCard.append(imageNode, titleNode, castMembersNode, yearNode, genresNode, popularityNode)
        moviesContainer.append(movieCard)
        document.body.append(moviesContainer)
    }
}



// Step Three - Searching through movies

document.body.addEventListener('input', (event) => {

    const actorsInput = document.getElementById('actorsNameId')
    const titleInput = document.getElementById('movieTitleId')
    const moviesContainer = document.querySelector('.movies-container')


    // setTimeout(() => {
        if (event){
            combinedData.forEach(movie => {

                let actorsOfMovie = movie.cast.join('')
                let titleOfMovie = movie.title

                if ((actorsOfMovie.toLowerCase().indexOf(actorsInput.value.toLowerCase()) > -1) && !titleInput.value) {

                    moviesByInputResult.push(movie)
                    console.log('le')
                } else if (titleOfMovie.toLowerCase().indexOf(titleInput.value.toLowerCase() > -1) && !actorsInput.value) {

                    moviesByInputResult.push(movie)
                    console.log('la')

                } else if ((actorsOfMovie.toLowerCase().indexOf(actorsInput.value.toLowerCase()) > -1) && titleOfMovie.toLowerCase().indexOf(titleInput.value.toLowerCase() > -1) && actorsInput.value && titleInput.value) {
                    moviesByInputResult.push(movie)
                    console.log('il')

                }

                if (actorsInput.value === '' && titleInput.value === '') {
                    moviesContainer.textContent = ''
                    moviesByInputResult = []
                }
            })


            moviesByInputResult.forEach(movieFound => {

                if (moviesContainer.childElementCount > moviesByInputResult.length) {
                    moviesContainer.textContent = ''
                }

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
                imageNode.src = movieFound.imageUrl
                titleNode.innerText = `Title: ${movieFound.title}`
                castMembersNode.innerText = movieFound.cast
                genresNode.innerText = `genres: ${movieFound.genres}`
                yearNode.innerText = `Year: ${movieFound.year}`
                popularityNode.innerText = `Popularity: ${movieFound.popularity}`

                // showing up on the screen
                movieCard.append(imageNode, titleNode, castMembersNode, yearNode, genresNode, popularityNode)
                moviesContainer.append(movieCard)
            })
        }
        
    // }, 1000)


    // combinedData.forEach(movie => {

    //     let actorsOfMovie = movie.cast.join('')
    //     let titleOfMovie = movie.title

    //     if ((actorsOfMovie.toLowerCase().indexOf(actorsInput.value.toLowerCase()) > -1) && !titleInput.value){



    //         moviesByInputResult.push(movie)
    //         console.log('le')

    //     } else if (titleOfMovie.toLowerCase().indexOf(titleInput.value.toLowerCase() > -1) && !actorsInput.value){


    //         moviesByInputResult.push(movie)
    //         console.log('la')


    //     } else if ((actorsOfMovie.toLowerCase().indexOf(actorsInput.value.toLowerCase()) > -1) && titleOfMovie.toLowerCase().indexOf(titleInput.value.toLowerCase() > -1) && actorsInput.value && titleInput.value){



    //         moviesByInputResult.push(movie)
    //         console.log('il')

    //     }

    //     if (actorsInput.value === '' && titleInput.value === '') {
    //         moviesContainer.textContent = ''
    //         moviesByInputResult = []
    //     }
    // })

    // moviesByInputResult.forEach(movieFound => {

    //     if (moviesContainer.childElementCount > moviesByInputResult.length) {
    //         moviesContainer.textContent = ''
    //     }

    //     // create nodes
    //     let movieCard = document.createElement('div')
    //     movieCard.setAttribute('class', 'movie-card')

    //     let titleNode = document.createElement('h3')
    //     let castMembersNode = document.createElement('p')
    //     let genresNode = document.createElement('p')
    //     let yearNode = document.createElement('p')
    //     let popularityNode = document.createElement('h4')
    //     let imageNode = document.createElement('img')

    //     // add contents to nodes
    //     imageNode.src = movieFound.imageUrl
    //     titleNode.innerText = `Title: ${movieFound.title}`
    //     castMembersNode.innerText = movieFound.cast
    //     genresNode.innerText = `genres: ${movieFound.genres}`
    //     yearNode.innerText = `Year: ${movieFound.year}`
    //     popularityNode.innerText = `Popularity: ${movieFound.popularity}`

    //     // showing up on the screen
    //     movieCard.append(imageNode, titleNode, castMembersNode, yearNode, genresNode, popularityNode)
    //     moviesContainer.append(movieCard)
    // })

})

console.log(combinedData)