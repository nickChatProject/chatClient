import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import {ChatContextProvider} from "./context/ChatContext";
import {WebSocketProvider} from "./context/WebSocketContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ChatContextProvider>
            <WebSocketProvider>
                <App/>
            </WebSocketProvider>
        </ChatContextProvider>
    </React.StrictMode>
);