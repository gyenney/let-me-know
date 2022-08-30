import React from "react";
import { Route, Routes } from "react-router-dom";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Home from "./containers/Home";
import Messages from "./containers/Messages";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup"

export default function Links() {
    // Renders the first matching route that is defined.
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup"
                element={
                    <UnauthenticatedRoute>
                        <Signup />
                    </UnauthenticatedRoute>
                }
            />
            <Route path="/notepads/:id" element={<Messages />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}