const router = require("express").Router();
const fs = require("fs");
const path = require("path");

router.get("/countries", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filePath = path.join(__dirname, "../common/data/countries.json");

  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      console.log("error ", error);
      return res.status(500).json({ message: "Error reading countries data" });
    }

    try {
      const countries = JSON.parse(data);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedCountries = countries.slice(startIndex, endIndex);

      return res.status(200).json({
        page,
        limit,
        total: countries.length,
        data: paginatedCountries,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error parsing countries data" });
    }
  });
});

router.get("/country", (req, res) => {
  const countryName = req.query.name;
  if (!countryName) {
    return res.status(400).json({ message: "Country Name is required" });
  }
  const filePath = path.join(__dirname, "../common/data/countries.json");

  fs.readFile(filePath, "utf-8", (error, data) => {
    if (error) {
      console.log("error ", error);
      return res.status(500).json({ message: "Error reading countries data" });
    }
    try {
      const countries = JSON.parse(data);
      const country = countries.find(
        (c) => c.name.toLowerCase() === countryName.toLocaleLowerCase()
      );
      if (!country) {
        return res.status(404).json({ message: "Country not found" });
      }
      return res.status(200).json(country);
    } catch (error) {
      console.log("error ", error);
      return res.status(500).json({ message: "Error parsing countries data" });
    }
  });
});

module.exports = router;
