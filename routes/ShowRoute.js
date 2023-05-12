const { Router } = require("express");
const router = Router();
const Show = require("../models/index");

router.get("/", async (req, res, next) => {
  try {
    const show = await Show.findAll();
    res.json(show);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const showAtId = await Show.findByPk(id);
    res.json(showAtId);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
