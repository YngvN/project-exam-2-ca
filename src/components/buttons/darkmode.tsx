import React from "react";
import { useDarkModePreference } from "../../utility/actions/darkmode.action";

function BtnDarkmode() {
    const [isDark, toggleDarkMode] = useDarkModePreference();

    return (
        <div
            className={`icon-darkmode icon-container ${isDark ? "dark" : "light"}`}
            onClick={() => toggleDarkMode()}
        >
            <span className="top-left light-ray"></span>
            <span className="top-middle light-ray"></span>
            <span className="top-right light-ray"></span>
            <span className="bottom-left light-ray"></span>
            <span className="bottom-middle light-ray"></span>
            <span className="bottom-right light-ray"></span>
            <span className="center-left light-ray"></span>
            <span className="center-right light-ray"></span>
            <span className="sun"></span>
            <span className="moon"></span>
        </div>
    );
}

export default BtnDarkmode;
