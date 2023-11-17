//Nicht ignorieren, ist für die Chart.js
"use strict";

// Datenspeicher
const scores = [0,25,10,22,6,7,8,21,19,18,15,20];
var maxScore = 25;
const names = ["Max", "Moritz", "Monika", "Mia", "Maja"];

var scoreNote = [];
const maxNote = 6;

// DOM-Elemente
const table = document.getElementById("scoresTable");

const nameInput = document.getElementById("nameInput");
const scoreInput = document.getElementById("scoreInput");
const tableBody = table.querySelector("tbody");
const calculateButton = document.getElementById("calculateButton");
//verbindung mit dem button in der html datei und der funktion averageInput und wenn der wert geändert wird, wird alles neu berechnet
calculateButton.addEventListener("click", calculateResult);

updateTable(); // Test Daten werden direkt in die Tabelle eingefügt

// Funktion zum Hinzufügen einer Note
function addScore() {
  const name = nameInput.value;
  const score = parseInt(scoreInput.value);

  scores.push(score);
  names.push(name);

  nameInput.value = "";
  scoreInput.value = "";

  updateTable();
}

// Funktion zur Aktualisierung der Tabelle
function updateTable() {
  tableBody.innerHTML = "";

  for (let i = 0; i < scores.length; i++) {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const scoreCell = document.createElement("td");
    const noteCell = document.createElement("td");


    nameCell.textContent = names[i];
    scoreCell.textContent = scores[i];
    noteCell.textContent = scoreNote[scores[i]];      

    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    row.appendChild(noteCell);

    tableBody.appendChild(row);
  }
}

// Funktion zur Berechnung des Durchschnitts
function calculateAverage(arr) {
 
  const sum = arr.reduce((total, score) => total + score, 0);
  const average = sum / arr.length;

  return average;
}

// Funktion zur Berechnung der Standardabweichung
function calculateGradeStandardDeviation(average) {

  const squaredDifferencesSum = scores.reduce((total, score) => {
    const difference = score - average;
    return total + difference ** 2;
  }, 0);

  const variance = squaredDifferencesSum / scores.length;
  const standardDeviation = Math.sqrt(variance);

  console.log(`StandardDeviation: ${standardDeviation.toFixed(2)}`);
  return standardDeviation;
}

// Funktion zum Filtern von Ausreißern
function filterOutliers(average, stdDeviation) {


  const lowerBound = average -  stdDeviation;
  const upperBound = average + stdDeviation;

  const filteredScores = scores.filter(score => score >= lowerBound && score <= upperBound);
  //const outlierScores = scores.filter(score => score < lowerBound || score > upperBound);

  console.log(`FilteredScores: ${filteredScores}`);
  //console.log(`Outliers: ${outliers}`);
  return filteredScores;
}

// Funktion zur Berechnung der Noten
function calculateNotes(filteredScores, average, stdDev) {
  const desiredAvg = 4.5; //TODO: Dynamisch machen
  const avgFiltered = calculateAverage(filteredScores); //BUG: filteredScores is not defined
  console.log(`avgFiltered: ${avgFiltered}`);
  const step = (maxNote - desiredAvg) / (maxScore - avgFiltered);
  console.log(`step: ${step}`);
  const cutScoreX = Math.round(average - stdDev);
  console.log(`cutScoreX: ${cutScoreX}`);
  const cutScoreY = maxNote - (step * (maxScore + 1 - cutScoreX));
  console.log(`cutScoreY: ${cutScoreY}`);
  const stepCut = (cutScoreY - 1) / cutScoreX;
  console.log(`stepCut: ${stepCut}`);
  const scoreNote = [];
  const scoresList = [];
  let note = 1;

  for (let i = 0; i <= maxScore; i++) {
    scoreNote.push(Math.round(note * 10) / 10);

    if (i < cutScoreX) {
      note = note + stepCut;
    } else {
      note += step;
    }
    scoresList.push(i);
  }

  return scoreNote;
}

// Funktion zur Aktualisierung der Tabelle mit Noten
function updateTableWithNotes(scoreNote) { //BUG: scoresList is not defined
  const table2 = document.getElementById("notesTable");
  var tableBody2 = document.createElement('table');
  table2.appendChild(tableBody2);
  tableBody2.innerHTML = "";

  for (let i = 0; i < scores.length; i++) {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const scoreCell = document.createElement("td");
    const noteCell = document.createElement("td");
    nameCell.textContent = names[i];
    scoreCell.textContent = scores[i];
    noteCell.textContent = scoreNote[scores[i]];

    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    row.appendChild(noteCell);

    tableBody2.appendChild(row);
  }
}

// Funktion zur Erstellung des Diagramms
function createChart() {
  
  // create an array with integers starting with zero incrementing by one, with the length of scorenote
  const scoresList = Array.from({length: scoreNote.length}, (v, k) => k);

  new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: scoresList,
      datasets: [{
        data: scoreNote,
        label: "Notes",
        borderColor: "#black",
        fill: false
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Chart JS Line Chart Example'
      }
    }
  });
}

// funktion zum aufrufen der Funktionen und der outputs
function calculateResult() {
  //addScore();
  const average = calculateAverage(scores);
  const stdDeviation = calculateGradeStandardDeviation(average);
  const filtered = filterOutliers(average, stdDeviation);
  const filteredAverage = calculateAverage(filtered);

  // Berechne Noten
  scoreNote = calculateNotes(filtered, average, stdDeviation);
  //updateTableWithNotes(scoreNote, scoresList);

  console.log(`Average: ${average.toFixed(2)}`);
  console.log(`StandardDeviation: ${stdDeviation.toFixed(2)}`);
  console.log(`FilteredAverage: ${filteredAverage.toFixed(2)}`);
  console.log(`Filtered: ${filtered}`);
  console.log("__________________");

  updateTable();

  // Erstelle Diagramm
  createChart();
}

