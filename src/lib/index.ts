// place files you want to import through the `$lib` alias in this fold
const Index = () => {
    let name = $state("");
    let searchResults = [];
    
    let calling = false;
    const controller = new AbortController();
    const onSearch = () => {
        if (!name || name.length < 2) {
            return;
        }

        if (calling) {
            controller.abort(); // Abort the previous request if it's still ongoing
        }
        calling = true;
        
        fetch(`https://localhost:7013/search?query=${name}`, {method: 'GET', signal: controller.signal})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the search results
                calling = false;
                // You can navigate to a results page or display results here
            })
            .catch(error => {
                calling = false;
                console.error('There was a problem with the fetch operation:', error);
            });

        // This function can be used to handle search logic
        // For example, you could navigate to a search results page
        // or filter a list of players based on the input name.
    }
}
export { Index as default };