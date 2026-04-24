const dashboardService = require("../services/dashboard.service");

async function getMyDashboard(req, res, next) {
  try {
    const userId = req.user.id;

    const dashboard = await dashboardService.getUserDashboard(userId);

    return res.json(dashboard);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMyDashboard,
};