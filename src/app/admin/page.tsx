"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const AdminDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from("users").select("*");
        if (error) {
          throw error;
        }
        setUsers(data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const promoteToAdmin = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ role: "admin" })
        .eq("id", userId);

      if (error) throw error;

      alert("User promoted to admin!");
      setUsers(users.map((user) => (user.id === userId ? { ...user, role: "admin" } : user)));
    } catch (err) {
      alert("Failed to promote user to admin");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-user-list">
        <h2>All Users</h2>
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <p>{user.name} - {user.role}</p>
            {user.role !== "admin" && (
              <button onClick={() => promoteToAdmin(user.id)}>Promote to Admin</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
