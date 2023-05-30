import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNotifications } from "_actions/user_actions";
import { Routes } from "../../../constants/routeItems";

const { notificationWriting } = Routes;

const Notification = (): JSX.Element => {
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    getNotifications().then((res) => {
      setNotification(res.notification);
    });
  }, []);

  return (
    <div className="full-screen max-w-5xl m-auto">
      <div className="flex justify-between py-5 px-5">
        <h2 className="font-semibold">📍 공지사항</h2>
        <button type="button">
          <Link
            className="inline-block py-2 px-3 text-xs text-[#fff] bg-[#35c5f0] font-semibold rounded-md "
            to={notificationWriting}
          >
            + 공지추가
          </Link>
        </button>
      </div>
      <div className="p-5">
        <ul className="notification-list">
          {notification.map((item) => (
            <NotificationItems
              key={item._id}
              id={item._id}
              title={item.title}
              contents={item.contents}
              imagePath={item.imagePath}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const NotificationItems = ({
  title,
  contents,
  imagePath,
  id,
}: {
  title: string;
  contents: string;
  imagePath: string;
  id: string;
}): JSX.Element => {
  return (
    <li className="mb-4">
      <Link
        className="block p-5 border-2 rounded-xl shadow-md text-sm font-medium"
        to={{
          pathname: `/admin/notification/${id}`,
          state: { title, contents, imagePath, id },
        }}
      >
        <span>{title}</span>
      </Link>
    </li>
  );
};

export default Notification;
