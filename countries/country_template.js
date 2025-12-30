/**
 * TerraVista - Country Template Script
 *
 * File:        country_template.js
 * Author:      Wasana Karunanayaka
 * Description: Specific interactive logic for country pages.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       [1] TRAVELER'S TOOLKIT AUDIO (WEB SPEECH API)
       Uses the browser's native text-to-speech engine.
       ========================================================================== */
    /* ==========================================================================
       [1] TRAVELER'S TOOLKIT AUDIO (SMART HYBRID SYSTEM)
       1. Tries to use browser's native high-quality voice.
       2. If missing (common for Sinhala, Malay, etc.), falls back to Google TTS API.
       ========================================================================== */
    const audioButtons = document.querySelectorAll('.audio-btn');

    if (audioButtons.length > 0) {
        audioButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const phrase = btn.getAttribute('data-phrase');
                const lang = btn.getAttribute('data-lang') || 'en-US';

                // Visual feedback
                btn.style.transform = 'scale(0.9)';
                setTimeout(() => btn.style.transform = 'scale(1)', 150);

                console.log(`Requesting audio for: "${phrase}" in [${lang}]`);

                // STRATEGY 1: Check if browser has a native voice for this language
                const voices = window.speechSynthesis.getVoices();
                const hasNativeVoice = voices.some(v => v.lang.toLowerCase().includes(lang.toLowerCase().split('-')[0]));

                // Specific override: Windows often misreports supporting some langs or uses bad fallbacks.
                // We force Google TTS for "hard" languages to ensure quality.
                const forceOnlineTTS = ['si-LK', 'ms-MY', 'fil-PH', 'da-DK', 'ar-MA', 'id-ID', 'ru-RU'].includes(lang);

                if (hasNativeVoice && !forceOnlineTTS) {
                    // Use Native Browser API (Good for En, Fr, Ja, Ko, Es)
                    const utterance = new SpeechSynthesisUtterance(phrase);
                    utterance.lang = lang;
                    utterance.rate = 0.9;
                    window.speechSynthesis.cancel(); // Stop previous
                    window.speechSynthesis.speak(utterance);
                    console.log("Using Native Browser Voice");
                } else {
                    // STRATEGY 2: Google Translate TTS API (Hack/Fallback)
                    // High quality, works for almost everything.
                    // Endpoint: https://translate.google.com/translate_tts
                    console.log("Using Online TTS Fallback");

                    const audio = new Audio();
                    // client=tw-ob is the public key for the web player
                    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(phrase)}&tl=${lang}&client=tw-ob`;
                    audio.src = url;
                    audio.play().catch(e => {
                        console.error("Online TTS failed:", e);
                        // Final fallback: Try native anyway if online fails
                        const fallbackUtterance = new SpeechSynthesisUtterance(phrase);
                        fallbackUtterance.lang = lang;
                        window.speechSynthesis.speak(fallbackUtterance);
                    });
                }
            });
        });

        // Pre-load voices trigger (Chrome requires this to populate the list)
        if ('speechSynthesis' in window) {
            window.speechSynthesis.getVoices();
        }
    }

    /* ==========================================================================
       [2] MAP LOADING OVERRIDE
       Ensures the specific map for the country is loaded.
       In a real app, this would use a data-attribute to know which country.
       ========================================================================== */
    const mapPlaceholder = document.getElementById('map-placeholder');

    // Note: scriptMain.js already handles specific map logic for contact page. 
    // We add a specific listener here if we need custom coords for the country template.
    // However, since scriptMain.js uses { once: true }, we need to be careful not to double bind 
    // if the IDs match. 

    // In this template, we'll assume we want to load a GENERIC country map or specific one.
    // For the template, we'll just let the user know they need to update the iframe src.

    if (mapPlaceholder) {
        // We clone the node to remove existing listeners from scriptMain.js if they conflict,
        // or just add our own if the ID is unique enough. 
        // Actually, scriptMain.js targets 'map-placeholder'. 
        // We will override the click behavior by stopping immediate propagation if we want custom logic,
        // but the easiest way for the template is to just reuse the logic or update scriptMain.js.
        // Since we can't easily change scriptMain.js for every country, let's just add logic here 
        // that replaces the iframe content with a specific country location.

        mapPlaceholder.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log("Loading Country Map...");

            // 1. Identify Country Name from Title
            // Format: "TerraVista - Explore [Country]" or just check headers
            // We strip common prefixes/suffixes to isolate the name.
            const pageTitle = document.title;
            // Fallback: Use the H1 if title is ambiguous
            const mainHeading = document.querySelector('h1')?.innerText || "";

            // Clean matched name (Simple heuristic)
            let countryQuery = "World";

            // Try to find a match from the common knowledge list or just use the heading
            // For this project, h1 is usually just "Japan", "France", etc.
            if (mainHeading) {
                countryQuery = mainHeading.trim();
            } else if (pageTitle.includes("Explore ")) {
                countryQuery = pageTitle.split("Explore ")[1].trim();
            }

            console.log(`Detected Country: ${countryQuery}`);

            // 2. Use Dynamic Search Embed (No API Key required for basic query)
            // Format: https://maps.google.com/maps?q=[Name]&t=&z=[Zoom]&ie=UTF8&iwloc=&output=embed
            const encodedCountry = encodeURIComponent(countryQuery);
            const mapSrc = `https://maps.google.com/maps?q=${encodedCountry}&t=&z=6&ie=UTF8&iwloc=&output=embed`;

            // Create the iframe dynamically
            const mapIframe = document.createElement('iframe');
            mapIframe.src = mapSrc;

            mapIframe.width = "100%";
            mapIframe.height = "100%";
            mapIframe.style.border = "0";
            mapIframe.allowfullscreen = "";
            mapIframe.loading = "lazy";
            mapIframe.title = `Map of ${countryQuery}`;

            // Replace placeholder content
            mapPlaceholder.innerHTML = '';
            mapPlaceholder.appendChild(mapIframe);

        }, { once: true });
    }

    /* ==========================================================================
       [3] DYNAMIC FLAG INJECTION (Reduces HTML Duplication)
       Automatically adds the flag card to the stats grid.
       ========================================================================== */
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        // Extract country name from URL path (Assumes .../countries/[CountryName]/file.html)
        // Works for local files and hosted paths assuming standard structure.
        const pathSegments = window.location.pathname.split('/');

        // Find the segment after 'countries'. Local paths might be inconsistent, 
        // so we look for the 'countries' keyword.
        let countryName = "Japan"; // Default fallback
        const countriesIndex = pathSegments.findIndex(segment => segment.toLowerCase() === 'countries');

        if (countriesIndex !== -1 && pathSegments[countriesIndex + 1]) {
            countryName = pathSegments[countriesIndex + 1];
        } else {
            // Fallback for flat structure or testing
            // Heuristic: Use Title
            const title = document.title;
            if (title.includes("Explore ")) {
                countryName = title.split("Explore ")[1].replace(/\s+/g, '');
            }
        }

        // Create the card
        const flagCard = document.createElement('div');
        flagCard.className = 'stat-card';
        flagCard.innerHTML = `
            <img src="../resourcesCountry/${countryName}/flag.png" 
                 alt="Flag of ${countryName}"
                 style="width: 100px; height: auto; margin-bottom: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div class="stat-label">Flag</div>
        `;

        statsGrid.appendChild(flagCard);
    }

});
