// Definiere ein leeres Array, um die eingegebenen Namen, Punktzahlen und maximalen Punktzahlen zu speichern
let scoreTable = [];
var localStorage = window.localStorage;
var localStorage = macos.localStorage;
localStorage.setItem(scoreTable);

let scoreTableLocalStorage = localStorage.getItem(scoreTable);

// Hole die Tabelle aus dem HTML-Dokument
let table = document.getElementById("scoreTable");

// Diese Funktion wird aufgerufen, wenn der "Add"-Button geklickt wird
function addScore() {
  // Hole die Eingabefelder aus dem HTML-Dokument
  let nameInput = document.getElementById("nameInput");
  let scoreInput = document.getElementById("scoreInput");
  let maxScoreInput = document.getElementById("maxScoreInput");

  // Extrahiere die eingegebenen Werte aus den Eingabefeldern
  let name = nameInput.value;
  let score = parseInt(scoreInput.value);
  let maxScore = parseInt(maxScoreInput.value);

  // Füge ein neues Objekt mit den eingegebenen Werten zum scoreTable-Array hinzu
  scoreTable.push({ name, score, maxScore });

  // Setze die Eingabefelder zurück
  nameInput.value = "";
  scoreInput.value = "";

  // Aktualisiere die Tabelle mit den neuen Werten
  updateTable();
}

// Diese Funktion aktualisiert die Tabelle mit den im scoreTable-Array gespeicherten Werten
function updateTable() {
  // Hole den Tabellenkörper aus dem HTML-Dokument
  let tableBody = table.querySelector("tbody");

  // Lösche alle Zeilen aus dem Tabellenkörper
  tableBody.innerHTML = "";

  // Füge für jeden Eintrag im scoreTable-Array eine neue Zeile zur Tabelle hinzu
  scoreTable.forEach(score => {
    let row = document.createElement("tr");
    let nameCell = document.createElement("td");
    let scoreCell = document.createElement("td");
    let maxScoreCell = document.createElement("td");

    // Füge die Werte des aktuellen Eintrags in die entsprechenden Zellen ein
    nameCell.textContent = score.name;
    scoreCell.textContent = score.score;
    maxScoreCell.textContent = score.maxScore;

    // Füge die Zellen zur aktuellen Zeile hinzu
    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    row.appendChild(maxScoreCell);

    // Füge die Zeile zum Tabellenkörper hinzu
    tableBody.appendChild(row);
  });
}

// Diese Funktion berechnet die Noten für die Schüler und aktualisiert die Tabelle
function calculateNotes() {
  // Berechne die Durchschnitts- und Standardabweichungswerte für die Klasse
  const { durchschnitt, standardabweichung } = calculateClassStatistics();

  // Hole den Tabellenkörper aus dem HTML-Dokument
  let tableBody = table.querySelector("tbody");

  // Füge die Noten für jeden Schüler zur Tabelle hinzu
  scoreTable.forEach(score => {
    const note = berechneNote(score.score, score.maxScore, durchschnitt, standardabweichung, 1.0, 3.0);

    // Finde die Zeile mit dem aktuellen Schülernamen
    let row = tableBody.querySelector(`tr td:first-child:contains("${score.name}")`).parentNode;

    // Füge die Note in die "Note"-Spalte ein
    let noteCell = row.querySelector("td:last-child");
    noteCell.textContent = note.toFixed(2);  // Anpassen der Dezimalstellen nach Bedarf
  });
}
