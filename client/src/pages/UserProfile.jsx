import Header from "@/components/Header";
import { UserContext } from "@/context/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <section className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-3xl mx-auto mt-12 px-4">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-2xl font-semibold mb-6">
            Hello, <span className="text-indigo-600">{user.name}</span>
          </h1>

          <div className="space-y-4 text-gray-700">
            <ProfileRow label="Name" value={user.name} />
            <ProfileRow label="Email" value={user.email} />
            <ProfileRow label="Phone" value={user.phone || "—"} />
          </div>

          {/* Future action */}
          {/* 
          <div className="mt-8">
            <button className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
              Edit Profile
            </button>
          </div> 
          */}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Small Reusable Component ---------------- */

const ProfileRow = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="font-medium text-gray-500">{label}</span>
    <span className="text-gray-900">{value}</span>
  </div>
);
