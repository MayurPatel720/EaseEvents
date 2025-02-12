/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menubar } from "primereact/menubar";
import { Avatar } from "primereact/avatar";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router";
import ContactCard from "./Contactcard";

// Extend the MenuItem type to include our custom properties
interface CustomMenuItem extends MenuItem {
  badge?: number;
  items?: CustomMenuItem[];
}

export default function TemplateDemo({ toggleSidebar }: any) {
  const navigate = useNavigate();

  const items: CustomMenuItem[] = [
    {
      icon: "pi pi-bars",
      command: () => {
        toggleSidebar();
      },
    },
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        navigate("/");
      },
    },
  ];

  const start = (
    <img
      onClick={() => {
        navigate("/");
      }}
      alt="logo"
      src="./src/assets/EaseEvent logo.png"
      className="h-[35px] ml-1 mr-1 hover:cursor-pointer"
    />
  );

  const end = (
    <div className="flex align-items-center gap-2 group">
      <div className="hidden group-hover:block">
        <ContactCard />
      </div>
      <Avatar
        className="hover:cursor-pointer"
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
      />
    </div>
  );

  return (
    <div className="card pl-4 pr-4">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
