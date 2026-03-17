const dashboardService = require("../services/dashboard.service");

async function getMyDashboard(req, res) {
  try {
    const userId = req.user.id;

    const dashboard = await dashboardService.getUserDashboard(userId);

    return res.json(dashboard);
  } catch (error) {
    console.error("Get dashboard error:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

module.exports = {
  getMyDashboard,
};