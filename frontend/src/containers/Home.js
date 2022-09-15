// Top level component for the homepage. Responds to the '/' route.
import React from "react";
import "./Home.css";
import Button from "react-bootstrap/esm/Button";
import SearchNotepad from "./SearchNotepad";

// TODO: Have a search feature or "New Notepad" feature to the home page.

export default function Home() {
    return (
        <div className="Home">
            <div className="lander">
                <h1>Let Me Know</h1>
            </div>
            {/* TOOD: Make it so that you have to be logged-in to create a new notepad */}
            <Button href="/create" variant="primary">Create new notepad</Button>{' '}
            <SearchNotepad />
        </div>
    )
}