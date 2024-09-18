/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import Header from "../utils/Header";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import useRouter from "../confiiguration/useRouter";
import ClassDetails from "../components/ClassDetails";

// Register the components from Chart.js that you need
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ClassPage() {
  const { classLists } = useRouter();
  const [selectedClass, setSelectedClass] = useState(null);

  const { updateAssignedSubject } = useRouter();

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
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
        text: "Sales Over Time",
      },
    },
  };

  useEffect(() => {
    classLists.refetch();
  }, [updateAssignedSubject.isSuccess]);
  useEffect(() => {
    classLists.refetch();
  }, []);

  const handleCardClick = (classData) => {
    setSelectedClass(classData);
  };

  return (
    <div className="p-8">
      <Header category="h2">Class Page</Header>

      <ClassDetails classLists={classLists.data} />
    </div>
  );
}

export default ClassPage;
