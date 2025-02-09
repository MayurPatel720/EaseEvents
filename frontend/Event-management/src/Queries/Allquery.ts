/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
// export const api = "http://localhost:8000";
export const api = "https://easeevents.onrender.com";

const createEvent = async (formdata: any) => {
  const res = await axios.post(`${api}/event/create_event`, formdata);
  return res.data;
};
const EditParticipant = async (formdata: any) => {
  const res = await axios.post(
    `${api}/participant/edit/${formdata._id}`,
    formdata
  );
  return res.data;
};
const DeleteParticipant = async (userids: any) => {
  const res = await axios.post(`${api}/participant/delete`, userids);
  return res.data;
};

const FetchEvent = async () => {
  const response = await axios.get(`${api}/event/all`);
  return response.data;
};
const FetchMyEvent = async (userid: string) => {
  const response = await axios.post(`${api}/event/myevents`, { userid });
  return response.data;
};
const fetchEventById = async (eventId: string) => {
  const response = await axios.get(`${api}/event/${eventId}`);
  return response.data;
};
const fetchParticipantsByEventId = async (eventId: string) => {
  const response = await axios.get(`${api}/event/${eventId}/participants`);
  return response.data;
};

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: createEvent,
  });
};
export const useEditParticipant = () => {
  return useMutation({
    mutationFn: EditParticipant,
  });
};
export const useDeleteParticipant = () => {
  return useMutation({
    mutationFn: DeleteParticipant,
  });
};

export const useGetallEvents = () =>
  useQuery({
    queryKey: ["allevents"],
    queryFn: FetchEvent,
  });

export const useFetchMyEvent = (userid: string) =>
  useQuery({
    queryKey: ["myevents", userid],
    queryFn: () => FetchMyEvent(userid),
  });

export const useFetchEventByID = (eventId: string) =>
  useQuery({
    queryKey: ["event", eventId],
    queryFn: () => fetchEventById(eventId),
  });

export const useFetchParticipantsByEventId = (eventId: string) =>
  useQuery({
    queryKey: ["participants", eventId],
    queryFn: () => fetchParticipantsByEventId(eventId),
  });
