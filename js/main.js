const recipes = [
  {
    id: 1,
    name: 'Spaghetti',
    ingredients: ['Pasta', 'Tomato', 'Beef', 'Onion', 'Garlic'],
    image: 'media/spaghetti.jpg'
  },
  {
    id: 2,
    name: 'Caprese Salad',
    ingredients: ['Tomato', 'Mozzarella', 'Basil'],
    image: 'media/salad.jpg'
  },
  {
    id: 3,
    name: 'Chicken Stir Fry',
    ingredients: ['Chicken', 'Broccoli', 'Carrot', 'Soy Sauce', 'Garlic'],
    image: 'media/stirfry.jpg'
  },
  {
    id: 4,
    name: 'Pancakes',
    ingredients: ['Flour', 'Milk', 'Eggs', 'Sugar'],
    image: 'media/pancakes.jpg'
  },
  {
    id: 5,
    name: 'Guacamole',
    ingredients: ['Avocado', 'Onion', 'Tomato', 'Lime', 'Cilantro'],
    image: 'media/guacamole.jpg'
  }
];

const allIngredients = [
  'Pasta', 'Tomato', 'Beef', 'Onion', 'Garlic',
  'Mozzarella', 'Basil', 'Chicken', 'Broccoli', 'Carrot',
  'Soy Sauce', 'Flour', 'Milk', 'Eggs', 'Sugar',
  'Avocado', 'Lime', 'Cilantro'
];

const ingredientsForm = document.getElementById('ingredients-form');
const ingredientsFieldset = ingredientsForm.querySelector('fieldset');
const recipesList = document.getElementById('recipes-list');

function generateIngredientCheckboxes() {
  allIngredients.forEach(ingredient => {
    const label = document.createElement('label');
    label.textContent = ingredient;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'ingredient';
    checkbox.value = ingredient;
    label.prepend(checkbox);
    ingredientsFieldset.appendChild(label);
  });
}

function displayRecipes(recipesToDisplay) {
  recipesList.innerHTML = '';

  if (recipesToDisplay.length === 0) {
    recipesList.innerHTML = '<li>No recipes match your selected ingredients.</li>';
    return;
  }

  recipesToDisplay.forEach(recipe => {
    const li = document.createElement('li');
    const recipeImage = document.createElement('img');
    recipeImage.src = recipe.image;
    recipeImage.alt = recipe.name;
    const recipeTitle = document.createElement('h3');
    recipeTitle.textContent = recipe.name;
    const recipeIngredients = document.createElement('p');
    recipeIngredients.textContent = `Ingredients: ${recipe.ingredients.join(', ')}`;
    li.appendChild(recipeImage);
    li.appendChild(recipeTitle);
    li.appendChild(recipeIngredients);
    recipesList.appendChild(li);
  });
}

function filterRecipes() {
  const selectedIngredients = Array.from(
    document.querySelectorAll('input[name="ingredient"]:checked')
  ).map(checkbox => checkbox.value);

  const filteredRecipes = recipes.filter(recipe =>
    selectedIngredients.every(ingredient => recipe.ingredients.includes(ingredient))
  );

  displayRecipes(filteredRecipes);
}

ingredientsForm.addEventListener('change', filterRecipes);

generateIngredientCheckboxes();
displayRecipes(recipes);