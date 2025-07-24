const buttons = document.querySelectorAll("#buttons button");
const activities = document.querySelectorAll(".activity");
let timeData = [];

// Load data.json file
fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    timeData = data;
    updateDashboard("weekly"); // Default view
  })
  .catch((err) => console.error("Error loading data.json:", err));

// Add click listeners to buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.textContent.toLowerCase();
    updateDashboard(selected);
    setActiveButton(button);
  });
});

// Update the time tracking cards
function updateDashboard(timeframe) {
  timeData.forEach((activity) => {
    const id = activity.title.toLowerCase().replace(" ", "-"); // e.g. "self-care"
    const current = activity.timeframes[timeframe].current;
    const previous = activity.timeframes[timeframe].previous;

    const container = document.getElementById(id);
    const currentEl = container.querySelector(".duration");
    const previousEl = container.querySelector(".previous-duration");

    currentEl.textContent = `${current}hrs`;
    previousEl.textContent = `${getPreviousLabel(timeframe)} - ${previous}hrs`;
  });
}

// Handle active button styling
function setActiveButton(activeBtn) {
  buttons.forEach((btn) => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

// Returns label like "Last Week", "Yesterday", "Last Month"
function getPreviousLabel(timeframe) {
  switch (timeframe) {
    case "daily":
      return "Yesterday";
    case "weekly":
      return "Last Week";
    case "monthly":
      return "Last Month";
    default:
      return "";
  }
}
