/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import MainLayout from "../layout/MainLayout";

const Home = () => {
  const user = useSelector((store: any) => store.auth.user);
  if (!user) {
    return <div>Loading user information...</div>;
  }
  return (
    <>
      <MainLayout>
        <div className="container min-h-screen rounded-xl bg-gray-100 p-4">
          <div className="mt-4 ml-4 ">
            <h1 className="text-2xl font-bold mb-10 text-gray-700">
              Event Management Dashboard for {user.username}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700">
                  Tickets Sold
                </h2>
                <p className="text-3xl font-bold text-blue-500 mt-4">1,256</p>
              </div>

              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700">
                  Live Events Ongoing
                </h2>
                <p className="text-3xl font-bold text-green-500 mt-4">3</p>
              </div>

              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700">
                  Noticeboard
                </h2>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>🎉 New Year's Eve Party starts at 8 PM</li>
                  <li>📢 Early bird discounts end tomorrow!</li>
                  <li>🛠️ Maintenance scheduled for 10 PM tonight</li>
                </ul>
              </div>

              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700">
                  Upcoming Events
                </h2>
                <p className="text-gray-600 mt-4">
                  12 events planned this month
                </p>
              </div>

              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700">
                  Revenue Generated
                </h2>
                <p className="text-3xl font-bold text-purple-500 mt-4">
                  $45,300
                </p>
              </div>

              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700">
                  Registered Users
                </h2>
                <p className="text-3xl font-bold text-yellow-500 mt-4">8,142</p>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
