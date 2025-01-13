import { Menubar } from "primereact/menubar";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router";
import ContactCard from "./Contactcard";

// Extend the MenuItem type to include our custom properties
interface CustomMenuItem extends MenuItem {
  badge?: number;
  items?: CustomMenuItem[];
}

export default function TemplateDemo() {
  const navigate = useNavigate();

  const itemRenderer = (item: MenuItem) => {
    const customItem = item as CustomMenuItem;
    return (
      <a className="flex align-items-center p-menuitem-link">
        <span className={customItem.icon} />
        <span className="mx-2">{customItem.label}</span>
        {customItem.badge && (
          <Badge className="ml-auto" value={customItem.badge} />
        )}
      </a>
    );
  };

  const items: CustomMenuItem[] = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Features",
      icon: "pi pi-star",
    },
    {
      label: "Projects",
      icon: "pi pi-search",
      items: [
        {
          label: "Core",
          icon: "pi pi-bolt",
          template: itemRenderer,
        },
        {
          label: "Blocks",
          icon: "pi pi-server",
          template: itemRenderer,
        },
        {
          label: "UI Kit",
          icon: "pi pi-pencil",
          template: itemRenderer,
        },
        {
          separator: true,
        },
        {
          label: "Templates",
          icon: "pi pi-palette",
          items: [
            {
              label: "Apollo",
              icon: "pi pi-palette",
              badge: 2,
              template: itemRenderer,
            },
            {
              label: "Ultima",
              icon: "pi pi-palette",
              badge: 3,
              template: itemRenderer,
            },
          ],
        },
      ],
    },
    {
      label: "Contact",
      icon: "pi pi-envelope",
      badge: 3,
      template: itemRenderer,
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
