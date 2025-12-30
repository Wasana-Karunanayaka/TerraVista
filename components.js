/**
 * TerraVista - Shared Components (Header & Footer)
 *
 * File:        components.js
 * Author:      Wasana Karunanayaka
 * Centralizes the navigation and footer to avoid duplication across 50 pages.
 * 
 * Usage:
 * In your HTML, create <div id="navbar-placeholder"></div> and <div id="footer-placeholder"></div>
 * Then add: <script>document.addEventListener('DOMContentLoaded', () => loadComponents('../../'));</script>
 */

// List of 50 Top Travel Destinations for the Mega Menu
const countryList = [
    "Argentina", "Australia", "Austria", "Belgium", "Brazil",
    "Canada", "Chile", "China", "Colombia", "Costa Rica",
    "Croatia", "Czech Republic", "Denmark", "Egypt", "Finland",
    "France", "Germany", "Greece", "Hungary", "Iceland",
    "India", "Indonesia", "Ireland", "Italy", "Japan",
    "Jordan", "Kenya", "Malaysia", "Maldives", "Mexico",
    "Morocco", "Nepal", "Netherlands", "New Zealand", "Norway",
    "Peru", "Philippines", "Poland", "Portugal", "Russia",
    "Singapore", "South Africa", "South Korea", "Spain", "Sri Lanka",
    "Sweden", "Switzerland", "Thailand", "Turkey", "USA", "Vietnam"
];

const popularDestinations = [
    { name: "Sri Lanka", path: "countries/SriLanka/srilanka.html" },
    { name: "France", path: "countries/France/france.html" },
    { name: "South Korea", path: "countries/SouthKorea/southkorea.html" },
    { name: "Brazil", path: "countries/Brazil/brazil.html" },
    { name: "Egypt", path: "countries/Egypt/egypt.html" },
    { name: "Japan", path: "countries/Japan/japan.html" }
];

function generateNavbar(rootPath) {
    // Helper to get link (checks if country page exists, otherwise hashtags)
    // For this template, we assume standard structure: countries/[Name]/[name].html
    const getCountryLink = (countryName) => {
        // Simple sanitization for folder name (Remove spaces)
        const folderName = countryName.replace(/\s+/g, '');
        const fileName = folderName.toLowerCase() + ".html";
        return `${rootPath}countries/${folderName}/${fileName}`;
    };

    // Generate List Items
    const countryItems = countryList.map(country => {
        return `<a href="${getCountryLink(country)}" class="dropdown-link">${country}</a>`;
    }).join('');

    return `
    <nav class="navbar" id="navbar">
        <div class="nav-container container">

            <a href="${rootPath}main/index.html" class="nav-logo">
                <img src="${rootPath}main/resourcesMain/TerraVistaLogo.png" alt="TerraVista Logo" class="logo-img">
                <span class="logo-text">TerraVista</span>
            </a>

            <ul class="nav-menu" id="nav-menu">
                <li><a href="${rootPath}main/index.html" class="nav-link">Home</a></li>
                <li><a href="${rootPath}main/about.html" class="nav-link">About Us</a></li>
                
                <li class="dropdown">
                    <a href="#" class="nav-link dropdown-toggle">
                        Countries
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--theme-primary, var(--primary-color))" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 10L12 15L17 10H7Z" />
                        </svg>
                    </a>
                    <!-- Mega Menu Class Added -->
                    <div class="dropdown-menu mega-menu">
                        ${countryItems}
                    </div>
                </li>

                <li><a href="${rootPath}main/contact.html" class="nav-link">Contact</a></li>
            </ul>

            <div class="nav-toggle" id="nav-toggle">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>
    `;
}

function generateFooter(rootPath) {
    const destLinks = popularDestinations.map(dest => {
        return `<li><a href="${rootPath}${dest.path}">${dest.name}</a></li>`;
    }).join('');

    return `
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-section logo-section">
                    <div class="footer-logo">
                        <img src="${rootPath}main/resourcesMain/TerraVistaLogo.png" alt="TerraVista Logo" class="footer-logo-img">
                    </div>
                </div>

                <div class="footer-section">
                    <h3 class="footer-heading">Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="${rootPath}main/index.html">Home</a></li>
                        <li><a href="${rootPath}main/about.html">About Us</a></li>
                        <li><a href="${rootPath}main/contact.html">Contact</a></li>
                    </ul>
                </div>

                <div class="footer-section destinations-section">
                    <h3 class="footer-heading">Popular Destinations</h3>
                    <ul class="footer-links destinations-grid">
                        ${destLinks}
                    </ul>
                </div>

                <div class="footer-section">
                    <h3 class="footer-heading">Connect With Us</h3>
                    <div class="social-icons">
                        <a href="#" target="_blank"><img src="${rootPath}main/resourcesMain/facebook.png" alt="Facebook"></a>
                        <a href="#" target="_blank"><img src="${rootPath}main/resourcesMain/twitter.png" alt="Twitter"></a>
                        <a href="#" target="_blank"><img src="${rootPath}main/resourcesMain/instagram.png" alt="Instagram"></a>
                        <a href="#" target="_blank"><img src="${rootPath}main/resourcesMain/linkedin.png" alt="LinkedIn"></a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>© 2025 TerraVista. All rights reserved.</p>
            </div>
        </div>
    </footer>
    `;
}

/**
 * Main Injection Function
 * @param {string} rootPath - Relative path to root (e.g., "", "../../")
 */
function loadComponents(rootPath) {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = generateNavbar(rootPath);


    }

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = generateFooter(rootPath);
    }

    // Initialize all Navbar interactions immediately after DOM injection
    initNavbarLogic();
}

/**
 * Initializes all interactive behavior for the Navbar.
 * (Scroll effect, Mobile Toggle, Dropdown Click)
 */
function initNavbarLogic() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // 1. Scroll Effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile Menu Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent immediate closing
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // 3. Dropdown Toggle (Click support for Mobile & Desktop)
    if (dropdowns.length > 0) {
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');

            if (toggle && menu) {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault(); // Stop hashtags jump
                    e.stopPropagation(); // Stop bubbling

                    // Close other dropdowns
                    dropdowns.forEach(d => {
                        if (d !== dropdown) d.classList.remove('active');
                    });

                    // Toggle current
                    dropdown.classList.toggle('active');
                });
            }
        });

        // Close dropdowns when clicking anywhere else
        document.addEventListener('click', () => {
            dropdowns.forEach(d => d.classList.remove('active'));
        });
    }
}
