import React from "react";

interface HamburgerProps {
    isOpen: boolean;
}

function Hamburger({ isOpen }: HamburgerProps) {
    return (
        <div className={`icon-hamburger icon-container ${isOpen ? "open" : ""}`}>
            <span className="burger-top burger-piece"></span>
            <span className="burger-middle burger-piece"></span>
            <span className="burger-bottom burger-piece"></span>
        </div>
    );
}

export default Hamburger;
