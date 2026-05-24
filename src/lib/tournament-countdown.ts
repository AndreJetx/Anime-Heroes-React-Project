export type TournamentCountdown = {
  days: number;
  hours: number;
  minutes: number;
  expired: boolean;
};

export function getTournamentCountdown(
  startsAtIso: string,
  nowMs: number = Date.now()
): TournamentCountdown | null {
  const target = new Date(startsAtIso).getTime();
  if (Number.isNaN(target)) return null;

  const diff = target - nowMs;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, expired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes, expired: false };
}

export function formatCountdownUnit(value: number): string {
  return String(value).padStart(2, "0");
}

export function toDatetimeLocalValue(iso: string | null | undefined): string {
  if (!iso?.trim()) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function fromDatetimeLocalValue(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const d = new Date(trimmed);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}
