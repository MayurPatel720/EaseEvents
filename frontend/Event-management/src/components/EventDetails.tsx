/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import EventLayout from "../layout/EventLayout";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { useFetchEventByID } from "../Queries/Allquery";
interface RouteParams {
  eventId?: string;
  [key: string]: string | undefined;
}

const EventDetails: React.FC = () => {
  const navigate = useNavigate();
  const { eventId }: any = useParams<RouteParams>();
  const { data: event } = useFetchEventByID(eventId);
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

  return (
    <>
      <EventLayout>
        <BreadCrumb model={items} home={home} />
        <div className="container">
          <div className="p-4">
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <p className="text-gray-600">{event.description}</p>
          </div>
        </div>
      </EventLayout>
    </>
  );
};

export default EventDetails;
