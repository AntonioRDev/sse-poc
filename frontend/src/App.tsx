import { useEffect, useState } from "react";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { NotificationPopover } from "./components/NotificationPopover";
import "./App.css";

export type NotificationEvent = {
  message: string;
  personName: string;
  personProfileImg: string;
  notificationTime: string;
};

function App() {
  const [notifications, setNotifications] = useState<NotificationEvent[]>([]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const notificationEndpoint = "http://localhost:3950/streamNotifications";
    const sse = new EventSource(notificationEndpoint);
    sse.onmessage = (event) => {
      if (!event.data) return;

      const data = JSON.parse(event.data) as NotificationEvent;
      setNotifications((prev) => [data, ...prev]);

      console.log("data", data);
    };
  }, []);

  return (
    <main>
      <header>
        <Popover
          isOpen={notificationOpen}
          positions={["bottom"]}
          content={({ position, popoverRect, childRect }) => {
            return (
              <ArrowContainer
                position={position}
                popoverRect={popoverRect}
                childRect={childRect}
                arrowSize={10}
                arrowColor="rgb(255, 246, 246)"
              >
                <NotificationPopover notifications={notifications} />
              </ArrowContainer>
            );
          }}
        >
          <div
            className="notificationIcon"
            onClick={() => setNotificationOpen(!notificationOpen)}
          >
            <i className="fa-solid fa-bell"></i>
          </div>
        </Popover>
      </header>
    </main>
  );
}

export default App;
