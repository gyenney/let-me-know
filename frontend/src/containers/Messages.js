// Container for rendering the messages in a notepad.
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import ListGroup from "react-bootstrap/ListGroup";
import { LinkContainer } from "react-router-bootstrap";


export default function Messages() {
    const { id } = useParams(); // Get notepad identifier from URL path.

    // State variables
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        function loadMessages() {
            console.log("Loading messages...");
            return API.get("let-me-know", `/notepads/${id}`);
        }
        async function onLoad() {
            try {
                console.log("page loaded!");
                const messages = await loadMessages();
                setMessages(messages);
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
            <div className="messages">
                {messages.map(({ msgTimestamp, userId, message }) => (
                    <LinkContainer key={msgTimestamp}>
                        <ListGroup.Item action>
                            <span className="font-weight-bold">
                                {message.trim().split("\n")[0]}
                            </span>
                            {/* <br />
                            <span className="text-muted">
                                Created: {new Date(createdAt).toLocaleString()}
                            </span> */}
                        </ListGroup.Item>
                    </LinkContainer>
                ))}
                {/* {messages.map(({ content }) => (
                    <p>{content}</p>
                ))} */}
            </div>
        );
    }

    return (
        <div className="Messages">
            <h1>{id}</h1>
            {!isLoading && renderMessages()}
        </div>
    )
}