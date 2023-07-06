// Je recupere mes balises dans le dom
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const form = document.getElementById("userLogin");
const errorDisplay = document.querySelector(".error");

// J'ecoute le submit du bouton de mon login
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Je stock les valeur des mes variables
  const stockEmailInput = emailInput.value;
  const stockPasswordInput = passwordInput.value;
  const data = {
    email: stockEmailInput,
    password: stockPasswordInput,
  };
  // Je place les options pour le fetch dans une variable
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  };
  // Je fait la requéte a l'API
  fetch("http://localhost:5678/api/users/login", options)
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        // Je sauvegarde le token dans le local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        // Je renvoie sur la page d'accueille
        window.location.href = "./index.html";
      } else {
        // en cas d'erreur message
        errorDisplay.textContent =
          "Erreur dans l’identifiant ou le mot de passe";
      }
      // Je vide le formulaire
      form.reset();
    });
});
