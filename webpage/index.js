/*
 * This's version I implemented with JQuery also separate and rewrite some process into function
 * that occur in many function.
 * 
 * * NOTE! : 
 *  This would've been last version to be improve from conversation with my dev friend
 *  the conclusion was I should rebase this project with new infastructure so I can push the limit further.
*/
import {
  init_database,
  get_dbref,
  get_root,
  get_child,
  incld_change_listener
} from "./helper.js";

// Initialize Firebase
const db = init_database();
const dbRef = get_dbref(db);

let ListContainer = $("#ListContainer");
let nav = $("#navbar");
let selector;

/* REFRESH BUTTON : 
 *It's not necessary now because the list will update itself
 *by the onChlidchange function.
*/
// $("#refresh_btn").click(function() {
//   $(ListContainer).empty();
//   get_child(dbRef, selector, parkRender);
// });

//Render place

const placeRender = (root) => {
  let li = $("<li></li>").attr({"id" : root.key, "class" : "place"});
  let name = $(`<span>${root.key}</span>`);
  $(li).append(name);
  
  $(li).click( function() {
    selector = this.id;
    let back_btn = $("<p>back</p>");
    let head = $(`<h2>${selector}</h2>`);
    $('#header').css("display", 'none');
    $('#refresh_btn').css("display", 'initial');
    
    $(ListContainer).empty();
    get_child(dbRef, selector, parkRender);
    incld_change_listener(db, selector);

    $(back_btn).click(() => {
      $(ListContainer).empty();
      $(nav).empty();
      $('#refresh_btn').css("display", 'none');
      $('#header').css("display", 'block');
      Main();
    });

    $(nav).append(head)
    $(nav).append(back_btn);
  });

  $(ListContainer).append(li);
};

const parkRender = (index) => {
  let li = $("<li></li>").attr({"id" : index.key, "class" : index.val() });
  let slotName = $("<span></span>").text(index.key).css("padding", "2rem 3rem 2rem 3rem");
  $(li).append(slotName);
  $(ListContainer).append(li);
};

//Call when open the website

const Main = () => {
  get_root(dbRef, placeRender);
};

Main();
