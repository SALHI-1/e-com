import { Link } from '@inertiajs/react';
import React, { createContext, useContext, useState, PropsWithChildren } from 'react';
import {
  Dictionary,
  Lang,
  SupportedLang,
  dictionaries,
  normalizeLang,
  getStoredLang,
  setStoredLang,
} from '@/langue';

interface GuestContextValue {
  lang: SupportedLang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
}

const GuestContext = createContext<GuestContextValue | null>(null);

export function useGuestLang(): GuestContextValue {
  const ctx = useContext(GuestContext);
  if (!ctx) {
    const lang = getStoredLang();
    return {
      lang,
      setLang: setStoredLang,
      t: dictionaries[lang],
    };
  }
  return ctx;
}

export default function Guest({ children }: PropsWithChildren) {
  const [lang, setLangState] = useState<SupportedLang>(() => getStoredLang());

  const setLang = (newLang: Lang) => {
    const norm = normalizeLang(newLang);
    setLangState(norm);
    setStoredLang(norm);
  };

  const t = dictionaries[lang] || dictionaries.fr;

  return (
    <GuestContext.Provider value={{ lang, setLang, t }}>
      <div className="au-auth-wrap">
        <Link href="/" className="au-auth-logo">
          OURÉLIA
        </Link>
        <div className="au-auth-divider" />
        <div className="au-auth-card">
          {children}
        </div>
      </div>
    </GuestContext.Provider>
  );
}
