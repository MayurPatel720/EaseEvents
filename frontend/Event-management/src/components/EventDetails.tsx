/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventLayout from "../layout/EventLayout";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { useFetchEventByID } from "../Queries/Allquery";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { Toast } from "primereact/toast";
import moment from "moment";

interface RouteParams {
  eventId?: string;
  [key: string]: string | undefined;
}

const EventDetails: React.FC = () => {
  const navigate = useNavigate();
  const { eventId }: any = useParams<RouteParams>();
  const { data: event, refetch } = useFetchEventByID(eventId);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editedEvent, setEditedEvent] = useState<any>(null);
  const toast = React.useRef<Toast>(null);

  React.useEffect(() => {
    if (event) {
      setEditedEvent({
        ...event,
        date: new Date(event.date),
      });
    }
  }, [event]);

  if (!event) {
    return <p>Loading event details...</p>;
  }

  const items: MenuItem[] = [
    {
      label: "Events",
      command: () => {
        navigate("/events");
      },
    },
    { label: event.title, className: "font-semibold text-primary" },
  ];

  const home: MenuItem = {
    icon: "pi pi-home",
    command: () => {
      navigate("/");
    },
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/event/edit/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Event updated successfully",
      });
      setEditDialog(false);
      refetch();
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update event",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/event/delete/${eventId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Event deleted successfully",
      });
      setTimeout(() => {
        navigate("/events");
      }, 1500);
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to delete event",
      });
    }
  };

  return (
    <>
      <EventLayout>
        <Toast ref={toast} />
        <div className="flex justify-between items-center mb-6 px-4">
          <BreadCrumb
            model={items}
            home={home}
            className="border-none shadow-sm"
          />
          <div className="flex gap-3">
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-success hover:scale-105 transition-transform"
              onClick={() => setEditDialog(true)}
            />
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger hover:scale-105 transition-transform"
              onClick={() => setDeleteDialog(true)}
            />
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="grid gap-8">
                <div className="col-12 md:col-6">
                  <div className="relative group">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-[400px] object-cover rounded-lg shadow-md transform group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="col-12 md:col-6">
                  <h1 className="text-4xl font-bold mb-6 text-gray-800 border-b pb-4">
                    {event.title}
                  </h1>
                  <div className="grid gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                      <p className="font-semibold text-gray-700 mb-2">Venue</p>
                      <p className="text-gray-600">{event.venue}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                        <p className="font-semibold text-gray-700 mb-2">Date</p>
                        <p className="text-gray-600">
                          {moment(event.date).format("DD-MM-y")}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                        <p className="font-semibold text-gray-700 mb-2">Time</p>
                        <p className="text-gray-600">
                          {moment(event.startTime).format("hh:mm A")} -{" "}
                          {moment(event.endTime).format("hh:mm A") || "TBA"}{" "}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                        <p className="font-semibold text-gray-700 mb-2">
                          Ticket Category
                        </p>
                        <p className="text-gray-600 capitalize">
                          {event.ticketCategory}
                        </p>
                      </div>
                      {event.ticketCategory === "paid" && (
                        <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                          <p className="font-semibold text-gray-700 mb-2">
                            Price
                          </p>
                          <p className="text-gray-600 text-lg">
                            ${event.ticketPrice}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                      <p className="font-semibold text-gray-700 mb-2">
                        Available Tickets
                      </p>
                      <p className="text-gray-600 text-lg font-medium">
                        {event.ticketsAvailable}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Dialog
          visible={editDialog}
          onHide={() => setEditDialog(false)}
          header="Edit Event"
          // className="w-11 md:w-8 lg:w-6"
          contentClassName="p-6"
          headerClassName="bg-gray-50 p-4"
        >
          {editedEvent && (
            <div className="grid p-fluid gap-4">
              {/* ... (keep existing form fields but add these classes to each field container) */}
              <div className="col-12">
                <label
                  htmlFor="title"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Title
                </label>
                <InputText
                  id="title"
                  value={editedEvent.title}
                  onChange={(e) =>
                    setEditedEvent({ ...editedEvent, title: e.target.value })
                  }
                  className="hover:border-blue-400 focus:border-blue-500 transition-colors"
                />
              </div>
              {/* ... (repeat for other form fields) */}
              <div className="col-12 mt-4">
                <Button
                  label="Update Event"
                  onClick={handleUpdate}
                  className="w-full p-button-primary hover:shadow-md transition-shadow"
                />
              </div>
            </div>
          )}
        </Dialog>

        {/* Delete Confirmation Dialog - Enhanced Styling */}
        <Dialog
          visible={deleteDialog}
          onHide={() => setDeleteDialog(false)}
          header="Confirm Delete"
          className="w-96"
          contentClassName="p-6"
          headerClassName="bg-red-50 text-red-700 p-4"
          footer={
            <div className="flex justify-end gap-3 p-4 bg-gray-50">
              <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={() => setDeleteDialog(false)}
                className="p-button-text hover:bg-gray-100"
              />
              <Button
                label="Delete"
                icon="pi pi-trash"
                onClick={handleDelete}
                className="p-button-danger hover:bg-red-600"
              />
            </div>
          }
        >
          <div className="flex items-center gap-4 text-gray-700">
            <i className="pi pi-exclamation-triangle text-red-500 text-4xl" />
            <p className="text-lg">
              Are you sure you want to delete this event? This action cannot be
              undone.
            </p>
          </div>
        </Dialog>
      </EventLayout>
    </>
  );
};

export default EventDetails;
