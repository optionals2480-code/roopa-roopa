import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { Duck, Sparkle } from "@/components/Duck";
import roopa1 from "@/assets/roopa-1.jpg";
import roopa2 from "@/assets/roopa-2.jpg";
import roopa3 from "@/assets/roopa-3.jpg";
import roopa4 from "@/assets/roopa-4.jpg";
import roopaChildhood from "@/assets/roopa-childhood.png.asset.json";
import roopaMyDay from "@/assets/roopa-myday.png.asset.json";
import roopaDuo from "@/assets/roopa-duo.png.asset.json";

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
  return <HeroInner />;
}

function QuoteCard({ text, by, left }: { text: string; by: string; left: boolean }) {
  const { ref, shown } = useReveal();
  return (
    <div
      ref={ref}
      className={`max-w-2xl transition-all duration-1000 ${shown ? 'opacity-100 translate-x-0' : 'opacity-0 ' + (left ? '-translate-x-20' : 'translate-x-20')} ${left ? 'mr-auto text-left' : 'md:ml-auto md:text-right text-left'}`}
    >
      <p className="font-display text-[clamp(1.4rem,4vw,3.2rem)] leading-[1.05]">"{text}"</p>
      <p className="font-script text-accent text-xl md:text-2xl mt-3 md:mt-4">{by}</p>
    </div>
  );
}

const CHAPTERS = [
  {
    src: roopa1,
    chapter: "CHAPTER 01",
    kicker: "the original icon",
    title: ["EVERY ROOM", "BENDS A LITTLE", "WHEN YOU WALK IN."],
    accent: "presence",
    align: "left" as const,
    tint: "from-foreground/70 via-foreground/30 to-foreground/80",
    focal: "center 30%",
  },
  {
    src: roopa3,
    chapter: "CHAPTER 02",
    kicker: "soft power, loud aura",
    title: ["A WHOLE MOOD,", "A WHOLE", "GOLDEN HOUR."],
    accent: "radiance",
    align: "right" as const,
    tint: "from-accent/40 via-foreground/30 to-foreground/85",
    focal: "center 35%",
  },
  {
    src: roopa4,
    chapter: "CHAPTER 03",
    kicker: "quiet chaos, loud heart",
    title: ["THE KIND OF SOUL", "THE UNIVERSE", "WRITES POEMS ABOUT."],
    accent: "magic",
    align: "left" as const,
    tint: "from-foreground/80 via-foreground/30 to-foreground/70",
    focal: "center 25%",
  },
];

