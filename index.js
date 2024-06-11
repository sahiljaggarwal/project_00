const express = require("express");
const app = express();
const morgan = require("morgan");
const http = require("http");
const { cacheMiddleware } = require("./common/middlewares/cache");
const server = http.createServer(app);
const router = require("./routes/country.routes");
const PORT = 3001;

// middlewares
app.use(morgan("combined"));
app.use(express.json());
app.use(cacheMiddleware);

// routes
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
app.use("/api/v1", router);

// server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
