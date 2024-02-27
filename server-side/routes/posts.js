const express = require("express");

// importing router
const router = express.Router();

router.get("/", () => {
  console.log("POST's GET ROUTE");
});

module.exports = router;
