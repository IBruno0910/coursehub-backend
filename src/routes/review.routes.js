const express = require("express");
const {
  createReview,
  getReviewsByCourse,
  getCourseRating,
} = require("../controllers/review.controller");
const validate = require("../middlewares/validate.middleware");
const {
  createReviewSchema,
  courseIdParamSchema,
} = require("../schemas/review.schema");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, validate(createReviewSchema), createReview);

router.get(
  "/course/:courseId",
  validate(courseIdParamSchema),
  getReviewsByCourse
);

router.get(
  "/course/:courseId/rating",
  validate(courseIdParamSchema),
  getCourseRating
);

module.exports = router;