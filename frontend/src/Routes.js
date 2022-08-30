import React from "react";
import { Route, Routes } from "react-router-dom";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Home from "./containers/Home";
import Messages from "./containers/Messages";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup"
import Login from "./containers/Login";

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
            <Route path="/login"
                element={
                    <UnauthenticatedRoute>
                        <Login />
                    </UnauthenticatedRoute>
                }
            />
            <Route path="/notepads/:id" element={
                // TODO: For just seeing messages, user probably doesn't need to be 
                // logged-in.
                <AuthenticatedRoute>
                    <Messages />
                </AuthenticatedRoute>
            } />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}