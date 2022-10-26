import React, { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";
import { UserOutlined } from "@ant-design/icons";
import { Form, Button, Input, Avatar } from "antd";
import { SendOutlined, TagsOutlined, CloseOutlined, AudioOutlined } from "@ant-design/icons";
import { io } from "socket.io-client";
import chatServ from "../../service/chatroom";
import { useSelector } from "react-redux";

const socket = io(process.env.REACT_APP_API_SERVICE_URL);
const { Search } = Input;

const ChatWindow = ({ handleClose, item }) => {
  const { user } = useSelector((state) => state.userStore);
  const { messages } = useSelector((state) => state.messageStore);
  const [msg, setMsg] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [form] = Form.useForm();
  const [media, setMedia] = useState([]);

  const inputEl = useRef(null);

  const suffix = (
    <div className="file-input-container">
      <input
        type="file"
        onChange={(e) => handleMedia(e)}
        id={`hidden-file${item.id}`}
        key={media}
      />
      <label htmlFor={`hidden-file${item.id}`} className="attachFile">
        <TagsOutlined />
      </label>
    </div>
  );

  const removeFile = () => {
    setMedia([]);
    setSelectedFile('')
  }

  const handleMedia = (e) => {
    setMedia(e.target.files[0]);
    setSelectedFile(e.target.files[0].name)
  }

  const onSearch = (value) => {
    handleSendMessage({ message: value });
  }

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({});
  }

  const fetchConvsersation = async () => {
    try {
      chatServ.getConverstion(item.id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConvsersation();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [msg])

  useEffect(() => {
    if (Object.keys(messages).length && messages[item.id]) {
      setMsg([...messages[item.id]]);
    }
  }, [messages]);

  const handleSendMessage = async (value) => {
  
    let chatInfo = {
      message: value.message,
      isMedia: false,
      media: "",
      recieverId: item?.id,
    };
    if (media instanceof File) {
      const formData = new FormData();
      formData.append("message", value.message ? value.message : '');
      formData.append("isMedia", true);
      formData.append("recieverId", item?.id);
      formData.append(
        "media",
        media
      );
      chatInfo = formData;
    }


    try {
      const res = await chatServ.SendOnlyMessage(chatInfo);
      socket.emit("newMessage", res.data);
      fetchConvsersation();
    } catch (err) {
      console.log(err);
    } finally {
      setMedia([]);
      setSelectedFile('');
      form.resetFields();
      inputEl.current.focus();
    }
  };

  return (
    <div className="chat-window">
      <div className="caht-haeding">
        <Avatar size={45} icon={<UserOutlined />} />
        <div className="content">
          <p className="name">
            {item.firstName} {item.lastName}
          </p>
          <small className="status">{item.status ? 'Online' : 'Offline'}</small>
        </div>
        <div className="close-messenger" onClick={() => handleClose(item.id)}>
          <CloseOutlined />
        </div>
      </div>
      <div className="chat-box">
        <div>
          {msg.map((text) =>
            text.recieverId == item.id ? (
              <div className="ctudenttt" key={text.id}>
                <div
                  className="taecher"
                  style={{ marginBottom: "10px" }}
                >
                  {text.mediaUrl &&
                    <div>
                      <a href={text.mediaUrl} download target="_blank" className="media-file">
                        {text.mediaUrl.substring(text.mediaUrl.lastIndexOf('/') + 1).match(/.(jpg|jpeg|png)$/i) &&
                          <img src={text.mediaUrl} />
                        }
                        {!text.mediaUrl.substring(text.mediaUrl.lastIndexOf('/') + 1).match(/.(jpg|jpeg|png)$/i) &&
                          text.mediaUrl.substring(text.mediaUrl.lastIndexOf('/') + 1)
                        }
                      </a>
                    </div>
                  }
                  {text.message}
                </div>
              </div>
            ) : (
              <div
                key={text.id}
                className="taecher"
                style={{ marginBottom: "10px" }}
              >
                {text.mediaUrl &&
                  <div>
                    <a href={text.mediaUrl} download target="_blank" className="media-file">
                      {text.mediaUrl.substring(text.mediaUrl.lastIndexOf('/') + 1).match(/.(jpg|jpeg|png)$/i) &&
                        <img src={text.mediaUrl} />
                      }
                      {!text.mediaUrl.substring(text.mediaUrl.lastIndexOf('/') + 1).match(/.(jpg|jpeg|png)$/i) &&
                        text.mediaUrl.substring(text.mediaUrl.lastIndexOf('/') + 1)
                      }
                    </a>
                  </div>
                }
                {text.message}
              </div>
            )
          )}
        </div>
        <div ref={messagesEndRef} />
        <Form
          form={form}
          preserve={false}
          className="msg-input"
          name="normal_modal"
          autoFocus={true}
        >
          {selectedFile && <div className="selected-file">{selectedFile}<CloseOutlined className="close-icon" onClick={removeFile} /></div>}
          <Form.Item name="message">
            <Search
              placeholder="Type here.."
              enterButton={<SendOutlined />}
              size="large"
              suffix={suffix}
              onSearch={onSearch}
              ref={inputEl}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChatWindow;
