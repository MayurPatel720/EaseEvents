/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
// @ts-ignore
import QrReader from "react-qr-scanner";

const events = [
  {
    id: 1,
    name: "Tech Conference 2025",
    dateTime: "March 10 | 10:00 AM - 5:00 PM",
    venue: "Convention Center, New York",
    organizer: { name: "John Doe", contact: "+1 234 567 890" },
    participants: ["Alice", "Bob", "Charlie"],
  },
  {
    id: 2,
    name: "Startup Pitch Fest",
    dateTime: "April 5 | 9:00 AM - 3:00 PM",
    venue: "Startup Hub, San Francisco",
    organizer: { name: "Jane Smith", contact: "+1 987 654 321" },
    participants: ["David", "Eve", "Frank"],
  },
];

const EventCard: React.FC = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [activeEventId, setActiveEventId] = useState<number | null>(null);

  const handleScan = (data: any) => {
    if (data) {
      setScannedData(data.text);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div className="container w-full">
      {events.map((event) => (
        <div
          key={event.id}
          style={{ backgroundColor: "#1a2331" }}
          className="flex flex-col sm:flex-row justify-between items-center rounded-lg shadow-lg mb-6 p-6"
        >
          <div className="flex flex-col justify-center text-center sm:text-left">
            <h2 className="text-xl font-bold text-white">{event.name}</h2>
            <p className="text-sm font-medium text-white mt-3">
              <span className="text-white font-light">Date & Time:</span>{" "}
              {event.dateTime}
            </p>
            <p className="text-sm font-medium text-white">
              <span className="text-white font-light">Venue:</span>{" "}
              {event.venue}
            </p>
            <p className="text-sm font-medium text-white">
              <span className="text-white font-light">Organizer:</span>{" "}
              {event.organizer.name} ({event.organizer.contact})
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 pr-4 mt-4 sm:mt-0">
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
              onClick={() => setActiveEventId(event.id)}
            >
              <i className="pi pi-users text-white"></i>
            </button>

            <Dialog
              header={`Participants of ${event.name}`}
              visible={activeEventId === event.id}
              onHide={() => setActiveEventId(null)}
              style={{ width: "50vw" }}
              breakpoints={{ "960px": "75vw", "641px": "100vw" }}
            >
              <ul className="list-disc pl-5">
                {event.participants.map((participant, index) => (
                  <li key={index} className="text-gray-700 text-sm">
                    {participant}
                  </li>
                ))}
              </ul>
            </Dialog>

            {/* QR Code Scanner */}
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
              onClick={() => setActiveEventId(event.id + 1000)}
            >
              <i className="pi pi-qrcode text-white"></i>
            </button>

            <Dialog
              header="QR Code Scanner"
              visible={activeEventId === event.id + 1000}
              onHide={() => setActiveEventId(null)}
              style={{ width: "40vw" }}
            >
              <div className="flex justify-center items-center">
                <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden">
                  <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    className="w-full h-full"
                    constraints={{
                      video: { facingMode: "environment" },
                    }}
                  />
                </div>
              </div>
              {scannedData && (
                <p className="mt-2 text-sm text-green-600 font-medium text-center">
                  Scanned Code: {scannedData}
                </p>
              )}
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCard;
