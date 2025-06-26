const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const users = {
  "is-34fiot-23-164": {
    lastname: "Корнєєв",
    firstname: "Михайло",
    course: "2",
    group: "ІС-34"
  }
};

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript'
};

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  if (pathname === '/') {
    fs.readFile('index.html', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  } else if (pathname === '/check') {
    const login = parsed.query.login;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    if (login && users[login]) {
      const u = users[login];
      res.end(`
        <p><strong>Логін Moodle:</strong> ${login}</p>
        <p>Прізвище: ${u.lastname}</p>
        <p>Ім’я: ${u.firstname}</p>
        <p>Курс: ${u.course}</p>
        <p>Група: ${u.group}</p>
      `);
    } else {
      res.end(`<p>Користувача <strong>${login}</strong> не знайдено.</p>`);
    }
  } else if (pathname === '/style.css' || pathname === '/script.js') {
    fs.readFile('.' + pathname, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
      } else {
        const ext = path.extname(pathname);
        const type = mimeTypes[ext] || 'text/plain';
        res.writeHead(200, { 'Content-Type': type });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Сервер запущено: http://localhost:3000');
});