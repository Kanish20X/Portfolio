
document.addEventListener("DOMContentLoaded", () => {

    const themeCheckbox = document.getElementById("checkbox");

    const applyTheme = (theme) => {
        document.documentElement.setAttribute("data-theme", theme);

        if (themeCheckbox) {
            themeCheckbox.checked = theme === "dark";
        }
    };

    try {
        const savedTheme = localStorage.getItem("theme") || "dark";
        applyTheme(savedTheme);

        themeCheckbox?.addEventListener("change", () => {
            const newTheme = themeCheckbox.checked ? "dark" : "light";

            applyTheme(newTheme);
            localStorage.setItem("theme", newTheme);
        });

    } catch (error) {
        console.error("Theme Error:", error);
    }

});