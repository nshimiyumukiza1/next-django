"use client";
import React, { useEffect, useState } from "react";
import { User } from "./interface";

interface UsetDto {
  name: string;
  email: string;
}
const User = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<UsetDto>({ name: "", email: "" });
  const [editInput, setEditInput] = useState<UsetDto>({ name: "", email: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/users/");
      const data = await response.json();
      setUsers(data);
      console.log(data);
    };
    fetchUsers();
  }, []);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddUser = async (id: any) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setFormData({ name: "", email: "" });
      console.log("post be successfuly!", data);
      setUsers((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSubmit = async (e: any) => {
    e.preventDefault();

    if (!selectedId) return;
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/users/${selectedId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editInput),
        }
      );
      const data = await response.json();
      setUsers((prev) => prev.map((u) => (u.id === selectedId ? data : u)));
      setIsModalOpen({ name: "", email: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditChange = (e: any) => {
    const { name, value } = e.target;
    setEditInput((Prev) => ({ ...Prev, [name]: value }));
  };
  const openModal = (user: User) => {
    setSelectedId(user.id);
    setEditInput({ name: user.name, email: user.email });
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Delete be successufly!");
        return;
      }

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.log("error is", error);
    }
  };

  return (
    <div>
      <div className="pt-8 flex space-x-3">
        <input
          className="border border-blue-600 outline-none px-2 py-1 text-sm placeholder-text-sm"
          type="text"
          value={formData.name}
          name="name"
          onChange={handleChange}
          placeholder="name"
        />
        <input
          className="border border-blue-600 outline-none px-2 py-1 text-sm placeholder-text-sm"
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />

        <button
          onClick={handleAddUser}
          className="border rounded-md border-gray-200 px-2 py-1.5"
        >
          add user
        </button>
      </div>
      <div className="pt-4 px-8">
        {users.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <div className=" flex space-x-6">
              <button
                onClick={() => openModal(user)}
                className="text-blue-600 underline"
              >
                edit
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="text-red-600 underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="flex justify-center items-center">
          <div>
            <form
              onSubmit={handleUpdateSubmit}
              className="space-x-5 space-y-3"
              action="submit"
            >
              <input
                onChange={handleEditChange}
                name="name"
                value={editInput.name}
                className="border outline-none px-3 py-2.5 text-sm font-light"
                type="text"
                placeholder="name"
              />
              <input
                onChange={handleEditChange}
                name="email"
                value={editInput.email}
                className="border outline-none px-3 py-2.5 text-sm font-light"
                type="email"
                placeholder="email"
              />
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="border px-2 py-1 bg-gray-200 text-gray-800 "
                >
                  cancle
                </button>
                <button
                  type="submit"
                  className="border px-2 py-1 bg-green-600 text-white "
                >
                  save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
