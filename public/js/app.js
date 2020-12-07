const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "From Javascript";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "loading";
  messageTwo.textContent = "";
  const location = search.value;

  if (location) {
    fetch(`http://localhost:3000/weather?address=${location}`).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            messageOne.textContent = "error!";
            messageTwo.textContent = data.error;
          } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
          }
        });
      }
    );
  } else {
    console.log("please enter a location");
    messageOne.textContent = "please enter a location";
  }
});
