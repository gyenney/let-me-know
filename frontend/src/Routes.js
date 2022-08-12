import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import Messages from "./containers/Messages";
import NotFound from "./containers/NotFound";

export default function Links() {
    // Renders the first matching route that is defined.
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notepads/:id" element={<Messages />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}