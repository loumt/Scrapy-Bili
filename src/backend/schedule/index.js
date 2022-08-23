const {schedule} = require('./../configure/app.config')
const Handler = require('./handlers')

const CRON = {
    //1.UP����ȡ��ʱ������(30���ȡһ��) ----- BվUP��
    UPER_SCHEDULE: {
        CRON: '0 */1 * * * *'
    },

    //2.��ע��
    ATTENTION: {
        //���綨ʱ������ ------ ��վ���ѹ�ע�ķ���
        CARTOON: {
            //������Ϣ��ʱ������
            INFO_SHEDULE: {
                CRON: '10 */1 * * * *'
            }
        },
        //UP��������
        UPER: {
            //UP����Ϣ��ʱ������
            INFO_SHEDULE: {
                CRON: '15 */1 * * * *'
            },
            // ��̬���¶�ʱ������
            DYNAMIC_SCHEDULE: {
                CRON: '20 */1 * * * *'
            },
            // ��Ƶ���¶�ʱ������
            VIDEO_SCHEDULE: {
                CRON: '30 */1 * * *'
            }
        }
    },

    //emoji
    EMOJI: '*/30 * * * * *'
}


const {scheduleJob} = require('node-schedule')

if (schedule.uper) {
    const UperSchedule = scheduleJob(CRON.UPER_SCHEDULE, async () => {
        await Handler.UperSchedule.run();
    })
}

if (schedule.attention.uper.info) {
    const AttentionUperSchedule = scheduleJob(CRON.ATTENTION.UPER.INFO_SHEDULE, async () => {
        await Handler.AttentionUperSchedule.run();
    })
}
if (schedule.attention.uper.dynamic) {
    const AttentionUperDynamicSchedule = scheduleJob(CRON.ATTENTION.UPER.DYNAMIC_SCHEDULE, async () => {
        await Handler.AttentionUperDynamicSchedule.run();
    })
}
if (schedule.attention.uper.video) {
    const AttentionUperVideoSchedule = scheduleJob(CRON.ATTENTION.UPER.VIDEO_SCHEDULE, async () => {
        await Handler.AttentionUperVideoSchedule.run();
    })
}
if (schedule.attention.cartoon.info) {
    const AttentionCartoonSchedule = scheduleJob(CRON.ATTENTION.CARTOON.INFO_SHEDULE, async () => {
        await Handler.AttentionCartoonSchedule.run();
    })
}
if (schedule.emoji) {
    const EmojiSchedule = scheduleJob(CRON.EMOJI, async () => {
        await Handler.EmojiSchedule.run();
    })
}


