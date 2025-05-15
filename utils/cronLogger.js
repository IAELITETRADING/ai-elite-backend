const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '../../logs/cron.log');

exports.logCron = (message) => {
  const log = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFile(logPath, log, (err) => {
    if (err) console.error('Erreur d’écriture log CRON:', err);
  });
};