function Chapter({ data, index }: { data: typeof CHAPTERS[number]; index: number }) {
  const { ref, shown } = useReveal();
  const alignLeft = data.align === "left";
  return (
    <section
      ref={ref as any}
      className="relative w-full overflow-hidden flex items-center min-h-[80vh] md:min-h-screen"
    >
      {/* image — full visible, never crops the face */}
      <img
        src={data.src}
        alt={`Roopa — ${data.kicker}`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-top scale-105 transition-transform duration-[1200ms] will-change-transform"
        style={{ objectPosition: data.focal }}
      />
      {/* gradient veil */}
      <div className={`absolute inset-0 bg-gradient-to-b md:bg-gradient-to-br ${data.tint}`} />
      {/* grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* sparkles */}
      <Sparkle className="absolute top-[14%] right-[10%] text-accent animate-twinkle" size={34} />
      <Sparkle className="absolute bottom-[18%] left-[12%] text-background animate-twinkle" size={26} />
      <Sparkle className="absolute top-[60%] right-[22%] text-background/80 animate-twinkle" size={18} />

      {/* floating duck */}
      <div
        className={`absolute ${alignLeft ? "top-[14%] right-[8%]" : "bottom-[14%] left-[6%]"} animate-float opacity-90`}
        style={{ ["--r" as any]: alignLeft ? "12deg" : "-14deg" }}
      >
        <Duck size={110} />
      </div>

      {/* side chapter rail */}
      <div className={`hidden md:flex absolute ${alignLeft ? "left-6" : "right-6"} top-1/2 -translate-y-1/2 items-center gap-3 text-background/80`}>
        <div className="h-24 w-px bg-background/40" />
        <span className="text-[10px] tracking-[0.4em] uppercase [writing-mode:vertical-rl] rotate-180">
          {data.chapter} · roopa
        </span>
      </div>

      {/* content */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-5 md:px-16 py-24 md:py-0 ${alignLeft ? "text-left" : "md:text-right md:ml-auto text-left"}`}>
        <div className={`transition-all duration-1000 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="inline-flex items-center gap-3 bg-background/10 backdrop-blur-md border border-background/30 px-4 py-2 rounded-full text-background/90 text-xs uppercase tracking-[0.3em] mb-6">
            <Sparkle size={12} className="text-accent" />
            {data.chapter}
          </div>
          <div className="font-script text-accent text-2xl md:text-4xl mb-4 drop-shadow-lg">
            {data.kicker}
          </div>
          <h2 className="font-display text-background text-[clamp(2rem,8vw,7rem)] leading-[0.88] drop-shadow-2xl">
            {data.title.map((line, i) => (
              <span
                key={i}
                className="block transition-all duration-700"
                style={{
                  transitionDelay: `${shown ? 200 + i * 150 : 0}ms`,
                  transform: shown ? "translateY(0)" : "translateY(40px)",
                  opacity: shown ? 1 : 0,
                  color: i === data.title.length - 1 ? "var(--accent)" : undefined,
                }}
              >
                {line}
              </span>
            ))}
          </h2>
          <div className={`mt-8 flex items-center gap-4 ${alignLeft ? "" : "justify-end"}`}>
            <div className="h-px w-16 bg-accent" />
            <span className="font-display text-background/90 tracking-[0.4em] text-sm">
              {String(index + 1).padStart(2, "0")} / 03 · {data.accent.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["ROOPA", "✦", "BIRTHDAY GIRL", "✦", "ICON", "✦", "MAIN CHARACTER", "✦", "GOLDEN", "✦"];
  const loop = [...words, ...words, ...words];
  return (
    <div className="relative bg-foreground text-background py-6 overflow-hidden border-y-2 border-accent">
      <div className="flex gap-10 whitespace-nowrap animate-marquee font-display text-3xl md:text-5xl">
        {loop.map((w, i) => (
          <span key={i} className={i % 2 === 0 ? "text-accent" : ""}>{w}</span>
        ))}
      </div>
    </div>
  );
}

function HeroInner() {
  const word = "ROOPA";
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-background">
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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] px-4 py-24 md:py-20">
        <div className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-1.5 rounded-full text-[10px] md:text-xs uppercase tracking-[0.35em] mb-6 animate-pop">
          <Sparkle size={12} /> a celebration of you <Sparkle size={12} />
        </div>
        <div className="flex items-center gap-3 md:gap-8">
          <div className="hidden md:block font-display text-foreground text-[clamp(3rem,8vw,8rem)] leading-none [writing-mode:vertical-rl] rotate-180 animate-letter">
            HAPPY
          </div>
          <div className="md:hidden font-display text-foreground text-[clamp(2.5rem,11vw,5rem)] leading-none animate-letter">
            HAPPY
          </div>

          <div className="flex flex-col items-center">
            <h1 className="font-display text-foreground text-[clamp(3.5rem,18vw,14rem)] leading-[0.85] flex">
              {word.split("").map((l, i) => (
                <span key={i} className="inline-block animate-letter hover:text-accent transition-colors hover:-translate-y-2 duration-300" style={{ animationDelay: `${i * 0.08}s` }}>
                  {l}
                </span>
              ))}
            </h1>
            <div className="font-display text-shimmer text-[clamp(2.5rem,9vw,7rem)] leading-none -mt-2 animate-letter" style={{ animationDelay: '0.6s' }}>
              DAY
            </div>
          </div>
        </div>

        <p className="mt-8 md:mt-10 max-w-xl text-center font-script text-xl md:text-3xl text-foreground/85 px-2">
          today the world throws confetti, the ducks line up, and the sun shows up just to clap for you. happy roopa day, icon.
        </p>

        <div className="mt-6 md:mt-8 flex items-center gap-3 text-foreground/70 text-xs md:text-sm uppercase tracking-[0.3em]">
          <span>roopa</span><span>•</span><span>est. legendary</span>
        </div>
      </div>

      {/* date box */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-20">
        <div className="border-2 border-foreground/80 bg-background/60 backdrop-blur-sm px-3 py-2 md:px-4 md:py-3 rounded-md">
          <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/70">The Big Day</div>
          <div className="font-display text-foreground text-xl md:text-2xl mt-1">[ DATE TBD ]</div>
        </div>
      </div>

      {/* socials */}
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20 flex gap-2 md:gap-3 text-foreground/80">
        {['IG', 'X', 'FB'].map((s) => (
          <div key={s} className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-foreground/70 flex items-center justify-center text-[10px] md:text-xs font-bold hover:bg-foreground hover:text-background hover:scale-110 transition-all cursor-pointer">{s}</div>
        ))}
      </div>
    </section>
  );
}

function QuotesSection() {
  return (
    <section className="relative bg-foreground text-background py-20 md:py-32 px-5 md:px-6 overflow-hidden">
      <Sparkle className="absolute top-10 right-20 text-accent animate-twinkle" size={32} />
      <Sparkle className="absolute bottom-20 left-12 text-background animate-twinkle" size={24} />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <div className="font-script text-accent text-2xl md:text-3xl mb-2">a few words</div>
          <h2 className="font-display text-[clamp(2.2rem,8vw,7rem)] leading-none">FOR YOU, ROOPA.</h2>
        </div>

        <div className="space-y-10 md:space-y-16">
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
    <>
      <section className="relative bg-background py-24 px-6 overflow-hidden text-center">
        <div className="font-script text-3xl text-foreground/70 mb-2">a film in three frames</div>
        <h2 className="font-display text-foreground text-[clamp(3rem,9vw,8rem)] leading-none">
          THE ROOPA <span className="text-accent">CINEMATIC</span>
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-foreground/70 uppercase tracking-[0.3em] text-xs">
          scroll slowly — every frame is a love letter
        </p>
      </section>
      <Marquee />
      {CHAPTERS.map((c, i) => (
        <Chapter key={i} data={c} index={i} />
      ))}
      <Marquee />
    </>
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

function ChildhoodVault() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [unlocked, setUnlocked] = useState(false);
  const [shake, setShake] = useState(false);
  const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = d;
    setCode(next);
    if (d && i < 3) refs[i + 1].current?.focus();
    if (next.every((x) => x !== "")) {
      if (next.join("") === "0000") {
        setTimeout(() => {
          setUnlocked(true);
          confetti({ particleCount: 140, spread: 100, origin: { y: 0.5 }, colors: ['#FFDD00','#FF8C00','#fff','#1a1a1a'] });
        }, 200);
      } else {
        setShake(true);
        setTimeout(() => { setShake(false); setCode(["","","",""]); refs[0].current?.focus(); }, 600);
      }
    }
  };

  return (
    <section className="relative bg-background py-24 md:py-32 px-5 md:px-6 overflow-hidden border-y-2 border-foreground">
      <Sparkle className="absolute top-12 left-10 text-accent animate-twinkle" size={28} />
      <Sparkle className="absolute bottom-12 right-12 text-foreground animate-twinkle" size={32} />

      <div className="max-w-3xl mx-auto text-center">
        <div className="font-script text-accent text-2xl md:text-3xl mb-2">a secret chapter</div>
        <h2 className="font-display text-foreground text-[clamp(2.2rem,8vw,6rem)] leading-none">
          THE CHILDHOOD <span className="text-accent">VAULT</span>
        </h2>
        <p className="mt-4 text-foreground/70 uppercase tracking-[0.3em] text-xs">
          {unlocked ? "vault open · welcome back, little roopa" : "enter the 4-digit passcode to unlock · hint: four zeros"}
        </p>

        {!unlocked ? (
          <div className={`mt-10 flex flex-col items-center gap-6 ${shake ? 'animate-wiggle' : ''}`}>
            <div className="relative">
              {/* lock icon */}
              <div className="mx-auto w-20 h-20 rounded-2xl border-4 border-foreground bg-accent flex items-center justify-center shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
                <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-foreground">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
              </div>
            </div>
            <div className="flex gap-3 md:gap-4">
              {code.map((d, i) => (
                <input
                  key={i}
                  ref={refs[i]}
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !code[i] && i > 0) refs[i - 1].current?.focus();
                  }}
                  className="w-14 h-16 md:w-16 md:h-20 text-center font-display text-3xl md:text-4xl border-4 border-foreground bg-background text-foreground rounded-xl focus:outline-none focus:border-accent focus:scale-110 transition-all shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
                />
              ))}
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">tap each box · type 0 0 0 0</p>
          </div>
        ) : (
          <div className="mt-10 animate-pop">
            <div className="relative inline-block group">
              <div className="absolute -inset-3 bg-accent rounded-3xl rotate-[-3deg]" />
              <div className="absolute -inset-3 bg-foreground rounded-3xl rotate-[2deg] opacity-80" />
              <img
                src={roopaChildhood.url}
                alt="Little Roopa"
                className="relative rounded-2xl border-4 border-foreground max-w-xs md:max-w-sm w-full shadow-[10px_10px_0_0_rgba(0,0,0,1)] group-hover:rotate-1 transition-transform"
              />
              <div className="absolute -top-4 -right-4 bg-accent text-foreground font-display text-lg px-4 py-2 rounded-full border-2 border-foreground rotate-12 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                ✦ tiny icon ✦
              </div>
            </div>
            <p className="mt-8 font-script text-2xl md:text-3xl text-foreground/85 max-w-lg mx-auto">
              the same eyes, the same fire — just smaller hands and bigger dreams.
            </p>
            <button
              onClick={() => { setUnlocked(false); setCode(["","","",""]); }}
              className="mt-6 text-xs uppercase tracking-[0.3em] text-foreground/60 underline hover:text-foreground"
            >
              re-lock the vault
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function PolaroidDiary() {
  const { ref, shown } = useReveal();
  return (
    <section
      ref={ref as any}
      className="relative overflow-hidden py-24 md:py-32 px-5 md:px-6 bg-background"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 55%), radial-gradient(circle at 80% 80%, color-mix(in oklab, var(--foreground) 14%, transparent), transparent 60%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <Sparkle className="absolute top-10 left-10 text-accent animate-twinkle" size={28} />
      <Sparkle className="absolute bottom-12 right-12 text-foreground animate-twinkle" size={32} />

      <div className="max-w-6xl mx-auto text-center mb-14 md:mb-20">
        <div className="font-script text-accent text-2xl md:text-3xl mb-2">a page from her diary</div>
        <h2 className="font-display text-foreground text-[clamp(2.2rem,8vw,6.5rem)] leading-none">
          MY <span className="text-accent">DAY</span>, <br className="md:hidden" /> EVERY DAY.
        </h2>
        <p className="mt-4 text-foreground/70 uppercase tracking-[0.3em] text-xs">
          taped to the wall · ink still wet · ✦ ✦ ✦
        </p>
      </div>

      <div
        className={`relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 items-center transition-all duration-1000 ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="relative mx-auto group" style={{ transform: 'rotate(-5deg)' }}>
          <div className="absolute -top-4 left-10 w-24 h-6 bg-accent/70 rotate-[-8deg] z-20 shadow-md" />
          <div className="relative bg-background border border-foreground/10 p-3 pb-16 rounded-sm shadow-[12px_14px_0_0_rgba(0,0,0,0.85)] group-hover:rotate-0 transition-transform duration-500 w-[260px] md:w-[320px]">
            <img
              src={roopaMyDay.url}
              alt="Roopa — soft dream"
              loading="lazy"
              className="w-full h-[320px] md:h-[400px] object-cover block"
              style={{ objectPosition: '15% 35%', filter: 'saturate(1.05) contrast(0.95)' }}
            />
            <div className="absolute bottom-4 left-0 right-0 text-center font-script text-foreground/80 text-2xl">
              dreamy ✿
            </div>
          </div>
        </div>

        <div className="relative mx-auto group" style={{ transform: 'rotate(4deg)' }}>
          <div className="absolute -top-4 right-10 w-24 h-6 bg-foreground/70 rotate-[6deg] z-20 shadow-md" />
          <div className="relative bg-background border border-foreground/10 p-3 pb-16 rounded-sm shadow-[12px_14px_0_0_rgba(0,0,0,0.85)] group-hover:rotate-0 transition-transform duration-500 w-[260px] md:w-[340px]">
            <img
              src={roopaMyDay.url}
              alt="Roopa — my day"
              loading="lazy"
              className="w-full h-[320px] md:h-[420px] object-cover block"
              style={{ objectPosition: '70% 30%' }}
            />
            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 font-script text-foreground text-3xl">
              my day <span className="text-accent">♥</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-6 bg-accent text-foreground font-display text-sm px-3 py-1.5 rounded-full border-2 border-foreground rotate-[-10deg] shadow-[3px_3px_0_0_rgba(0,0,0,1)] z-20">
            ✦ golden hour
          </div>
          <div className="absolute -top-6 -right-4 animate-float">
            <Duck size={54} />
          </div>
        </div>
      </div>

      <div className="relative max-w-2xl mx-auto mt-16 md:mt-20 text-center">
        <p className="font-script text-2xl md:text-4xl text-foreground/85 leading-snug">
          "some days are just <span className="text-accent">main character days</span> — and roopa, every single one of yours is."
        </p>
        <div className="mt-6 inline-flex items-center gap-3 text-foreground/60 text-[10px] uppercase tracking-[0.4em]">
          <span>logged</span><span>•</span><span>365 / 365</span><span>•</span><span>her day</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return <FooterInner />;
}

function DuoSection() {
  const { ref, shown } = useReveal();
  return (
    <section
      ref={ref as any}
      className="relative overflow-hidden min-h-[100svh] flex items-center bg-foreground text-background"
    >
      {/* hero image */}
      <img
        src={roopaDuo.url}
        alt="Roopa — two sides, one icon"
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1400ms] ${shown ? 'scale-100' : 'scale-110'}`}
        style={{ objectPosition: 'center 30%' }}
      />
      {/* cinematic veils */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/20 to-foreground/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-transparent to-foreground/60 mix-blend-multiply" />
      {/* split line down the middle */}
      <div className="hidden md:block absolute top-[10%] bottom-[10%] left-1/2 w-px bg-accent/60" />
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <Sparkle className="absolute top-[10%] left-[8%] text-accent animate-twinkle" size={32} />
      <Sparkle className="absolute top-[18%] right-[10%] text-background animate-twinkle" size={26} />
      <Sparkle className="absolute bottom-[14%] left-1/2 -translate-x-1/2 text-accent animate-twinkle" size={22} />
      <div className="absolute top-[12%] right-[6%] animate-float opacity-90" style={{ ['--r' as any]: '14deg' }}>
        <Duck size={70} />
      </div>
      <div className="absolute bottom-[10%] left-[5%] animate-float opacity-90" style={{ ['--r' as any]: '-12deg', animationDelay: '1s' }}>
        <Duck size={84} />
      </div>

      {/* content */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 py-24 transition-all duration-1000 ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-10 md:gap-6">
          {/* left side label */}
          <div className="text-left max-w-xs">
            <div className="inline-flex items-center gap-2 bg-background/15 backdrop-blur-md border border-background/30 px-3 py-1.5 rounded-full text-background/90 text-[10px] uppercase tracking-[0.35em] mb-4">
              <Sparkle size={10} className="text-accent" /> side a
            </div>
            <div className="font-script text-accent text-2xl md:text-3xl mb-2">the giggle</div>
            <h3 className="font-display text-background text-[clamp(2rem,5vw,3.6rem)] leading-[0.95]">
              joy in <br /> motion.
            </h3>
            <p className="mt-3 text-background/70 text-sm md:text-base max-w-[18ch]">
              the laugh that fills the whole sky.
            </p>
          </div>

          {/* center title */}
          <div className="text-center self-center">
            <div className="font-script text-accent text-xl md:text-2xl mb-2">two sides · one icon</div>
            <h2 className="font-display text-background text-[clamp(2.6rem,11vw,9rem)] leading-[0.85] drop-shadow-2xl">
              DOUBLE <br /><span className="text-accent">TROUBLE.</span>
            </h2>
            <div className="mt-5 inline-flex items-center gap-3 text-background/80 text-[10px] uppercase tracking-[0.4em]">
              <span className="h-px w-10 bg-accent" />
              <span>roopa × roopa</span>
              <span className="h-px w-10 bg-accent" />
            </div>
          </div>

          {/* right side label */}
          <div className="text-left md:text-right max-w-xs md:ml-auto">
            <div className="inline-flex items-center gap-2 bg-background/15 backdrop-blur-md border border-background/30 px-3 py-1.5 rounded-full text-background/90 text-[10px] uppercase tracking-[0.35em] mb-4">
              <Sparkle size={10} className="text-accent" /> side b
            </div>
            <div className="font-script text-accent text-2xl md:text-3xl mb-2">the glow</div>
            <h3 className="font-display text-background text-[clamp(2rem,5vw,3.6rem)] leading-[0.95]">
              soft <br /> sunset soul.
            </h3>
            <p className="mt-3 text-background/70 text-sm md:text-base max-w-[18ch] md:ml-auto">
              the smile that the sky tries to copy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterInner() {
  return (
    <footer
      className="relative flex flex-col overflow-hidden text-background bg-foreground"
    >
      {/* full portrait — never cropped */}
      <div className="relative w-full bg-foreground">
        <img
          src={roopa2}
          alt="Roopa — black saree portrait"
          loading="lazy"
          className="block w-full h-auto max-h-none object-contain mx-auto"
        />
        {/* subtle vignette only at edges, never covering face */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-foreground to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-foreground via-foreground/70 to-transparent" />

        {/* sparkles on the portrait edges only */}
        <Sparkle className="absolute top-[6%] right-[6%] text-accent animate-twinkle" size={32} />
        <Sparkle className="absolute top-[12%] left-[6%] text-background animate-twinkle" size={22} />
        <Sparkle className="absolute bottom-[10%] right-[10%] text-accent animate-twinkle" size={26} />
        <div className="absolute top-[6%] left-[3%] animate-float opacity-90" style={{ ['--r' as any]: '-10deg' }}>
          <Duck size={56} />
        </div>
        <div className="absolute bottom-[14%] right-[3%] animate-float opacity-90" style={{ ['--r' as any]: '14deg', animationDelay: '1.2s' }}>
          <Duck size={70} />
        </div>
      </div>

      {/* hero quote under portrait */}
      <div className="relative z-10 px-5 md:px-6 pt-16 md:pt-20 pb-12 text-center bg-foreground">
        <div className="font-script text-accent text-2xl md:text-4xl mb-3 drop-shadow">
          to the girl in the black saree —
        </div>
        <h2 className="font-display text-background text-[clamp(2.2rem,9vw,8rem)] leading-[0.85] tracking-tight drop-shadow-lg">
          STAY GOLDEN,<br /><span className="text-accent">STAY ROOPA.</span>
        </h2>
        <p className="mt-6 max-w-xl mx-auto font-script text-xl md:text-3xl text-background/90 px-2">
          The world is brighter because you laugh in it.
        </p>
      </div>

      {/* signature strip */}
      <div className="relative z-10 border-t-2 border-background/30 backdrop-blur-sm bg-foreground/50 py-6 md:py-8 px-5 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="animate-wiggle"><Duck size={42} /></div>
          <p className="font-script text-xl md:text-2xl">Made with chaos, ducks & love — for Roopa.</p>
        </div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-background/60">a birthday tribute · [ date tbd ]</p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="grain">
      <Hero />
      <QuotesSection />
      <DuoSection />
      <Gallery />
      <SurpriseSection />
      <PolaroidDiary />
      <ChildhoodVault />
      <Footer />
    </main>
  );
}
