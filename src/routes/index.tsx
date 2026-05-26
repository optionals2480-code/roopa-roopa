import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { Duck, Sparkle } from "@/components/Duck";
import roopa1 from "@/assets/roopa-1.jpg";
import roopa2 from "@/assets/roopa-2.jpg";
import roopa3 from "@/assets/roopa-3.jpg";
import roopa4 from "@/assets/roopa-4.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const QUOTES = [
  { text: "Another trip around the sun, and you're still the main character.", by: "— for the queen herself" },
  { text: "On your day, the universe pauses just to clap a little louder.", by: "— a quiet truth" },
  { text: "You're the kind of friend the universe shows off about.", by: "— and we agree" },
  { text: "Stay golden, stay glowing, stay outrageously you.", by: "— forever rule" },
  { text: "Cheers to the chaos, the laughter, and another year of you.", by: "— with all the love" },
];

const PHOTOS = [
  { src: roopa1, span: "row-span-2" },
  { src: roopa2, span: "" },
  { src: roopa3, span: "" },
  { src: roopa4, span: "row-span-2" },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Hero() {
  const word = "ROOPA";
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* swoosh */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <path d="M-100 600 Q 400 300 800 500 T 1400 350" stroke="rgba(255,255,255,0.55)" strokeWidth="2" fill="none" />
        <path d="M-100 700 Q 500 450 900 620 T 1400 500" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" />
      </svg>

      {/* sparkles */}
      <Sparkle className="absolute top-[12%] left-[8%] text-foreground animate-twinkle" size={28} />
      <Sparkle className="absolute top-[20%] right-[14%] text-accent animate-twinkle" size={36} />
      <Sparkle className="absolute bottom-[18%] left-[18%] text-foreground animate-twinkle" size={22} />
      <Sparkle className="absolute top-[55%] right-[8%] text-foreground animate-twinkle" size={18} />

      {/* floating ducks */}
      <div className="absolute top-[18%] left-[6%] animate-float opacity-90" style={{ ['--r' as any]: '-12deg' }}>
        <Duck size={120} />
      </div>
      <div className="absolute bottom-[10%] right-[10%] animate-float opacity-95" style={{ ['--r' as any]: '8deg', animationDelay: '1.2s' }}>
        <Duck size={160} />
      </div>
      <div className="absolute top-[40%] right-[22%] animate-float blur-sm opacity-70" style={{ ['--r' as any]: '20deg', animationDelay: '0.5s' }}>
        <Duck size={70} />
      </div>
      <div className="absolute bottom-[28%] left-[3%] animate-float blur-[2px] opacity-60" style={{ ['--r' as any]: '-20deg', animationDelay: '2s' }}>
        <Duck size={56} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:block font-display text-foreground text-[clamp(3rem,8vw,8rem)] leading-none [writing-mode:vertical-rl] rotate-180 animate-letter">
            HAPPY
          </div>
          <div className="md:hidden font-display text-foreground text-[clamp(3rem,12vw,5rem)] leading-none animate-letter">
            HAPPY
          </div>

          <div className="flex flex-col items-center">
            <h1 className="font-display text-foreground text-[clamp(4.5rem,18vw,14rem)] leading-[0.85] flex">
              {word.split("").map((l, i) => (
                <span key={i} className="inline-block animate-letter" style={{ animationDelay: `${i * 0.08}s` }}>
                  {l}
                </span>
              ))}
            </h1>
            <div className="font-display text-foreground text-[clamp(2.5rem,9vw,7rem)] leading-none -mt-2 animate-letter" style={{ animationDelay: '0.6s' }}>
              DAY
            </div>
          </div>
        </div>

        <p className="mt-10 max-w-xl text-center font-script text-2xl md:text-3xl text-foreground/85">
          Showing up with a thousand surprises. Checkmate — ready to win your heart.
        </p>

        <div className="mt-8 flex items-center gap-3 text-foreground/70 text-sm uppercase tracking-[0.3em]">
          <span>roopa</span><span>•</span><span>est. legendary</span>
        </div>
      </div>

      {/* date box */}
      <div className="absolute bottom-6 right-6 z-20">
        <div className="border-2 border-foreground/80 bg-background/40 backdrop-blur-sm px-4 py-3 rounded-md">
          <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/70">The Big Day</div>
          <div className="font-display text-foreground text-2xl mt-1">[ DATE TBD ]</div>
        </div>
      </div>

      {/* socials */}
      <div className="absolute bottom-6 left-6 z-20 flex gap-3 text-foreground/80">
        {['IG', 'X', 'FB'].map((s) => (
          <div key={s} className="w-9 h-9 rounded-full border-2 border-foreground/70 flex items-center justify-center text-xs font-bold hover:bg-foreground hover:text-background transition-colors cursor-pointer">{s}</div>
        ))}
      </div>
    </section>
  );
}

