# Grade Generator

### 📊 Description:
This project is a Grade Generator that allows users to decide the average grade for a set of scores. It includes a web interface with tables and charts to visualize the generated grades.

### 🔧 Algorithm for Grade Generation:

##### Data Input:

Scores for each student are collected and stored in the scores array.
Names of students are stored in the names array.

##### Table Updates:

The updateTable function creates and updates a table with two columns: one for student names and one for their scores.

##### Statistical Analysis:

The average of the scores is calculated using calculateAverage.
The standard deviation of the scores is calculated using calculateGradeStandardDeviation.

##### Outlier Filtering:

Outliers (scores outside a certain range) are filtered using filterOutliers.

##### Grade Calculation:

A desired average grade (desiredAvg) is specified.
The script generates grades for each student based on the scores, aiming for the desired average.
The grade generation involves calculating steps, cut scores, and adjusting grades based on the desired average.

##### Table and Chart Updates:

The updateTable2 function creates and updates a second table with three columns: student names, scores, and the generated grades.
A line chart is generated using Chart.js to visually represent the relationship between scores and generated grades.
