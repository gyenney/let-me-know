import * as uuid from "uuid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../lib/errorLib";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import "./NewNotepad.css"
import { Auth } from "aws-amplify";

// TODO: Allow the user to attach more identifiers to the notepad?

export default function NewNotepad() {
    // TODO: Nav to the messages page for the newly created notepad on creation.
    const nav = useNavigate();
    const [message, setMessage] = useState("");
    const [notepadName, setNotepadName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return (message.length > 0 && notepadName.length > 0);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            // Create notepad.
            // TOOD: Is it fine for our frontend to generate the UUID?
            const notepadId = uuid.v1();
            await createNotepad({ notepadId, notepadName, message });

            const user = await Auth.currentUserInfo();

            // Send message to notepad.
            await sendMessage(notepadId, { username: user.username, content: message });

            // Nav to the notepad page.
            nav(`/notepads/${notepadId}`)

        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function createNotepad(notepad) {
        return API.post("let-me-know", "/create", { body: notepad });
    }

    function sendMessage(id, message) {
        return API.post("let-me-know", `/notepads/${id}`, { body: message });
    }

    return (
        <div className="NewNotepad">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="notepadName" size="lg">
                    <Form.Label>Notepad Name</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={notepadName}
                        onChange={(e) => setNotepadName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="content">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        value={message}
                        as="textarea"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </Form.Group>
                <LoaderButton
                    block
                    type="submit"
                    size="lg"
                    variant="primary"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Create
                </LoaderButton>
            </Form>
        </div>
    );
}