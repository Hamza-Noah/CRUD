let productsContainer = [];

if (localStorage.getItem("products") != null) {
  productsContainer = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}

let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCategory");
let productDescriptionInput = document.getElementById("productDescription");
let addButton = document.getElementById("addButton");
let searchInput = document.getElementById("search");
let updateIndex = 0;
let inputs = [
  productNameInput,
  productPriceInput,
  productCategoryInput,
  productDescriptionInput,
];
let inputsRegex = [
  /^[A-Z][a-z]{2,8}$/,
  /^([1-9][0-9]{3}|10000)$/,
  /(Mobile|TV|Laptop)/i,
  /(\w+\s){29}\w+$/i,
];
let counter = 0;

// Add Validations to Inputs

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keyup", function () {
    if (inputsRegex[i].test(inputs[i].value.trim())) {
      inputs[i].classList.add("is-valid");
      inputs[i].classList.remove("is-invalid");
      if (
        productNameInput.classList.contains("is-valid") &&
        productPriceInput.classList.contains("is-valid") &&
        productCategoryInput.classList.contains("is-valid") &&
        productDescriptionInput.classList.contains("is-valid")
      ) {
        addButton.removeAttribute("disabled");
      }
    } else {
      inputs[i].classList.add("is-invalid");
      inputs[i].classList.remove("is-valid");
    }
  });
}

addButton.onclick = function () {
  let product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
  };

  if (addButton.innerHTML != "Update Product") {
    productsContainer.push(product);
    clearForm();
    displayProducts();
    localStorage.setItem("products", JSON.stringify(productsContainer));
  } else {
    productsContainer[updateIndex] = product;
    displayProducts();
    localStorage.setItem("products", JSON.stringify(productsContainer));
    clearForm();
  }
};

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}

function displayProducts() {
  let box = "";
  for (let i = 0; i < productsContainer.length; i++) {
    box += `<tr>
    <td>${productsContainer[i].name}</td>
    <td>${productsContainer[i].price}</td>
    <td>${productsContainer[i].category}</td>
    <td>${productsContainer[i].description}</td>
    <td><button onclick="update(${i})" class="btn btn-outline-warning">Update</button></td>
    <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = box;
}

function deleteProduct(i) {
  productsContainer.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(productsContainer));
  displayProducts();
}

function update(i) {
  addButton.removeAttribute("disabled");
  productNameInput.value = productsContainer[i].name;
  productPriceInput.value = productsContainer[i].price;
  productCategoryInput.value = productsContainer[i].category;
  productDescriptionInput.value = productsContainer[i].description;

  addButton.innerHTML = "Update Product";
  updateIndex = i;
}

searchInput.onkeyup = function () {
  let term = searchInput.value;
  let box = "";
  for (let i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
      box += `<tr>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].description}</td>
        <td><button onclick="update(${i})" class="btn btn-outline-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = box;
  }
};
