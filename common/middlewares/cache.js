exports.cacheMiddleware = (req, res, next) => {
  if (req.method === "GET") {
    res.set("Cache-Control", "public,max-age=300");
  } else {
    res.set("Cache-Control", "no-store");
  }
  next();
};
