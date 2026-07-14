import {
  BatteryIcon,
  IndianRupeeIcon,
  SmartphoneIcon,
  UserIcon,
} from "lucide-react";
import * as XLSX from "xlsx";

import { getBillingList } from "../../backend/billing";
import { getCustomerListToExport } from "../../backend/customer";
import { getProductList } from "../../backend/product";
import { getStockList } from "../../backend/stock";
import TitleScreen from "../../components/UI/TitleScreen";
import { useAnimation } from "../../hooks";
import { Billing, Customer, Product, STOCK } from "../../store/type";
import BackupCard from "./BackupCard";
type Selection = "CUSTOMER" | "STOCK" | "PAYMENT" | "PRODUCT";
export interface BackupCardProps {
  title: string;
  icon: JSX.Element;
  handleClick: () => void;
}
type EXPORT = (Customer | STOCK | Product | Billing)[] | null;
const SettingsPage = () => {
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();
  const handleBackupRecords = async (type: Selection) => {
    let exportData: EXPORT = null;
    try {
      spinnerAnimationStart();
      switch (type) {
        case "CUSTOMER":
          exportData = await getCustomerListToExport();
          break;
        case "PAYMENT":
          exportData = await getBillingList();
          break;
        case "STOCK":
          exportData = await getStockList();
          break;
        case "PRODUCT":
          exportData = await getProductList();
          break;
      }
      const fileName =
        new Date().toDateString() + `_${type.toLowerCase()} .xlsx`;
      await exportToExcel(exportData, fileName);
      snackbarAnimation(
        `${type.toLowerCase()} data has been exported`,
        "success"
      );
      console.log(exportData);
    } catch (err) {
      snackbarAnimation(
        `Problem while exporting ${type.toLowerCase()} data`,
        "error"
      );
    }
    spinnerAnimationStop();
  };

  const exportToExcel = (data: EXPORT, fileName: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      try {
        // Create a worksheet from the customer data
        if (data && data.length > 0) {
          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

          // Create a new workbook and append the worksheet
          const workbook: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "export");

          // Write the workbook to an Excel file
          XLSX.writeFile(workbook, fileName);
        }

        resolve(); // Resolve the promise on success
      } catch (error) {
        console.error("Error exporting to Excel:", error);
        reject(error); // Reject the promise on failure
      }
    });
  };

  const cardsData: BackupCardProps[] = [
    {
      title: "Export Customer Data",
      icon: <UserIcon size={40} />,
      handleClick: () => handleBackupRecords("CUSTOMER"),
    },
    {
      title: "Export Billing Data",
      icon: <IndianRupeeIcon size={40} />,
      handleClick: () => handleBackupRecords("PAYMENT"),
    },
    {
      title: "Export Products Data",
      icon: <BatteryIcon size={40} />,
      handleClick: () => handleBackupRecords("PRODUCT"),
    },
    {
      title: "Export Stock Data",
      icon: <SmartphoneIcon size={40} />,
      handleClick: () => handleBackupRecords("STOCK"),
    },
  ];

  return (
    <div>
      <TitleScreen
        pageTitle="Please keep backups of your data daily."
        onAddRecord={() => {}}
        isVisible={false}
      />
      <div className="p-10">
        <div className="flex flex-col md:flex-row justify-center mx-10 space-y-6 md:space-y-0 md:space-x-6">
          {cardsData.map((card, index) => (
            <BackupCard
              key={index}
              title={card.title}
              icon={card.icon}
              handleClick={card.handleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
