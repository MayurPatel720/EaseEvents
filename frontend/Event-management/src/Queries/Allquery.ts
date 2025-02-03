/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const createEvent = async (formdata: any) => {
  const res = await axios.post(
    "http://localhost:8000/event/create_event",
    formdata
  );
  return res.data;
};

const FetchEvent = async () => {
  const response = await axios.get("http://localhost:8000/event/all");
  return response.data;
};
const fetchEventById = async (eventId: string) => {
  const response = await axios.get(`http://localhost:8000/event/${eventId}`);
  return response.data;
};

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: createEvent,
  });
};

export const useGetallEvents = () =>
  useQuery({
    queryKey: ["allevents"],
    queryFn: FetchEvent,
  });

export const useFetchEventByID = (eventId: string) =>
  useQuery({
    queryKey: ["event", eventId], 
    queryFn: () => fetchEventById(eventId), 
  });
