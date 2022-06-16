// package imports
import React, { useState, useEffect } from "react";
import FirestoreService from "../../utils/services/FirestoreService";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import {
  doc,
  onSnapshot,
  addDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { db } from "../../utils/firestore.js";

// components

import CardSettings from "../../components/Cards/CardForm";
import HeaderStats from "../../components/Headers/HeaderStats";
import FooterAdmin from "../../components/Footers/FooterAdmin";

// navigation
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminNavbar from "../../components/Navbars/AdminNavbar";

export default function Settings() {
  const handleModalClose = () => {
    setShowAddEditForm(false);
    setShowDeleteDialogue(false);
    setAddEditFormType("Add");
    setCurrentMenuItemId("");
    setCurrentMenuItem({
      customerName: "",
      customerEircode: "",
      customerPhone: "",
      customerEmail: "",
      customerAddress: "",
    });
  };

  const [currentMenuItem, setCurrentMenuItem] = useState({
    customerName: "",
    customerEircode: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
  });

  const [currentMenuItemId, setCurrentMenuItemId] = useState("");

  const handleAddEditFormSubmit = (e) => {
    e.preventDefault();
    const {
      enquiryID,
      customerName,
      customerEircode,
      customerPhone,
      customerEmail,
      customerAddress,
    } = e.target.elements;
    if (customerEircode.value && customerName.value) {
      if (addEditFormType === "Add") {
        FirestoreService.AddNewEnquiry(
          customerName.value,
          customerEircode.value,
          customerPhone.value,
          customerEmail.value,
          customerAddress.value
        )
          .then(() => {
            alert(`${customerName.value} is successfully added to the menu.`);
            setCurrentMenuItem({
              customerName: "",
              customerEircode: "",
              customerPhone: "",
              customerEmail: "",
              customerAddress: "",
            });
            handleModalClose();
            window.location.reload();
          })
          .catch((e) => {
            alert("Error occured: " + e.message);
          });
      }
    } else if (addEditFormType === "Edit") {
      FirestoreService.UpateEnquiry(
        enquiryID,
        customerName.value,
        customerEircode.value,
        customerPhone.value
      )
        .then(() => {
          alert(`${customerName.value} is successfully updated.`);
          setCurrentMenuItemId("");
          setCurrentMenuItem({
            customerName: "",
            customerEircode: "",
            customerPhone: "",
            customerEmail: "",
            customerAddress: "",
          });
          handleModalClose();
          window.location.reload();
        })
        .catch((e) => {
          alert("Error occured: " + e.message);
        });
    }
    setValidated(true);
  };

  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);

  const handleMenuItemDelete = (e) => {
    //setIsLoading(true);
    FirestoreService.DeleteMenuItem(currentMenuItemId)
      .then(() => {
        alert(`Deletion Successful`);
        handleModalClose();
        window.location.reload();
      })
      .catch((e) => {
        alert("Error occured: " + e.message);
      });
  };

  const [user, setUser] = useState(null);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  //
  //   I am here!!!! Update Firebase REFS
  //

  //k,.
  const [menuItems, setMenuItems] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);

  function fetchMenuCategories() {
    FirestoreService.getAllEnquiryCategories()
      .then((response) => {
        setMenuCategories(response._delegate._snapshot.docChanges);
      })
      .catch((e) => {
        alert("Error occured while fetching the menu categories. " + e);
      });
  }

  function fetchMenuItems() {
    FirestoreService.getAllEnquiries()
      .then((response) => {
        setMenuItems(response._delegate._snapshot.docChanges);
      })
      .catch((e) => {
        alert("Error occured while fetching the menu item. " + e);
      });
  }
  useEffect(() => {
    if (user !== null) {
      if (menuCategories.length <= 0) {
        fetchMenuCategories();
      }
      fetchMenuItems();
    }
  }, [user]);

  const [showModal, setShowModal] = React.useState(false);
  const [showCustModal, setShowCustModal] = React.useState(false);

  //new functions for create/delete in firebase
  const [popupActive, setPopupActive] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    customerAddress: "",
    customerEircode: "",
    customerEmail: "",
    customerName: "",
    customerPhone: "",
  });

  const recipesCollectionRef = collection(db, "enquiries");

  useEffect(() => {
    onSnapshot(recipesCollectionRef, (snapshot) => {
      setRecipes(
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

  const handleView = (id) => {
    const recipesClone = [...recipes];

    recipesClone.forEach((recipe) => {
      if (recipe.id === id) {
        recipe.viewing = !recipe.viewing;
      } else {
        recipe.viewing = false;
      }
    });

    setRecipes(recipesClone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      // !form.customerAddress ||
      !form.customerEircode ||
      // !form.customerEmail ||
      !form.customerName //||
      // !form.customerPhone
    ) {
      alert("Please fill out all fields");
      return;
    }

    addDoc(recipesCollectionRef, form);

    setForm({
      customerAddress: "",
      customerEircode: "",
      customerEmail: "",
      customerName: "",
      customerPhone: "",
    });

    setPopupActive(false);
  };
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap">
            <div className="w-full lg:full px-4">
              <CardSettings />
            </div>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

Settings.getLayout = function getLayout(page) {
  return <Admin>{page}</Admin>;
};
