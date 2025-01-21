/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "axios";

const EventForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    venue: "",
    date: "",
    startTime: "",
    endTime: "",
    image: "",
    ticketCategory: "free",
    ticketPrice: "",
    ticketsAvailable: 0,
  });

  const [errors, setErrors] = useState<any>({});

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    const formErrors: any = {};
    if (!formData.title) formErrors.title = "Title is required.";
    if (!formData.venue) formErrors.venue = "Venue is required.";
    if (!formData.date) formErrors.date = "Date is required.";
    if (!formData.startTime) formErrors.startTime = "Start time is required.";
    if (!formData.endTime) formErrors.endTime = "End time is required.";
    if (!formData.image) formErrors.image = "Image URL is required.";
    if (!formData.ticketsAvailable || formData.ticketsAvailable <= 0)
      formErrors.ticketsAvailable = "Tickets available must be greater than 0.";
    if (formData.ticketCategory === "paid" && !formData.ticketPrice)
      formErrors.ticketPrice = "Ticket price is required for paid events.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/event/create_event",
        formData
      );
      console.log("Event created:", response.data);
      // You can reset the form or navigate as needed
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Create New Event
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="venue">
            Venue
          </label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.venue && (
            <p className="text-red-500 text-xs mt-1">{errors.venue}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="date">
            Event Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="startTime">
            Start Time (HH:mm)
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.startTime && (
            <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="endTime">
            End Time (HH:mm)
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.endTime && (
            <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="image">
            Event Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="ticketCategory"
          >
            Ticket Category
          </label>
          <select
            id="ticketCategory"
            name="ticketCategory"
            value={formData.ticketCategory}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {formData.ticketCategory === "paid" && (
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="ticketPrice"
            >
              Ticket Price
            </label>
            <input
              type="number"
              id="ticketPrice"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.ticketPrice && (
              <p className="text-red-500 text-xs mt-1">{errors.ticketPrice}</p>
            )}
          </div>
        )}

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="ticketsAvailable"
          >
            Tickets Available
          </label>
          <input
            type="number"
            id="ticketsAvailable"
            name="ticketsAvailable"
            value={formData.ticketsAvailable}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.ticketsAvailable && (
            <p className="text-red-500 text-xs mt-1">
              {errors.ticketsAvailable}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
