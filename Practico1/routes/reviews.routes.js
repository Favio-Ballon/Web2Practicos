module.exports = app => {
    let router = require("express").Router();

    const controller = require("../controllers/review.controller.js");

    router.get("/", controller.listReviews);

    router.get("/create", controller.createReview);
    router.post("/create", controller.insertReview);

    router.get("/:id/edit", controller.editReview);
    router.post("/:id/edit", controller.updateReview);

    router.post("/:id/delete", controller.deleteReview);

    app.use("/reviews", router);
}