function QuotesSection() {
  return (
    <section className="relative bg-foreground text-background py-32 px-6 overflow-hidden">
      <Sparkle className="absolute top-10 right-20 text-accent animate-twinkle" size={32} />
      <Sparkle className="absolute bottom-20 left-12 text-background animate-twinkle" size={24} />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="font-script text-accent text-3xl mb-2">a few words</div>
          <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-none">FOR YOU, ROOPA.</h2>
        </div>

        <div className="space-y-16">
          {QUOTES.map((q, i) => (
            <QuoteCard key={i} text={q.text} by={q.by} left={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="relative bg-background py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="font-script text-3xl text-foreground/70 mb-2">memory lane</div>
          <h2 className="font-display text-foreground text-[clamp(3rem,8vw,7rem)] leading-none">SELF LOVE ERA</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-row-dense auto-rows-[180px] md:auto-rows-[220px] gap-4">
          {PHOTOS.map((p, i) => (
            <PhotoTile key={i} src={p.src} span={p.span} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SurpriseSection() {
  const [open, setOpen] = useState(false);

  const fire = () => {
    const colors = ['#FFDD00', '#FF8C00', '#1a1a1a', '#ffffff'];
    confetti({ particleCount: 160, spread: 90, origin: { y: 0.6 }, colors });
    setTimeout(() => confetti({ particleCount: 120, spread: 120, origin: { y: 0.5, x: 0.2 }, colors }), 200);
    setTimeout(() => confetti({ particleCount: 120, spread: 120, origin: { y: 0.5, x: 0.8 }, colors }), 400);
    setOpen(true);
  };

  return (
    <section className="relative bg-accent py-32 px-6 text-center overflow-hidden">
      <Sparkle className="absolute top-12 left-1/4 text-foreground animate-twinkle" size={28} />
      <Sparkle className="absolute bottom-12 right-1/4 text-foreground animate-twinkle" size={36} />
      <div className="absolute top-10 right-10 animate-float"><Duck size={90} /></div>
      <div className="absolute bottom-10 left-10 animate-float" style={{ animationDelay: '1s' }}><Duck size={70} /></div>

      <div className="relative max-w-2xl mx-auto">
        <div className="font-script text-foreground text-3xl mb-3">psst...</div>
        <h2 className="font-display text-foreground text-[clamp(3rem,8vw,6rem)] leading-none mb-8">A LITTLE SURPRISE</h2>
        <button
          onClick={fire}
          className="group inline-flex items-center gap-3 bg-foreground text-background font-display text-2xl md:text-3xl px-10 py-5 rounded-full hover:scale-105 transition-transform shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1"
        >
          CLICK FOR MAGIC
          <Sparkle className="text-background group-hover:rotate-180 transition-transform" size={22} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 backdrop-blur-sm p-6" onClick={() => setOpen(false)}>
          <div className="bg-background border-4 border-foreground rounded-2xl p-10 max-w-md text-center relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center mb-4 animate-spin-slow"><Duck size={120} /></div>
            <h3 className="font-display text-foreground text-4xl">HAPPY BIRTHDAY,<br />ROOPA!</h3>
            <p className="font-script text-2xl text-foreground/80 mt-4">
              May your year be loud with laughter, soft with love, and full of tiny golden moments.
            </p>
            <button onClick={() => setOpen(false)} className="mt-6 font-display text-foreground border-2 border-foreground px-6 py-2 rounded-full hover:bg-foreground hover:text-background transition">
              CLOSE
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 px-6 text-center">
      <div className="flex justify-center mb-4"><Duck size={50} /></div>
      <p className="font-script text-2xl">Made with chaos, ducks, and love — for Roopa.</p>
      <p className="text-xs uppercase tracking-[0.3em] text-background/50 mt-3">a birthday tribute</p>
    </footer>
  );
}

function Index() {
  return (
    <main className="grain">
      <Hero />
      <QuotesSection />
      <Gallery />
      <SurpriseSection />
      <Footer />
    </main>
  );
}
