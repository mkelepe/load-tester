const {run}= require('./threadpool.js');

const main= async function () {

  console.log('numOfThreads', 'SuccessfulVisits', 'FailedVisits', 'AvgFullPageLoadOfSuccessVisits')

  let numOfThreads= 0;
  const periodDuration= 300000; // 5 minutes

  for (let i= 0; i< 100; i++){
    numOfThreads+= 10;
    const res= await run(numOfThreads, periodDuration);
    console.log(numOfThreads, res.countSucceed, res.countFailures, (res.sumTimeOfSucceed/res.countSucceed));
  }
  
}

main();