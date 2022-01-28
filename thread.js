const {parentPort, workerData} = require("worker_threads");
const {commonVisitor}= require('./visitor.js');


const myProcess= async function () {
  const {succeed, failures, timeOfSucceed}= await commonVisitor(workerData.periodDuration);
  parentPort.postMessage({succeed, failures, timeOfSucceed})
}

myProcess();