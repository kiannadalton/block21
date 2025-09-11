const COHORT = "2403-ftb-et-web-pt";

const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  events: [],
};

//* Completed
async function getAllEvents() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    state.events = data.data;
    // artists will be rendered in the render function below.
  } catch (error) {
    console.log(error);
  }
}

//* Completed
async function addNewEvent(name, description, date, location) {
  try {
    await fetch(API_URL, {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        date,
        location
      })
    });

    getAllEvents();
  } catch (error) {
    console.log(error);
  }
}

//* Completed
async function deleteEvent(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    getAllEvents();
  } catch (error) {
    console.log(error);
  }
}

function renderEvents() {
  const eventContainer = document.getElementById("party-container");
  const eventList = state.events;
  // check to see if array is empty
  if(eventList.length === 0){
    eventContainer.innerHTML = "<h3>No events are planned at this time.</h3>";
    return;
  }
  // clear html of container .innerHTML = "";

  // add div element with class and delete buttohn
  // append to container
}

function addListenerToForm() {
  // make sure to add event.preventDefault();
}

async function render() {
  await getAllEvents();
  renderEvents();
}

render();
