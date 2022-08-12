import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";

export default function Links() {
    // Renders the first matching route that is defined.
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
}