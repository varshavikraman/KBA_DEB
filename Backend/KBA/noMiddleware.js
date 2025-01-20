const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
    // Set the response header
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // Send a response
    res.end('Server is running without middleware!');
});

// Start the server on port 8000
server.listen(8000, () => {
    console.log('Server is listening at port 8000');
});
