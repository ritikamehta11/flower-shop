import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Users = () => {

  const [Users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const getUsers = async () => {
      
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://flower-shop-backend-81tw.onrender.com/api/auth/users', {
          headers: {
            Authorization: `Bearer ${token}` // Pass token if authentication is required
          }
        });

        setUsers(response.data)
      } catch (error) {
        console.log(error);
      }

    };

    getUsers();
  },[]);




  // const handleAllOrders = () => {
    
  // }

  const handleDelete = async(id) => {
    
    try {
      const newUsers = Users.filter((user) => user._id !== id);
    setUsers(newUsers);

      await axios.delete(`https://flower-shop-backend-81tw.onrender.com/api/auth/delete/${id}`);
      setMessage("deleted successfully");
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      setMessage(error);
    }
  }
  return (
    <>
      <section className="users-table">
        <h3>Users</h3>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 mr-2 rounded hover:bg-blue-700"
                    
                  >
                    All Orders
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <p>{message}</p>
        </table>
        </section>
    </>

  )
}
 