// Route which checks if user is logged in before routing.
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

export default function AuthentciatedRoute({ children }) {
    const { pathname, search } = useLocation();
    const { isAuthenticated } = useAppContext();

    if (!isAuthenticated) {
        // Redirect to login page if user is not logged in.
        // We pass the current location to the login page so we can redirect back after login.
        return <Navigate to={`/login?redirect=${pathname}${search}`} />;
    }

    // Children are only rendered if user is logged in.
    return children;
}
