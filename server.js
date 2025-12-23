const express = require("express");
const cors = require("cors");

const app = express();

/* IMPORTANT for Render */
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Placement Predictor API Running");
});

app.post("/predict", (req, res) => {
  const { cgpa, skills, internship, communication } = req.body;

  let score = 0;

  if (cgpa >= 8) score += 40;
  else if (cgpa >= 7) score += 30;
  else if (cgpa >= 6) score += 20;

  score += skills * 7;

  if (internship === "yes") score += 20;

  score += communication;

  if (score > 100) score = 100;

  let status, roadmap;

  if (score >= 75) {
    status = "High Placement Probability";
    roadmap =
      "You are placement ready. Focus on mock interviews and company preparation.";
  } else if (score >= 50) {
    status = "Moderate Placement Probability";
    roadmap =
      "Improve DSA, build projects, and enhance communication skills.";
  } else {
    status = "Low Placement Probability";
    roadmap =
      "Focus on fundamentals, internships, and consistent practice.";
  }

  res.json({
    placementScore: score,
    status,
    roadmap
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
