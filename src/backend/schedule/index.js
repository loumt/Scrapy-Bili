const ScheduleConfig = require('./../configure/schedule.config')
const Handler = require('./handlers')

const {scheduleJob} = require('node-schedule')

const AttentionCartoonSchedule = scheduleJob(ScheduleConfig.ATTENTION.CARTOON.INFO_SHEDULE, async () => {
  await Handler.AttentionCartoonSchedule.run();
})

const UperSchedule = scheduleJob(ScheduleConfig.UPER_SCHEDULE, async ()=>{
  await Handler.UperSchedule.run();
})

const AttentionUperDynamicSchedule = scheduleJob(ScheduleConfig.ATTENTION.UPER.DYNAMIC_SCHEDULE, async ()=>{
  await Handler.AttentionUperDynamicSchedule.run();
})

const AttentionUperVideoSchedule = scheduleJob(ScheduleConfig.ATTENTION.UPER.VIDEO_SCHEDULE, async ()=>{
  await Handler.AttentionUperVideoSchedule.run();
})

const AttentionUperSchedule = scheduleJob(ScheduleConfig.ATTENTION.UPER.INFO_SHEDULE, async ()=>{
  await Handler.AttentionUperSchedule.run();
})

// const EmojiSchedule = scheduleJob(ScheduleConfig.EMOJI, async ()=>{await Handler.EmojiSchedule.run();})