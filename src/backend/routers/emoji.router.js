'use strict'

/**
 * 表情
 */
const EmojiController = require('../controllers/EmojiController');

module.exports = router => {
    router.get("/api/emojis" , EmojiController.list())
    router.delete("/api/emoji/:id" , EmojiController.remove())
    router.post("/api/emoji" , EmojiController.add())
}