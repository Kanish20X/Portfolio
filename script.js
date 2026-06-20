// document.addEventListener("DOMContentLoaded", () => {
//     const themeCheckbox = document.getElementById("checkbox");
//     const navLinks = document.querySelectorAll(".nav-links a");
//     const contentContainer = document.querySelector(".content");
//     const middleSection = document.querySelector(".middle-section");

//     const syncPageVisibility = (url) => {
//         const path = url.toLowerCase();
//         const isHome = path.endsWith("home.html") || path.endsWith("index.html") || path === "/" || path === "";

//         if (middleSection) {
//             middleSection.style.setProperty("display", isHome ? "flex" : "none", "important");

//             if (!isHome) {
//                 contentContainer.style.minHeight = "75vh";
//             } else {
//                 contentContainer.style.minHeight = "auto";
//             }
//         }
//     };


//     const applyTheme = (theme) => {
//         document.documentElement.setAttribute("data-theme", theme);
//         if (themeCheckbox) themeCheckbox.checked = (theme === "dark");
//     };

//     const savedTheme = localStorage.getItem("theme") || "dark";
//     applyTheme(savedTheme);

//     themeCheckbox?.addEventListener("change", () => {
//         const newTheme = themeCheckbox.checked ? "dark" : "light";
//         applyTheme(newTheme);
//         localStorage.setItem("theme", newTheme);
//     });

//     const loadPage = async (url) => {
//         try {
//             contentContainer.style.opacity = 0;

//             const response = await fetch(url);
//             if (!response.ok) throw new Error("Load failed");
//             const htmlText = await response.text();
//             const doc = new DOMParser().parseFromString(htmlText, "text/html");

//             const newContent = doc.querySelector(".content");
//             if (newContent) {
//                 contentContainer.innerHTML = newContent.innerHTML;
//             }

//             syncPageVisibility(url);

//             window.history.pushState({ path: url }, "", url);

//             navLinks.forEach(link => {
//                 link.style.color = (link.getAttribute("href") === url) ? "var(--accent-color)" : "";
//             });

//             contentContainer.style.opacity = 1;
//         } catch (error) {
//             console.error("Nav error:", error);
//         }
//     };

//     navLinks.forEach(link => {
//         link.addEventListener("click", (e) => {
//             e.preventDefault();
//             loadPage(link.getAttribute("href"));
//         });
//     });

//     syncPageVisibility(window.location.href);
// });
document.addEventListener("DOMContentLoaded", () => {
    const themeCheckbox = document.getElementById("checkbox");
    const navLinks = document.querySelectorAll(".nav-links a");
    const contentContainer = document.querySelector(".content");
    const middleSection = document.querySelector(".middle-section");

    // 1. Strict Visibility & Height Controller
    const syncPageVisibility = (url) => {
        const path = url.toLowerCase();
        // Check if we are on the home page or root
        const isHome = path.endsWith("home.html") || path.endsWith("index.html") || path === "/" || path === "";

        if (middleSection) {
            // Toggle visibility
            middleSection.style.setProperty("display", isHome ? "flex" : "none", "important");

            // Adjust height to stretch content when hero section is hidden
            if (!isHome) {
                contentContainer.style.minHeight = "75vh";
            } else {
                contentContainer.style.minHeight = "auto";
            }
        }
    };

    // 2. Theme Handling
    const applyTheme = (theme) => {
        document.documentElement.setAttribute("data-theme", theme);
        if (themeCheckbox) themeCheckbox.checked = (theme === "dark");
    };

    const savedTheme = localStorage.getItem("theme") || "dark";
    applyTheme(savedTheme);

    themeCheckbox?.addEventListener("change", () => {
        const newTheme = themeCheckbox.checked ? "dark" : "light";
        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    });

    // 3. Navigation Controller with Safety Checks
    const loadPage = async (url) => {
        try {
            contentContainer.style.opacity = 0;

            const response = await fetch(url);
            if (!response.ok) throw new Error("Load failed");

            const htmlText = await response.text();
            const doc = new DOMParser().parseFromString(htmlText, "text/html");

            // SAFETY CHECK: Only update if the target elements exist
            const newContent = doc.querySelector(".content");
            if (newContent && contentContainer) {
                contentContainer.innerHTML = newContent.innerHTML;
            }

            // Sync visibility based on the URL
            syncPageVisibility(url);

            // Update Browser History
            window.history.pushState({ path: url }, "", url);

            // Highlight active link
            navLinks.forEach(link => {
                link.style.color = (link.getAttribute("href") === url) ? "var(--accent-color)" : "";
            });

            contentContainer.style.opacity = 1;
        } catch (error) {
            console.error("Nav error:", error);
            // Fallback: If it crashes, standard browser navigation
            window.location.href = url;
        }
    };

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            loadPage(link.getAttribute("href"));
        });
    });

    // 4. Initial Boot Sync
    syncPageVisibility(window.location.href);
});