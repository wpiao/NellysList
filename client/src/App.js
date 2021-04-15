import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const users = await res.json();
      console.log("users", users);
      setData(users);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <h1>Users</h1>
      {data.map((user, i) => {
        return (
          <li key={i}>
            {user.firstName} {user.lastName}
          </li>
        );
      })}
    </>
  );
};

export default App;
