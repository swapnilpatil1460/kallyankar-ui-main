interface Props {
  heading: string;
  subHeading: string;
}
const Nothing: React.FC<Props> = ({ heading, subHeading }) => {
  return (
    <div className="bg-yellow-200 p-5 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold text-yellow-900 tracking-wider">
        {heading}
      </h2>
      <p className="text-yellow-600 tracking-widest">{subHeading}</p>
    </div>
  );
};

export default Nothing;
