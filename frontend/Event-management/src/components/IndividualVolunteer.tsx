/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Avatar } from "primereact/avatar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ReactElement, JSXElementConstructor, ReactNode } from "react";
import EventLayout from "../layout/EventLayout";

const IndividualVolunteer = () => {
  // Sample data
  const upcomingEvents = [
    {
      id: 1,
      name: "Tech Conference 2025",
      date: "2025-03-15",
      role: "Registration Desk",
    },
    {
      id: 2,
      name: "Community Meetup",
      date: "2025-03-20",
      role: "Event Setup",
    },
  ];

  const tasks = [
    {
      id: 1,
      task: "Check-in attendees",
      status: "pending",
      time: "9:00 AM - 11:00 AM",
    },
    {
      id: 2,
      task: "Help with setup",
      status: "completed",
      time: "8:00 AM - 9:00 AM",
    },
  ];

  const statusTemplate = (rowData: {
    status:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | null
      | undefined;
  }): any => {
    const severity = rowData.status === "completed" ? "success" : "warning";
    return <Tag value={rowData.status} severity={severity} />;
  };

  return (
    <EventLayout>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar icon="pi pi-user" size="large" shape="circle" />
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <p className="text-sm text-gray-500">
                      Volunteer since Jan 2025
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <p className="text-xl font-bold">5</p>
                    <p className="text-sm text-gray-500">Events</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <p className="text-xl font-bold">24h</p>
                    <p className="text-sm text-gray-500">Hours</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <TabView>
                <TabPanel header="Dashboard">
                  <Card className="mb-4">
                    <div className="card-title mb-4">
                      <h2 className="text-xl font-bold flex items-center">
                        <i className="pi pi-calendar mr-2"></i>
                        Upcoming Events
                      </h2>
                    </div>
                    <DataTable value={upcomingEvents} responsiveLayout="scroll">
                      <Column field="name" header="Event Name"></Column>
                      <Column field="date" header="Date"></Column>
                      <Column field="role" header="Role"></Column>
                    </DataTable>
                  </Card>

                  <Card>
                    <div className="card-title mb-4">
                      <h2 className="text-xl font-bold flex items-center">
                        <i className="pi pi-check-square mr-2"></i>
                        Today's Tasks
                      </h2>
                    </div>
                    <DataTable value={tasks} responsiveLayout="scroll">
                      <Column field="task" header="Task"></Column>
                      <Column field="time" header="Time"></Column>
                      <Column
                        field="status"
                        header="Status"
                        body={statusTemplate}
                      ></Column>
                    </DataTable>
                  </Card>
                </TabPanel>

                <TabPanel header="Events">
                  <Card>
                    <p className="text-center text-gray-500">
                      Events content will go here
                    </p>
                  </Card>
                </TabPanel>

                <TabPanel header="Tasks">
                  <Card>
                    <p className="text-center text-gray-500">
                      Tasks content will go here
                    </p>
                  </Card>
                </TabPanel>

                <TabPanel header="Messages">
                  <Card>
                    <p className="text-center text-gray-500">
                      Messages content will go here
                    </p>
                  </Card>
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
    </EventLayout>
  );
};

export default IndividualVolunteer;
