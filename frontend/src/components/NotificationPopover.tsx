import { NotificationEvent } from "../App";
import "./NotificationPopover.css";

type Props = {
  notifications: NotificationEvent[];
};

export const NotificationPopover = ({ notifications }: Props) => {
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="wrapper">
      {notifications.length > 0 ? (
        <div className="notificationWrapper">
          {notifications.map((notification) => (
            <div className="notification">
              <div className="notificationImg">
                <img src={notification.personProfileImg} alt="profile" />
              </div>

              <div className="notificationText">
                <div className="notificationMessage">
                  <span className="notificationPersonName">
                    {notification.personName}:
                  </span>

                  <span className="notificationMessageText">
                    {notification.message}
                  </span>
                </div>

                <div className="notificationTime">
                  {formatDate(notification.notificationTime)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">Nenhuma notificação :{"("}</div>
      )}
    </div>
  );
};
