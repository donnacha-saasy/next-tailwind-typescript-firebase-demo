import React from "react";

// components

import Enquiries from "../../components/Cards/EnquiriesCard";
import FooterAdmin from "../../components/Footers/FooterAdmin";
import HeaderStats from "../../components/Headers/HeaderStats";

// navigation
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminNavbar from "../../components/Navbars/AdminNavbar";

export default function Tables() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStats />
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <Enquiries color="light" />
          </div>
        </div>
        <FooterAdmin />
      </div>
    </>
  );
}
