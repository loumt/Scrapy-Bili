const emojiList = [];

const transFormEmoji = (content) => {
  if (content === '' || content === null) return content;
  for (var i = 0; i < emojiList.length; i++) {
    let {key, emoji} = emojiList[i];
    content = content.split(key).join(emoji)
  }
  return content;
}

const pushEmoji = (key, url) => {
  emojiList.push({
    key, emoji: `<img style="width: 2em;height: 2em;" src="https://images.weserv.nl/?url=`  +  url  + `"/>`
  })
}

export default {transFormEmoji,pushEmoji}
