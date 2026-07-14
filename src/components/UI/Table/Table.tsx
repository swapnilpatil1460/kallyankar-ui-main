interface Props {
  column: string[];
  children: React.ReactNode;
}

const Table: React.FC<Props> = ({ column, children }) => {
  return (
    <div className="overflow-x-scroll shadow-md sm:rounded-lg">
      <table className="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="bg-white border-b text-sm text-slate-700 font-base hover:bg-gray-50">
            {column.map((col, index) => (
              <td className="px-3 py-4" key={index}>
                {col}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
