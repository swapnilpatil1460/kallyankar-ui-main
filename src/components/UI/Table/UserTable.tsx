import { Trash2 } from "lucide-react";
import { useAppContext } from "../../../hooks";
import { User } from "../../../store/type";

interface Props {
  users: User[];
}

const UserTable: React.FC<Props> = ({ users }) => {
  const { dispatch } = useAppContext();
  const handleDeleteUser = (id: string) => {
    console.log("here : ", id);
    const user = users.find((u) => u._id === id);
    if (user) {
      console.log(user);
      dispatch({
        type: "ADD_DELETE_MODAL_PROPS",
        payload: {
          id,
          mode: "USER",
          title: "Do you want to delete this record!",
        },
      });
      dispatch({ type: "SET_DELETE_MODAL_VISIBLE", payload: true });
    }
  };
  return (
    <div className="">
      <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden font-sans">
        <thead className="bg-indigo-600 text-white ">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
            >
              First name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
            >
              Last name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
            >
              Created By
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-theme-c3">
          {users.map((element, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-6 py-3 text-left text-xs   tracking-wider">
                {element.name}
              </td>
              <td className="px-6 py-3 text-left text-xs   tracking-wider">
                {element.last_name}
              </td>
              <td className="px-6 py-3 text-left text-xs   tracking-wider">
                {element.email}
              </td>
              <td className="px-6 py-3 text-left text-xs   tracking-wider">
                {element.role}
              </td>
              <td className="px-6 py-3 text-left text-xs   tracking-wider">
                {element.createdBy}
              </td>

              <td className="px-6 py-3 text-left text-xs   tracking-wider flex items-center space-x-3">
                <button
                  onClick={() => handleDeleteUser(element._id ?? "")}
                  name={element._id}
                  className="text-red-600 hover:text-red-800 transition-colors duration-150"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
