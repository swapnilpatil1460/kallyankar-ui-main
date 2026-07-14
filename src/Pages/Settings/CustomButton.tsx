const CustomButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
}> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 hover:bg-green-600 w-full text-white font-bold py-2 px-6 rounded-md shadow-lg transition-all animate-fadeInUp my-4 flex justify-center"
    >
      {children}
    </button>
  );
};

export default CustomButton;
