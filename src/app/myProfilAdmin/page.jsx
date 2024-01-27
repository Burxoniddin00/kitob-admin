"use client";
import { API } from "@/api/api";
import { Loading } from "@/com/loading/lading";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [t, setT] = useState(false);
  const openModal = () => setShowModal(!showModal);

  const [obj, setObj] = useState({
    Email: "",
    LastName: "",
    Name: "",
    Password: "",
    Phone: "",
  });

  const router = useRouter();
  useEffect(() => {
    setT(true);
    let token = localStorage.getItem("token");
    if (token) {
      fetch(`${API}admin`, {
        headers: {
          token,
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.statsu !== 201) {
            localStorage.removeItem("token");
            router.push("/login");
          } else {
            setData(data.data);
          }
        });
      setT(false);
    } else {
      router.push("/login");
    }
  }, [router]);

  const onChangeItem = (id) => {
    let token = localStorage.getItem("token");
    setT(true);
    if (token) {
      if (obj.Email || obj.LastName || obj.Name || obj.Password || obj.Phone) {
        if (obj.Password) {
          if (obj.Password.length > 7) {
            fetch(`${API}admin/${id}`, {
              headers: {
                "Content-Type": "application/json",
                token,
              },
              method: "PUT",
              body: JSON.stringify({
                Email: obj.Email,
                LastName: obj.LastName,
                Name: obj.Name,
                Password: obj.Password,
                Phone: obj.Phone,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.statsu !== 201) {
                  toast.error(data.message);
                } else {
                  setShowModal(false);
                  toast.success(data.message);
                  setData(data.data);
                }
              });
          } else {
            toast.warning("Siz parolni 8tadan ko'proq qo'yishing kerak");
          }
        } else {
          fetch(`${API}admin/${id}`, {
            headers: {
              "Content-Type": "application/json",
              token,
            },
            method: "PUT",
            body: JSON.stringify({
              Email: obj.Email,
              LastName: obj.LastName,
              Name: obj.Name,
              Password: obj.Password,
              Phone: obj.Phone,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.statsu !== 201) {
                toast.error(data.message);
              } else {
                setShowModal(false);
                toast.success(data.message);
                setData(data.data);
              }
            });
        }
      } else {
        toast.warning("Malumot birontasin o'zgartring");
      }
    } else {
      router.push("/login");
    }
    setT(false);
    setObj({
      Email: "",
      LastName: "",
      Name: "",
      Password: "",
      Phone: "",
    });
  };

  return (
    <div>
      <Loading setTrue={t} />
      <ToastContainer />
      {data
        ? data.map((u, i) => (
            <div key={i}>
              <ul
                className={
                  showModal
                    ? "hidden"
                    : "w-full bg-[#202d36] text-white border-solid border-2 border-sky-500 p-2 rounded-md ml-auto mr-auto mt-5 mb-5"
                }
              >
                <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                  <h2 className="text-xl max-md:text-lg">Ismingiz:</h2>
                  <h2>{u.Name}</h2>
                </li>
                <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                  <h2 className="text-xl max-md:text-lg">Familiyangiz:</h2>
                  <h2>{u.LastName}</h2>
                </li>
                <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                  <h2 className="text-xl max-md:text-lg">Telefon raqam:</h2>
                  <div className="flex">
                    <p className="border-r-2 mr-1 border-sky-500">+998</p>
                    <h2>{u.Phone}</h2>
                  </div>
                </li>
                <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                  <h2 className="text-xl max-md:text-lg ">Gmail:</h2>
                  <h2>{u.Email}</h2>
                </li>
                <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                  <h2 className="text-xl max-md:text-lg">Parol:</h2>
                  <h2>{u.Password}</h2>
                </li>
              </ul>
              <ul
                className={
                  showModal
                    ? "w-full bg-[#202d36] text-white border-solid border-2 border-sky-500 p-2 rounded-md ml-auto mr-auto mt-5 mb-5"
                    : "hidden"
                }
              >
                <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                  <h2 className="text-xl max-md:text-lg">Ismingiz:</h2>
                  <input
                    onChange={(e) => setObj({ ...obj, Name: e.target.value })}
                    type="text"
                    defaultValue={u.Name}
                    className="bg-transparent outline-none rounded-lg text-end border-solid border-2 border-white pl-2 pr-2"
                  />
                </li>
                <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                  <h2 className="text-xl max-md:text-lg">Familiyangiz:</h2>
                  <input
                    onChange={(e) =>
                      setObj({ ...obj, LastName: e.target.value })
                    }
                    type="text"
                    defaultValue={u.LastName}
                    className="bg-transparent outline-none rounded-lg text-end border-solid border-2 border-white pl-2 pr-2"
                  />
                </li>
                <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                  <h2 className="text-xl max-md:text-lg">Telefon raqam:</h2>
                  <div className="flex items-center border-solid border-2 gap-5 rounded-md justify-end	w-[236px] border-white pl-2 pr-2">
                    <p className="border-r-2 border-sky-500">+998</p>
                    <input
                      onChange={(e) =>
                        setObj({ ...obj, Phone: e.target.value })
                      }
                      type="number"
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 9);
                      }}
                      defaultValue={Number(u.Phone)}
                      className="bg-transparent outline-none rounded-lg text-end max-w-[90px]"
                    />
                  </div>
                </li>
                <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                  <h2 className="text-xl max-md:text-lg ">Gmail:</h2>
                  <input
                    type="text"
                    onChange={(e) => setObj({ ...obj, Email: e.target.value })}
                    defaultValue={u.Email}
                    className="bg-transparent outline-none rounded-lg text-end border-solid border-2 border-white pl-2 pr-2"
                  />
                </li>
                <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                  <h2 className="text-xl max-md:text-lg">Parol:</h2>
                  <input
                    type="text"
                    onChange={(e) =>
                      setObj({ ...obj, Password: e.target.value })
                    }
                    defaultValue={u.Password}
                    className="bg-transparent outline-none rounded-lg text-end border-solid border-2 border-white pl-2 pr-2"
                  />
                </li>
              </ul>
              <div className="text-end">
                <div className={showModal ? "" : "hidden"}>
                  <button
                    onClick={() => openModal()}
                    className="bg-[#202d36] rounded-xl text-white p-2"
                  >
                    Qaytish
                  </button>
                  <button
                    onClick={() => onChangeItem(u._id)}
                    className="bg-[#202d36] rounded-xl text-white p-2 ml-3"
                  >
                    O'zgartrish
                  </button>
                </div>
                <button
                  onClick={() => openModal()}
                  className={
                    showModal
                      ? "hidden"
                      : "bg-[#202d36] rounded-xl text-white p-2 "
                  }
                >
                  Ma'lumotlarni o'zgartirish
                </button>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default Page;
