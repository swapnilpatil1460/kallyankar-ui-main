import React from "react";

import KallyankarRoute from "./components/navigation/KallyankarRoute";
import Layout from "./components/navigation/Layout";
import ErrorModal from "./components/UI/ErrorModal";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import DeleteModal from "./components/UI/DeleteModal";
import CustomizedSnackbar from "./components/UI/Snackbar";
import useAppContext from "./hooks/useAppContext";
import FormModal from "./components/UI/FormModal";

function App() {
  const { state, dispatch } = useAppContext();

  const { isDeleteModalVisible, isLoading, error, toggleForm, snackbar } =
    state;
  return (
    <>
      {toggleForm && <FormModal showForm={toggleForm} />}
      <Layout>
        <LoadingSpinner open={isLoading} color="#FFFFFF">
          <ErrorModal open={error.hasError} errorHeading={error.message}>
            <CustomizedSnackbar
              open={snackbar.isOpen}
              message={snackbar.message}
              severty={snackbar.severity}
            >
              <DeleteModal open={isDeleteModalVisible}>
                <KallyankarRoute />
              </DeleteModal>
            </CustomizedSnackbar>
          </ErrorModal>
        </LoadingSpinner>
      </Layout>
    </>
  );
}

export default App;
