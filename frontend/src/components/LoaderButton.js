import React from "react";
import Button from "react-bootstrap/Button";
import { BsArrowRepeat } from "react-icons/bs";
import "./LoaderButton.css";

export default function LoaderButton({
    isLoading,
    className = "",
    disabled = false,
    ...props
}) {
    return (
        // Button should be disabled while loggin in.
        // An icon is shown when 'isLoading' is true.
        <Button disabled={disabled || isLoading} className={`LoaderButton ${className}`} {...props}>
            {isLoading && <BsArrowRepeat className="spinning" />}
            {props.children}
        </Button>
    );
}