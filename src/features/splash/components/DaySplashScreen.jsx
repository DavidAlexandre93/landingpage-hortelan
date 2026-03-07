import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSplashMessages } from "../../localization/splashMessages.js";
import { range } from "../utils/range.js";
import { scheduleSplashTimeline } from "../utils/scheduleSplashTimeline.js";

const DURATION_RAIN = 2.6;
const DURATION_GROW = 2.4;
const EXIT_FADE = 0.5;

export default function DaySplashScreen({ onDone }) {
  const [phase, setPhase] = useState("rain");
  const copy = useMemo(() => getSplashMessages(), []);

  useEffect(() => {
    return scheduleSplashTimeline([
      { delayMs: DURATION_RAIN * 1000, action: () => setPhase("grow") },
      { delayMs: (DURATION_RAIN + DURATION_GROW) * 1000, action: () => setPhase("exit") },
      { delayMs: (DURATION_RAIN + DURATION_GROW + EXIT_FADE) * 1000, action: () => onDone?.() },
    ]);
  }, [onDone]);

  const raindrops = useMemo(
    () =>
      range(70).map((i) => ({
        id: i,
        x: 6 + ((i * 13) % 88),
        delay: (i % 10) * 0.06,
        dur: 0.7 + (i % 5) * 0.08,
        opacity: 0.25 + (i % 6) * 0.08,
      })),
    []
  );

  return (
    <div className="splashRoot day">
      <div className="splashHeader">
        <div className="brandDot" />
        <div>
          <div className="brandTitle">{copy.welcome}</div>
          <div className="brandSub">{copy.dayLoad}</div>
        </div>
      </div>

      <div className="scene">
        <div className="sky daySky" />

        <motion.div
          className="sun"
          initial={{ y: 16, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        >
          <div className="sunGlow" />
        </motion.div>

        <motion.div className="cloud cloud1" animate={{ x: [0, 18, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="cloud cloud2" animate={{ x: [0, -22, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />

        <AnimatePresence>
          {phase === "rain" && (
            <motion.div className="rainLayer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              {raindrops.map((d) => (
                <motion.div
                  key={d.id}
                  className="drop"
                  style={{ left: `${d.x}vw`, opacity: d.opacity }}
                  initial={{ y: "-10vh" }}
                  animate={{ y: ["-10vh", "85vh"] }}
                  transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "linear" }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="ground" />
        <div className="fieldGradient" />

        <div className="plantsRow">
          {range(8).map((i) => (
            <Plant key={i} index={i} grow={phase === "grow" || phase === "exit"} />
          ))}
        </div>

        <AnimatePresence>
          {phase === "exit" && (
            <motion.div className="fadeOut" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }} transition={{ duration: EXIT_FADE }} />
          )}
        </AnimatePresence>
      </div>

      <div className="hint">
        {phase === "rain" && copy.dayRain}
        {phase === "grow" && copy.dayGrow}
        {phase === "exit" && copy.opening}
      </div>
    </div>
  );
}

function Plant({ index, grow }) {
  const base = 0.65 + (index % 4) * 0.08;
  const final = 1.15 + (index % 3) * 0.12;

  return (
    <motion.div
      className="plant"
      initial={{ scaleY: base, opacity: 0.95 }}
      animate={{ scaleY: grow ? final : base, opacity: 1 }}
      transition={{ duration: grow ? 2.0 : 0.6, delay: grow ? index * 0.08 : 0, ease: "easeInOut" }}
      style={{ transformOrigin: "50% 100%" }}
    >
      <motion.div
        className="stem"
        animate={{ rotate: grow ? [0, -2, 1, 0] : 0 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="leaf left" animate={{ rotate: grow ? [-6, -10, -7] : -6 }} transition={{ duration: 1.8, repeat: Infinity }} />
      <motion.div className="leaf right" animate={{ rotate: grow ? [6, 10, 7] : 6 }} transition={{ duration: 1.8, repeat: Infinity }} />
    </motion.div>
  );
}
