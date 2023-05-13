const { Router } = require("express");
const router = Router();
const { Show } = require("../models/index");

// TODO: More effective error handeling

// GET all shows
router.get("/", async (req, res, next) => {
  try {
    const show = await Show.findAll();
    res.json(show);
  } catch (err) {
    next(err);
  }
});

// GET show at ID
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const showAtId = await Show.findByPk(id);
    res.json(showAtId);
  } catch (err) {
    next(err);
  }
});

// GET shows of a particular genre
router.get("/genres/:genre", async (req, res, next) => {
  try {
    const genre = req.params.genre;
    const showAtGenre = await Show.findAll({ where: { genre: genre } });
    res.json(showAtGenre);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
