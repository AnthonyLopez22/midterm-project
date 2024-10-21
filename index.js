const apiKey = '033967fa45402a087f3ac5d0218d1e9d'; //my api key

// Function to search for a movie by title
async function searchMovie(movieTitle) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}`);
    const data = await response.json();
    return data.results; 
}

// Function to display search results
function displayMovies(movies) {
    const container = document.getElementById('watchlistContainer');
    container.innerHTML = ''; // Clear previous results

    if (movies.length === 0) {
        container.innerHTML = '<p>No results found.</p>';
    } else {
        movies.forEach(movie => {
            container.innerHTML += `
                <div class="movie-item">
                    <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" />
                    <h3>${movie.title} (${movie.release_date.split('-')[0]})</h3>
                    <p>${movie.overview}</p>
                    <button onclick="addToWatchlist('${movie.title}', '${movie.release_date.split('-')[0]}', 'https://image.tmdb.org/t/p/w200${movie.poster_path}')">Add to Watchlist</button>
                </div>
            `;
        });
    }
}

// Function to handle search from user
document.getElementById('searchForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const movieTitle = document.getElementById('movieTitle').value;
    const movies = await searchMovie(movieTitle);
    displayMovies(movies);
});

// Add to watchlist
function addToWatchlist(title, year, imageUrl) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const newItem = { title, year, imageUrl };
    watchlist.push(newItem);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    alert(`${title} has been added to your watchlist!`);
}
// Fetch data from data.json and display movies on load
async function loadMoviesFromJSON() {
    const response = await fetch('data.json');
    const data = await response.json();
    displayMoviesFromJSON(data.movies);
}

// Function to display movies from JSON
function displayMoviesFromJSON(movies) {
    const container = document.getElementById('jsonMoviesContainer');
    container.innerHTML = ''; // Clear previous content

    movies.forEach(movie => {
        container.innerHTML += `
            <div class="movie-item">
                <img src="${movie.poster}" alt="${movie.title}" />
                <h3>${movie.title} (${movie.year})</h3>
                <p><strong>Genre:</strong> ${movie.genre}</p>
                <p><strong>Director:</strong> ${movie.director}</p>
            </div>
        `;
    });
}

// Call the function to load movies on page load
loadMoviesFromJSON();
