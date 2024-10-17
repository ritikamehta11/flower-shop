import React, { useEffect, useState } from 'react'

export const Users = () => {

  const [Users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      
      try {
      
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
  },[Users]);




  // const handleAllOrders = () => {
    
  // }

  const handleDelete = (id) => {
    const newUsers = Users.filter((userId) => userId !== id);
    setUsers(newUsers);
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
              <tr key={user.id} className="text-center">
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
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </section>
    </>

  )
}
 