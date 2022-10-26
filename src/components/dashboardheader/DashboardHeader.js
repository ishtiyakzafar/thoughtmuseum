import React, { useState, useEffect } from "react";
import { actionLogout } from "../../store/reducer/user";
import "./DashboardHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../assets/images";
import { Avatar, Menu, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { store } from "./../../store";
import { getNewMessage } from './../../store/reducer/message';
import { updateUserAvailability, openMessengerWindow } from './../../store/reducer/user';
import ChatWindow from "../../components/chatbox/ChatWindow";
import MessangerDrawer from "../../components/messangerdrawer/MessangerDrawer";
import { io } from "socket.io-client";

const socket = io('http://thoughtmuseumapi-env-1.eba-wjdtxzm5.us-west-1.elasticbeanstalk.com');

const DashboardHeader = () => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState([]);
  const { user, chatUsers, chatWindow } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    socket.emit("leave", user.id);
    dispatch(actionLogout(user));
  }

  useEffect(async () => {
    await realTimeIntraction();
  }, []);
  useEffect(() => {
    return () => {
      console.log('---exist--')
      socket.removeAllListeners("addMessage");
    }
  }, [])

  useEffect(() => {
    setUserData(chatUsers);
  }, [chatUsers])

  useEffect(() => {
    setUsers(chatWindow);
  }, [chatWindow])

  const menu = (
    <Menu>
      <Menu.Item className="profile" onClick={() => history.push("/myprofile")}>
        My Profile
      </Menu.Item>
      <Menu.Item className="profile" onClick={() => handleLogout()}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const realTimeIntraction = () => {
    socket.emit("join", user.id);

    socket.on('userOnline', (data) => {
      console.log({ data });
      store.dispatch(updateUserAvailability(data));
    });

    socket.on('userOffline', (data) => {
      console.log({ data });
      store.dispatch(updateUserAvailability(data));
    })

    socket.on('addMessage', (data) => {
      console.log(data, socket);
      if (data.senderId && data.recieverId && data.recieverId === user.id) openMessenger(data);
      store.dispatch(getNewMessage(data, data.senderId));
    })

  }

  const handleClose = (id) => {
    const filteredUser = users.filter((item) => {
      return item.id !== id;
    });
    store.dispatch(openMessengerWindow(filteredUser));
  };

  const showMessenger = async (id) => {
    const checkExistingUser = users.some((dataa) => dataa.id == id);
    const filterUser = userData.filter(
      (item) => item.id == id && !checkExistingUser
    );

    if (filterUser.length > 0) {
      let newarr = [...users, filterUser[0]];
      const getTwoUsers = newarr.slice(newarr?.length - 2, newarr?.length);
      store.dispatch(openMessengerWindow(getTwoUsers));
    }
  };

  const openMessenger = (data) => {
    const id = data.senderId;
    const { chatUsers, chatWindow } = store.getState().userStore;
    const checkExistingUser = chatWindow.some((dataa) => dataa.id == id);
    const userLists = chatUsers;
    const filterUser = userLists.filter(
      (item) => item.id == id && !checkExistingUser
    );
    if (filterUser.length > 0) {
      let newarr = [...chatWindow, filterUser[0]];
      const getTwoUsers = newarr.slice(newarr?.length - 2, newarr?.length);
      store.dispatch(openMessengerWindow(getTwoUsers));
    }
  }

  return (
    <>
      <div className="header">
        <img onClick={() => history.push("/")} src={images.logo} alt="logo" />
        <div className="userdropdown">
          <span className="username forDesktop">{user.firstName}</span>
          <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
            <div className="user-Icon">
              <Avatar size={45} icon={<UserOutlined />} />
            </div>
          </Dropdown>
        </div>
      </div>

      <MessangerDrawer showMessenger={showMessenger} />

      <div className="msg-box">
        {users.map((item) => (
          <ChatWindow key={item.id} item={item} handleClose={handleClose} />
        ))}
      </div>
    </>
  );
};

export default DashboardHeader;
