const ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const outputDir = path.join(__dirname, 'public', 'html');

// Ensure the output directory exists
fs.ensureDirSync(outputDir);

// Read all EJS files in the views directory
fs.readdirSync(viewsDir).forEach(async (file) => {
    if (file.endsWith('.ejs')) {
        const filePath = path.join(viewsDir, file);
        const outputFileName = file.replace('.ejs', '.html');
        const outputFile = path.join(outputDir, outputFileName);

        // Render EJS file to HTML
        const html = await ejs.renderFile(filePath);

        // Write HTML to output file
        fs.writeFileSync(outputFile, html);
        console.log(`Rendered ${file} to ${outputFileName}`);
    }
});

console.log('Pre-rendering completed.');
