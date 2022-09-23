// Container for rendering the messages in a notepad.
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { API, Auth } from "aws-amplify";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import LoaderButton from "../components/LoaderButton";
import "./Messages.css";
import { onError } from "../lib/errorLib";
import config from "../config";


export default function Messages() {
    const { id } = useParams(); // Get notepad identifier from URL path.
    const WS_URL = process.env.REACT_APP_WEBSOCKET_URL;

    // State variables
    const socket = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [connections, setConnections] = useState([]);
    const [messages, setMessages] = useState([]);
    const [notepad, setNotepad] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [newMessage, setNewMessage] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        function loadMessages() {
            console.log("Loading messages...");
            return API.get("let-me-know", `/notepads/${id}`);
        }

        function loadNotepad() {
            console.log("Loading notepad...");
            return API.get("let-me-know", `/notepad/${id}`);
        }

        function loadUser() {
            console.log("Loading user...");
            return Auth.currentUserInfo();
        }

        function onConnect() {
            // Check if socket is already connected.
            if (socket.current?.readyState !== WebSocket.OPEN) {
                console.log("WebSocket URL:", WS_URL);
                socket.current = new WebSocket(WS_URL);
            }

            console.log("Connected to WebSocket.");
        }

        async function onLoad() {
            try {
                // Get user's info
                const user = await loadUser();
                setUser(user);

                // GET the notepad item from our API using it's ID.
                const notepadId = `${id}`;
                const notepad = await loadNotepad({ notepadId });
                setNotepad(notepad);

                // GET the messages contained in the notepad from our API.
                const messages = await loadMessages();
                setMessages(messages);

                // Connect to WebSocket.
                onConnect();

            } catch (e) {
                alert(e.toString())
                // onError(e);
            }

            setIsLoading(false);
        }

        onLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run on first render.


    function renderMessages() {
        return (
            <ListGroup>
                <div className="messages">
                    {messages.map(({ msgTimestamp, userId, message }) => (
                        < ListGroupItem key={msgTimestamp} >
                            <span className="ml-2 font-weight-bold"> {userId}</span>
                            <br />
                            {message}
                            < br />
                            <span className="text-muted">
                                {new Date(msgTimestamp).toLocaleString()}
                            </span>
                        </ListGroupItem>
                    ))
                    }
                </div >
            </ListGroup >
        );
    }

    function sendMessage(id, message) {
        return API.post("let-me-know", `/notepads/${id}`, { body: message });
    }

    async function handleChatSubmit(event) {
        event.preventDefault();

        try {
            if (validateChatForm()) {

                // Send message to notepad.
                await sendMessage(notepad.notepadId, { username: user.username, content: newMessage });

                // Clear the input values in the form.
                setNewMessage("");
            }
        } catch (e) {
            onError(e);
        }
    }

    function validateChatForm() {
        return newMessage.length > 0;
    }

    function renderChatForm() {
        return (
            <div id="footer">
                <Form onSubmit={handleChatSubmit}>
                    <Form.Group controlId="newMessage" size="lg">
                        <Form.Control
                            autoFocus
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                    </Form.Group>
                    {/* <LoaderButton
                        block="true"
                        size="lg"
                        type="submit"
                        variant="success"
                        isLoading={isLoading}
                        disabled={!validateChatForm()}
                    >
                        Submit
                    </LoaderButton> */}
                </Form>
            </div >
        );
    }

    return (
        <div className="Messages">
            {!isLoading && <h1>{notepad.mainIdentifier}</h1>}
            {!isLoading && renderMessages()}
            {renderChatForm()}
        </div>
    )
}