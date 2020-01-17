const request = require("request");
const fs = require("fs");
const url = `http://api.bilibili.com/x/v2/reply/emojis`;

request(url, (err, resp, body) => {
  const conf = JSON.parse(body);

  conf.data.forEach(group => {
    let name = group.pname;
    let emojis = group.emojis;

    try {
      fs.mkdir(`./emoji/${name}`, err => {
        if (err) throw new Error("exists");
      });
    } catch (e) {
      console.log(e);
    } finally {
      fetchGroupImages(name, emojis);
    }
  });
});

function fetchGroupImages(groupName, emojiArr) {
  console.log(`group: ${groupName}`);
  emojiArr.forEach(emoji => {
    // console.log(`fetching ${emoji.name}`);
    console.log(`./emoji/${groupName}/${emoji.name}.png`)
    request
      .get(emoji.url)
      .pipe(fs.createWriteStream(`./emoji/${groupName}/${emoji.name}.png`));
  });
}