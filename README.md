# ** 🌍 TerraVista - Digital Travel Encyclopedia**



TerraVista is an interactive web application designed to bridge cultural gaps by providing immersive travel guides for 51 countries. 



Unlike standard travel blogs, TerraVista utilizes \*\*pure Vanilla JavaScript\*\* to deliver dynamic content, native audio pronunciations, and interactive mapping without relying on heavy external frameworks.



--- 



## ** 🚀 Key Features**



\* \*\*Smart Hybrid Audio System:\*\* Uses the \*\*Web Speech API\*\* to utilize the browser's native voice engine for local phrases, falling back to Google TTS API for specific languages (e.g., Sinhala, Malay) to ensure accurate pronunciation.

\* \*\*Performance-First Map Loading:\*\* Implemented an "On-Demand" loading strategy for Google Maps embedded iframes, reducing initial page load time and saving bandwidth.

\* \*\*Dynamic Component Injection:\*\* Utilizes JavaScript to inject shared Navigation and Footer components across all 50+ pages, ensuring maintainability and code reusability.

\* \*\*Interactive Form Validation:\*\* Custom client-side validation logic for contact forms without relying on default browser alerts.

\* \*\*Responsive Design System:\*\* Built on a mobile-first architecture using CSS Custom Properties (Variables) for consistent theming (Dark/Light mode ready) and Masonry Grids for layout.



---



## ** 🛠️ Technology Stack**



\* \*\*Frontend:\*\* HTML5 (Semantic), CSS3 (Flexbox/Grid/Animations), JavaScript (ES6+).

\* \*\*APIs:\*\* Web Speech API (Text-to-Speech), Google Maps Embed API.

\* \*\*Architecture:\*\* Component-based file structure (separated logic for Main vs. Country templates).



---



## ** 📂 Project Structure**



```

/TerraVista

├── components.js           # Shared component loader logic

├── /main                   # Core application files

│   ├── index.html          # Main Landing Page (Entry point)

│   ├── about.html          # About Page

│   ├── contact.html        # Contact Page

│   ├── stylesMain.css      # Global design system \& variables

│   ├── scriptMain.js       # Core logic (Navigation, Form Validation)

│   └── /resourcesMain      # Global assets (logos, hero images)

└── /countries              # Country-specific content \& templates

&nbsp;   ├── /resourcesCountry   # Dynamic assets for specific countries (flags, maps)

&nbsp;   ├── country\_template.html # Master HTML template

&nbsp;   ├── country\_template.css  # Template-specific styles

&nbsp;   ├── country\_template.js   # Template logic (Audio, Dynamic Flags)

&nbsp;   ├── /Japan              # Specific country folder

&nbsp;   ├── /France             # Specific country folder

&nbsp;   └── ... (51 countries)

```



---



## ** 🌟 Highlighted Code (Audio Engine)**



The application attempts to use high-quality native browser voices first. If a specific language (like Sinhala for Sri Lanka) is missing, it intelligently falls back to an online TTS service:



```

// Smart Hybrid System strategy from country\_template.js

if (hasNativeVoice \&\& !forceOnlineTTS) {

&nbsp;   // Use Native Browser API

&nbsp;   window.speechSynthesis.speak(utterance);

} else {

&nbsp;   // Fallback to Online TTS API

&nbsp;   const url = `https://translate.google.com/translate\_tts...`;

&nbsp;   audio.src = url;

}

```



---

## ** 👤 Author**



\*\*Wasana Karunanayaka\*\* 

\[LinkedIn](https://www.linkedin.com/in/wasana-karunanayaka-17a91a275/)

Email: \[wasanakarunanayaka2002@gmail.com](mailto:wasanakarunanayaka2002@gmail.com)



---



This project was developed for educational purposes to demonstrate proficiency in core web technologies.

