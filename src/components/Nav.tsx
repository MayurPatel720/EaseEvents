import { Menubar } from "primereact/menubar";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router";

export default function TemplateDemo() {
  const navigate = useNavigate();
  // Custom renderer for menu items
  const itemRenderer = (item: MenuItem) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
    </a>
  );

  // Menu items with TypeScript support
  const items: MenuItem[] = [
    {
      label: "Home",
      icon: "pi pi-home",
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
          separator: true, // Defines a separator
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
      className="h-[35px] ml-1 mr-1 hover: cursor-pointer"
    />
  );

  const end = (
    <div className="flex align-items-center gap-2">
      {/* <InputText
        placeholder="Search"
        type="text"
        className="w-8rem sm:w-auto"
      /> */}
      <Avatar
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
