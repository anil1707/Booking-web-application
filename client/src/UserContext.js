import { Box } from "@mui/material";
import { createContext, useEffect, useState } from "react";

let UserContext = createContext({});

let UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [id, setId] = useState();
  useEffect(() => {
    if (!user) {
      fetch("http://localhost:5000/user/profile", {
        method: "get",
        credentials: "include",
      }).then((response) => {
        response.json().then((result) => {
          console.log(result);
          setUser(result?.userName);
          setId(result.id)
        });
      });
    }
  },[user]);


  return (
    <Box>
      <UserContext.Provider value={{ user, setUser, id }}>
        {children}
      </UserContext.Provider>
    </Box>
  );
};

export { UserContext, UserContextProvider };
