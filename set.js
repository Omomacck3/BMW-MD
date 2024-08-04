const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUd5TytBTEozbFdaRGp2dFlLN1BoNVlMTzFYdGNwV3NmRDRlSzE4Z1AzVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZGhBa0xacXdwVFhMNHZxNUxDYU83MjJMSUJRaDhRQzN2anV1K3RVVEx6MD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3Si9INFZtdFhGRUQ4SUR2eUo4TjFWbGRxamZySE9PV0xDT2FvVkpmVm1BPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjelo4TGhDYVFaVFkwRnkvendsQnBTU0ozTnMyZXJ6ZG9KRStOSndKM3lzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitIYWQzT3Ivc25lUnFZQTMwUzVCWGlZUWZ5cHNQWDhyV2NXc1VZNGhMMnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikp5UWZEYVJpQ3BOYlJNQWIxWGRuV3gvMlB0NW03eW5rczQ1ZklhYkJXMEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk9YSVZ1RjZpcHBaVXZpVExxVldFWng2U3hJVFU5R0thdnIyRmo3aThHUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN1hRUjJWUk5JekMwVjUyQUdwdHFsSm45OWpYaUpZNWtpNXZjZTljQmF4Yz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNaeUR3VllQRlF3TWU3Vjd0ZHRuNmNFYldWQkhzYWVIcHo5Nk9JVDZxcjhldm9aTDgrVTVPRUU0M08rcmdhYjV0QUNBeU9OYUtNTUR2WTBycFEwWGl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIsImFkdlNlY3JldEtleSI6IjNubGt1L042dWpiZUV4QmxRMGgzT2hDMVp0bTJMZWFqVjhZTnZWdFpkVjg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImthWFNrNF8xVFhlaTRkTWpyTHE1YnciLCJwaG9uZUlkIjoiYzViYjk4M2ItNDFhNi00ZTVmLTg4NTItOTZmNDc4ZjU0NmVkIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iis2Y2UyS1RpK2dNR0RpeVc0ZFBORGF5OVliRT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1Vk5PUlcxdnl0TytqL2dFMjd3UGV5QXFsRDA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRjg2QzNDUjYiLCJtZSI6eyJpZCI6IjkxOTM2MjY0MTk4Mjo1NEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJGbGV4In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJaW0zOXNGRVB1YXY3VUdHQWdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJwRzAyazROZjMvMG9uYzFXUTdRVGtqOUtDbHMrTDVxRlR1S2VvQ2Y1bmwwPSIsImFjY291bnRTaWduYXR1cmUiOiJpa2ZVRmh3Yks4TEVUemNtM3EvTnpENTZoNlVXNmljY2VnR2VMT0xvRUNaWjZ1YWNoak5PNW8vY1lVRXF0dlBHMzI1V3VpRUQyRHZNU2hLMHQ0U2xCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZTVqTmVhdDZmTWpzR0tJZ3VhZHluR1YveHNwT2cwZnFPMVY1K0JRaEhLUHpYUzVkeEloSS9XUU9GckxPZmxTYU43RDFlRkZYZDA0alpubVBldWk0aHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MTkzNjI2NDE5ODI6NTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYVJ0TnBPRFg5LzlLSjNOVmtPMEU1SS9TZ3BiUGkrYWhVN2lucUFuK1o1ZCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjc5NzQ0OCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFVmwifQ==',
    PREFIXE: process.env.PREFIX || "/",
    OWNER_NAME: process.env.OWNER_NAME || "Awmtea Polythene",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "918787651195",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Flex',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/ddfb8f6ff7969bd66ef26.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
