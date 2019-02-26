const getRandomSteps = () => {
  let steps = []
    for(let i = 0; i < 24; i++) {
      steps[i] = Math.floor(Math.random() * 4);
    }
  return steps;
};

const isStepsEqual = (stepsPart, elementIndex, userSteps) => {
   return stepsPart[elementIndex] == userSteps[elementIndex];
};

export { getRandomSteps, isStepsEqual };
