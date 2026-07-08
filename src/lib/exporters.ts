"use client";

import { Document, Packer, Paragraph, TextRun } from "docx";
import jsPDF from "jspdf";
import { downloadBlob, downloadText, toSlug } from "@/lib/utils";

function splitLines(text: string) {
  return text.split("\n").map((line) => line.trimEnd());
}

export function exportPlainText(text: string, filename: string) {
  downloadText(text, `${toSlug(filename)}.txt`);
}

export function exportPdf(text: string, filename: string) {
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let y = margin;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  splitLines(text).forEach((line) => {
    const wrapped = pdf.splitTextToSize(line || " ", pageWidth - margin * 2);

    wrapped.forEach((segment: string) => {
      if (y > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }

      pdf.text(segment, margin, y);
      y += 14;
    });
  });

  pdf.save(`${toSlug(filename)}.pdf`);
}

export async function exportDocx(text: string, filename: string) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: splitLines(text).map(
          (line) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: line || " ",
                  size: line === line.toUpperCase() && line.length < 32 ? 24 : 20,
                  bold: line === line.toUpperCase() && line.length < 32
                })
              ],
              spacing: { after: line ? 120 : 80 }
            })
        )
      }
    ]
  });
  const blob = await Packer.toBlob(doc);

  downloadBlob(blob, `${toSlug(filename)}.docx`);
}
