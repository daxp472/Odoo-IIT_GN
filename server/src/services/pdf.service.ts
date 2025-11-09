import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

// Define font descriptors for pdfmake
const fonts = {
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  }
};

const printer = new PdfPrinter(fonts);

/**
 * Generate PDF invoice
 * @param invoiceData Invoice data to generate PDF from
 * @returns PDF document as buffer
 */
export const generateInvoicePDF = async (invoiceData: any): Promise<Buffer> => {
  // Ensure we have valid data
  if (!invoiceData) {
    throw new Error('Invalid invoice data provided');
  }

  const docDefinition: TDocumentDefinitions = {
    content: [
      // Header
      {
        columns: [
          {
            text: 'INVOICE',
            style: 'header'
          },
          {
            alignment: 'right',
            text: [
              { text: 'Invoice #: ', bold: true },
              invoiceData.invoice_number || 'N/A',
              '\n',
              { text: 'Date: ', bold: true },
              invoiceData.issue_date ? new Date(invoiceData.issue_date).toLocaleDateString() : 'N/A',
              '\n',
              { text: 'Due Date: ', bold: true },
              invoiceData.due_date ? new Date(invoiceData.due_date).toLocaleDateString() : 'N/A'
            ]
          }
        ]
      },
      
      // Company and Client info
      {
        columns: [
          {
            width: '*',
            text: [
              { text: 'From:\n', bold: true },
              'OneFlow Business Solutions\n',
              '123 Business Avenue\n',
              'Suite 100\n',
              'Business City, BC 12345\n',
              'Email: billing@oneflow.com\n',
              'Phone: (555) 123-4567'
            ]
          },
          {
            width: '*',
            text: [
              { text: 'Bill To:\n', bold: true },
              (invoiceData.client || 'N/A') + '\n',
              'Client Address\n',
              'Client City, CC 67890'
            ]
          }
        ],
        margin: [0, 20, 0, 20]
      },
      
      // Line items table
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'Description', style: 'tableHeader' },
              { text: 'Quantity', style: 'tableHeader' },
              { text: 'Unit Price', style: 'tableHeader' },
              { text: 'Amount', style: 'tableHeader' }
            ],
            ...(invoiceData.lines && Array.isArray(invoiceData.lines) 
              ? invoiceData.lines.map((line: any) => [
                  (line.item_name || 'N/A') + (line.description ? '\n' + line.description : ''),
                  line.quantity || 0,
                  '$' + (line.unit_price || 0).toFixed(2),
                  '$' + (line.total_price || 0).toFixed(2)
                ])
              : []),
            [
              { text: '', colSpan: 3, alignment: 'right' },
              {},
              {},
              { text: 'Subtotal', bold: true }
            ],
            [
              { text: '', colSpan: 3, alignment: 'right' },
              {},
              {},
              '$' + (invoiceData.amount || 0).toFixed(2)
            ],
            ...(invoiceData.tax_amount && invoiceData.tax_amount > 0 ? [
              [
                { text: '', colSpan: 3, alignment: 'right' },
                {},
                {},
                { text: 'Tax (' + (invoiceData.tax_rate || 0) + '%)', bold: true }
              ],
              [
                { text: '', colSpan: 3, alignment: 'right' },
                {},
                {},
                '$' + (invoiceData.tax_amount || 0).toFixed(2)
              ]
            ] : []),
            [
              { text: '', colSpan: 3, alignment: 'right' },
              {},
              {},
              { text: 'Total', style: 'total' }
            ],
            [
              { text: '', colSpan: 3, alignment: 'right' },
              {},
              {},
              { text: '$' + (invoiceData.total_amount || 0).toFixed(2), style: 'total' }
            ]
          ]
        },
        layout: 'lightHorizontalLines'
      },
      
      // Notes
      {
        text: 'Notes',
        style: 'sectionHeader',
        margin: [0, 20, 0, 5]
      },
      {
        text: invoiceData.description || 'Thank you for your business!',
        margin: [0, 0, 0, 20]
      },
      
      // Payment terms
      {
        text: 'Payment Terms',
        style: 'sectionHeader',
        margin: [0, 0, 0, 5]
      },
      {
        text: 'Payment is due within 30 days of invoice date. Late payments may incur additional fees.'
      }
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        margin: [0, 0, 0, 20]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      },
      total: {
        bold: true,
        fontSize: 14
      },
      sectionHeader: {
        bold: true,
        fontSize: 14
      }
    },
    defaultStyle: {
      fontSize: 10
    }
  };

  // Create PDF and return as buffer
  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    
    pdfDoc.on('data', (chunk: any) => {
      chunks.push(chunk);
    });
    
    pdfDoc.on('end', () => {
      const buffer = Buffer.concat(chunks);
      resolve(buffer);
    });
    
    pdfDoc.on('error', (err: any) => {
      reject(new Error(`PDF generation failed: ${err.message}`));
    });
    
    pdfDoc.end();
  });
};