var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  const users = [
    { id: 1, firstName: "John", lastName: "Smith" },
    { id: 2, firstName: "Joe", lastName: "Schmoe" },
  ];
  res.json(users);
});

module.exports = router;
