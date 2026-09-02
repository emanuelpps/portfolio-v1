import type { ProjectCopyMap } from "./projectCopy";

/**
 * The project prose, in English — the reference copy.
 *
 * It used to live inside Projects.json, which is why the sheets stayed English
 * while the rest of the site went bilingual: a JSON file has no language and
 * no type, so there was nowhere for a translation to go and nothing to catch a
 * missing one. Projects.json now holds only what does not translate — the id,
 * the name, the kind, the stack, the links and the images — and the words live
 * here and in projectCopy.es.ts beside it.
 *
 * `overview` is split on newlines into paragraphs by the sheet.
 */
export const projectCopyEn: ProjectCopyMap = {
  2: {
    blurb: "A lightweight, dependency-free library of custom React hooks with TypeScript support.",
    overview: "This library provides a set of useful and minimal custom hooks for React, written in TypeScript. It helps developers save time by reusing common logic like debouncing, localStorage handling, and toggling values. All hooks are tested with Vitest, tree-shakable, and free of dependencies. Built for performance and easy use in any React app.",
    why: "The library was created to offer ready-to-use React hooks that simplify common tasks and reduce repetitive code, improving development speed and code quality.",
    build: "Hooks are simple, reusable, and fully typed with TypeScript. They follow good design principles like single responsibility and modularity. Vitest is used to ensure 100% test coverage.",
    hard: "Balancing flexibility and simplicity was key. Also, testing hooks that interact with browser APIs like localStorage required good mocking strategies.",
  },
  3: {
    blurb: "Lightweight TypeScript helper functions like deepClone, debounce, slugify, and more.",
    overview: "Helpers Kit is a small and fast utility library written in TypeScript. It includes useful helper functions like deepClone, debounce, getUniqueValues, and slugify. These tools help developers avoid writing the same logic many times. It works in both frontend and backend projects, and does not need any extra libraries.",
    why: "The goal was to create a simple and reusable set of TypeScript functions that help developers solve common problems in any project.",
    build: "All functions are written in TypeScript with strong typing. Each helper is made to be independent, easy to understand, and ready to test. The library does not use any external dependencies, which keeps it fast and clean.",
    hard: "One of the main challenges was making sure the library works in different environments, like the browser and Node.js. Also, writing helpers that are both generic and fully type-safe took careful work with TypeScript’s advanced types.",
  },
  11: {
    blurb: "A music-streaming app on the open Audius network. My own product: a custom waveform player, trending charts, artist and playlist pages.",
    overview: "Epic Sound Studio is a full music streaming web app built on top of the decentralized Audius network. It pairs a cinematic landing page with a streaming home (trending tracks and an underground trending chart), artist and playlist pages, search, and a custom audio player with waveform visualization powered by wavesurfer.js.\nBuilt with Next.js (App Router) and TypeScript, it uses TanStack React Query to fetch and cache data from the Audius API, Zustand for global player state, and Framer Motion for fluid transitions. The design leans into a bold neon-purple identity with custom variable fonts (Clash Display + Supreme).",
    why: "The goal was to build a production-grade streaming experience on an open, artist-first network — proving that a polished, modern music UI can run entirely on the decentralized Audius API without a traditional backend of my own.",
    build: "A bold neon-purple identity with strong typographic contrast and immersive motion. The app is organized feature-first (landing, home, player, playlist, artist, search), with a reusable player and waveform component, server data cached via React Query and playback state held in Zustand.",
    hard: "Working against a third-party decentralized API meant handling inconsistent data, loading states and rate limits gracefully, and keeping global playback in sync across pages. Integrating wavesurfer.js into the player while keeping interactions smooth and the bundle lean took careful state management.",
  },
  13: {
    blurb: "Website for an HR consultancy in Argentina's Alto Valle, with two separate intake funnels: one for companies hiring and one for candidates.",
    overview: "Eckers RRHH Solutions is the website for a recruitment and HR consultancy based in General Roca, Río Negro. The landing page walks visitors through the firm's services, hiring process and regional story, and then splits them into two dedicated paths: one for companies that need to fill a vacancy, and one for professionals looking for their next role.\nIt is built with Next.js (App Router) and TypeScript, styled with Tailwind CSS. Each path has its own intake page: companies describe the position, location and urgency of the search, while candidates submit their profile, experience level, salary expectation, preferred contract type and a CV upload. Sections reveal as you scroll, and a floating WhatsApp button keeps the fastest contact channel one tap away on every page.",
    why: "The consultancy needed a presence that did more than describe the service — it had to qualify the people who get in touch. The goal was to turn two very different audiences, companies hiring and people looking for work, into two clear paths, each collecting exactly the information the team needs to start a search.",
    build: "A calm corporate identity built on navy and cyan, generous white space and bold display type, so the site reads as trustworthy instead of loud. The homepage is structured like a funnel — value proposition, audience split, services, process, story, contact — and the two intake pages reuse the same form building blocks with their own fields. Everything is responsive-first with Tailwind, and content fades in on scroll to keep a long page feeling light.",
    hard: "The hard part was not the visuals but the forms: asking candidates for enough detail to be genuinely useful without turning the page into paperwork, handling CV uploads with format and size limits, and keeping the company form focused on what actually defines a search — role, location and urgency. Confidentiality is a real concern in a small regional market, so it also shaped the copy and how personal data is requested.",
  },
  4: {
    blurb: "A coffee shop website focused on clean UI and visual storytelling. Built with React and Firebase.",
    overview: "I designed and developed a website for a coffee brand with a minimal and elegant approach. The site aims to convey warmth and quality through high-resolution imagery and a clean user interface.\nBuilt using React and Tailwindcss for responsive and fast development, it integrates Firebase for content management and user authentication.  Smooth animations powered by Framer Motion enhance user experience. The natural color palette emphasizes the earthy tones of freshly roasted coffee, evoking a handcrafted, premium feel.",
    why: "The project was created to give a digital identity to a boutique coffee brand, combining modern web technologies with a narrative-driven design to connect with customers on a sensory level.",
    build: "The design focused on minimalism, earthy colors, and immersive visuals. I used Tailwindcss for utility-first styling and Framer Motion to enhance interactivity without overwhelming the user.",
    hard: "Balancing performance with high-quality imagery was a key challenge. I had to optimize assets carefully to maintain fast load times while preserving the premium feel. Integrating smooth animations with route transitions also required fine-tuning with Framer Motion and React Router.",
  },
  5: {
    blurb: "Redesign and development of a software agency website using modern technologies and animations.",
    overview: "I was in charge of the complete redesign and development of The CodeMaker Lab's website, a software development agency. The original site had an outdated and unattractive look. I proposed a full visual overhaul, focusing on delivering a modern and professional experience. The site was built with Next.js and TypeScript, using Tailwindcss for styling, Zustand for global state management, and Framer Motion for smooth, engaging animations. The new design features bold typography, a vibrant and modern color palette, and intuitive navigation. The result is a visually impactful, user-friendly website aligned with the brand’s identity and goals.",
    why: "This project was aimed at redefining the digital presence of The CodeMaker Lab by providing a modern, professional, and conversion-oriented website. The goal was to establish credibility and clearly communicate the services and expertise of the agency.",
    build: "The new design was centered around strong visual hierarchy, impactful headlines, and vibrant color contrast to highlight key sections. The user interface was structured with responsiveness in mind, and animations were integrated to enrich user interaction without hindering performance.",
    hard: "A major challenge was balancing expressive animations with performance and usability. It also required careful management of shared state across components, for which Zustand proved lightweight and effective. Ensuring accessibility while pushing for a bold visual style also presented design tradeoffs that had to be resolved thoughtfully.",
  },
  6: {
    blurb: "A personal website for an actor showcasing biography, performances, and photos.",
    overview: "This portfolio website was developed for a theater actor as part of a project at The CodeMaker Lab. The site includes the actor’s biography, a list of past performances, and a gallery of stage photos. Built with Next.js and TypeScript for performance and scalability, the layout was designed with Tailwindcss for a modern and responsive experience. The visual structure is minimal yet bold, using large, elegant typography and a monochrome palette to convey a professional and artistic presence. The website’s goal is to clearly highlight the actor’s career while maintaining a stylish and personal presentation.",
    why: "This project aimed to create a digital portfolio that showcases the actor’s career and artistic identity, combining modern web technologies to present the content in an engaging, easy-to-navigate format.",
    build: "The design emphasized bold typography and a clean, minimalist layout to highlight the actor’s work. The monochrome color scheme and large imagery were used to create a refined and professional look, while Tailwindcss enabled rapid development of responsive and scalable components.",
    hard: "One challenge was ensuring that the website looked polished across various devices, especially given the importance of displaying large images and content in a clean, readable format. Another challenge was optimizing performance while maintaining high-quality visuals to create a seamless experience for users.",
  },
  7: {
    blurb: "My previous portfolio, developed in 2024. Redesigned annually to reflect my professional growth.",
    overview: "This was my personal portfolio for 2024. Every year I develop a new portfolio with renewed aesthetics and structure as part of my continuous improvement exercise. This version was built with Next.js, TailwindCSS, and TypeScript, focusing on simplicity, readability, and a clear presentation of my projects and experience.",
    why: "This project was developed to maintain an up-to-date portfolio that reflects my progress and skills over time. Additionally, it serves as an opportunity to experiment with new technologies and design approaches.",
    build: "The main idea behind this portfolio’s design was to maintain a clean and professional aesthetic, with a focus on readability and clear visualization of projects. I used TailwindCSS to achieve a responsive and agile design, and Framer Motion to add smooth interactivity and animations.",
    hard: "One of the biggest challenges was balancing the simplicity of the design with interactivity, ensuring that the animations did not distract from key content. Also, since this is an annual version of the portfolio, I had to make sure not to overload the design with too many visual updates, maintaining consistency with previous versions.",
  },
  8: {
    blurb: "Simple weather app developed in ReactJS with real-time data.",
    overview: "This web application allows users to check the current weather of any city using the OpenWeatherMap API. Developed as an exercise in API consumption with ReactJS, the interface is simple, responsive, and displays temperature, weather conditions, and other useful details.",
    why: "The aim of this project was to create a functional web app to check the weather of any city worldwide, utilizing real-time data from the OpenWeatherMap API. It also served as a practice for improving skills in API consumption using ReactJS.",
    build: "The app’s design is straightforward, focusing on clarity of information. It was built using Bootstrap to ensure the app is responsive and easy to use across both mobile and desktop devices.",
    hard: "A key challenge was ensuring the app functioned properly across various devices, especially when displaying large images and real-time data. Another challenge was optimizing performance while maintaining high-quality visuals for a smooth user experience.",
  },
  9: {
    blurb: "Simple web app for a fictional pizza restaurant. Users can choose pizzas and make orders online.",
    overview: "Don Remolo Pizza is a small pizza ordering web app made for a fictional artisanal pizzeria. This project was a way to practice responsive design, reusable components, using a real-time database, and adding smooth animations to improve user experience. The menu and pizza data are stored in Firebase, and users can send their orders using a form connected to the same database.",
    why: "This project was built to learn how to create an online pizza ordering experience. It uses a Firebase database to store the pizza products and the customer orders. The site also includes smooth animations and works well on mobile devices.",
    build: "The design is clean, modern, and focused on a good user experience. Framer Motion was used for smooth animations, and Bootstrap helped make the layout responsive. The look and feel were made to feel like a cozy, handmade pizza shop.",
    hard: "One challenge was to keep the animations smooth without making the site slow, especially on phones. Another important task was to make sure Firebase worked well both for showing pizza data and for saving customer orders, all in real-time.",
  },
};
