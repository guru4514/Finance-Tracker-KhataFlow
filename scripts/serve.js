const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || process.argv[2] || 8080);

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webmanifest': 'application/manifest+json; charset=utf-8'
};

function send(res, status, body, contentType = 'text/plain; charset=utf-8') {
    res.writeHead(status, {
        'Content-Type': contentType,
        'Cache-Control': 'no-store'
    });
    res.end(body);
}

function resolveRequestPath(url) {
    const pathname = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
    const requestedPath = pathname === '/' ? '/index.html' : pathname;
    const filePath = path.normalize(path.join(root, requestedPath));

    if (!filePath.startsWith(root)) {
        return null;
    }

    return filePath;
}

const server = http.createServer((req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        send(res, 405, 'Method Not Allowed');
        return;
    }

    const filePath = resolveRequestPath(req.url);
    if (!filePath) {
        send(res, 403, 'Forbidden');
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            send(res, err.code === 'ENOENT' ? 404 : 500, err.code === 'ENOENT' ? 'Not Found' : 'Server Error');
            return;
        }

        const contentType = mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'no-store'
        });
        if (req.method === 'HEAD') {
            res.end();
            return;
        }
        res.end(data);
    });
});

server.listen(port, () => {
    console.log(`Pigmie app running at http://localhost:${port}`);
});
