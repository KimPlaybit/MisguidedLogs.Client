import type { searchresult } from "$lib/searchresult";

class Search {
    private static calling = false;
    private static controller = new AbortController();

    public static GetSearchResult = (query: string) => { 
        if (!query || query.length < 2) {
            return Promise.resolve([]);
        }

        if (Search.calling) {
            Search.controller.abort(); // Abort the previous request if it's still ongoing
            Search.controller = new AbortController(); // Create a new controller for the next request
        }

        return fetch(`https://api.misguidedlogs.com/search?query=${query}`, {method: 'GET', signal: Search.controller.signal})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const searchResults: searchresult[] = data; 
                Search.calling = false;
                return searchResults;
                // You can navigate to a results page or display results here
            })
            .catch(error => {
                Search.calling = false;
                console.error('There was a problem with the fetch operation:', error);
                return [];
            });
    }   
}
export { Search as default };