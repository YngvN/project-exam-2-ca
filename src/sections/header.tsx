import React from "react";
import { Nav } from "../components/nav";
import logoText from '../logoText.png';

export function Header() {

    return (
        <header>
            <div className="fixed">
                <img src={logoText} alt="Holidaze Text Logo" className="logo-text" />
                <Nav />
            </div>
        </header>
    );
}