const puppeteer = require('puppeteer');

const commonVisitor= async function () {
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

    await browser.close();

    return {
      succeed: true, 
      duration: timeInMs,
    };

  } catch (error) {
    // console.log(error);
    return {
      succeed: false, 
      duration: 0,
    };
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