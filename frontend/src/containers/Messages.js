// Container for rendering the messages in a notepad.
import React from "react";
import { useParams } from "react-router-dom";

export default function Messages() {
    const { id } = useParams();

    return (
        <div className="Messages">
            <h1>{id}</h1>
        </div>
    )
}