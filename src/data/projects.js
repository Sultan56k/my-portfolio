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
        title: 'Video Summarizer',
        slug: 'video-summarizer',
        category: 'Mobile',
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
    {
        title: 'Step & Water Tracker',
        slug: 'step-water-tracker',
        category: 'Mobile',
        coverImage: card('1571019613454-1cb2f99b2d8b'),
        images: [wide('1571019613454-1cb2f99b2d8b')],
        description:
            'A mobile fitness tracking app focused on daily step visualization and water intake monitoring. Built with React Native and Expo, it features interactive charts, daily goal tracking, and persistent local storage. The clean, minimal UI makes logging habits effortless while keeping performance smooth on all devices.',
        tech: ['React Native', 'Expo', 'Charts', 'Local Storage'],
        gradient: 'from-emerald-400 to-teal-500',
        color: '#10b981',
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
        title: 'Child Learning',
        slug: 'child-learning',
        category: 'Mobile',
        coverImage: card('1503676260728-1c00da094a0b'),
        images: [wide('1503676260728-1c00da094a0b')],
        description:
            'An interactive learning app for young children covering alphabets, numbers, shapes, and phonetic exercises. Uses engaging animations, voice prompts, and reward-based progression to keep kids motivated while they learn. Developed with React Native, it emphasizes a safe, ad-free environment and a colorful, tap-friendly interface designed specifically for small hands and short attention spans.',
        tech: ['React Native', 'Audio & Visuals', 'Gamification', 'Kid-Friendly UI'],
        gradient: 'from-teal-400 to-cyan-500',
        color: '#14b8a6',
    },
];
