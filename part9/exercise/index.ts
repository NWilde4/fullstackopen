import express from 'express';
const app = express();

app.use(express.json());

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  if (!_req.query.weight ||!_req.query.height) {
    return res.status(400).json({
      error: "missing parameters"
    });
  }
  if (isNaN(Number(_req.query.weight)) || isNaN(Number(_req.query.height))) {
    return res.status(400).json ({
      error: "malformatted parameters"
    });
  }
  const weight = Number(_req.query.weight);
  const height = Number(_req.query.height);
  
  return res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

app.post('/exercises', (_req, res) => {
  if (!_req.body.daily_exercises ||!_req.body.target) {
    return res.status(400).json({
      error: "missing parameters"
    });
  }

  if (
    !Array.isArray(_req.body.daily_exercises) 
    || _req.body.daily_exercises.length === 0
   ) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (_req.body.daily_exercises.some((value: any) => isNaN(Number(value)))) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

  if (isNaN(Number(_req.body.target))) {
    return res.status(400).json ({
      error: "malformatted parameters"
    });
  }


  const { daily_exercises, target } = _req.body;
  console.log(_req.body);
  const exerciseDetails = calculateExercises(daily_exercises, target);
  return res.status(200).json(exerciseDetails);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});