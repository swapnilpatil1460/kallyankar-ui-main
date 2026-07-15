const Heading: React.FC<{ heading: string }> = ({ heading }) => {
  return (
    <div className="w-full pb-4 mb-6 border-b border-theme-c3">
      <h2 className="text-2xl font-black uppercase tracking-widest text-slate-800">
        <span className="text-theme-c1">|</span> {heading}
      </h2>
    </div>
  );
};

export default Heading;
