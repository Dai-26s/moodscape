import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Lang, translations, t as translate } from './translations';

interface LanguageCtx {
  lang: Lang;
  toggleLang: () => void;
  tl: typeof translations.en;
  langLabel: string;
  langSwitchLabel: string;
}

const LanguageContext = createContext<LanguageCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  const toggleLang = () => setLang(prev => prev === 'en' ? 'zh' : 'en');

  const value: LanguageCtx = {
    lang,
    toggleLang,
    tl: translations[lang],
    langLabel: translations[lang].langLabel,
    langSwitchLabel: translations[lang].langSwitch,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}

export { translate as t };
