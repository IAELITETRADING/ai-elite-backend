const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.generateSignalPDF = (signals, filename = 'signals.pdf') => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filename));

  doc.fontSize(18).text('Historique des signaux IA', { align: 'center' }).moveDown();

  signals.forEach(signal => {
    doc.fontSize(12).text(
      `Actif : ${signal.actif} | Type : ${signal.type} | Score : ${signal.score} | Date : ${signal.date.toLocaleString()}\nJustification : ${signal.justification}`
    ).moveDown();
  });

  doc.end();
};
