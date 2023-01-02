const http = require("http");
const fs = require("fs");
const url = require("url");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

//initialize the replaceTemplate method
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%ORGANIC%}/g, "not-organic");
  }
  return output;
};

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  switch (pathname) {
    case "/":
    case "/overview":
      res.writeHead(200, { "Content-Type": "text/html" });
      const cardsHtml = dataObj
        .map((el) => replaceTemplate(tempCard, el))
        .join("");
      const overviewOutput = tempOverview.replace(
        /{%PRODUCT_CARDS%}/g,
        cardsHtml
      );
      res.end(overviewOutput);
      break;
    case "/product":
      res.writeHead(200, { "Content-Type": "text/html" });
      const product = dataObj[query.id];
      const productOutput = replaceTemplate(tempProduct, product);
      res.end(productOutput);
      break;
    case "/api":
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
