const http = require("http");
const fs = require("fs");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  switch (pathName) {
    case "/":
    case "/overview":
      res.end("This is overview");
      break;
    case "/product":
      res.end("This is product");
      break;
    case "/api":
      //fs.readFile('./dev-data/data.json' , (err, data) => {
      //fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const productData = JSON.parse(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
      break;
    default:
      res.writeHead(404, {
        "Content-Type": "text/html",
        "my-own-header": "myOwnHeader",
      });
      res.end("<h1>Page not found</h1>");
      break;
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000");
});
