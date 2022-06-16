import { PaperClipIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";

//import FirestoreService from "../utils/services/FirestoreService";
import FirestoreService from "../../utils/services/FirestoreService";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import PropTypes from "prop-types";

import {
  doc,
  onSnapshot,
  addDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { db } from "../../utils/firestore.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Enquiries({ color }) {
  //Firebase authentication
  const [user, setUser] = useState(null);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  // State for getting/setting enquiries and categories
  const [enquiryItems, setEnquiryItems] = useState([]);
  const [enquiryCategories, setEnquiryCategories] = useState([]);

  //Firebase function to retrieve enquiry categories
  function fetchEnquiryCategories() {
    FirestoreService.getAllEnquiryCategories()
      .then((response) => {
        setEnquiryCategories(response._delegate._snapshot.docChanges);
      })
      .catch((e) => {
        alert("Error occured while fetching the enquiry categories. " + e);
      });
  }
  //Firebase function to retrieve enquiries
  function fetchEnquiryItems() {
    FirestoreService.getAllEnquiries()
      .then((response) => {
        setEnquiryItems(response._delegate._snapshot.docChanges);
      })
      .catch((e) => {
        alert("Error occured while fetching the enquiry item. " + e);
      });
  }
  useEffect(() => {
    if (user !== null) {
      if (enquiryCategories.length <= 0) {
        fetchEnquiryCategories();
      }
      fetchEnquiryItems();
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col mx-auto">
        <div className="container px-4 mx-auto mt-20">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden  border-gray-200 sm:rounded-lg">
              <div>
                <div>
                  {/* Main enquiry tables */}

                  <>
                    <div
                      className={
                        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                        (color === "light"
                          ? "bg-white"
                          : "bg-blueGray-700 text-white")
                      }
                    >
                      <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                              className={
                                "font-semibold text-lg " +
                                (color === "light"
                                  ? "text-blueGray-700"
                                  : "text-white")
                              }
                            >
                              Customer Enquiry Tables
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="block w-full overflow-x-auto">
                        {/* Customer Enquiry Table */}

                        <table className="items-center w-full bg-transparent border-collapse">
                          <thead>
                            <tr>
                              <th
                                className={
                                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                  (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                              >
                                Customer Name
                              </th>
                              <th
                                className={
                                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                  (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                              >
                                Customer Eircode
                              </th>
                              <th
                                className={
                                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                  (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                              >
                                Customer Phone
                              </th>
                              <th
                                className={
                                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                  (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                              >
                                Customer Email
                              </th>
                              <th
                                className={
                                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                  (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                              >
                                Completion
                              </th>
                              <th
                                className={
                                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                  (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                              >
                                More
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {enquiryItems &&
                              enquiryItems.map((menuItem, index) => (
                                <>
                                  <tr>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                      {
                                        menuItem.doc.data.value.mapValue.fields
                                          .customerName.stringValue
                                      }
                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                      {
                                        menuItem.doc.data.value.mapValue.fields
                                          .customerEircode.stringValue
                                      }
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                      <i className="fas fa-circle text-orange-500 mr-2"></i>{" "}
                                      {
                                        menuItem.doc.data.value.mapValue.fields
                                          .customerPhone.stringValue
                                      }
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                      {
                                        menuItem.doc.data.value.mapValue.fields
                                          .customerEmail.stringValue
                                      }
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                      <div className="flex items-center">
                                        <button className="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">
                                          Due today at 18:00
                                        </button>
                                      </div>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                      <div className="flex items-center">
                                        <button className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
                                          View
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
Enquiries.defaultProps = {
  color: "light",
};

Enquiries.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
