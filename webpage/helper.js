// Import the functions you need from the SDKs you need
import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getDatabase,
    ref,
    child,
    get,
    onChildChanged,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*
 * NOTE! : 
 *  This would've been last version to be improve from conversation with my dev friend
 *  the conclusion was I should rebase this project with new infastructure so I can push the limit further.
 *
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

const init_database = () => {
    return (getDatabase(initializeApp(firebaseConfig)));
}

const get_dbref = (database) => {
    return (ref(database));
}

const get_root = (database_ref, render) => {
    get(database_ref).then((snapshot) => {
        if (snapshot.exists())
            snapshot.forEach((root) => {render(root)});
        else
            console.log("No data available");
    }).catch((error) => { console.error(error) });
}

const get_child = (database_ref, selector, render) => {
    get(child(database_ref, selector)).then((snapshot) => {
        if (snapshot.exists())
            snapshot.forEach((index) => {render(index)});
        else 
            console.log("No data available");
    }).catch((error) => { console.error(error) });
}

const incld_change_listener = (database, selector) => {
    onChildChanged(ref(database, selector), (snapshot) => {
        $(`#${snapshot.key}`).attr("class", snapshot.val());
        console.log("changed",snapshot.key , snapshot.val() , selector);
    });
}

export {init_database, get_dbref, get_root, get_child, incld_change_listener};
