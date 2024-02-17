**Grade Generator Project**

📊 **Description:**
This project is a Grade Generator that allows users to decide the average grade for a set of scores. It includes a web interface with tables and charts to visualize the generated grades.

🔧 **Algorithm for Grade Generation:**
1. **Data Input:**
   - Scores for each student are collected and stored in the `scores` array.
   - Names of students are stored in the `names` array.

2. **Table Updates:**
   - The `updateTable` function creates and updates a table with two columns: one for student names and one for their scores.

3. **Statistical Analysis:**
   - The average of the scores is calculated using `calculateAverage`.
   - The standard deviation of the scores is calculated using `calculateGradeStandardDeviation`.

4. **Outlier Filtering:**
   - Outliers (scores outside a certain range) are filtered using `filterOutliers`.

5. **Grade Calculation:**
   - A desired average grade (`desiredAvg`) is specified.
   - The script generates grades for each student based on the scores, aiming for the desired average.
   - The grade generation involves calculating steps, cut scores, and adjusting grades based on the desired average.

6. **Table and Chart Updates:**
   - The `updateTable2` function creates and updates a second table with three columns: student names, scores, and the generated grades.
   - A line chart is generated using Chart.js to visually represent the relationship between scores and generated grades.

🚀 **Usage:**
1. Input scores and names for each student.
2. Run the `calculateResult` function to generate grades based on the specified algorithm.
3. View tables and charts to visualize the generated grades.

🛠️ **Dependencies:**
- Chart.js library for creating charts.

📈 **Example Chart:**
![Example Chart](link-to-your-chart-image)

📑 **License:**
This project is licensed under the [MIT License](link-to-your-license-file).

👏 **Acknowledgments:**
Special thanks to the contributors and the open-source community.

**Happy Grade Generating!** 🎓
