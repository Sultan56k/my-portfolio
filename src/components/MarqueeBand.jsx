/*
 * Infinite marquee band — horizontal scrolling text between sections.
 * Duplicates content twice so the -50% CSS translate creates a seamless loop.
 * Pauses on hover.
 */
export default function MarqueeBand({
    items = ['Available For Hire', 'Crafting Digital Experiences', 'React · React Native · Node'],
    accentIndex = 1,
}) {
    const row = items.map((text, i) => (
        <span
            key={i}
            className={`marquee-item ${i === accentIndex ? 'is-accent' : ''}`}
        >
            {text}
            <span className="marquee-star" aria-hidden="true">✦</span>
        </span>
    ));

    return (
        <div className="marquee-band" aria-hidden="true">
            <div className="marquee-track">
                {row}
                {row}
            </div>
        </div>
    );
}
