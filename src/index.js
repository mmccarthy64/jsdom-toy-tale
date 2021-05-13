let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const addToyForm = document.querySelector(".add-toy-form");
  fetchToys();
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      addToyForm.addEventListener("submit", event => {
        event.preventDefault();
        newToy(event.target);
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys() {
  fetch("http://localhost:3000/toys", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(toys){
    // console.log(toys);
    addToys(toys);
  })
}

function addToys(toys) {
  const toyCollection = document.querySelector("#toy-collection");
  toys.forEach(toy => {
    const card = document.createElement("div");
      card.className = "card";
    const h2 = document.createElement("h2");
      h2.innerHTML = toy.name;
    const img = document.createElement("img");
      img.src = toy.image;
      img.className = "toy-avatar";
    const p = document.createElement("p");
      p.innerHTML = toy.likes;
    const button = document.createElement("button");
      button.innerHTML = "Like";
      button.className = "like-btn";
      button.addEventListener("click", (e) => {
        console.log(e.target.dataset);
        addLike(e);
      })
    card.append(h2, img, p, button);
    toyCollection.appendChild(card);
  })
}

function addLike(e) {
  e.preventDefault();
  let more = parseInt(e.target.previousElementSibling.innerText) + 1;

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": more
    })
  })
  .then(res => res.json())
  .then(like_obj => {
    e.target.previousElementSibling.innerText = `${more} likes`;
  })
}

function newToy(toy_data) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
    })
  })
  .then(function(response) {
    // console.log(response.json())
    return response.json();
  })
  .then(function(toy) {
    console.log(toy);
    Object.keys(toy);
    addToys(toy);
  })
}