import React, { useState, useEffect } from 'react';
import { supabase } from './createClient';
import './index.css';
import './App.css';

function App() {
  const [user, setUser] = useState([]);
  const [singleUser, setSingleUser] = useState({
    id: null, // Added to track the ID for updates
    name: '',
    age: ''
  });

  // Fetch users from the database
  async function fetchUser() {
    const { data, error } = await supabase.from('user').select('*');
    if (error) {
      console.log('Error while fetching data from Supabase:', error);
    } else {
      setUser(data);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  // Handle input changes
  function handleChange(e) {
    e.preventDefault();
    setSingleUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  // Insert new user into the 'user' table
  async function insertUser(event) {
    event.preventDefault(); // Prevent form from refreshing the page
    const { data, error } = await supabase.from('user').insert({
      name: singleUser.name,
      age: singleUser.age
    });

    if (error) {
      console.log('Error inserting user:', error);
    } else {
      console.log('User inserted:', data);
      // Reset form after successful insertion
      setSingleUser({ id: null, name: '', age: '' });
      fetchUser(); // Refetch the data to update the list
    }
  }

  // Delete user by ID
  async function deleteUser(userId) {
    const { error } = await supabase
      .from('user')
      .delete()
      .eq('id', userId);

    if (error) {
      console.log('Error while deleting user:', error);
    } else {
      console.log('User deleted');
      fetchUser(); // Re-fetch users after deletion to refresh the UI
    }
  }

  // Update user by ID
  async function updateUser(event) {
    event.preventDefault();
    const { error } = await supabase
      .from('user')
      .update({
        name: singleUser.name,
        age: singleUser.age
      })
      .eq('id', singleUser.id); // Ensure the correct user is being updated

    if (error) {
      console.log('Error updating user:', error);
    } else {
      console.log('User updated');
      setSingleUser({ id: null, name: '', age: '' }); // Reset form
      fetchUser(); // Refetch the data to update the list
    }                                                                  
  }

  // Function to populate form fields for editing
  function editUser(item) {
    setSingleUser({
      id: item.id, // Set the ID for updates
      name: item.name,
      age: item.age
    });
  }

  return (
    <>
      <form onSubmit={singleUser.id ? updateUser : insertUser}>
        <input
          type="text"
          name='name'
          value={singleUser.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="number"
          name='age'
          value={singleUser.age}
          onChange={handleChange}
          placeholder="Age"
          required
        />
        <button type='submit'>
          {singleUser.id ? 'Update User' : 'Insert User'}
        </button>
      </form>

      <h2>All data fetched from database users' table</h2>
      <ul>
        {user.map((item) => (
          <li key={item.id}>
            Name: {item.name} - Age: {item.age} -  
            <button onClick={() => editUser(item)}>Edit</button>
            <button onClick={() => deleteUser(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
 