
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

// Function to display the watchlist
function displayWatchlist() {
    const container = document.getElementById('watchlistContainer');
    container.innerHTML = ''; // Clear previous content

    // Check if the watchlist is empty
    if (watchlist.length === 0) {
        container.innerHTML = '<p>Your watchlist is empty.</p>';
    } else {
        watchlist.forEach((item, index) => {
            container.innerHTML += `
                <div class="watchlist-item">
                    <img src="${item.imageUrl}" alt="${item.title}" />
                    <h3>${item.title} (${item.year})</h3>
                    <button onclick="deleteItem(${index})">Delete</button>
                </div>
            `;
        });
    }
}

// Function to delete an item from the watchlist
function deleteItem(index) {
    watchlist.splice(index, 1);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    displayWatchlist(); // Refresh the displayed list
}

// Display the watchlist when the page loads
displayWatchlist();
