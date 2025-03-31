import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  FaUsers,
  FaTicketAlt,
  FaMoneyBill,
  FaHandshake,
  FaUndo,
  FaCalculator,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const AnalyticsDashboard: React.FC = () => {
  // Dummy Data (Replace with API data)
  const analyticsData = {
    totalRegistrations: 1200,
    totalAttendees: 950,
    ticketSalesRevenue: 45000,
    sponsorshipRevenue: 20000,
    refundRequests: 3000,
    totalExpenses: 25000,
    checkInRate: 79.2,
    demographics: { male: 60, female: 35, others: 5 },
    ticketTypes: { VIP: 15000, Regular: 25000, Student: 5000 },
    topSessions: ["AI & ML Trends", "Blockchain in 2025", "Cybersecurity"],
    socialMediaMentions: 340,
  };

  // Calculate Event Profitability
  const totalRevenue =
    analyticsData.ticketSalesRevenue + analyticsData.sponsorshipRevenue;
  const eventProfit = totalRevenue - analyticsData.totalExpenses;

  // Ticket Sales Breakdown (Bar Chart)
  const ticketSalesData = {
    labels: ["VIP", "Regular", "Student"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [
          analyticsData.ticketTypes.VIP,
          analyticsData.ticketTypes.Regular,
          analyticsData.ticketTypes.Student,
        ],
        backgroundColor: ["#4F46E5", "#10B981", "#F59E0B"],
      },
    ],
  };

  // Gender Demographics (Pie Chart)
  const demographicData = {
    labels: ["Male", "Female", "Others"],
    datasets: [
      {
        data: [
          analyticsData.demographics.male,
          analyticsData.demographics.female,
          analyticsData.demographics.others,
        ],
        backgroundColor: ["#3B82F6", "#EC4899", "#FBBF24"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        📊 Event Analytics
      </h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaUsers className="text-blue-500 text-4xl mr-4" />
          <div>
            <p className="text-xl font-semibold">
              {analyticsData.totalRegistrations}
            </p>
            <p className="text-gray-600">Total Registrations</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaTicketAlt className="text-green-500 text-4xl mr-4" />
          <div>
            <p className="text-xl font-semibold">
              {analyticsData.totalAttendees}
            </p>
            <p className="text-gray-600">Total Attendees</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaMoneyBill className="text-yellow-500 text-4xl mr-4" />
          <div>
            <p className="text-xl font-semibold">
              ${analyticsData.ticketSalesRevenue.toLocaleString()}
            </p>
            <p className="text-gray-600">Ticket Revenue</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaHandshake className="text-purple-500 text-4xl mr-4" />
          <div>
            <p className="text-xl font-semibold">
              ${analyticsData.sponsorshipRevenue.toLocaleString()}
            </p>
            <p className="text-gray-600">Sponsorships</p>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown & Profitability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Ticket Type Revenue (Bar Chart) */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            🎟️ Revenue Breakdown by Ticket Type
          </h2>
          <Bar data={ticketSalesData} />
        </div>

        {/* Gender Demographics (Pie Chart) */}
        <div className="bg-white w-96 shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            👥 Gender Demographics
          </h2>
          <Pie data={demographicData} />
        </div>
      </div>

      {/* Refunds & Profitability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaUndo className="text-red-500 text-4xl mr-4" />
          <div>
            <p className="text-xl font-semibold">
              ${analyticsData.refundRequests.toLocaleString()}
            </p>
            <p className="text-gray-600">Refund Requests & Cancellations</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaCalculator className="text-indigo-500 text-4xl mr-4" />
          <div>
            <p className="text-xl font-semibold">
              ${eventProfit.toLocaleString()}
            </p>
            <p className="text-gray-600">Event Profitability</p>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            🔥 Top Sessions
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            {analyticsData.topSessions.map((session, index) => (
              <li key={index}>{session}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            📢 Social Media Mentions
          </h2>
          <p className="text-2xl font-semibold text-gray-900">
            {analyticsData.socialMediaMentions}
          </p>
          <p className="text-gray-600">Mentions on social platforms</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
