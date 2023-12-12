import axios from "axios";
import { useState, useEffect } from "react";

export default function App() {
  let [users, setUsers] = useState([]);

  useEffect(()=>{
    axios.get("https://dummyjson.com/users")
    .then(response =>{
      const fetchedUsers = response.data.users;
      console.log(fetchedUsers);
    })
  });

  return(
      <div>
        <h1>UserList</h1>
        <h2>Hii</h2>
      </div>
  );
}


