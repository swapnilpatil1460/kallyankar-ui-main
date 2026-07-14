interface Props {
  children: React.ReactNode;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  maxWidth: string;
}
//React.FormEventHandler<HTMLFormElement>

const Form: React.FC<Props> = ({ children, handleSubmit, maxWidth }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-wrap justify-between items-center  mx-10 p-10 h-full text-left ${maxWidth}`}
    >
      {children}
    </form>
  );
};

export default Form;
