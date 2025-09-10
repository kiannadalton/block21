//cohort
const COHORT = "2403-ftb-et-web-pt";
// API URL
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/recipes`;

/**
 * 👉 STEP 1: Create an object called state that holds an array for recipe objects
 */

const state = {
  recipes: [],
};
/**
 * 👉 STEP 2: Complete the function so that it:
 *    - uses `fetch` to make a GET request to the API
 *    - turns the response into json
 *    - stores the json of recipes into state
 *    - calls `renderAllRecipes`
 */
const fetchAllRecipes = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    //storing the data in the recipe array:
    // need to do data.data since the data key in the data object has the array of recipe objects in it
    state.recipes = data.data;

    renderAllRecipes();
  } catch (error) {
    console.log(error);
  }
};

/**
 * 👉 STEP 3: Complete the function so that it:
 *    - uses `fetch` to make a POST request to the API sending the data passed in the body of the request
 *    - turns the response into json
 *    - calls `fetchAllRecipes`
 *
 * Note: date isn't used in this API but you will need to know how to work with it in the workshop
 */
const createNewRecipe = async (name, imageUrl, description) => {
  try {
    await fetch(API_URL, {
      method: "POST",
      //headers is found in inspect > Network > recipes > Headers
      headers: {
        // the below is needed for POST and PUT
        "Content-Type": "application/json",
      },
      //converts to a JSON object
      body: JSON.stringify({
        // can also just write name, imageUrl, description
        name: name,
        imageUrl: imageUrl,
        description: description,
      }),
    });
    //dont need to say await fetchAllRecipes(); since it's it's the last line of code in the try block
    fetchAllRecipes();
  } catch (error) {
    console.log(error);
  }
};

/**
 * 👉 STEP 4: Complete the function so that it:
 *    - uses `fetch` to make a DELETE request to the API to delete a recipe with the id passed to the function
 *    - calls `fetchAllRecipes`
 */
const removeRecipe = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      // No body needed for deleting. Since no body, no header is needed.
    });
    fetchAllRecipes();
  } catch (error) {
    console.log(error);
  }
};

// render all recipes on the page
const renderAllRecipes = () => {
  const recipesContainer = document.getElementById("recipes-container");
  const recipeList = state.recipes;

  if (!recipeList || recipeList.length === 0) {
    recipesContainer.innerHTML = "<h3>No recipes found</h3>";
    return;
  }

  //resets html of all recipes
  recipesContainer.innerHTML = "";

  //creates a card for each recipe
  recipeList.forEach((recipe) => {
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("recipe-card");
    recipeElement.innerHTML = `
            <h4>${recipe.name}</h4>
            <img src="${recipe.imageUrl}" alt="${recipe.name}">
            <p>${recipe.description}</p>
            <button class="delete-button" data-id="${recipe.id}">Remove</button>
        `;
    recipesContainer.appendChild(recipeElement);

    const deleteButton = recipeElement.querySelector(".delete-button");
    //add event listener to the delete button so we can delete a recipe
    deleteButton.addEventListener("click", (event) => {
      try {
        event.preventDefault();
        removeRecipe(recipe.id);
      } catch (error) {
        console.log(error);
      }
    });
  });
};

//  adds a listener to our form so when we submit the form we create a new recipe
const addListenerToForm = () => {
  const form = document.querySelector("#new-recipe-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    await createNewRecipe(
      form.name.value,
      form.imageUrl.value,
      form.description.value,
      form.date.value
    );

    //clears the form after we create the new recipe
    form.name.value = "";
    form.imageUrl.value = "";
    form.description.value = "";
    form.date.value = "";
  });
};

//initial function when the page loads
const init = async () => {
  //gets all the recipes from the API
  await fetchAllRecipes();
  //adds a listener to the form so we can add a recipe when the user submits the form
  addListenerToForm();
};

init();
