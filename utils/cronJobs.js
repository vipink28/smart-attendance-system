const cron = require("node-cron");
const db = require("../config/db");

const startCronJobs = () => {

    // runs every minute
    cron.schedule("* * * * *", async () => {

        await db.query(
            `UPDATE sessions
             SET is_active = false
             WHERE expires_at < NOW() AND is_active = true`
        );

        console.log("Expired sessions closed");
    });

};

module.exports = startCronJobs;