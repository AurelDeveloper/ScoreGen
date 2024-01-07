const scores = [];
var maxScore = 0;
const names = ["Max", "Moritz", "Monika", "Mia", "Maja"];
const maxNote = 6;

function addScore(name, score) {
  scores.push(score);
  names.push(name);
}

function updateTable() {
  tableBody.innerHTML = "";

  for (let i = 0; i < scores.length; i++) {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const scoreCell = document.createElement("td");

    nameCell.textContent = names[i];
    scoreCell.textContent = scores[i];

    row.appendChild(nameCell);
    row.appendChild(scoreCell);

    tableBody.appendChild(row);
  }
}

function calculateAverage(arr) {
  const sum = arr.reduce((total, score) => total + score, 0);
  const average = sum / arr.length;
  return average;
}

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

function filterOutliers(average, stdDeviation) {
  const lowerBound = average - stdDeviation;
  const upperBound = average + stdDeviation;

  const filteredScores = scores.filter(score => score >= lowerBound && score <= upperBound);
  console.log(`FilteredScores: ${filteredScores}`);
  return filteredScores;
}

function calculateResult() {
  updateTable();

  let average = calculateAverage(scores);
  console.log(`average all: ${average}`);
  let stdDev = calculateGradeStandardDeviation(average);
  let filtered = filterOutliers(average, stdDev);

  let desiredAvg = 4.5;
  let avgFiltered = calculateAverage(filtered);
  console.log(`avgFiltered: ${avgFiltered}`);

  var step = (maxNote - desiredAvg) / (maxScore - avgFiltered);
  console.log(`step: ${step}`);

  var cutScoreX = Math.round(average - stdDev);
  console.log(`cutScoreX: ${cutScoreX}`);
  var cutScoreY = maxNote - (step * (maxScore + 1 - cutScoreX));
  console.log(`cutScoreY: ${cutScoreY}`);

  var stepCut = (cutScoreY - 1) / cutScoreX;
  console.log(`stepCut: ${stepCut}`);

  var scoreNote = [];
  var scoresList = [];
  var note = 1;
  for (let i = 0; i <= maxScore; i++) {
    scoreNote.push(Math.round(note * 10) / 10);

    if (i < cutScoreX) {
      note = note + stepCut;
    } else {
      note += step;
    }
    scoresList.push(i);
  }

  console.log(`scoreNote.length: ${scoreNote.length}`);
  console.log(`scoreNote: ${scoreNote}`);
  console.log("__________________");
  updateTable2(scoreNote);
  createChart(scoreNote, scoresList);
}

function updateTable2(scoreNote) {
  const table2 = document.getElementById("scoreTable2");

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

function createChart(scoreNote, scoresList) {
  new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: scoresList,
      datasets: [{
        data: scoreNote,
        label: "America",
        borderColor: "#3cba9f",
        fill: false
      }]
    },
    options: {
      title: {
        display:
          true,
        text: 'Chart JS Line Chart Example'
      }
    }
  });
}
