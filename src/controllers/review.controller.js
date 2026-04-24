const reviewService = require("../services/review.service");

async function createReview(req, res, next) {
  try {
    const userId = req.user.id;
    const { rating, comment, courseId } = req.body;

    const review = await reviewService.createReview({
      rating,
      comment,
      userId,
      courseId,
    });

    return res.status(201).json(review);
  } catch (error) {
    next(error);
  }
}

async function getReviewsByCourse(req, res, next) {
  try {
    const { courseId } = req.params;

    const reviews = await reviewService.getReviewsByCourse(courseId);

    return res.json(reviews);
  } catch (error) {
    next(error);
  }
}

async function getCourseRating(req, res, next) {
  try {
    const { courseId } = req.params;

    const rating = await reviewService.getCourseRating(courseId);

    return res.json(rating);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createReview,
  getReviewsByCourse,
  getCourseRating,
};