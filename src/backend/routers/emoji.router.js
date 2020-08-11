'use strict'

/**
 * 表情
 */
const EmojiController = require('../controllers/EmojiController');

module.exports = router => {
    router.get("/api/emoji" , EmojiController.list())
    router.delete("/api/emoji/:id" , EmojiController.remove())
}