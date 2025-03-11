"use client";

import { ReactNode, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface User {
  phone: ReactNode;
  name: any;
  status: string;
  id: number;
  email: string;
  role: string;
}

const usersData = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", status: "Pending" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", status: "Active" },
  { id: 3, name: "David Lee", email: "david@example.com", phone: "555-123-4567", status: "Blocked" },
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const handleAction = (id: number, action: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: action } : user
      )
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      (filter === "All" || user.status === filter) &&
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()))
  );


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Error fetching users:", error);
    } else {
      setUsers(data);
    }
    setLoading(false);
  };

  //  Delete User
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) {
      console.error("Error deleting user:", error);
    } else {
      //setUsers(users.filter((user) => user.id !== id));
    }
  };

  //  Edit User (Show Modal)
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setNewRole(user.role);
  };

  //  Save Updated Role
  const handleSave = async () => {
    if (!editingUser) return;
    const { error } = await supabase
      .from("users")
      .update({ role: newRole })
      .eq("id", editingUser.id);

    if (error) {
      console.error("Error updating user:", error);
    } else {
      setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, role: newRole } : user)));
      setEditingUser(null);
    }
  };

  // return (
  //   <div>
  //     <h1 className="text-2xl font-bold mb-6">User Management</h1>
  //     {loading ? (
  //       <p>Loading users...</p>
  //     ) : (
  //       <table className="w-full border-collapse border border-gray-300">
  //         <thead>
  //           <tr className="bg-gray-200">
  //             <th className="border p-2">ID</th>
  //             <th className="border p-2">Email</th>
  //             <th className="border p-2">Role</th>
  //             <th className="border p-2">Actions</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {users.map((user) => (
  //             <tr key={user.id}>
  //               <td className="border p-2">{user.id}</td>
  //               <td className="border p-2">{user.email}</td>
  //               <td className="border p-2">{user.role}</td>
  //               <td className="border p-2 flex gap-2">
  //                 <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-3 py-1 rounded">
  //                   Edit
  //                 </button>
  //                 <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded">
  //                   Delete
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     )}

  //     {/* Edit User Modal */}
  //     {editingUser && (
  //       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  //         <div className="bg-white p-6 rounded shadow-lg">
  //           <h2 className="text-xl font-bold mb-4">Edit User Role</h2>
  //           <label className="block mb-2">Role:</label>
  //           <input
  //             type="text"
  //             value={newRole}
  //             onChange={(e) => setNewRole(e.target.value)}
  //             className="border p-2 rounded w-full"
  //           />
  //           <div className="flex justify-end gap-2 mt-4">
  //             <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
  //             <button onClick={() => setEditingUser(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );


  return (
    <div className="p-5 mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="p-2 border rounded w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="p-2  border rounded"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border">
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">{user.phone}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        user.status === "Active"
                          ? "bg-green-500"
                          : user.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3 border flex gap-2">
                    {user.status !== "Active" && (
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleAction(user.id, "Active")}
                      >
                        Approve
                      </button>
                    )}
                    {user.status !== "Blocked" && (
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleAction(user.id, "Blocked")}
                      >
                        Block
                      </button>
                    )}
                    <button
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                      onClick={() =>
                        setUsers((prevUsers) =>
                          prevUsers.filter((u) => u.id !== user.id)
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-3 text-center text-red-600">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
