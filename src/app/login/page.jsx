"use client";
import { API } from "@/api/api";
import { Loading } from "@/com/loading/lading";
import Link from "next/link";
import { useState } from "react";
import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [t, setT] = useState(false);

  let handleSubmit = async () => {
    setT(true);
    if (email && password) {
      fetch(`${API}admin`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.statsu < 404) {
            localStorage.setItem("token", data.Token);
            location.replace("/");
          } else {
            toast.error(data.message);
          }
        });
    } else {
      toast.warning(`Siz ${email ? "Parol" : "Email"} yozishni unitdingiz !!`);
    }
    setT(false);
  };

  return (
    <>
      <Loading setTrue={t} />
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <ToastContainer />
        <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-bold text-center text-gray-700">
            Kirish
          </h1>
          <div className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-2">
              <button
                onClick={(e) => handleSubmit()}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
