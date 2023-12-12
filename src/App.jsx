import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodGroups, setBloodGroups] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  

  useEffect(() => {
    // Get users from the dummy API
    axios.get('https://dummyjson.com/users')
      .then(response => {
        const fetchedUsers = response.data.users;
        // console.log(fetchedUsers);
        setUsers(fetchedUsers);

        // Extract unique bloodgroup
        const uniqueBloodGroups = [...new Set(fetchedUsers.map(user => user.bloodGroup))];
        // console.log(uniqueBloodGroups)
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

  useEffect(() => {
    // Filter users based on search term and selected blood group
    const filtered = users.filter(user => {
      const searchMatches = Object.values(user).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
      const bloodGroupMatches = !selectedBloodGroup || user.bloodGroup === selectedBloodGroup;
      return searchMatches && bloodGroupMatches;
    });
    setFilteredUsers(filtered);
  }, [searchTerm, selectedBloodGroup, users]);
  

  return (
    <div>
      <h1>User Search App</h1>
      <div>
        <label htmlFor="search">Search: </label>
        <input type='text' id='search' value={searchTerm} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="bloodGroup">Blood Group: </label>
        <select
          id="bloodGroup"
          onChange={(e) => setSelectedBloodGroup(e.target.value)}
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((group, index) => (
            <option key={index} value={group}>{group}</option>
          ))}
        </select>
      </div>

      <div>
        <h2>Filtered Users</h2>
        <ul>
          {filteredUsers.map(user => (
            <li key={user.id}>
              <strong>Username :</strong>{user.username},&nbsp;&nbsp;&nbsp;&nbsp;
              <strong>Email:</strong>{user.email},&nbsp;&nbsp;&nbsp;&nbsp;
              <strong>Mo.Number: </strong>{user.phone},&nbsp;&nbsp;&nbsp;&nbsp;
              <strong>Address: </strong>{user.address.address},&nbsp;&nbsp;&nbsp;&nbsp;
              <strong>City: </strong>{user.address.city}&nbsp;&nbsp;&nbsp;&nbsp;
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

