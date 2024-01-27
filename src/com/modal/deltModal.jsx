import { API } from "@/api/api";
import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";

export default function Modal({ showModal, setShowModal, id, setData }) {
  const deleteBook = () => {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(`${API}userBooks/${id}`, {
        headers: {
          "Content-Type": "application/json",
          token,
        },
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status <= 201) {
            toast.success(data.message);
            setData(data.data);
          } else {
            toast.warning(data.message);
          }
        });
      setShowModal(false);
    } else {
      router.push("/login");
    }
  };
  return (
    <>
      <ToastContainer />

      {showModal ? (
        <>
          <div className="fixed justify-center items-center flex overflow-x-hidden overflow-y-auto  inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl max-md:max-w-[300px]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 max-md:p-3 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold max-md:text-xl text-black">
                    Siz rostan ham o'chirmoqchimsiz
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <MdClose />
                  </button>
                </div>
                <div className="relative p-6 flex-auto max-md:p-2">
                  <p className="my-4 text-black max-md:m-2 text-blueGray-500 text-lg leading-relaxed max-md:text-sm">
                    Siz o'chrib yuborgan malumot foydalanuvchidan ham o'chib
                    ketadi
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 max-md:p-2 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-700 font-bold uppercase text-sm px-6 py-3 max-md:px-2 max-md:py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => deleteBook()}
                  >
                    Ha
                  </button>
                  <button
                    className="bg-red-500 text-white active:bg-red-700 font-bold uppercase text-sm px-6 py-3 max-md:px-2 max-md:py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Yo'q
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}


Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
};
