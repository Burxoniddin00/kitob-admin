"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PropTypes from "prop-types";
import Headers from "./headers/adminHeaders";
import { Loading } from "@/com/loading/lading";
import { API } from "@/api/api";

const Layout = ({ children }) => {
  const router = usePathname();
  const [tt, setTT] = useState(false);
  const routers = useRouter();
  useEffect(() => {
    setTT(true);
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
            routers.push("/login");
          }
        });
    } else {
      routers.push("/login");
    }
    setTT(false);
  }, [routers]);
  let t = true;
  if (
    router == "/login" ||
    router == "/register" ||
    router == "/password" ||
    router == "/password2"
  ) {
    t = false;
  }
  return (
    <div>
      <Loading setTrue={tt} />
      {t ? <Headers /> : ""}
      <div className="container px-5 m-auto">{children}</div>
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
