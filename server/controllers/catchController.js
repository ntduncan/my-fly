const Catch = require("../models/catch");

const getCatches = (req, res, next) => {
  Catch.find()
    .then((catches) => {
      console.log(catches);
      res.json(catches);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

const getCatch = (req, res, next) => {
  const catchId = req.params.id;
  Catch.findById(catchId)
    .then((catchData) => {
      res.json(catchData);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

const createCatch = (req, res, next) => {
  const id = req.body.id;
  const bait = req.body.bait;
  const location = req.body.location;
  const img = req.body.img;
  const date = req.body.date;
  const fish = req.body.fish;

  console.log(req.body);

  const catchObj = new Catch({
    id: id,
    location: location,
    img: img,
    date: date,
    bait: bait,
    fish: fish,
  });

  catchObj
    .save()
    .then((result) => {
      console.log(result);
      res.json({ message: "Catch was saved", id: result.id });
    })
    .catch((err) => {
      console.log(err); //may want to update this later
    });
};

const updateCatch = (req, res, next) => {
  Catch.findOne({ id: req.params.id })
    .then((catchObj) => {
      catchObj.id = req.body.id;
      catchObj.location = req.body.location;
      catchObj.img = req.body.img;
      catchObj.date = req.body.date;
      catchObj.fish = req.body.fish;

      Catch.updateOne({ id: req.params.id }, catchObj)
        .then((result) => {
          res.status(204).json({
            message: "Catch updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Catch not found.",
        error: { message: "Catch not found" },
      });
    });
};

const deleteCatch = (req, res, next) => {
  Catch.findOne({ id: req.params.id })
    .then((catchObj) => {
      Catch.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Catch deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Catch not found.",
        error: { document: "Catch not found" },
      });
    });
};

module.exports = {
  getCatch,
  getCatches,
  createCatch,
  updateCatch,
  deleteCatch,
};
