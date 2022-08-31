// Top level component for the homepage. Responds to the '/' route.
import React from "react";
import "./Home.css";

// TODO: Have a search feature or "New Notepad" feature to the home page.

export default function Home() {
    return (
        <div className="Home">
            <div className="lander">
                <h1>Let Me Know</h1>
            </div>
            Stuff to be added to this page:
            <ol>
                <li>A search bar to look up notepads.</li>
                <li> A "create notepad" button (probably located in top right or something) to create a new notepad. </li>
            </ol>
        </div>
    )
}