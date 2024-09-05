const fs = require("fs");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");

class CheckService {
  printCheck(check) {
    async function createDoubleReceipt() {
      const pdfDoc = await PDFDocument.create();

      // A4 sahifa yaratish va balandlikni 1/5 qismiga sozlash
      const page = pdfDoc.addPage([595.28, 841.89 / 6]);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      // Chek balandligi, sahifaning 1/5 qismi
      const checkHeight = 841.89 / 6 - 10;

      // Yangi kichik shrift o'lchami
      const fontSize = 8;

      // Birinchi chekning chap tomoniga yozish
      function drawReceipt(xOffset, yOffset, rol) {
        page.drawText("Programming School", {
          x: 40 + xOffset,
          y: checkHeight + yOffset,
          size: 10,
          Optional: `bold`,
          font: fontBold,
        });
        page.drawText(rol + " uchun", {
          x: 40 + xOffset,
          y: checkHeight - 15 + yOffset,
          size: fontSize,
          Optional: `bold`,
          font: fontBold,
        });
        page.drawText("Guruh nomi: 1-guruh", {
          x: 40 + xOffset,
          y: checkHeight - 25 + yOffset,
          size: fontSize,
          font,
        });
        page.drawText("O'quvchining F.I.SH: Abdullayev Muhammad", {
          x: 40 + xOffset,
          y: checkHeight - 35 + yOffset,
          size: fontSize,
          font,
        });
        page.drawText("Qaysi oy uchun to'lov: Sentabr", {
          x: 40 + xOffset,
          y: checkHeight - 45 + yOffset,
          size: fontSize,
          font,
        });
        page.drawText("Qaysi kurs uchun to'lov: Ingliz tili", {
          x: 40 + xOffset,
          y: checkHeight - 55 + yOffset,
          size: fontSize,
          font,
        });
        page.drawText("To'lov narxi: 300 000 so'm", {
          x: 40 + xOffset,
          y: checkHeight - 65 + yOffset,
          size: fontSize,
          font,
        });
        page.drawText("Qolgan qarzi: 50 000 so'm", {
          x: 40 + xOffset,
          y: checkHeight - 75 + yOffset,
          size: fontSize,
          font,
        });
        page.drawText("To'lovni olgan xodimning F.I.SH: Abdullayev Muhammad", {
          x: 40 + xOffset,
          y: checkHeight - 85 + yOffset,
          size: fontSize,
          font,
        });
        page.drawText("Xodimning imzosi: ", {
          x: 40 + xOffset,
          y: checkHeight - 95 + yOffset,
          size: fontSize,
          font,
        });
        page.drawText("O'quvchining imzosi: ", {
          x: 40 + xOffset,
          y: checkHeight - 105 + yOffset,
          size: fontSize,
          font,
        });
        page.drawText("Sana: 05/09/2024 10:37", {
          x: 40 + xOffset,
          y: checkHeight - 115 + yOffset,
          size: fontSize,
          font,
        });

        page.drawText(`To'lov turi: Naqd`, {
          x: 40 + xOffset,
          y: checkHeight - 125 + yOffset,
          size: fontSize,
          font,
        });
      }

      // Chiziqlarni chizish
      function drawLines(xOffset, yOffset) {
        page.drawLine({
          start: { x: 40 + xOffset, y: checkHeight - 210 + yOffset },
          end: { x: 260 + xOffset, y: checkHeight - 210 + yOffset },
          thickness: 0.5,
          color: rgb(0, 0, 0),
        });
      }

      // Birinchi chek chap tarafda
      drawReceipt(0, 0, "Administrator");
      drawLines(0, 0);

      // Ikkinchi chek o'ng tarafda
      drawReceipt(270, 0, `O'quvchi`); // X o'qidan 270px surib qo'yiladi
      drawLines(270, 0);

      // PDF hujjatini saqlash
      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync("double_receipt_shrinked.pdf", pdfBytes);
      console.log("PDF created successfully!");
    }

    return createDoubleReceipt();
  }
}

module.exports = new CheckService();
