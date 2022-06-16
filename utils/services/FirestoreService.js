import { db } from "../firestore";

//retrieves all enquiries from firebase
function getAllEnquiries() {
  return new Promise((resolve, reject) => {
    db.collection("enquiries")
      .get()
      .then((allEnquiries) => {
        resolve(allEnquiries);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

//retrieves all enquiry catagories from Firebase
function getAllEnquiryCategories() {
  return new Promise((resolve, reject) => {
    db.collection("enquiryCatagory")
      .get()
      .then((allEnquirryCategories) => {
        resolve(allEnquirryCategories);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
//Add new enquiry to firebase
function AddNewEnquiry(
  customerName,
  customerEircode,
  customerPhone,
  customerEmail,
  customerAddress
) {
  return new Promise((resolve, reject) => {
    const data = {
      customerName,
      customerEircode,
      customerPhone,
      customerEmail,
      customerAddress,
    };
    db.collection("enquiries")
      .add(data)
      .then((docRef) => {
        resolve(docRef);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
//Update enquiry details in Firebase
function UpateEnquiry(
  enquiryID,
  customerName,
  customerEircode,
  customerPhone,
  customerEmail,
  customerAddress
) {
  return new Promise((resolve, reject) => {
    const data = {
      customerName,
      customerEircode,
      customerPhone,
      customerEmail,
      customerAddress,
    };
    db.collection("enquiries")
      .doc(enquiryID)
      .update(data)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
}
//Delete enquiry in Firebase
function DeleteEnquiry(enquiryID) {
  return new Promise((resolve, reject) => {
    db.collection("enquiries")
      .doc(enquiryID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export default {
  getAllEnquiries,
  getAllEnquiryCategories,
  AddNewEnquiry,
  UpateEnquiry,
  DeleteEnquiry,
};
