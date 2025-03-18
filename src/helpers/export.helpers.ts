import { Parser } from 'json2csv';
import PdfPrinter from 'pdfmake';
import fs from 'fs';
import path from 'path';

export const exportToCSV = (data: any[], fields: string[], fileName: string) => {
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(data);

  createExportsDir();
  const filePath = path.join(__dirname, '../exports', `${fileName}.csv`);
  fs.writeFileSync(filePath, csv);

  return filePath;
};

export const exportToPDF = (data: any[], columns: string[], fileName: string) => {
  const printer = new PdfPrinter({
    Roboto: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique'
    }
  });

  const tableBody = [columns, ...data.map(item => columns.map(col => item[col]))];

  const docDefinition = {
    content: [{ table: { body: tableBody } }]
  };
  createExportsDir();
  const filePath = path.join(__dirname, '../exports', `${fileName}.pdf`);
  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(filePath));
  pdfDoc.end();

  return filePath;
};

const createExportsDir = () => {
    const exportsDir = path.join(__dirname, 'exports');
  
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }
  };
