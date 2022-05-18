
const AttentionCartoonSchedule = require("./../schedule/handlers").AttentionCartoonSchedule;
const EmojiSchedule = require("./../schedule/handlers").EmojiSchedule;
const AttentionUperDynamicSchedule = require("./../schedule/handlers").AttentionUperDynamicSchedule;
const AttentionUperSchedule = require("./../schedule/handlers").AttentionUperSchedule;
const UperSchedule = require("./../schedule/handlers").UperSchedule;
const AttentionUperVideoSchedule = require("./../schedule/handlers").AttentionUperVideoSchedule;




function innerConsole(s){
    if(s && s.logger) {
        s.logger.error= console.log;
        s.logger.info = console.log;
        s.logger.warn = console.log;
        s.logger.debug = console.log;
    }
}
async function testSchedule(t){
    innerConsole(t)
    await t.run();
}

//测试定时器函数
// testSchedule(AttentionUperVideoSchedule);
// testSchedule(AttentionCartoonSchedule);
// testSchedule(EmojiSchedule);
testSchedule(AttentionUperDynamicSchedule);
// testSchedule(AttentionUperSchedule);
// testSchedule(UperSchedule);