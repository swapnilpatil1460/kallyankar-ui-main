import { useMemo } from "react";
import { getUserList } from "../../backend/user";
import ButtonHeader from "../../components/UI/Button/ButtonHeader";
import UserTable from "../../components/UI/Table/UserTable";
import TitleScreen from "../../components/UI/TitleScreen";
import { useApiCall, useAppContext } from "../../hooks";
import { userRegister } from "../../store/type";

const UserPage = () => {
  const {
    state: { refreshEffect },
    dispatch,
  } = useAppContext();
  const params = useMemo(() => {
    return { refreshEffect };
  }, [refreshEffect]);

  const { data } = useApiCall(getUserList, params);

  const handleOpenForm = () => {
    dispatch({
      type: "SET_FORM_PROPS",
      payload: {
        data: userRegister,
        mode: "ADD_RECORD",
        type: "USER",
      },
    });
    dispatch({ type: "HIDE_SHOW_FORM", payload: true });
  };

  return (
    <div>
      <TitleScreen
        pageTitle="Change Password OR new User..."
        onAddRecord={handleOpenForm}
        buttonTitle="Add User"
      />
      <div className="p-10">
        <div className="flex justify-end items-center">
          <ButtonHeader
            buttonClick={handleOpenForm}
            title="Change your password"
          />
        </div>
        {data && <UserTable users={data} />}
      </div>
    </div>
  );
};

export default UserPage;
