module.exports = {
    port: 8181,
    mysql: {
        init: false
    },
    token: {
        maxAge: 1 * 60 * 60 * 1000
    },
    schedule: {
        uper: true,
        attention: {
            uper: {
                info: true,
                dynamic: true,
                video: true
            },
            cartoon: {
                info: true
            }
        },
        emoji: true
    }
}