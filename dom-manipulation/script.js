// Global quotes array with objects containing text and category properties
let quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do what you can, with what you have, where you are.", category: "Motivation" }
];

// Function to display a random quote - renamed to showRandomQuote
function showRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let selectedQuote = quotes[randomIndex];
  let quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = selectedQuote.text + " — [" + selectedQuote.category + "]";
}

// Function to add a new quote to the array and update the DOM
function addQuote() {
  let quoteText = document.getElementById("newQuoteText").value.trim();
  let quoteCategory = document.getElementById("newQuoteCategory").value.trim();
  
  if (quoteText !== "" && quoteCategory !== "") {
    let newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    showRandomQuote();
  }
}

// Function to create the add quote form
function createAddQuoteForm() {
  let formContainer = document.createElement("div");
  
  let textInput = document.createElement("input");
  textInput.setAttribute("type", "text");
  textInput.setAttribute("id", "newQuoteText");
  textInput.setAttribute("placeholder", "Enter quote text");
  
  let categoryInput = document.createElement("input");
  categoryInput.setAttribute("type", "text");
  categoryInput.setAttribute("id", "newQuoteCategory");
  categoryInput.setAttribute("placeholder", "Enter category");
  
  let addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);
  
  formContainer.appendChild(textInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);
  
  document.body.appendChild(formContainer);
}

// Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Initialize
showRandomQuote();
createAddQuoteForm();



// =====================
// SECOND JS CODE ADDED HERE 👇
// (Local Storage + Import/Export Features)
// =====================

// ✅ Load quotes from localStorage if available
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// ✅ Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ✅ Restore last viewed quote from sessionStorage
function restoreLastQuote() {
  const lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) {
    const parsedQuote = JSON.parse(lastQuote);
    document.getElementById("quoteDisplay").innerHTML = `${parsedQuote.text} — [${parsedQuote.category}]`;
  }
}

// ✅ Export quotes to JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// ✅ Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format!");
      }
    } catch (error) {
      alert("Error reading JSON file!");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// ✅ Create buttons for import/export
function createImportExportButtons() {
  const container = document.createElement("div");

  const exportBtn = document.createElement("button");
  exportBtn.textContent = "Export Quotes (JSON)";
  exportBtn.addEventListener("click", exportToJsonFile);

  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.accept = ".json";
  importInput.addEventListener("change", importFromJsonFile);

  container.appendChild(exportBtn);
  container.appendChild(importInput);

  document.body.appendChild(container);
}

// ✅ Initialize storage-related functions
loadQuotes();
createImportExportButtons();
restoreLastQuote();