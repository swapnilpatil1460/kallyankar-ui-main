import {
  BatteryIcon,
  IndianRupeeIcon,
  SmartphoneIcon,
  UserIcon,
} from "lucide-react";
import ExcelJS from "exceljs";

import { getBillingList } from "../../backend/billing";
import { getCustomerListToExport } from "../../backend/customer";
import { getProductListToExport } from "../../backend/product";
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
          exportData = await getProductListToExport();
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
    } finally {
      spinnerAnimationStop();
    }
  };

  const exportToExcel = async (data: EXPORT, fileName: string) => {
    if (!data || data.length === 0) {
      throw new Error("No data is available to export");
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("export");
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);
    worksheet.addRows(
      data.map((record) =>
        Object.values(record).map((value) =>
          value !== null && typeof value === "object"
            ? JSON.stringify(value)
            : value
        )
      )
    );

    const buffer = await workbook.xlsx.writeBuffer();
    const url = URL.createObjectURL(
      new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
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
