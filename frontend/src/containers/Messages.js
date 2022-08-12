// Container for rendering the messages in a notepad.
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";

export default function Messages() {
    const { id } = useParams(); // Get notepad identifier from URL path.

    // State variables
    const [messages, setMessages] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        function loadMessages() {
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
    }, []); // Only run on first render.


    function renderMessages() {
        return (
            <div className="messages">
                {messages.map(({ content }) => (
                    <p>{content}</p>
                ))}
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