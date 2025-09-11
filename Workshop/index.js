// add javascipt here
const COHORT = "2403-ftb-et-web-pt";

const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  events: [],
};

async function getAllEvents() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function addNewEvent() {
  try {
  } catch (error) {
    console.log(error);
  }
}

function deleteEvent() {
  try {
  } catch (error) {
    console.log(error);
  }
}

function renderEvents() {
  // add variable with container
  // add variable holding state.events
  // check to see if array is empty
  // clear html of container .innerHTML = "";
  // add div element with class and delete buttohn
  // append to container
}

function addListenerToForm() {}

async function render() {
  await getAllEvents();
  renderEvents();
}

render();
