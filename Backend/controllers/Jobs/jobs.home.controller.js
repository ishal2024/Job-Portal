import jobsModel from "../../models/jobs.model.js"
import { jobFreshnessInDays } from "../../utils/jobFreshnessInDays.js"

async function jobsForHomePage(req, res) {
  try {
    const { page, limit } = req.query;
    const filter = req.body;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    let query = {};

    // ✅ JobType filter
    if (filter?.jobType && !filter.jobType.includes("all")) {
      query.jobType = { $in: filter.jobType };
    }

    // ✅ Freshness filter (DB level)
    // if (filter?.freshness) {
    //   const daysAgo = new Date();
    //   daysAgo.setDate(daysAgo.getDate() - filter.freshness);

    //   query.createdAt = { $gte: daysAgo };
    // }

    // ✅ Fetch jobs
    const jobs = await jobsModel
      .find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

      console.log(jobs)

    // ✅ Correct total count
    const totalJobs = await jobsModel.countDocuments(query);

    return res.status(200).json({
      status: true,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(totalJobs / limitNum),
      data: jobs,
      message: "All Jobs",
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      description: error?.message,
    });
  }
}

export default jobsForHomePage