import { DownloadCloud } from "lucide-react";
import { BackupCardProps } from ".";
import CustomButton from "./CustomButton";

const BackupCard: React.FC<BackupCardProps> = ({
  title,
  icon,
  handleClick,
}) => (
  <div className="w-full">
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 group hover:scale-105 transform transition-transform duration-300 m-4 rounded-md text-[#EEA47F] pt-6 px-5 shadow-lg">
      <div className="w-full flex justify-center items-center mb-4">{icon}</div>
      <p className="text-white font-semibold text-xl font-serif text-center mb-4 ">
        {title}
      </p>
      <div className="flex justify-center items-center h-full">
        <CustomButton onClick={handleClick}>
          <DownloadCloud size={24} />
        </CustomButton>
      </div>
    </div>
  </div>
);

export default BackupCard;
