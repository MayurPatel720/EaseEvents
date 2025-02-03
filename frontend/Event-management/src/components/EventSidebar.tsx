import { PanelMenu } from "primereact/panelmenu";
import { MenuItem } from "primereact/menuitem";
import { useNavigate, useParams } from "react-router";
import "../css/sidebar.css";

export default function EventSidebar() {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>(); // Correct way to extract eventId

  const items: MenuItem[] = [
    {
      label: "My Event",
      icon: "pi pi-th-large",
      command: () => {
        if (eventId) {
          navigate(`/events/${eventId}`);
        } else {
          console.warn("Event ID not found in URL!");
        }
      },
    },
    {
      label: "Participants",
      icon: "pi pi-folder-plus",
      command: () => {
        if (eventId) {
          navigate(`/events/${eventId}/participants`);
        }
      },
    },
    {
      label: "Volunteers",
      icon: "pi pi-users",
      command: () => {
        if (eventId) {
          navigate(`/events/${eventId}/volunteers`);
        }
      },
    },
    {
      label: "Analytics",
      icon: "pi pi-chart-line",
      command: () => {
        if (eventId) {
          navigate(`/events/${eventId}/analytics`);
        }
      },
    },
    {
      label: "Promotions",
      icon: "pi pi-megaphone",
      command: () => {
        if (eventId) {
          navigate(`/events/${eventId}/promotions`);
        }
      },
    },
    {
      label: "Q&A",
      icon: "pi pi-comments",
      command: () => {
        if (eventId) {
          navigate(`/events/${eventId}/qa`);
        }
      },
    },
  ];

  return (
    <div className="card flex justify-content-center">
      <PanelMenu
        model={items}
        className="w-72 bg-gray-100 border-r rounded-md"
      />
    </div>
  );
}
