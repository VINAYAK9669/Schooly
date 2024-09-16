/* eslint-disable react/prop-types */

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function GenderDistributionChart({ studentList }) {
  // Count number of male and female students
  const genderCounts = studentList.reduce(
    (acc, student) => {
      if (student.gender === "MALE") {
        acc.male += 1;
      } else if (student.gender === "FEMALE") {
        acc.female += 1;
      }
      return acc;
    },
    { male: 0, female: 0 }
  );

  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Number of Students",
        data: [genderCounts.male, genderCounts.female],
        backgroundColor: ["#007bff", "#dc3545"],
        borderColor: ["#0056b3", "#c82333"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Gender Distribution",
      },
    },
  };

  return (
    <div className="mt-8">
      <Bar data={data} options={options} />
    </div>
  );
}

export default GenderDistributionChart;
