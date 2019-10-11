const phantom = require('phantom')

async function test(){
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });

  // const status = await page.open('https://stackoverflow.com/');
  const status = await page.open('https://space.bilibili.com/617285?spm_id_from=333.788.b_765f7570696e666f.1');
  const content = await page.property('content');
  console.log(content);

  await instance.exit();
}

test()