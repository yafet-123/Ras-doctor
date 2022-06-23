import axios from "axios";

<AppContext.Provider
      value={{
        ...state,
        displayAlert,
        loginUser,
        toggleSidebar,
        logoutUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        search,
      }}
    >
      {children}
    </AppContext.Provider>