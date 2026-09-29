import { useEffect, useRef, useState } from "react";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  label: string;
  /** `true` une fois la date atteinte — l'offre est alors close. */
  expired: boolean;
};

export const EMPTY_TIME_LEFT: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  total: 0,
  label: "31 décembre",
  expired: false,
};

/** Minuit entre le 31 décembre et le 1er janvier de l'année suivante. */
export function nextNewYear(reference = new Date()) {
  return new Date(reference.getFullYear(), 11, 31, 24, 0, 0);
}

function timeLeftFrom(target: Date): TimeLeft {
  const total = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
    total,
    label: `31 décembre ${target.getFullYear() - 1}`,
    expired: total === 0,
  };
}

/**
 * Compte à rebours jusqu'à une date cible.
 *
 * Rend `EMPTY_TIME_LEFT` au premier rendu (serveur + première hydratation) puis
 * la valeur réelle côté client : le HTML servi et l'hydratation concordent donc
 * exactement, et il n'y a pas de saut de valeur visible.
 */
export function useCountdown(target: Date | (() => Date)) {
  const resolve = useRef(target);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(EMPTY_TIME_LEFT);

  useEffect(() => {
    let timer = 0;
    const tick = () => {
      const value = resolve.current;
      setTimeLeft(timeLeftFrom(typeof value === "function" ? value() : value));
      timer = window.setTimeout(tick, 1000);
    };
    tick();
    return () => window.clearTimeout(timer);
  }, []);

  return timeLeft;
}
