"use client";
import React, { useState } from "react";

interface FormData {
  name: string;
  role: string;
  phone: string;
  password: string;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    role: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
     
        console.error("Validation errors:", data);
        setError(
          typeof data === "object"
            ? Object.values(data).flat().join(", ")
            : "Registration failed"
        );
        return;
      }

      console.log("Success:", data);
      setSuccess(true);
      

      setFormData({
        name: "",
        role: "",
        phone: "",
        password: "",
      });
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-16 pt-8">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            User created successfully!
          </div>
        )}

        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            className="border rounded-lg outline-none px-3 py-1 w-full"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <select
            className="border rounded-lg outline-none px-3 py-1 w-full"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-lg outline-none px-3 py-1 w-full"
            required
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded-lg outline-none px-3 py-1 w-full"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;