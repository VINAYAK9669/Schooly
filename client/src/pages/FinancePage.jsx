/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

import Header from "../utils/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import useApiFun from "../confiiguration/useApiFun";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function FinancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to current date

  const [view, setView] = useState("monthly"); // State for view (monthly/yearly)

  const { getFinanceMonthly, financeYearlyFun } = useApiFun();

  // Convert selectedDate to year
  const year = selectedDate.getFullYear();

  // Query for monthly data
  const financeMonthly = useQuery({
    queryKey: ["financeMonthly", year],
    queryFn: async () => getFinanceMonthly(year),
    onSuccess: (data) => {
      console.log("Monthly statistics fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching monthly statistics: ", error);
      toast.error("Error fetching monthly statistics");
    },
    enabled: view === "monthly",
  });

  // Query for yearly data
  const financeYearly = useQuery({
    queryKey: ["financeYearly"],
    queryFn: async () => financeYearlyFun(),
    onSuccess: (data) => {
      console.log("Yearly statistics fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching yearly statistics: ", error);
      toast.error("Error fetching yearly statistics");
    },
    enabled: view === "yearly",
  });

  useEffect(() => {
    if (view === "monthly") {
      financeMonthly.refetch();
    } else if (view === "yearly") {
      financeYearly.refetch();
    }
  }, [selectedDate, view]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const monthlyPieChartData = {
    labels: ["Total Income", "Total Investment", "Profit"],
    datasets: [
      {
        data: [
          financeMonthly.data?.data[0]?.totalIncome || 0,
          financeMonthly.data?.data[0]?.totalInvestment || 0,
          financeMonthly.data?.data[0]?.profit || 0,
        ],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const yearlyPieChartData = {
    labels: ["Total Income", "Total Investment", "Profit"],
    datasets: [
      {
        data: [
          financeYearly.data?.data[0]?.totalIncome || 0,
          financeYearly.data?.data[0]?.totalInvestment || 0,
          financeYearly.data?.data[0]?.profit || 0,
        ],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  return (
    <div>
      <div className="p-8">
        <Header category="h2">Finance Page</Header>
        <div className="my-4">
          <label htmlFor="date-picker" className="mr-2">
            Select Year:
          </label>
          <DatePicker
            id="date-picker"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy"
            showYearPicker
            className="p-2 border rounded"
          />
        </div>
        <div className="my-4">
          <button
            onClick={() => handleViewChange("monthly")}
            className={`mr-2 p-2 ${
              view === "monthly" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => handleViewChange("yearly")}
            className={`p-2 ${
              view === "yearly" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Yearly
          </button>
        </div>
        <div className="my-4 h-[50vh] flex justify-center mt-[10%]">
          {view === "monthly" && <Pie data={monthlyPieChartData} />}
          {view === "yearly" && <Pie data={yearlyPieChartData} />}
        </div>
      </div>
    </div>
  );
}

export default FinancePage;
