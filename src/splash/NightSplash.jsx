import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION_NIGHT = 4.6;
const EXIT_FADE = 0.6;

function range(n) {
  return Array.from({ length: n }, (_, i) => i);
}

export default function NightSplash({ onDone }) {
  const [phase, setPhase] = useState("night");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), DURATION_NIGHT * 1000);
    const t2 = setTimeout(() => onDone?.(), (DURATION_NIGHT + EXIT_FADE) * 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  const stars = useMemo(
    () =>
      range(55).map((i) => ({
        id: i,
        x: 5 + ((i * 17) % 90),
        y: 8 + ((i * 29) % 52),
        s: 0.8 + (i % 5) * 0.25,
        tw: 1.3 + (i % 7) * 0.22,
        d: (i % 10) * 0.12,
        o: 0.25 + (i % 6) * 0.12,
      })),
    []
  );

  return (
    <div className="splashRoot night">
      <div className="splashCard">
        <div className="splashHeader">
          <div className="brandDot" />
          <div>
            <div className="brandTitle">Bem-vindo!</div>
            <div className="brandSub">Carregando a experiência da noite 🌙</div>
          </div>
        </div>

        <div className="scene">
          <div className="sky nightSky" />

          <div className="stars">
            {stars.map((st) => (
              <motion.div
                key={st.id}
                className="star"
                style={{ left: `${st.x}vw`, top: `${st.y}%`, opacity: st.o, transform: `scale(${st.s})` }}
                animate={{ opacity: [st.o, st.o + 0.35, st.o] }}
                transition={{ duration: st.tw, delay: st.d, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>

          <motion.div
            className="moonWrap"
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, x: phase === "exit" ? 140 : 0, y: phase === "exit" ? 40 : 0 }}
            transition={{ duration: phase === "exit" ? EXIT_FADE : 1.2, ease: "easeInOut" }}
          >
            <motion.div className="moon">
              <motion.div
                className="moonShadow"
                initial={{ x: -34, opacity: 0.0 }}
                animate={{ opacity: 1, x: phase === "exit" ? -4 : -34 }}
                transition={{ duration: phase === "exit" ? EXIT_FADE : DURATION_NIGHT - 0.8, ease: "easeInOut" }}
              />
              <div className="moonGlow" />
            </motion.div>
          </motion.div>

          <motion.div className="cloud nightCloud1" animate={{ x: [0, 18, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="cloud nightCloud2" animate={{ x: [0, -14, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />

          <div className="ground nightGround" />
          <div className="fieldGradient nightField" />

          <div className="plantsRow">
            {range(9).map((i) => (
              <NightPlant key={i} index={i} />
            ))}
          </div>

          <AnimatePresence>
            {phase === "exit" && <motion.div className="fadeOut" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: EXIT_FADE }} />}
          </AnimatePresence>
        </div>

        <div className="hint">
          {phase === "night" && "Cuidando da plantação sob a lua…"}
          {phase === "exit" && "A lua está se pondo — abrindo a homepage…"}
        </div>
      </div>
    </div>
  );
}

function NightPlant({ index }) {
  const scale = 1.05 + (index % 4) * 0.06;

  return (
    <motion.div
      className="plant"
      initial={{ scaleY: scale }}
      animate={{ scaleY: scale }}
      transition={{ duration: 0.6 }}
      style={{ transformOrigin: "50% 100%" }}
    >
      <motion.div
        className="leaf left"
        animate={{ rotate: [0, -6, 0, -3, 0] }}
        transition={{ duration: 3.0 + (index % 3) * 0.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="leaf right"
        animate={{ rotate: [0, 6, 0, 3, 0] }}
        transition={{ duration: 2.8 + (index % 4) * 0.35, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="stem" />
    </motion.div>
  );
}
