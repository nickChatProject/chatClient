import React, { createContext, useContext, useEffect, useState } from 'react';


const WebSocketContext = createContext();

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    //const [messages, setMessages] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState('disconnected');
    const [ws, setWs] = useState(null);

    useEffect(() => {
        connectWebSocket();

        // return () => {
        //     disconnectWebSocket();
        // };
    }, []);

    const connectWebSocket = () => {


        const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL+ "ws/" + localStorage.getItem("id") + "/");

        socket.onopen = () => {
            console.log("connect success")
            setConnectionStatus('connected');
            setWs(socket)
            //startHeartbeat();
        };

        socket.onclose = () => {
            console.log("connect close")
            setConnectionStatus('disconnected');
            //clearInterval(heartbeatInterval);
        };

        socket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        socket.onmessage = (event) => {
            const newMessage = event.data;
            console.log(newMessage)
        };
    };

    // const disconnectWebSocket = () => {
    //     if (socket) {
    //         socket.close();
    //     }
    // };

    // const startHeartbeat = () => {
    //     heartbeatInterval = setInterval(() => {
    //         if (socket.readyState === WebSocket.OPEN) {
    //             // Send heartbeat message
    //             socket.send('heartbeat');
    //         } else {
    //             // If the connection is closed, stop the heartbeat
    //             clearInterval(heartbeatInterval);
    //         }
    //     }, 5000); // Send heartbeat every 5 seconds
    // };

    // const sendMessage = (message) => {
    //     if (ws && ws.readyState === WebSocket.OPEN) {
    //         ws.send(message);
    //     } else {
    //         console.error('WebSocket not connected.');
    //     }
    // };

    return (
        <WebSocketContext.Provider value={{ connectionStatus, ws }}>
            {children}
        </WebSocketContext.Provider>
    );
};