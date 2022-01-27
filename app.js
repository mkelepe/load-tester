const {run}= require('./threadpool.js');

// numOfThreads: How many thread to spawn
// gradually: Whether to spawn all threads immetiatle or gradually
// periodDuration: If gradually is set to true, in how many milliseconds to spawn gradually the threads

const config= [
  {numOfThreads: 4, gradually: true, periodDuration: 10000},
  {numOfThreads: 4, gradually: false, periodDuration: 0},
  {numOfThreads: 8, gradually: true, periodDuration: 100000},
  {numOfThreads: 16, gradually: false, periodDuration: 0},
];

const main= async function () {
  let countSucceed= 0;
  let countFailures= 0;
  let sumTimeOfSucceed= 0;

  for (let i= 0; i< config.length; i++){
    const parameters= config[i];
    const res= await run(parameters.numOfThreads, parameters.gradually, parameters.periodDuration);
    countSucceed+= res.countSucceed;
    countFailures+= res.countFailures;
    sumTimeOfSucceed+= res.sumTimeOfSucceed;
  }
  
  console.log("Successful visits: " + countSucceed);
  console.log("Failed visits: " + countFailures);
  console.log("Average time of page load of successful visits: " + (sumTimeOfSucceed/countSucceed) + " ms");
  console.log();
}

main();