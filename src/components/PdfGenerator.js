import { jsPDF } from "jspdf";

export const generateContractPDF = (data) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // --- CZĘŚĆ 1: WYCENA (3/4 STRONY) ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("SPECYFIKACJA ZAMÓWIENIA - ANTYRAMY.EU", 10, 20);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Data: ${new Date().toLocaleDateString()}`, 10, 28);
  doc.line(10, 32, pageWidth - 10, 32); // Linia pod nagłówkiem

  // Dane zamówienia
  doc.setFontSize(12);
  doc.text(`Producent listwy: ${data.supplier.toUpperCase()}`, 10, 45);
  doc.text(`Kod profilu: ${data.code}`, 10, 52);
  doc.text(`Wymiary obrazu: ${data.width} x ${data.height} cm`, 10, 59);

  // Elementy oprawy
  doc.setFont("helvetica", "bold");
  doc.text("Wybrane elementy:", 10, 75);
  doc.setFont("helvetica", "normal");
  let yPos = 82;
  data.extras.forEach(item => {
    doc.text(`- ${item}`, 15, yPos);
    yPos += 7;
  });

  // Uwagi
  doc.setFont("helvetica", "bold");
  doc.text("Uwagi do oprawy:", 10, yPos + 10);
  doc.setFont("helvetica", "italic");
  const splitNotes = doc.splitTextToSize(data.notes || "Brak uwag", pageWidth - 20);
  doc.text(splitNotes, 10, yPos + 17);

  // Suma
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(`SUMA BRUTTO: ${data.total} PLN`, 10, 180);

  // --- LINIA CIĘCIA ---
  const cutLineY = 220;
  doc.setLineDash([2, 2], 0);
  doc.line(0, cutLineY, pageWidth, cutLineY);
  doc.setFontSize(8);
  doc.text("TUTAJ ODCIĄĆ (POTWIERDZENIE DLA KLIENTA)", pageWidth / 2, cutLineY - 2, { align: "center" });

  // --- CZĘŚĆ 2: KWIT POTWIERDZENIA (1/4 STRONY) ---
  doc.setLineDash([], 0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("POTWIERDZENIE PRZYJĘCIA ZAMÓWIENIA", 10, cutLineY + 15);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Zlecenie: ${data.supplier} / Kod: ${data.code} / Wymiar: ${data.width}x${data.height}`, 10, cutLineY + 25);
  doc.text(`Zaliczka pobrana: ................................. PLN`, 10, cutLineY + 35);
  doc.text(`Termin odbioru: .................................`, 10, cutLineY + 45);

  doc.text("Podpis pracownika", 10, cutLineY + 65);
  doc.text("Podpis klienta", pageWidth - 50, cutLineY + 65);

  // Zapisz PDF
  doc.save(`zamowienie_${data.code}_${data.width}x${data.height}.pdf`);
};