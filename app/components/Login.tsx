'use client'
import React, { useState } from "react";

interface User {
  phone: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<User>({
    phone: "",
    password: "",
  });
  const[loading,setLoading] = useState(false);
  const [success,setSuccess] = useState(false)

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
    setSuccess(false)

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Login response:", data);

      setFormData({ phone: "", password: "" });
      setSuccess(true)
      setLoading(false)

    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Login successfully!
          </div>
        )}

        
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
          className="bg-blue-600 text-white px-4 py-1 rounded-lg mt-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
