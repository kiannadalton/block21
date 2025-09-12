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

    renderEvents();
  } catch (error) {
    console.log(error);
  }
}

//* Completed
async function addNewEvent(name, description, date, location) {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        // need to convert date so that it's readable to the API
        date: new Date(date).toISOString(),
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

    //use eventCard instead of document so that it attaches the click event with that card's specific id
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

//* Completed
function addListenerToForm() {
  const form = document.getElementById("new-party-form");
  // make sure to add event.preventDefault();
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await addNewEvent(
      form.name.value,
      form.description.value,
      form.date.value,
      form.location.value
    );

    // clears form
    form.name.value = "";
    form.description.value = "";
    form.date.value = "";
    form.location.value = "";
  });
}

async function render() {
  await getAllEvents();

  addListenerToForm();
}

render();
