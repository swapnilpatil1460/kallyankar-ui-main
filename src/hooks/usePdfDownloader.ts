import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const usePdfDownloader = () => {
  const handleDownloadPDF = (
    contentToPrint: HTMLDivElement,
    fileName: string
  ) => {
    if (contentToPrint) {
      html2canvas(contentToPrint).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(fileName + ".pdf");
      });
    } else {
      console.error("Content not found");
    }
  };
  return { handleDownloadPDF };
};
export default usePdfDownloader;
