const COHORT = "2403-ftb-et-web-pt";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/artists`;

// === State ===

const state = {
  artists: [],
};

console.log(API_URL);
/** Updates state with artists from API */
async function getArtists() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    state.artists = data.data;
    console.log(state.artists);

    // uncomment once completed
    // renderArtists();
  } catch (error) {
    console.log(error);
  }
}
/** Asks the API to create a new artist based on the given `artist` */
async function addArtist(name, imageUrl, description) {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        imageUrl,
        description,
      }),
    });
    getArtists();
  } catch (error) {
    console.log(error);
  }
}

// === Render ===

/** Renders artists from state */
function renderArtists() {
  // TODO
  const artistsContainer = document.getElementById("artists");
  const artistList = state.artists;

  // if (artistList.length === 0){
  // artistsContainer.innerHTML = "<h3>No artists listed.</h3>";
  //   return;
  // };

  // resets artistsContainer to prevent duplicates
  // artistsContainer.innerHTML = "";
  // forEach artists, we want to create an li (const artistCard), and do innerHTML with name, image, and bio
  // `<h3>Name: ${name}</h3>
  // <img src="${image}" alt="${name}">
  // <p>${bio}</p>`
  // artistsContainer.appendChild(artistCard)
}

// Add artist with form data when the form is submitted
function addListenerToForm() {
  const form = document.querySelector("#addArtist");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // pulls previous function and uses form values to fill params
    await addArtist(
      form.artistName.value,
      form.imageUrl.value,
      form.description.value
    );

    //clears the form once submitted
    form.artistName.value = "";
    form.imageUrl.value = "";
    form.description.value = "";
  });
}

/** Syncs state with the API and rerender */
async function render() {
  await getArtists();
  addListenerToForm();
}

// === Script ===

render();
