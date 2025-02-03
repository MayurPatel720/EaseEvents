import { PanelMenu } from "primereact/panelmenu";
import { MenuItem } from "primereact/menuitem";
import "../css/sidebar.css";
import { useNavigate } from "react-router";
export default function MultipleDemo() {
  const navigate = useNavigate();
  const items: MenuItem[] = [
    {
      label: "Dashboard ",
      icon: "pi pi-th-large",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "My Events",
      icon: "pi pi-folder-plus",
      command: () => {
        navigate("/events");
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
