const {parentPort, workerData} = require("worker_threads");
const {commonVisitor}= require('./visitor.js');


const myProcess= async function (num) {
  const {succeed, duration}= await commonVisitor();
  parentPort.postMessage({succeed, duration})
}

myProcess();