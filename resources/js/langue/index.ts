import { fr } from './fr';
import { eng } from './eng';
import { esp } from './esp';
import { Dictionary, Lang, SupportedLang } from './types';

export * from './types';
export { fr } from './fr';
export { eng } from './eng';
export { esp } from './esp';
export { en } from './en';
export { es } from './es';

export const dictionaries: Record<SupportedLang, Dictionary> = {
  fr,
  eng,
  esp,
};

export const SUPPORTED_LANGS: SupportedLang[] = ['fr', 'eng', 'esp'];

export const LANG_LABELS: Record<SupportedLang, string> = {
  fr: 'FR',
  eng: 'ENG',
  esp: 'ESP',
};

/** Normalise les codes de langue (fr, en, eng, es, esp) vers SupportedLang ('fr' | 'eng' | 'esp') */
export function normalizeLang(lang?: string | null): SupportedLang {
  if (!lang) return 'fr';
  const clean = lang.toLowerCase().trim();
  if (clean === 'en' || clean === 'eng') return 'eng';
  if (clean === 'es' || clean === 'esp') return 'esp';
  if (clean === 'fr') return 'fr';
  return 'fr';
}

/** Récupère la langue sauvegardée dans le localStorage avec fallback sécurisé pour le SSR */
export function getStoredLang(): SupportedLang {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('au_lang');
      if (saved) return normalizeLang(saved);
    }
  } catch {
    // SSR ou localStorage non disponible
  }
  return 'fr';
}

/** Enregistre la langue sélectionnée dans le localStorage */
export function setStoredLang(lang: Lang): void {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const normalized = normalizeLang(lang);
      localStorage.setItem('au_lang', normalized);
    }
  } catch {
    // Ignorer en environnement sans localStorage
  }
}

/** Récupère le dictionnaire correspondant à une langue */
export function getDictionary(lang?: Lang | null): Dictionary {
  const norm = normalizeLang(lang);
  return dictionaries[norm] || dictionaries.fr;
}
