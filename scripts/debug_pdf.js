const pdf = require('pdf-parse');
console.log('Prototype:', pdf.PDFParse.prototype);
console.log('Static methods:', Object.getOwnPropertyNames(pdf.PDFParse));
