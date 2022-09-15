// Container for rendering the messages in a notepad.
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { API, Auth } from "aws-amplify";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Messages.css";
import { onError } from "../lib/errorLib";
import "./SearchNotepad.css";


export default function SearchNotepad() {
    // State variables
    const [searchQuery, setSearchQuery] = useState("");
    const [notepads, setNotepads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function searchNotepad(query) {
        return API.get("let-me-know", `/notepad/search/${query}`);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            if (validateSearchQuery()) {

                // Send message to notepad.
                const notepads = await searchNotepad(searchQuery);

                setNotepads(notepads);

                console.log(notepads);

                // Clear the input values in the form.
                setSearchQuery("");
            }
        } catch (e) {
            onError(e);
        }
    }

    function validateSearchQuery() {
        return searchQuery.length > 0;
    }

    function renderSearchBar() {
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="searchQuery" size="lg">
                    <Form.Control
                        autoFocus
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Form.Group>
            </Form>
        );
    }

    function renderNotepadList() {
        return (
            <>
                {notepads.map(({ mainIdentifier, createdAt, notepadId }) => (
                    <LinkContainer key={notepadId} to={`/notepads/${notepadId}`}>
                        <ListGroup.Item action>
                            <span className="font-weight-bold">
                                {mainIdentifier}
                            </span>
                            <br />
                            <span className="text-muted">
                                Created: {new Date(createdAt).toLocaleString()}
                            </span>
                        </ListGroup.Item>
                    </LinkContainer>
                ))}
            </>
        );
    }

    return (
        <div className="SearchBar">
            {renderSearchBar()}
            {notepads.length > 0 && renderNotepadList()}
        </div>
    )
}