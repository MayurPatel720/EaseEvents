const ProfilePage = () => {
  return (
    // <Sidebar>
    <div className="max-w-7xl mx-auto p-4 bg-gray-900 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section (User Details) */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Profile"
              className="w-32 h-32 rounded-full mr-6"
            />
            <div>
              <h2 className="text-2xl font-semibold">Floyd Miles</h2>
              <p className="text-gray-400">12 May, 1986 (38 yrs)</p>
              <p className="text-gray-500">
                Specializations: Engines, Transmission, Braking system, Wheel
                balancing
              </p>
              <p className="text-gray-500">
                Certifications: ASE certificate, ASE advanced
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold">General Info</h3>
            <p className="text-gray-500">Financial reward: $945/h</p>
            <p className="text-gray-500">Start of work: 17 Jun, 2023</p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold">Available Absences</h3>
            <p className="text-gray-500">Days off: 4/15</p>
            <p className="text-gray-500">Vacation: 14/20</p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold">Contacts</h3>
            <p className="text-gray-500">Phone: +47 2875 6571</p>
            <p className="text-gray-500">Email: floyd.miles@gmail.com</p>
            <p className="text-gray-500">
              Address: Aarhus, Rosenveld 24, 8000, Midtjylland
            </p>
          </div>
        </div>

        {/* Right Section (Calendar and Notes) */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg col-span-2">
          <h3 className="text-xl font-semibold">April, 2024</h3>
          <div className="mt-4 grid grid-cols-7 gap-2 text-center">
            {/* Calendar grid */}
            <div className="p-2 bg-gray-700 rounded-lg">Mon</div>
            <div className="p-2 bg-gray-700 rounded-lg">Tue</div>
            <div className="p-2 bg-gray-700 rounded-lg">Wed</div>
            <div className="p-2 bg-gray-700 rounded-lg">Thu</div>
            <div className="p-2 bg-gray-700 rounded-lg">Fri</div>
            <div className="p-2 bg-gray-700 rounded-lg">Sat</div>
            <div className="p-2 bg-gray-700 rounded-lg">Sun</div>

            {/* Calendar content */}
            <div className="p-2 bg-gray-600 rounded-lg">Brake pad...</div>
            <div className="p-2 bg-gray-600 rounded-lg">Engine tun...</div>
            <div className="p-2 bg-gray-600 rounded-lg">Engine mo...</div>
            <div className="p-2 bg-gray-600 rounded-lg">Steering...</div>
            {/* Continue adding other days' content */}
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold">Notes</h3>
            <textarea
              className="w-full p-4 bg-gray-700 text-white rounded-lg mt-2"
              placeholder="Type your comment here..."
              rows={4}
            ></textarea>
            <div className="flex justify-end mt-4">
              <button className="bg-blue-500 text-white py-2 px-6 rounded-lg">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </Sidebar>
  );
};

export default ProfilePage;
