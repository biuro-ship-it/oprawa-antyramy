export const calculateFrame = (width, height, thickness, pricePerMeter, isReadyFrame, margin, vat = 1.23) => {
  // Zużycie listwy w mb (uwzględnia 8x szerokość listwy na skosy)
  const consumption = ((2 * width) + (2 * height) + (8 * thickness)) / 100;
  const area = (width * height) / 10000;

  // Cena netto zakupu zależy od trybu (mb vs gotowa rama)
  // pricePerMeter w bazie będzie miało dwie kolumny: cena_mb i cena_gotowa
  const baseCost = pricePerMeter * consumption;
  
  const priceWithMargin = baseCost * (1 + margin);
  const finalBrutto = priceWithMargin * vat;

  return {
    consumption: consumption.toFixed(2),
    area: area.toFixed(3),
    totalBrutto: finalBrutto.toFixed(2)
  };
};