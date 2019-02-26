const getRandomSteps = () => {
  var steps = []
    for(var i = 0; i < 24; i++) {
      steps[i] = Math.floor(Math.random() * (Math.floor(3) - Math.ceil(0) + 1)) + Math.ceil(0);
    }
  return steps;
};

export default getRandomSteps;
