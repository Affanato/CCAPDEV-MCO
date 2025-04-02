document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('header input[type="text"]');
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchResults.style.display = 'none';
    document.body.appendChild(searchResults);

    let searchTimeout;

    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();

        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        searchTimeout = setTimeout(async () => {
            try {
                const response = await fetch(`/search?query=${encodeURIComponent(query)}`);
                const users = await response.json();

                if (users.length === 0) {
                    searchResults.innerHTML = '<div class="no-results">No users found</div>';
                } else {
                    searchResults.innerHTML = users.map(user => `
                        <div class="search-result-item">
                            <div class="user-info">
                                <h3>${user.firstname} ${user.lastname}</h3>
                                <p>${user.email}</p>
                                <p class="classification">${user.classification}</p>
                                ${user.bio ? `<p class="bio">${user.bio}</p>` : ''}
                            </div>
                        </div>
                    `).join('');
                }
                searchResults.style.display = 'block';
            } catch (error) {
                console.error('Search error:', error);
                searchResults.innerHTML = '<div class="error">Error performing search</div>';
                searchResults.style.display = 'block';
            }
        }, 300);
    });

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}); 