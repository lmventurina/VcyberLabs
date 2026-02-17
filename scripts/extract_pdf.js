const fs = require('fs');
const pdf = require('pdf-parse');

const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Usage: node extract_pdf.js <path_to_pdf> <output_path>');
    process.exit(1);
}

const pdfPath = args[0];
const outputPath = args[1];

if (!fs.existsSync(pdfPath)) {
    console.error(`File not found: ${pdfPath}`);
    process.exit(1);
}

const dataBuffer = fs.readFileSync(pdfPath); // Read as buffer

pdf(dataBuffer).then(function (data) {
    // Write text to output file with UTF-8 encoding
    fs.writeFileSync(outputPath, data.text, 'utf8');
    console.log(`Successfully extracted text to ${outputPath}`);
}).catch(function (error) {
    console.error('Error extracting text:', error);
    process.exit(1);
});
