/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import MyLayout from "../layout/MainLayout";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { ProgressSpinner } from "primereact/progressspinner";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { FileUpload } from "primereact/fileupload";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";

const AllEvents: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [title, settitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [venue, setvenue] = useState<string>("");
  const [ticketprice, setticketprice] = useState<Nullable<number>>();
  const [ticketavaible, setticketavaible] = useState<Nullable<number>>();
  const [starttime, setstartTime] = useState<Nullable<Date>>(null);
  const [endtime, setendTime] = useState<Nullable<Date>>(null);

  const [Date, setDate] = useState<Nullable<Date>>(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedCategory(event.target.value);
  };

  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allevents"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:8000/event/all");
      return response.data;
    },
  });

  const handlesubmit = async (e: any) => {
    e.preventDefault();
    const formdata = {
      title: title,
      venue: venue,
      date: Date,
      startTime: starttime,
      endTime: endtime,
      image: "as.png",
      ticketCategory: selectedCategory,
      ticketsAvailable: ticketavaible,
      ticketPrice: ticketprice,
    };
    setLoading(true);
    const response = await axios.post(
      "http://localhost:8000/event/create_event",
      formdata
    );
    if (response.status) {
      setLoading(false);
    }
  };

  return (
    <MyLayout>
      {isError && <p>error : {error.message}</p>}

      <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
        <div className="pl-10">
          <h2 className="text-2xl mb-10">Create Event</h2>
          <div className="flex flex-wrap gap-4 w-full">
            <FloatLabel className="flex-1 min-w-[250px]">
              <InputText
                id="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
              <label htmlFor="title">Event Title</label>
            </FloatLabel>
            <FloatLabel className="flex-1 min-w-[250px]">
              <InputText
                id="venue"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={venue}
                onChange={(e) => setvenue(e.target.value)}
              />
              <label htmlFor="venue">Event Venue</label>
            </FloatLabel>
            <FloatLabel className="flex-1 min-w-[250px]">
              <Calendar
                dateFormat="dd/mm/yy"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                inputId="Date"
                value={Date}
                onChange={(e) => setDate(e.target.value)}
              />
              <label htmlFor="Date">Event Date</label>
            </FloatLabel>
          </div>
          <div className="flex mt-10 flex-wrap gap-4 w-full">
            <FloatLabel className="flex-1 min-w-[250px]">
              <Calendar
                hourFormat="12"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="Start_time"
                value={starttime}
                onChange={(e) => setstartTime(e.value)}
                timeOnly
              />
              <label htmlFor="Start_time">Event Starting time</label>
            </FloatLabel>
            <FloatLabel className="flex-1 min-w-[250px]">
              <Calendar
                hourFormat="12"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="Start_time"
                value={endtime}
                onChange={(e) => setendTime(e.value)}
                timeOnly
              />
              <label htmlFor="Start_time">Event Ending time</label>
            </FloatLabel>
          </div>
          <div className="flex mt-10 flex-wrap gap-4 w-full">
            <FileUpload
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              name="demo[]"
              url="/api/upload"
              multiple
              accept="image/*"
              headerTemplate={({ chooseButton, cancelButton }) => (
                <div className="flex items-center gap-6 p-3 bg-gray-100 rounded-lg shadow-md">
                  {chooseButton}
                  {cancelButton}
                </div>
              )}
              maxFileSize={1000000}
              emptyTemplate={
                <p className="m-0 text-center text-gray-600">
                  Drag and drop files here to upload.
                </p>
              }
            />
          </div>
          <div className="flex mt-10 flex-wrap gap-4 w-full">
            <FloatLabel className="flex-1 min-w-[250px] relative">
              <select
                name="Category"
                id="dd"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                onChange={handleCategoryChange}
              >
                <option value="free">FREE</option>
                <option value="paid">PAID</option>
              </select>
              <label
                htmlFor="dd"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-300"
              >
                Select a Category
              </label>
            </FloatLabel>

            {selectedCategory === "paid" && (
              <FloatLabel className="flex-1 min-w-[250px] relative">
                <InputNumber
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  inputId="integeronly"
                  value={ticketprice}
                  onValueChange={(e: InputNumberValueChangeEvent) =>
                    setticketprice(e.value)
                  }
                />
                <label htmlFor="integeronly">Ticket Price</label>
              </FloatLabel>
            )}

            <FloatLabel>
              <InputNumber
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="ticketavaible"
                value={ticketavaible}
                onChange={(e) => setticketavaible(e.value)}
              />
              <label htmlFor="ticketavaible">Ticket Available</label>
            </FloatLabel>
          </div>

          <div className="flex mt-10 flex-wrap gap-4 w-full">
            <Button
              className="w-full  bg-blue-500 p-2"
              label="Submit"
              loading={loading}
              onClick={handlesubmit}
            />
          </div>
        </div>
      </Sidebar>

      <div className="h-full rounded-xl ">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl mt-2 font-bold mb-10  ">All Events</h1>
            <Button
              className="bg-blue-500 text-white flex items-center justify-center px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={() => setVisible(true)}
            >
              +
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && (
              <div className="card flex justify-content-center">
                <ProgressSpinner />
              </div>
            )}
            {events?.map((event: any) => (
              <div key={event._id} className="card flex justify-content-center">
                <Card
                  title={event.title}
                  subTitle={event.venue}
                  className="md:w-25rem"
                  header={
                    event.image ? (
                      <img alt={event.title} src={event.image} />
                    ) : (
                      <img
                        alt="Default Event"
                        src="https://i2.wp.com/wallpapercave.com/wp/wp7488244.jpg"
                      />
                    )
                  }
                >
                  <p className="m-0">
                    <strong>Date:</strong>{" "}
                    {moment(event.date).format("DD-MM-YYYY")}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MyLayout>
  );
};

export default AllEvents;
