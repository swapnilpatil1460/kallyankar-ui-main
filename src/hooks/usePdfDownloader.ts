const usePdfDownloader = () => {
  const handleDownloadPDF = (
    contentToPrint: HTMLDivElement,
    fileName: string
  ) => {
    if (contentToPrint) {
      document.title = fileName;
      window.print();
    } else {
      console.error("Content not found");
    }
  };
  return { handleDownloadPDF };
};
export default usePdfDownloader;
