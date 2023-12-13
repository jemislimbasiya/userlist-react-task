import React, { useState, useEffect } from 'react';
import axios from 'axios';
//for Serch 
import TextField from '@mui/material/TextField';
//for dropdown
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//for card
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import Box from '@mui/material/Box';


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
    <div >
      <Card sx={{ maxWidth: 500, boxShadow:3, ml:55, mt:3, border:1, borderRadius:'16px', borderColor:'primary.main'}} >  
      <h2 sx={{mt:3, mb:3}} style={{color:"blue"}} variant="outlined">USER SEARCH APP</h2><hr />
        
      <div>
      <TextField 
          id="filled-search search"
          label="Search field"
          type="search"
          variant="filled"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>

      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 220 }}>
        <InputLabel id="demo-simple-select-filled-label">Select Blood Group</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label bloodGroup"
          id="demo-simple-select-filled bloodGroup"
          onChange={(e) => setSelectedBloodGroup(e.target.value)}
        >
          <MenuItem value="">
            <em>Select Blood Group</em>
          </MenuItem>
          {bloodGroups.map((group, index) => (
            <MenuItem key={index} value={group}>{group}</MenuItem>
          ))}
        </Select>
        </FormControl>
      </div>
      
      
      
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <i style={{color:'blue'}}>Filtered Users</i><hr />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <ul>
            {filteredUsers.map(user => (
              <li key={user.id} >
                <Box sx={{ color: 'text.primary' }}><strong>Username :   </strong>{user.username},<br /></Box>
                <Box sx={{ color: 'text.primary' }}><strong>Email:   </strong>{user.email},<br /></Box>
                <Box sx={{ color: 'text.primary' }}><strong>Mo.Number:   </strong>{user.phone},<br /></Box>
                <Box sx={{ color: 'text.primary' }}><strong>Address:   </strong>{user.address.address},<br /></Box>
                <Box sx={{ color: 'text.primary' }}><strong>City:   </strong>{user.address.city} <hr /></Box>
              </li>
              
            ))}
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

