// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  onChildChanged,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*
 * DISCLAIMER
 * Due to the deadline of my project so this config is a quick setup
 * for testing and demonstration. PLEASE don't try this on real productaion
 * it's not secure for your database because it's vulnurable information
 * of your database which anyone can use this to access it.
 * 
 * For anyone who want to try this one please create your own firebase project
 * and replace all the REDACT with your own configuration.
*/
const firebaseConfig = {
    apiKey: "REDACT",
    authDomain: "REDACT",
    databaseURL: "REDACT",
    projectId: "REDACT",
    storageBucket: "REDACT",
    messagingSenderId: "REDACT",
    appId: "REDACT",
    measurementId: "REDACT"
}
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(getDatabase());

let ListContainer = document.querySelector("#ListContainer");
let nav = document.querySelector("#navbar");
// let refresh_btn = document.getElementById('refresh_btn')
let slotLimit = 0;
let inUsed = 0;
let selector;

// REFRESH BUTTON

// refresh_btn.onclick = function(){
//   while (ListContainer.firstChild) {
//     ListContainer.removeChild(ListContainer.firstChild);
//   }
//   get(child(dbRef, selector))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         // slotLimit = Object.keys(snapshot.val()).length;
//         // inUsed = Object.values(snapshot.val()).filter((value) => value === false).length;
//         // console.log(slotLimit, inUsed);

//         snapshot.forEach((index) => {
//           parkRender(index);
//         });
//       } else {
//         console.log("No data available");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// Call when open thhe website

const homeRender = () => {
  get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((place) => {placeRender(place);});
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

//Render first place

const placeRender = (root) => {
  let li = document.createElement("li");
  let name = document.createElement("span");

  li.setAttribute("id", root.key);
  li.setAttribute("class", 'place');

  name.textContent = root.key;
  li.appendChild(name);

  li.addEventListener('click',function() {
    selector = this.id;
    let back_btn = document.createElement("p");
    let head = document.createElement("h2")
    document.getElementById('header').style.display = 'none'
    // refresh_btn.style.display = 'initial'

    back_btn.textContent = "back";
    head.textContent = selector;

    back_btn.addEventListener('click' , function() {
      while (ListContainer.firstChild) {
        ListContainer.removeChild(ListContainer.firstChild);
      }
      while (nav.firstChild) {
        nav.removeChild(nav.firstChild);
      }

      // off('child_changed', dbRef);
      update();

      homeRender()
      document.getElementById('header').style.display = 'block'
      // refresh_btn.style.display = 'none'
    });

    nav.appendChild(head)
    nav.appendChild(back_btn);

    // console.log();
    // getData(selector);
    while (ListContainer.firstChild) {
      ListContainer.removeChild(ListContainer.firstChild);
    }
    get(child(dbRef, selector)).then((snapshot) => {
      if (snapshot.exists()) {
        // slotLimit = Object.keys(snapshot.val()).length;
        // inUsed = Object.values(snapshot.val()).filter((value) => value === false).length;
        // console.log(slotLimit, inUsed);

        snapshot.forEach((index) => {
          parkRender(index);
        });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
        console.error(error);
    });

    const update = onChildChanged(ref(db, selector), (snapshot) => {
      const childKey = snapshot.key;
      const childData = snapshot.val();

      let li = document.getElementById(childKey);
      li.setAttribute("class", childData);
      console.log("changed",snapshot.key , snapshot.val() , selector);
    });
  });


  ListContainer.appendChild(li);
};

const parkRender = (index) => {
  let li = document.createElement("li");
  let slotName = document.createElement("span");

  li.setAttribute("id", index.key);
  li.setAttribute("class", index.val());
  
  slotName.textContent = index.key;
  slotName.style.padding = '2rem 3rem 2rem 3rem'
  li.appendChild(slotName);
  
  ListContainer.appendChild(li);
};

//FOR CHECKING OUTPUT

const getData = (id) => {
  get(child(dbRef, id))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

homeRender();

// get(child(dbRef, `BK000`)).then((snapshot) => {
//     if (snapshot.exists()) {
//         console.log(snapshot.val());
//     } else {
//         console.log("No data available");
//     }
// }).catch((error) => {
//     console.error(error);
// });
