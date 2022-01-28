const puppeteer = require('puppeteer');

const commonVisitor= async function (periodDuration) {
  let succeed= 0;
  let failures= 0;
  let timeOfSucceed= 0;

  const periodStartTime = process.hrtime();
  let periodCurrentDuration= 0;
  while (periodCurrentDuration < periodDuration) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(300000); // 5 minutes
  
      await page.setViewport({
        width: 1200,
        height: 800
      });
  
      const startTime = process.hrtime();
  
      await page.goto('https://prod.dei.gr/el/', {
        waitUntil: 'networkidle2',
      });
  
      await autoScroll(page);
  
      // For Testing that the site opens correctly use screenshot
  
      // await page.screenshot({
      //   path: 'yoursite.png',
      //   fullPage: true
      // });
    
      const endTime = process.hrtime(startTime);
      const timeInMs = (endTime[0]* 1000000000 + endTime[1]) / 1000000;

      succeed+= 1;
      timeOfSucceed+= timeInMs;
  
      await browser.close();
    } catch (error) {
      // console.log(error);
      failures+= 1;
    }

    periodCurrentDuration= (process.hrtime(periodStartTime)[0]* 1000000000 + process.hrtime(periodStartTime)[1]) / 1000000
  }

  return {
    succeed: succeed,
    failures: failures,
    timeOfSucceed: timeOfSucceed,
  }
}


const autoScroll= async function (page){
  await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 200);
      });
  });
}



module.exports= {commonVisitor};