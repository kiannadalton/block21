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
        location,
      }),
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
      method: "DELETE",
    });

    getAllEvents();
  } catch (error) {
    console.log(error);
  }
}

//* Completed
function renderEvents() {
  const eventContainer = document.getElementById("party-container");
  const eventList = state.events;
  // check to see if array is empty
  if (eventList.length === 0) {
    eventContainer.innerHTML = "<h3>No events are planned at this time.</h3>";
    return;
  }
  // clears html of container
  eventContainer.innerHTML = "";

  eventList.forEach((party) => {
    const eventCard = document.createElement("div");
    eventCard.classList = "party-card";
    eventCard.innerHTML = `
        <h3>${party.name}</h3>
        <p>${party.description}</p>
        <p>${party.date}</p>
        <p>${party.location}</p>
        <button class="delete-button" data-id="${party.id}">Delete</button>
        `;

    eventContainer.appendChild(eventCard);

    //use eventCard instead of document
    const deleteButton = eventCard.querySelector(".delete-button");

    deleteButton.addEventListener("click", (event) => {
      try {
        event.preventDefault();
        deleteEvent(party.id);
      } catch (error) {
        console.log(error);
      }
    });
  });
}

function addListenerToForm() {
  // make sure to add event.preventDefault();
}

async function render() {
  await getAllEvents();
  renderEvents();
}

render();
