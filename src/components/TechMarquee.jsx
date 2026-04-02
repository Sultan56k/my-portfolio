import { motion } from 'framer-motion';

const techStack = [
    { name: 'React', color: '#61DAFB' },
    { name: 'React Native', color: '#61DAFB' },
    { name: 'JavaScript', color: '#F7DF1E' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Tailwind CSS', color: '#06B6D4' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Framer Motion', color: '#FF0055' },
    { name: 'Expo', color: '#000020' },
    { name: 'Git', color: '#F05032' },
    { name: 'Firebase', color: '#FFCA28' },
    { name: 'REST APIs', color: '#6366f1' },
    { name: 'Figma', color: '#F24E1E' },
    { name: 'VS Code', color: '#007ACC' },
    { name: 'Vercel', color: '#ffffff' },
    { name: 'HTML5', color: '#E34F26' },
    { name: 'CSS3', color: '#1572B6' },
];

function MarqueeRow({ reverse = false, speed = 30 }) {
    const items = [...techStack, ...techStack];
    const duration = speed;

    return (
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
                className="flex gap-2 sm:gap-4 shrink-0"
                animate={{ x: reverse ? ['0%', '-50%'] : ['-50%', '0%'] }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                {items.map((tech, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-[#13131a] border border-[#2a2a3a] hover:border-[#6366f1]/50 transition-all duration-300 shrink-0 group cursor-default"
                    >
                        <div
                            className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-125"
                            style={{ backgroundColor: tech.color }}
                        />
                        <span className="text-xs sm:text-sm font-medium text-[#aeb0be] group-hover:text-white transition-colors whitespace-nowrap">
                            {tech.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function TechMarquee() {
    return (
        <section className="py-12 md:py-16 relative overflow-hidden">
            <div className="flex flex-col gap-4">
                <MarqueeRow speed={35} />
                <MarqueeRow reverse speed={40} />
            </div>
        </section>
    );
}
