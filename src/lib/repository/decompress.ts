const Decompress = (response: Response) => {
    const decompressionStream = new DecompressionStream("gzip");
    // Pipe the response body through the decompression stream
    const decompressedStream = response.body!.pipeThrough(decompressionStream);
    const reader = decompressedStream.getReader();
    let result = '';
    return new Promise((resolve, reject) => {
            // Read the stream until done
            function read() {
                reader.read().then(({ done, value }) => {
                    if (done) {
                        resolve(result); // Resolve the promise with the result
                        return;
                    }
                    // Convert Uint8Array to string and append to result
                    result += new TextDecoder().decode(value);
                    read(); // Continue reading
                }).catch(reject); // Handle errors
            }
            read(); // Start reading
        });
}
export default Decompress