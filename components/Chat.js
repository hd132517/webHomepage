import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import styles from "./Chat.module.css";

const socket = io("http://localhost:3001");

export default function Chat() {
    const [currentUser, setCurrentUser] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [room, setRoom] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        socket.on("updateUsers", (connectedUsers) => {
            setUsers(connectedUsers);
        });

        socket.on("receiveMessage", (data) => {
            if (data.room === room) {
                setMessages((prev) => [...prev, data]);
            }
        });

        return () => {
            socket.off("updateUsers");
            socket.off("receiveMessage");
        };
    }, [room]);

    const joinChat = () => {
        if (currentUser.trim()) {
            socket.emit("joinChat", currentUser);
            setIsLoggedIn(true);
        }
    };

    const startChat = (user) => {
        const newRoom = `room_${[currentUser, user].sort().join("_")}`;
        setRoom(newRoom);
        setSelectedUser(user);
        socket.emit("joinRoom", { sender: currentUser, receiver: user, room: newRoom });
        setMessages([]); //초기화
    };

    const sendMessage = () => {
        if (message.trim() && room) {
            const data = { room, sender: currentUser, content: message, type: "text" };
            socket.emit("sendMessage", data);
            //setMessages((prev) => [...prev, data]);
            setMessage("");
        }
    };

    const sendFile = () => {
        if (file && room) {
            const reader = new FileReader();
            reader.onload = () => {
                const data = {
                    room,
                    sender: currentUser,
                    content: reader.result,
                    fileName: file.name,
                    type: "file",
                };
                socket.emit("sendMessage", data);
                //setMessages((prev) => [...prev, data]);
            };
            reader.readAsDataURL(file);
            setFile(null);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className={styles.loginContainer}>
                <h2>이름을 입력하여 채팅에 입장하세요</h2>
                <input
                    type="text"
                    value={currentUser}
                    onChange={(e) => setCurrentUser(e.target.value)}
                    placeholder="이름 입력"
                    className={styles.input}
                />
                <button onClick={joinChat} className={styles.button}>
                    가입
                </button>
            </div>
        );
    }

    if (!selectedUser) {
        return (
            <div className={styles.userListContainer}>
                <h2>사용자 목록</h2>
                <ul className={styles.userList}>
                    {users.filter((user) => user !== currentUser).map((user) => (
                        <li
                            key={user}
                            onClick={() => startChat(user)}
                            className={styles.userItem}
                        >
                            {user}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className={styles.chatContainer}>
            <h3 className={styles.chatHeader}>{selectedUser} 님과 채팅 중</h3>
            <div className={styles.messagesContainer}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={
                            msg.sender === currentUser
                              ? styles.myMessage
                              : styles.theirMessage
                        }
                    >
                        <strong>{msg.sender}:</strong>
                        {msg.type === "text" ? (
                            <span>{msg.content}</span>
                        ) : (
                            <a href={msg.content} download={msg.fileName}>
                              {msg.fileName}
                            </a>
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.inputContainer}>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력하세요"
                    className={styles.input}
                />
                <button onClick={sendMessage} className={styles.button}>
                    전송
                </button>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button onClick={sendFile} disabled={!file}>
                    파일 전송
                </button>
            </div>
        </div>
    );
}
