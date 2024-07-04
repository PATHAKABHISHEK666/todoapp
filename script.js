const inputValue = document.querySelectorAll(".goal_input");

const tick = document.querySelectorAll(".tick");

const progressValue = document.querySelector(".progress_value");

let allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  goal1: {
    name: '',
    completed: false,
  },
  goal2: {
    name: '',
    completed: false,
  },
  goal3: {
    name: '',
    completed: false,
  }
}

let completedGoals = Object.values(allGoals).filter((goal) => goal.completed).length;

let allQuotes = [
  "Raise the bar by completing your goals!", "Begin is easy!", "Well begun is half done!", "Whoa! You just completed all the goals, time for chill :D"]


let allBtmQuotes = [
  "Move one step ahead, today!",
  "Embrace today, shape tomorrow!",
  "Seize the moment, create your future!",
  "Start now, make it happen!"]



progressValue.style.width = `${completedGoals / 3 * 100}%`;

document.querySelector(".des").innerText = allBtmQuotes[completedGoals]
document.querySelector(".information").innerText = allQuotes[completedGoals]




progressValue.firstElementChild.innerText = `${completedGoals}/3 completed`

tick.forEach((tick) => {
  tick.addEventListener("click", (e) => {
    const allFieldsFilled = [...inputValue].every(function (input) {
      return input.value;
    });

    if (allFieldsFilled) {
      tick.parentElement.classList.toggle("done");

      const inputId = tick.nextElementSibling.id

      allGoals[inputId].completed = !allGoals[inputId].completed

      completedGoals = Object.values(allGoals).filter((goal) => goal.completed).length;

      progressValue.firstElementChild.innerText = `${completedGoals}/3 completed`

      document.querySelector(".information").innerText = allQuotes[completedGoals]
      document.querySelector(".des").innerText = allBtmQuotes[completedGoals]


      progressValue.style.width = `${completedGoals / 3 * 100}%`;


      localStorage.setItem("allGoals", JSON.stringify(allGoals));

      console.log(completedGoals);

    } else {
      document.querySelector(".notify").classList.add("visibility");
    }
  });
});

inputValue.forEach((input) => {

  input.value = allGoals[input.id].name;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add('done')
  }

  input.addEventListener("focus", () => {
    document.querySelector(".notify").classList.remove("visibility");
  });

  input.addEventListener("input", (e) => {

    if (allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return
    }
    allGoals[input.id].name = input.value
    localStorage.setItem("allGoals", JSON.stringify(allGoals))
  })

});



