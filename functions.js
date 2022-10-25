const createCard = (data, parent, arr) => {
   const card = document.createElement("div");
   card.className = "card";
   // card.setAttribute("data-id", data.id);
   card.dataset.id = data.id;

   const age = document.createElement("div");
   age.className = "age";
   age.innerText = `Возраст: ${data.age}` || 0;

   const rate = document.createElement("div");
   rate.className = "rate";
   rate.innerHTML = "<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>";

   const pic = document.createElement("div");
   pic.className = "pic";
   pic.style.backgroundImage = `url(${data.img_link || "images/c1.png"})`;

   const name = document.createElement("div");
   name.className = "name";
   name.innerText = data.name;

   const title = document.createElement("div");
   title.className = "title";

   const photo = document.createElement("div");
   photo.className = "photo";


   card.append(photo);
   photo.append(pic);
   card.append(title);
   title.append(name, age, rate);

   card.addEventListener("click", function () {
      showPopup(arr, "card");
   });

   parent.append(card);


};



const showPopup = (list, type, content) => {
   let el = list.filter(el => el.dataset.type === type)[0];
   // switch (type) {
   //    case "card": 
   //    case "info":
   //    case "form":
   // }
   el.classList.add("active");
   el.parentElement.classList.add("active");
};


const addCat = (e, api, popupList, store) => {
   e.preventDefault();
   let body = {};
   for (let i = 0; i < e.target.elements.length; i++) {
      let el = e.target.elements[i];
      if (el.name) {
         if (el.type === "checkbox") {
            body[el.name] = el.checked;
         } else if (el.value) {
            body[el.name] = el.value;
         }
      }
   }
   api.addCat(body)
      .then(res => res.json())
      .then(data => {
         if (data.message === "ok") {
            // localStorage.setItem("cat", JSON.stringify(body));
            createCard(body, document.querySelector(".container"));
            store.push(body);
            localStorage.setItem("cats", JSON.stringify(store));
            e.target.reset();
            document.querySelector(".popup-wrapper").classList.remove("active");
            document.querySelector(".popup").classList.remove("active");
         }
         // showPopup(popupList, "info", data.message);
      })
};
