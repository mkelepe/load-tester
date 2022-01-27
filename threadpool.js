const { Worker } = require('worker_threads')
const delay = ms => new Promise(res => setTimeout(res, ms));

const runService = (WorkerData) => {
    return new Promise((resolve, reject) => {    
        const worker = new Worker('./thread.js', { WorkerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`stopped with  ${code} exit code`));
        })
    })
}

const run = async (numOfThreads, gradually, periodDuration) => {
    let pauseTime= 0;
    if (gradually){
        pauseTime= parseInt((periodDuration) / numOfThreads);
    }
    let threadPromises=[];
    for (let i= 0; i< numOfThreads; i++){
        threadPromises.push(runService(null));
        if (gradually){
            await delay(pauseTime);
        }
    }
    const results = await Promise.all(threadPromises);

    // console.log(results);
    
    let countSucceed= 0;
    let countFailures= 0;
    let sumTimeOfSucceed= 0;
    for (let i= 0; i< results.length; i++){
        const res= results[i];
        if (res.succeed){
            countSucceed+= 1;
            sumTimeOfSucceed+= res.duration;
        } else {
            countFailures+= 1;
        }
    }

    return {countSucceed, countFailures, sumTimeOfSucceed};
}

module.exports= {run};

// run().catch(err => console.error(err))