/**
 * TerraVista - Main JavaScript File
 *
 * File:        scriptMain.js
 * Author:      Wasana Karunanayaka
 * Description: This script handles all client-side interactivity for the main pages 
 *              (Home, About, Contact) of the TerraVista website. 
 *
 * Contents:
 * 1. Global Navigation Logic (Navbar Scroll Effect, Mobile Menu)
 * 2. Contact Page Logic (Interactive Form Validation)
 * 3. FAQ Section Logic (Accordion Functionality)
 * 4. Privacy Policy Modal Logic (Popup Window Control)
 */


document.addEventListener('DOMContentLoaded', () => {

    // --- [1] GLOBAL NAVIGATION LOGIC ---
    // Note: Navigation logic is now handled by main/components.js 
    // to support dynamic header/footer injection.


    // --- [2] CONTACT FORM VALIDATION LOGIC ---
    // This section handles real-time user input validation for the contact form.
    // It only runs if a form with the ID 'contactForm' is found on the current page.
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const privacyInput = document.getElementById('privacy');

        // Helper function to display an error message for a given input field.
        const showError = (inputElement, message) => {
            const errorField = document.getElementById(`${inputElement.id}-error`);
            inputElement.classList.add('invalid'); // Adds a red border via CSS.
            if (errorField) {
                errorField.textContent = message;
            }
        };

        // Helper function to clear an error message from an input field.
        const clearError = (inputElement) => {
            const errorField = document.getElementById(`${inputElement.id}-error`);
            inputElement.classList.remove('invalid'); // Removes the red border.
            if (errorField) {
                errorField.textContent = '';
            }
        };

        // Validation function for the Full Name field.
        const validateName = () => {
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Full Name is required.');
                return false;
            }
            clearError(nameInput);
            return true;
        };

        // Validation function for the Email field using a regular expression.
        const validateEmail = () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
                return false;
            }
            clearError(emailInput);
            return true;
        };

        // Validation function for the Message field.
        const validateMessage = () => {
            if (messageInput.value.trim().length < 10) {
                showError(messageInput, 'Message must be at least 10 characters long.');
                return false;
            }
            clearError(messageInput);
            return true;
        };

        // Validation function for the Privacy Policy checkbox.
        const validatePrivacy = () => {
            if (!privacyInput.checked) {
                showError(privacyInput, 'You must agree to the privacy policy.');
                return false;
            }
            clearError(privacyInput);
            return true;
        };

        // Attaching event listeners to provide real-time validation as the user types.
        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('input', validateEmail);
        messageInput.addEventListener('input', validateMessage);
        privacyInput.addEventListener('change', validatePrivacy);

        // Final validation check upon form submission.
        contactForm.addEventListener('submit', (event) => {
            // Prevent the default browser behavior of refreshing the page on submit.
            event.preventDefault();

            // Run all validation functions one last time to ensure all fields are correct.
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();
            const isPrivacyValid = validatePrivacy();

            // If all validations pass, show a success message and reset the form.
            if (isNameValid && isEmailValid && isMessageValid && isPrivacyValid) {
                alert('Thank you for your message! We will get back to you shortly.');
                contactForm.reset();
                // Manually clear any lingering error messages after the form is reset.
                clearError(nameInput);
                clearError(emailInput);
                clearError(messageInput);
                clearError(privacyInput);
            }
        });
    }


    // --- [3] FAQ ACCORDION LOGIC ---
    // This section controls the interactive accordion feature for the FAQ list.
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const questionButton = item.querySelector('.faq-question');

            questionButton.addEventListener('click', () => {
                const isAlreadyActive = item.classList.contains('active');

                // Accordion behavior: Close all other items first.
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                // If the clicked item was not already open, open it.
                if (!isAlreadyActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // --- [4] PRIVACY POLICY MODAL LOGIC ---
    // This section handles the functionality for the pop-up modal on the contact page.
    const privacyLink = document.querySelector('.privacy-link');
    const privacyModal = document.getElementById('privacyModal');
    const closeModalButton = document.querySelector('.modal-close-button');

    // Only attach event listeners if all the required modal elements are present on the page.
    if (privacyLink && privacyModal && closeModalButton) {

        // Function to open the modal by changing its display style.
        const openModal = (e) => {
            e.preventDefault(); // Prevents the '#' link from jumping the page.
            privacyModal.style.display = 'block';
        };

        // Function to close the modal.
        const closeModal = () => {
            privacyModal.style.display = 'none';
        };

        // Assigning the functions to their respective trigger elements.
        privacyLink.addEventListener('click', openModal);

        closeModalButton.addEventListener('click', closeModal);

        // Also allow the user to close the modal by clicking on the dark background overlay.
        window.addEventListener('click', (e) => {
            if (e.target === privacyModal) {
                closeModal();
            }
        });
    }

    // --- [5] ON-DEMAND MAP LOADING ---
    // This improves performance by loading the map iframe only when the user clicks.
    const mapPlaceholder = document.getElementById('contact-map-placeholder');

    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', () => {
            // Create the iframe element dynamically
            const mapIframe = document.createElement('iframe');
            mapIframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.545383152649!2d80.597330715296!3d7.292206115783323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3689394a2b669%3A0x33e52f9797be070c!2sUniversity%20of%20Peradeniya!5e0!3m2!1sen!2slk!4v1663333333333!5m2!1sen!2slk";
            mapIframe.width = "100%";
            mapIframe.height = "450";
            mapIframe.style.border = "0";
            mapIframe.allowfullscreen = "";
            mapIframe.loading = "lazy";
            mapIframe.title = "Location of University of Peradeniya";

            // Replace the placeholder's content with the new iframe
            mapPlaceholder.innerHTML = '';
            mapPlaceholder.appendChild(mapIframe);
        }, { once: true }); // The 'once' option automatically removes the listener after it runs
    }

});

