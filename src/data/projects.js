/*
 * Project data. Replace `coverImage` / `images` with local paths like
 * `/projects/<slug>/cover.jpg` when you add real screenshots. Fallback
 * gradient + camera icon shows automatically on load failure.
 *
 * `category` drives the filter chips: Mobile | Web | AI
 */

const unsplash = (id, w = 800, h = 600) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
const card = (id) => unsplash(id, 800, 600);
const wide = (id) => unsplash(id, 1200, 675);

export const categories = ['All', 'Mobile', 'Web', 'AI'];

export const projects = [
    {
        title: 'Premium React Native e-Signature App',
        slug: 'esign-app',
        category: 'Mobile',
        coverImage: '/projects/esign-app/cover.png',
        images: [
            '/projects/esign-app/01.png',
            '/projects/esign-app/02.png',
            '/projects/esign-app/03.png',
            '/projects/esign-app/04.png',
        ],
        description:
            'A premium, production-grade e-signature mobile app built in React Native to compete with DocuSign and Adobe Sign — ready for Play Store and App Store launch. Signlix is a full offline PDF signing solution with a responsive UI that adapts beautifully from small phones to tablets. Users can import PDFs and images (auto-converted to PDF), use a drag-and-drop editor for signatures, initials, text, dates, and checkboxes, and capture signatures via draw, type, or upload modes. Includes biometric (Face ID / fingerprint) and PIN app lock, light and dark themes, native share and print integration, and GDPR-ready in-app legal flows with data export and one-tap delete — all running 100% offline with no backend required.',
        tech: ['React Native', 'TypeScript', 'pdf-lib', 'Reanimated 3', 'Zustand', 'MMKV', 'Biometrics'],
        gradient: 'from-blue-500 to-purple-500',
        color: '#6366f1',
    },
    {
        title: 'Focus Shield — Privacy-First App Blocker',
        slug: 'focus-shield',
        category: 'Mobile',
        coverImage: '/projects/focus-shield/cover.png',
        images: [
            '/projects/focus-shield/01.png',
            '/projects/focus-shield/02.png',
            '/projects/focus-shield/03.png',
            '/projects/focus-shield/04.png',
        ],
        description:
            'A full-featured native Android productivity app built with React Native and Kotlin that helps users reclaim their attention through smart app and website blocking, focus streaks, and gamified habit-building — running 100% on-device with zero data collection. Features app/website blocking via an Accessibility Service plus a local VPN DNS sinkhole for browser blocking, strict-mode bypass challenges (PIN, typed paragraph, countdown, shake), focus sessions with a glassmorphism progress ring and ambient soundscapes, a 20-level XP progression with 30 tiered achievement badges, work/study/creative profiles with independent blocklists, mindful breath interventions, scheduled blocking, on-device usage heatmaps, daily allowances, CSV export, a quick-settings tile, and home-screen widgets.',
        tech: ['React Native', 'Kotlin', 'TypeScript', 'Notifee', 'Reanimated', 'Accessibility Service'],
        gradient: 'from-sky-500 to-indigo-500',
        color: '#0ea5e9',
    },
    {
        title: 'Vision Board — Goal Tracking & Manifestation',
        slug: 'vision-board',
        category: 'Mobile',
        coverImage: '/projects/vision-board/cover.png',
        images: [
            '/projects/vision-board/01.png',
            '/projects/vision-board/02.png',
            '/projects/vision-board/03.png',
            '/projects/vision-board/04.png',
        ],
        description:
            'A feature-rich, cross-platform Vision Board and goal-manifestation app built with React Native — already live on the Amazon App Store and prepared for a full Play Store launch. Helps users visualize their dreams, set actionable goals, build daily habits, and stay motivated through affirmations, streaks, and beautifully designed boards. Highlights include custom themed boards, smart goal tracking with sub-goals and progress sliders, a drag-and-drop photo collage editor, daily affirmations with text-to-speech, smart notifications, a 30-day streak heatmap dashboard, a native Kotlin home-screen widget, JSON backup/restore, global search, and 20-language i18n support.',
        tech: ['React Native', 'TypeScript', 'Zustand', 'AsyncStorage', 'Kotlin Widget', 'i18n'],
        gradient: 'from-violet-500 to-pink-500',
        color: '#8b5cf6',
    },
    {
        title: 'To Do List & Reminder — Daily Task Planner',
        slug: 'todo-list',
        category: 'Mobile',
        coverImage: '/projects/todo-list/cover.png',
        images: [
            '/projects/todo-list/01.png',
            '/projects/todo-list/02.png',
            '/projects/todo-list/03.png',
            '/projects/todo-list/04.png',
        ],
        description:
            'A sophisticated, feature-complete mobile ecosystem built on React Native 0.73.2 to revolutionize personal and professional task management. Features a high-performance Task Management Engine with real-time synchronization, an Analytics-Driven Statistics Dashboard for productivity insights, and a robust native Android integration layer. Users can create, schedule, and track tasks across multiple categories (Work, Personal, Wishlist) using an intuitive calendar interface, push notifications with exact alarm scheduling, and home-screen widgets for instant access. The system supports a dual-store deployment architecture with separate builds for the Play Store.',
        tech: ['React Native', 'TypeScript', 'Zustand', 'AsyncStorage', 'Native Stack', 'Android Widgets'],
        gradient: 'from-fuchsia-500 to-violet-500',
        color: '#a855f7',
    },
    {
        title: 'Step Counter & Water Intake Tracker',
        slug: 'step-water-tracker',
        category: 'Mobile',
        coverImage: '/projects/step-water-tracker/cover.png',
        images: [
            '/projects/step-water-tracker/01.png',
            '/projects/step-water-tracker/02.png',
            '/projects/step-water-tracker/03.png',
            '/projects/step-water-tracker/04.png',
        ],
        description:
            'A sophisticated, enterprise-grade mobile health application built with React Native to democratize personal wellness tracking. Features a high-performance native Android Foreground Service for continuous step monitoring, an offline-first architecture using AsyncStorage for data resilience, and a premium subscription system powered by react-native-iap for advanced analytics. Users can track, analyze, and achieve daily step and hydration goals through real-time monitoring via Android\'s Step Counter API, intelligent daily notifications via Notifee, and comprehensive historical insights with interactive charts.',
        tech: ['React Native', 'TypeScript', 'Notifee', 'Reanimated', 'AsyncStorage', 'react-native-iap'],
        gradient: 'from-indigo-500 to-cyan-400',
        color: '#6366f1',
    },
    {
        title: 'Human to Animal Translator',
        slug: 'human-to-animal-translator',
        category: 'Mobile',
        coverImage: '/projects/human-to-animal-translator/cover.png',
        images: [
            '/projects/human-to-animal-translator/01.png',
            '/projects/human-to-animal-translator/02.png',
            '/projects/human-to-animal-translator/03.png',
            '/projects/human-to-animal-translator/04.png',
        ],
        description:
            'AnimalTalker is an entertainment-focused mobile app built on React Native 0.75.4 and Expo to transform human-to-pet communication through an immersive audio-visual experience. Features a multi-species translation engine supporting 10 animal categories (cats, dogs, horses, cows, chickens, ducks, goats, fish, rats, raccoons) with 25+ emotional variants — each with unique sound profiles and contextual translations — and a localization framework delivering 14 worldwide languages with full RTL support for Arabic, Hebrew, Urdu, and Persian. Bidirectional translation lets users convert human phrases into randomized animal vocalizations or decode animal sounds into playful human interpretations, powered by a high-performance Expo AV audio system with intelligent caching, preloading, and 60+ bundled MP3/WAV files for offline operation.',
        tech: ['React Native', 'Expo', 'TypeScript', 'Expo AV', 'i18n-js', 'RTL Support'],
        gradient: 'from-pink-500 to-purple-500',
        color: '#ec4899',
    },
    {
        title: 'AI Chatbot',
        slug: 'ai-chatbot',
        category: 'AI',
        coverImage: card('1620712943543-bcc4688e7485'),
        images: [wide('1620712943543-bcc4688e7485')],
        description:
            'An intelligent chatbot designed to provide fast, context-aware responses with a clean and responsive user interface. Integrates with an AI API for real-time conversational logic, featuring smooth UI animations and efficient state management. Designed for both mobile and web with a consistent cross-platform experience.',
        tech: ['React Native', 'API Integration', 'State Management', 'UI Animations'],
        gradient: 'from-orange-500 to-red-500',
        color: '#f97316',
    },
    {
        title: 'Attendance Tracker',
        slug: 'attendance-tracker',
        category: 'Mobile',
        coverImage: card('1506784983877-45594efa4cbe'),
        images: [wide('1506784983877-45594efa4cbe')],
        description:
            'A streamlined attendance management app designed to replace manual roll-call workflows for classrooms and teams. Features one-tap check-in, date-based filtering, and detailed reports with CSV export for administrators. Built with React Native and Firebase, it offers real-time synchronization across devices and a clean, role-aware dashboard that minimizes friction for both students and supervisors.',
        tech: ['React Native', 'Firebase', 'Real-time Sync', 'CSV Export'],
        gradient: 'from-yellow-400 to-orange-500',
        color: '#f59e0b',
    },
    {
        title: 'Family Album',
        slug: 'family-album',
        category: 'Mobile',
        coverImage: card('1511895426328-dc8714191300'),
        images: [wide('1511895426328-dc8714191300')],
        description:
            'A private, cloud-backed photo album built to help families preserve and share memories in one secure space. Supports multi-album organization, shared access with trusted members, high-resolution uploads, and offline viewing via local caching. Developed with React Native and Firebase Storage, the app prioritizes smooth gallery navigation, efficient thumbnail loading, and a warm, photo-first UI.',
        tech: ['React Native', 'Firebase Storage', 'Image Caching', 'Cloud Sync'],
        gradient: 'from-pink-500 to-rose-500',
        color: '#ec4899',
    },
    {
        title: 'Neuro Nation',
        slug: 'neuro-nation',
        category: 'Mobile',
        coverImage: card('1559757148-5c350d0d3c56'),
        images: [wide('1559757148-5c350d0d3c56')],
        description:
            'A cognitive training app offering a curated set of brain games across memory, logic, and focus categories. Features daily challenges, streak-based progress tracking, and adaptive difficulty that scales with the user\'s performance. Built with React Native, it leverages fluid animations and local persistence to deliver a polished, distraction-free training experience that keeps users coming back.',
        tech: ['React Native', 'Animations', 'Local Storage', 'Gamification'],
        gradient: 'from-indigo-500 to-purple-600',
        color: '#6366f1',
    },
    {
        title: 'Video Summarizer',
        slug: 'video-summarizer',
        category: 'Web',
        coverImage: card('1574717024653-61fd2cf4d44d'),
        images: [wide('1574717024653-61fd2cf4d44d')],
        description:
            'A performance-focused application that processes and merges multiple video files to generate a concise summarized output. Built with React Native, it handles large video assets asynchronously with a progress-aware UI that keeps users informed throughout processing. The app prioritizes smooth playback and efficient memory usage.',
        tech: ['React Native', 'Video Processing', 'Async Logic', 'Performance Optimization'],
        gradient: 'from-blue-500 to-cyan-400',
        color: '#3b82f6',
    },
    {
        title: 'Student Utility App',
        slug: 'student-utility',
        category: 'Mobile',
        coverImage: card('1481627834876-b7833e8f5570'),
        images: [wide('1481627834876-b7833e8f5570')],
        description:
            'A comprehensive Android helper application providing scheduling, notes management, and access to academic resources. Backed by Firebase for real-time data synchronization, it offers students a reliable hub for organizing their academic life — from managing timetables to storing lecture notes and sharing resources.',
        tech: ['Android', 'Java', 'Firebase', 'Material Design'],
        gradient: 'from-purple-500 to-pink-500',
        color: '#a855f7',
    },
];
