import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodGroups, setBloodGroups] = useState([]);
  

  useEffect(() => {
    // Get users from the dummy API
    axios.get('https://dummyjson.com/users')
      .then(response => {
        const fetchedUsers = response.data.users;
        // console.log(fetchedUsers);
        setUsers(fetchedUsers);

        // Extract unique bloodgroup
        const uniqueBloodGroups = [...new Set(fetchedUsers.map(user => user.bloodGroup))];
        console.log(uniqueBloodGroups)
        setBloodGroups(uniqueBloodGroups);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  let handleChange = (event)=>{
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <h1>User Search App</h1>
      <div>
        <label htmlFor="search">Search: </label>
        <input type='text' id='search' value={searchTerm} onChange={handleChange} />
      </div>
    </div>
  );
};

