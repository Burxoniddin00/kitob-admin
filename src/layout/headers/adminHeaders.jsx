"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Headers = () => {
  const [toggleState, setToggleState] = useState(1);
  const [step, setStep] = useState(true);
  const [f, setF] = useState(true);
  const [t, setT] = useState(true);
  const path = usePathname();
  const clerLoclaSorich = () => {
    localStorage.removeItem("token");
  };
  if (step) {
    if (path == "/admin") {
      setToggleState(1);
    } else if (path == "/users") {
      setToggleState(2);
    } else if (path == "/myProfilAdmin") {
      setToggleState(3);
    }
    setStep(false);
  }
  const toggleTab = (i) => {
    setT(true);
    if (i == 1) {
      setToggleState(1);
      setT(false);
    } else if (i == 2) {
      setToggleState(2);
      setT(false);
    } else if (i == 3) {
      setToggleState(3);
      setT(false);
    } else if (i == 4) {
      setToggleState(4);
      setT(false);
    }
  };
  const navOn = () => {
    setF(false);
  };
  const navOff = () => {
    setF(true);
  };
  return (
    <>
      <div className="sticky top-0 z-[98] dark:bg-gray-900 ">
        <nav className="bg-white  dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <button
              onClick={() => navOn()}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              type="button"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
            <Link
              onClick={() => toggleTab(1)}
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center mr-2 text-2xl font-semibold whitespace-nowrap dark:text-white">
                Kitob O'qing
              </span>
            </Link>

            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li onClick={() => toggleTab(1)}>
                  <Link
                    href={"/"}
                    className={
                      toggleState == 1
                        ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    }
                  >
                    Reyting
                  </Link>
                </li>
                <li onClick={() => toggleTab(2)}>
                  <Link
                    className={
                      toggleState == 2
                        ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    }
                    href={"/users"}
                  >
                    Userlar
                  </Link>
                </li>
                <li onClick={() => toggleTab(3)}>
                  <Link
                    className={
                      toggleState == 3
                        ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    }
                    href={"/myProfilAdmin"}
                  >
                    Mening profilim
                  </Link>
                </li>
                <li onClick={() => clerLoclaSorich()}>
                  <Link
                    href={"/login"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Chiqish
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <ul
        className={
          f
            ? "hidden"
            : "w-[200px]  absolute top-0 z-[99] font-medium h-[100vh]  flex flex-col p-4 md:p-0   border-gray-100  bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 "
        }
      >
        <li className="text-2xl text-white mb-9 " onClick={() => navOff()}>
          <p className="absolute right-5 cursor-pointer">
            <AiOutlineClose />
          </p>
        </li>
        <li
          onClick={() => {
            toggleTab(1), navOff();
          }}
        >
          <Link
            href={"/admin"}
            className={
              toggleState == 1
                ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            }
          >
            Reyting
          </Link>
        </li>
        <li
          onClick={() => {
            toggleTab(2), navOff();
          }}
        >
          <Link
            className={
              toggleState == 2
                ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            }
            href={"/users"}
          >
            Userlar
          </Link>
        </li>
        <li
          onClick={() => {
            toggleTab(3), navOff();
          }}
        >
          <Link
            className={
              toggleState == 3
                ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            }
            href={"/myProfilAdmin"}
          >
            Mening profilim
          </Link>
        </li>
        <li
          onClick={() => {
            clerLoclaSorich(), navOff();
          }}
        >
          <Link
            href={"/login"}
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Chiqish
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Headers;
