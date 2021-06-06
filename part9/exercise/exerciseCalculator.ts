interface ExerciseDetails {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface CalculationValues {
  target: number;
  trainingDaysArray: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): CalculationValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
    
  const target = Number(args[2]);
  if (isNaN(target)) {
    throw new Error('Provided target value is not a number!');
  }

  const trainingDaysArray: Array<number> = args.slice(3).map((value) => {
    if (isNaN(Number(value))) {
      throw new Error('Provided training hours value is not a number!');      
    }
    return Number(value);
  });

  return {
    target,
    trainingDaysArray
  };
};

const calculateExercises = (days: Array<number>, target: number): ExerciseDetails => {
  const periodLength = days.length;
  const average = days
    .reduce((total, current) => total + current, 0) 
    / days.length;

  type RatingScale = 1 | 2 | 3;
  let rating: RatingScale;
  if (average > target) {
    rating = 3;
  } else if (average * 1.5 > target) {
    rating = 2;
  } else {
    rating = 1;
  }

  let ratingDescription: string;
  switch(rating) {
    case 3:
      ratingDescription = 'pretty great';
      break;
    case 2:
      ratingDescription = 'not too bad but could be better';
      break;
    case 1:
      ratingDescription ='pretty bad';
      break;
  }

  return {
    periodLength,
    trainingDays: days.filter(hours => hours > 0).length,
    success: average > target,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { target, trainingDaysArray } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(trainingDaysArray, target));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

export default calculateExercises;