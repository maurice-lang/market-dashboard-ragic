const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 5174);
const host = "127.0.0.1";
const ragicUrl = "https://ap9.ragic.com/mauricetest2023/test4/11?api&listing";
const ragicRequestOptions = new URL(ragicUrl);
ragicRequestOptions.rejectUnauthorized = false;

const types = {
  ".html": "text/html;charset=utf-8",
  ".css": "text/css;charset=utf-8",
  ".js": "text/javascript;charset=utf-8"
};

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);

  if (url === "/ragic-json" || url === "/api/ragic-json") {
    https
      .get(ragicRequestOptions, (ragicRes) => {
        let body = "";
        ragicRes.setEncoding("utf8");
        ragicRes.on("data", (chunk) => {
          body += chunk;
        });
        ragicRes.on("end", () => {
          res.writeHead(ragicRes.statusCode || 200, {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "*"
          });
          res.end(body);
        });
      })
      .on("error", (err) => {
        res.writeHead(502, { "Content-Type": "application/json;charset=utf-8" });
        res.end(JSON.stringify({ error: err.message }));
      });
    return;
  }

  const file = path.join(root, url === "/" ? "index.html" : url);

  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream"
    });
    res.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`Dashboard preview: http://${host}:${port}`);
});
