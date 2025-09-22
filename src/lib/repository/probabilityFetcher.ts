import Decompress from "./decompress";

class BunnyCdnClientFetcher { 
    private static SavedValues: Map<string, any> = new Map<string, any>;
    
    public static GetProbabilityData<T>(query: string): Promise<T | undefined> {
        const saved = BunnyCdnClientFetcher.SavedValues.get(query);
        if (saved) {
            return Promise.resolve(saved);
        }
        return fetch(`https://misguidedlogs.com/${query}`)
            .then( response => {
                if (!response.ok || !response.body) {
                    throw new Error('Network response was not ok');
                } // Create a DecompressionStream for gzip
                return Decompress(response);
            })
            .then((data: any) => {
                // Parse the JSON data
                const parsedData = JSON.parse(data);
                // Assuming parsedData is an array of ProbabilityValues
                BunnyCdnClientFetcher.SavedValues.set(query, parsedData as T);
                return parsedData as T;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                return undefined; // Return undefined if there's an error
            });
    }
}

export { BunnyCdnClientFetcher as default };