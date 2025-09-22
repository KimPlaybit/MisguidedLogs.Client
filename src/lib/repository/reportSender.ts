import type { searchresult } from "$lib/searchresult";

class ReportSender {
    private static calling = false;
    private static controller = new AbortController();

    public static PutReport = (query: string) => { 
        if (!query || query.length < 2) {
            return Promise.resolve(false);
        }

        if (ReportSender.calling) {
            ReportSender.controller.abort(); // Abort the previous request if it's still ongoing
            ReportSender.controller = new AbortController(); // Create a new controller for the next request
        }

        return fetch(`https://api.misguidedlogs.com/report/code/${query}`, {method: 'PUT', signal: ReportSender.controller.signal})
            .then(response => {
                if (response.status === 404) {
                    return false;
                }
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return true;
            })
            .catch(error => {
                ReportSender.calling = false;
                console.error('There was a problem with the fetch operation:', error);
                return false;
            });
    }   
}
export { ReportSender as default };