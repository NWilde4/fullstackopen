interface InputValues {
  heightInput: number;
  weightInput: number;
}

const parseArguments = (args: Array<string>): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightInput: Number(args[2]),
      weightInput: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / ((height / 100) ** 2);

  if (bmi >= 30) {
    return "Obese"; 
  } else if (bmi >= 25) {
    return "Overweight";
  } else if (bmi >= 18.5) {
    return "Normal (healthy weight)";
  } else {
    return "Underweight";
  }
};

try {
  const { heightInput, weightInput } = parseArguments(process.argv);
  console.log(calculateBmi(heightInput, weightInput));
} catch(e) {
  console.log('Error, something bad happened, message: ', e.message);
}

export default calculateBmi;