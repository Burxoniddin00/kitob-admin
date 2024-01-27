"use client";
import { API } from "@/api/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import Modal from "@/com/modal/deltModal";
import DeltUsersModal from "@/com/modal/delteUsers";

const Page = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = useState([]);
  const [books, setBooks] = useState("");
  const [showModalUsers, setShowModalUsers] = useState(false);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleOpenBook = (value) => setBooks(books === value ? "" : value);
  const handleOpenModal = () => setShowModal(!showModal);
  const UsershandleOpenModal = () => setShowModalUsers(!showModalUsers);
  const [usersId, setUsersId] = useState("");
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(`${API}admin/users`, {
        headers: {
          "Content-Type": "application/json",
          token,
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status <= 201) {
            setData(data.data);
          } else {
            toast.warning(data.message);
          }
        });
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <ToastContainer />
      {data
        ? data.map((e, i) => (
            <Accordion
              id={e._id}
              open={open === i + 1}
              key={i}
              className="mt-10 mb-10 bg bg-[#202d36]  text-white p-2 rounded-lg border-solid border-2 border-sky-500"
            >
              <AccordionHeader onClick={() => handleOpen(i + 1)}>
                <div className=" w-full flex justify-between ">
                  <p>{e.LastName}</p>
                  <MdDeleteForever
                    size={25}
                    color="red"
                    onClick={() => {UsershandleOpenModal(),setUsersId(e._id)}}
                  />
                </div>
              </AccordionHeader>
              <AccordionBody className="text-white mt-2">
                <ul className="w-full bg-[#202d36] text-white border-solid border-2 border-sky-500 p-2 rounded-md ml-auto mr-auto mt-5 mb-5">
                  <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                    <h2 className="text-xl max-md:text-lg">Ismingiz:</h2>
                    <h2>{e.Name}</h2>
                  </li>
                  <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                    <h2 className="text-xl max-md:text-lg">Familiyangiz:</h2>
                    <h2>{e.LastName}</h2>
                  </li>
                  <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                    <h2 className="text-xl max-md:text-lg">Telefon raqam:</h2>
                    <h2>{e.Phone}</h2>
                  </li>
                  <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                    <h2 className="text-xl max-md:text-lg ">Gmail:</h2>
                    <h2>{e.Email}</h2>
                  </li>
                  <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                    <h2 className="text-xl max-md:text-lg ">Paro :</h2>
                    <h2>{e.Password}</h2>
                  </li>
                  <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                    <h2 className="text-xl max-md:text-lg ">Ochilgan :</h2>
                    <h2>{e.created_at}</h2>
                  </li>
                </ul>
                {e.books
                  ? e.books.map((b, ke) => (
                      <Accordion
                        open={books === `month${ke}`}
                        key={ke}
                        className="mt-5"
                      >
                        <AccordionHeader
                          onClick={() => handleOpenBook(`month${ke}`)}
                        >
                          <div className=" w-full flex justify-between ">
                            <h1>{dayjs(b.created_at).format("YYYY/MM/DD")}</h1>

                            <MdDeleteForever
                              onClick={handleOpenModal}
                              size={25}
                              color="red"
                            />
                          </div>
                        </AccordionHeader>
                        <AccordionBody className="text-white">
                          <Modal
                            showModal={showModal}
                            setShowModal={setShowModal}
                            id={b._id}
                            setData={setData}
                          />

                          <div className="border-2 rounded-md mt-2 p-2">
                            <div className="flex justify-between text-white mt-3 text-xl border-b-2">
                              <h2>{b.booksName}</h2>
                              <h2>{b.booksPage} Bet</h2>
                            </div>
                            <p className="text-white mt-2">{b.booksComment}</p>
                          </div>
                        </AccordionBody>
                      </Accordion>
                    ))
                  : ""}
              </AccordionBody>
              <DeltUsersModal
                setShowModalUsers={setShowModalUsers}
                showModalUsers={showModalUsers}
                usersId={usersId}
                setData={setData}
              />
            </Accordion>
          ))
        : ""}
    </>
  );
};

export default Page;
