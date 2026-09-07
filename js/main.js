/**
 * MESJAT SECURITY LIMITED - Main JavaScript File
 * Handles dynamic interactions, form validation, and configuration management.
 */

// Central Company Configuration
const MESJAT_CONFIG = {
    phonePrimary: "0711202050",
    phonePrimaryFormatted: "0711 202050",
    phoneSecondary: "0707481015",
    phoneSecondaryFormatted: "0707 481015",
    whatsappNumber: "0769329029",
    whatsappMessage: "Hello MESJAT, I would like to enquire about your security services.",
    location: "Bungoma, Kenya",
    coverage: "Serving clients across Kenya"
};

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Dynamics & central configuration binding
    bindConfigData();
    initStickyHeader();
    initMobileMenu();
    initScrollReveal();
    initContactForm();
    initWhatsAppClick();
});

/**
 * Binds central configuration variables to standard UI components (href links, text nodes)
 */
function bindConfigData() {
    // Update phone href links dynamically
    document.querySelectorAll(".phone-link-primary").forEach(el => {
        el.href = `tel:${MESJAT_CONFIG.phonePrimary}`;
        if (el.dataset.formatText !== "false") {
            el.textContent = MESJAT_CONFIG.phonePrimaryFormatted;
        }
    });
    
    document.querySelectorAll(".phone-link-secondary").forEach(el => {
        el.href = `tel:${MESJAT_CONFIG.phoneSecondary}`;
        if (el.dataset.formatText !== "false") {
            el.textContent = MESJAT_CONFIG.phoneSecondaryFormatted;
        }
    });

    // Update WhatsApp links
    document.querySelectorAll(".whatsapp-link-btn").forEach(el => {
        const encodedMsg = encodeURIComponent(MESJAT_CONFIG.whatsappMessage);
        el.href = `https://wa.me/254${MESJAT_CONFIG.whatsappNumber.substring(1)}?text=${encodedMsg}`;
    });
}

/**
 * Adds a scroll class to header for styling when pages are scrolled
 */
function initStickyHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    });
}

/**
 * Mobile Navigation Menu Handler
 */
function initMobileMenu() {
    const burgerBtn = document.querySelector(".burger-menu");
    const navMenu = document.querySelector(".nav-menu");
    
    if (!burgerBtn || !navMenu) return;

    burgerBtn.addEventListener("click", () => {
        burgerBtn.classList.toggle("open");
        navMenu.classList.toggle("open");
        
        // Prevent body scrolling when mobile menu is open
        if (navMenu.classList.contains("open")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });

    // Close menu when a navigation item is clicked
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            burgerBtn.classList.remove("open");
            navMenu.classList.remove("open");
            document.body.style.overflow = "";
        });
    });
}

/**
 * Scroll reveal animations using Intersection Observer API
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length === 0) return;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // trigger at 10% visibility
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(el => revealObserver.observe(el));
}

/**
 * Professional Enquiry Form Handler (Saves locally, validates inputs, simulates submission feedback status)
 */
function initContactForm() {
    const form = document.getElementById("mesjat-enquiry-form");
    const feedback = document.getElementById("form-feedback-message");
    if (!form || !feedback) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Basic client validation
        const name = document.getElementById("full-name").value.trim();
        const organization = document.getElementById("organization").value.trim();
        const phone = document.getElementById("phone-number").value.trim();
        const email = document.getElementById("email-address").value.trim();
        const location = document.getElementById("location-service").value.trim();
        const service = document.getElementById("service-type").value;
        const message = document.getElementById("enquiry-message").value.trim();

        if (!name || !phone || !service || !message) {
            showFormFeedback(feedback, "Please fill in all required fields (Name, Phone Number, Service, and Message).", "error");
            return;
        }

        // Disable submit button and add loading status
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = "SENDING REQUEST...";

        // Simulate secure submission API delay
        setTimeout(() => {
            // Save lead details securely in client browser local storage for demos/records
            const enquiryRecord = {
                id: "MESJAT-" + Date.now(),
                name,
                organization,
                phone,
                email,
                location,
                service,
                message,
                timestamp: new Date().toISOString()
            };

            // Log submission for developer console review
            console.log("MESJAT SECURITY Lead Saved: ", enquiryRecord);
            
            try {
                let currentRecords = JSON.parse(localStorage.getItem("mesjat_enquiries") || "[]");
                currentRecords.push(enquiryRecord);
                localStorage.setItem("mesjat_enquiries", JSON.stringify(currentRecords));
            } catch (err) {
                console.error("Localstorage saving failed: ", err);
            }

            // Display success feedback
            showFormFeedback(
                feedback, 
                `<strong>Success!</strong> Your security request has been sent. A MESJAT Security Operations specialist will call you shortly on ${phone} to discuss your requirements.`, 
                "success"
            );

            // Re-enable and reset form controls
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            form.reset();
        }, 1500);
    });
}

/**
 * Displays professional message below contact form
 */
function showFormFeedback(element, message, type) {
    element.innerHTML = message;
    element.className = "form-feedback " + type;
    element.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/**
 * Pre-configures float WhatsApp interactions log trackers or custom behaviors if needed
 */
function initWhatsAppClick() {
    const wa = document.querySelector(".whats-app-btn");
    if (!wa) return;
    wa.addEventListener("click", () => {
        console.log("MESJAT WhatsApp consultation clicked.");
    });
}
