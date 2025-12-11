"use client";
import React, { useState } from "react";

interface LoginData {
  phone: string;
  role: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    phone: "",
    role: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMsg("");

    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("Login Response:", data);

    if (data.error) {
      setErrorMsg(data.error);   // ❌ backend error
      setLoading(false);
      return;
    }

    setFormData({ phone: "", role: "" });
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Login successfully!
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errorMsg}
          </div>
        )}

        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          className="border rounded-lg px-3 py-1 w-full"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border rounded-lg px-3 py-1 w-full"
          required
        >
          <option value="">Select role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {loading ? "sending..." : "submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;
