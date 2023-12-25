'use client'
import React from 'react';
import { jsPDF } from 'jspdf';
import { Box, Button, Icon } from '@chakra-ui/react';
import { LuPrinter } from "react-icons/lu";

const PdfGenerator = ({title, toPrint}) => {
  const generatePdf = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Get the HTML element you want to convert to PDF
    const sectionToPrint = document.getElementById('section-to-print');

    // Add the HTML content to the PDF
    pdf.html(sectionToPrint, {
      callback: (pdf) => {
        // Save or display the generated PDF
        pdf.save(`${title}.pdf`);
      },
    });
  };

  return (
    <Box>
      <Button leftIcon={<LuPrinter />} onClick={generatePdf}>دانلود نسخه چاپی</Button>
      <Box id="section-to-print">
        {toPrint}
      </Box>
    </Box>
  );
};

export default PdfGenerator;
