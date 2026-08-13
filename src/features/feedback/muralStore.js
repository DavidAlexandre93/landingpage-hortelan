export const MURAL_STORAGE_KEY = "hortelan_faq";
export const MURAL_LIMITS = Object.freeze({ name: 60, email: 120, message: 1000 });
export const MURAL_TYPES = Object.freeze(["question", "praise", "idea"]);

function cleanText(value, maxLength) {
  return String(value ?? "")
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(value) {
  return value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value);
}

export function normalizeMuralEntry(value) {
  if (!value || typeof value !== "object") return null;

  const name = cleanText(value.name ?? value.nome, MURAL_LIMITS.name);
  const email = cleanText(value.email, MURAL_LIMITS.email).toLowerCase();
  const message = cleanText(value.message ?? value.msg, MURAL_LIMITS.message);
  const legacyType = { duvida: "question", elogio: "praise", opiniao: "idea" }[value.tipo];
  const type = MURAL_TYPES.includes(value.type) ? value.type : legacyType;
  const timestamp = value.createdAt ?? value.data;
  const createdAt = new Date(timestamp ?? Number.NaN);

  if (!name || !message || !type || !isValidEmail(email) || Number.isNaN(createdAt.getTime())) {
    return null;
  }

  return {
    id: cleanText(value.id, 100) || `${createdAt.getTime()}-${name}`,
    name,
    email,
    type,
    message,
    createdAt: createdAt.toISOString(),
  };
}

export function readMuralEntries(storage = globalThis.localStorage) {
  try {
    const parsed = JSON.parse(storage?.getItem?.(MURAL_STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeMuralEntry).filter(Boolean).slice(0, 50);
  } catch {
    return [];
  }
}

export function writeMuralEntries(entries, storage = globalThis.localStorage) {
  const normalized = Array.isArray(entries)
    ? entries.map(normalizeMuralEntry).filter(Boolean).slice(0, 50)
    : [];

  try {
    storage?.setItem?.(MURAL_STORAGE_KEY, JSON.stringify(normalized));
    return true;
  } catch {
    return false;
  }
}

export function createMuralEntry(
  fields,
  now = new Date(),
  idFactory = () => globalThis.crypto?.randomUUID?.()
) {
  const fallbackId = `${now.getTime()}-${Math.random().toString(36).slice(2, 10)}`;
  return normalizeMuralEntry({
    ...fields,
    id: idFactory?.() || fallbackId,
    createdAt: now.toISOString(),
  });
}

export function serializeMuralEntries(entries) {
  const normalized = entries.map(normalizeMuralEntry).filter(Boolean);
  return `${JSON.stringify(normalized, null, 2)}\n`;
}

export function buildMailtoUrl({ recipient, name, email, subject, message }) {
  const normalizedSubject = cleanText(subject, 120);
  const body = [
    `Nome: ${cleanText(name, 80)}`,
    `E-mail: ${cleanText(email, 160)}`,
    "",
    cleanText(message, 2000),
  ].join("\n");
  const params = new URLSearchParams({ subject: normalizedSubject, body });
  return `mailto:${recipient}?${params.toString()}`;
}
