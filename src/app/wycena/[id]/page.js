import { generateContractPDF } from '@/components/PdfGenerator';
const [notes, setNotes] = useState("");
const handleDownloadPDF = () => {
  const selectedExtrasNames = Object.keys(extras).filter(key => extras[key]);
  
  generateContractPDF({
    supplier: id,
    code: selectedProduct?.kod || "Nieznany",
    width: width,
    height: height,
    extras: selectedExtrasNames,
    notes: notes,
    total: calculateTotal()
  });
};