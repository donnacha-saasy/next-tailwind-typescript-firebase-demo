// package imports
import React, { useState, useEffect } from "react";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { onSnapshot, addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firestore.js";

export default function CardSettings() {
  //Functions for create/delete in firebase

  const [enquiries, setEnquiries] = useState([]);
  //set defualt state for the form
  const [form, setForm] = useState({
    customerAddress: "",
    customerEircode: "",
    customerEmail: "",
    customerName: "",
    customerPhone: "",
    customerMobile: "",
    customerCity: "",
    customerCountry: "",
    customerNotes: "",
  });

  //set which collection to write to in firebase db
  const enquiriesCollectionRef = collection(db, "enquiries");

  useEffect(() => {
    onSnapshot(enquiriesCollectionRef, (snapshot) => {
      setEnquiries(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            viewing: false,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  //handle submit function. Prevent submission if blank fields, //TODO: add validation with yup
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.customerAddress ||
      !form.customerEircode ||
      !form.customerEmail ||
      !form.customerName ||
      !form.customerPhone ||
      !form.customerEircode
    ) {
      alert("Please fill out all fields");
      return;
    }
    //adds document to collection in firebase
    addDoc(enquiriesCollectionRef, form);
    //setter for form input
    setForm({
      customerAddress: "",
      customerEircode: "",
      customerEmail: "",
      customerName: "",
      customerPhone: "",
      customerMobile: "",
      customerCity: "",
      customerCountry: "",
      customerNotes: "",
    });
  };
  return (
    <>
      {/* Create customer form  */}
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Create Customer
            </h6>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blueGray-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={form.customerName}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Customer Name"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        customerName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    value={form.customerEmail}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="email@example.com"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        customerEmail: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Mobile
                  </label>
                  <input
                    type="text"
                    value={form.customerMobile}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="083 123 4567"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        customerMobile: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    value={form.customerPhone}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="091 123 4567"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        customerPhone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Contact Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    value={form.customerAddress}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Customer address"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        customerAddress: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    value={form.customerCity}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Limerick"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        customerCity: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    value={form.customerCountry}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Ireland"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        customerCountry: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Eircode
                  </label>
                  <input
                    type="text"
                    value={form.customerEircode}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="T21H934"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        customerEircode: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Customer Notes
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Notes
                  </label>
                  <textarea
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows={4}
                    value={form.customerNotes}
                    placeholder="Enter customer notes"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        customerNotes: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
