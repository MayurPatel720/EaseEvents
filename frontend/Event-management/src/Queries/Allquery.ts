/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
export const api = "http://localhost:8000";

// export const api = "https://easeevents.onrender.com";

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

const EditOrganizer = async (formdata: any) => {
  const res = await axios.put(`${api}/user/profile/${formdata.userID}`, formdata);
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
const FetchOGDetail = async (userID: string) => {
  const response = await axios.get(`${api}/user/profileDetails/${userID}`);
  return response.data;
};

const fetchVolunteer = async (eventID: string) => {
  const response = await axios.get(`${api}/volunteer/${eventID}`);
  return response.data;
};

const fetchVolunteerdetail = async (VolID: string) => {
  const response = await axios.get(`${api}/volunteer/${VolID}/details`);
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

const CreateVolunteer = async (volunteerdata: any) => {
  const res = await axios.post(`${api}/volunteer/register`, volunteerdata);
  return res.data;
};

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: createEvent,
  });
};

export const useCreateVolunteer = () => {
  return useMutation({
    mutationFn: CreateVolunteer,
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

export const useEditOrganizer = () => {
  return useMutation({
    mutationFn: EditOrganizer,
  });
};

export const useGetOrganizerDetails = (userID: string) => {
  return useQuery({
    queryFn: () => FetchOGDetail(userID),
    queryKey: ["getorgade"],
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

export const useFetchVolunteerByEventID = (eventId: string) =>
  useQuery({
    queryKey: ["vol", eventId],
    queryFn: () => fetchVolunteer(eventId),
  });

export const useGetvolunteerDetails = (VolID: string) =>
  useQuery({
    queryKey: ["vold", VolID],
    queryFn: () => fetchVolunteerdetail(VolID),
  });

export const useFetchParticipantsByEventId = (eventId: string) =>
  useQuery({
    queryKey: ["participants", eventId],
    queryFn: () => fetchParticipantsByEventId(eventId),
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
  });
