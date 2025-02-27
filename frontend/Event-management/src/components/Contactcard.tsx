/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../Store/Reducers/AuthReducer";

const ContactCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store: any) => store.auth.user);

  return (
    <div className="max-w-md mx-auto z-10 bg-white shadow-md rounded-lg p-6 w-80 absolute right-16  sm:max-w-lg lg:max-w-xl">
      <div
        onClick={() => navigate("/profile")}
        className="flex cursor-pointer items-center space-x-4 mb-4 "
      >
        <img
          className="w-16 h-16 rounded-full"
          src="https://uploads-ssl.webflow.com/647c2797a041413036e8e6fd/647d8981865d5dee2d03896e_Daco_5511364.png"
          alt="Profile"
        />
        <div>
          {user && (
            <>
              <h2 className="text-xl font-semibold">{user.username}</h2>
            </>
          )}
        </div>
      </div>

      {/* <div className="flex flex-wrap gap-2 mb-6">
        <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md">
          Audio
        </button>
        <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
          Video
        </button>
        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md">
          Mute
        </button>
        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md">
          Share
        </button>
      </div> */}

      <div className="space-y-4">
        {user && (
          <>
            <DetailRow label="Name" value={user.username} />
            {/* <DetailRow label="Number" value="(808) 676-7382" /> */}
            {/* <DetailRow label="Location" value="Enter an address..." /> */}
            <DetailRow label="Email" value={user.email} />
            {/* <DetailRow label="Company" value="Enter a name..." /> */}
            {/* <DetailRow label="Statu s" value="Add a tag..." /> */}
          </>
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={() => {
            dispatch(logout());
          }}
          className="flex-1 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-600">{label}</span>
    <span className="text-gray-900 font-medium">{value}</span>
  </div>
);

export default ContactCard;
