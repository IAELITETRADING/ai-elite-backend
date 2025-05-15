const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '../../logs/system.log');

exports.logEvent = (msg) => {
  const entry = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFile(logPath, entry, (err) => {
    if (err) console.error('Erreur log système :', err);
  });
};
