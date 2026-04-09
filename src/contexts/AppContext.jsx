import React, { createContext, useContext, useState } from "react";

const translations = {
  "us-en": {
    brand: "Nuno's Lingo",
    login: "Login",
    heroTitlePart1: "Ask AI",
    heroTitlePart2: "Everything",
    heroTitlePart3: "about Portuguese",
    heroSub:
      "The first platform that teaches you European Portuguese from any language or dialect you speak. AI-powered, human-supported.",
    cta: "Start Learning Now",
    features: "Our Features",
    tutor: "24/7 AI Voice Tutor",
    dictionary: "Urban Dictionary",
    scheduler: "Smart Scheduler",
    human: "Human Tutor Sessions",
    footer: "© 2026 Nuno’s Lingo. Built for European Portuguese learners.",
  },
  "uk-en": {
    brand: "Nuno's Lingo",
    login: "Log In",
    heroTitlePart1: "Ask AI",
    heroTitlePart2: "Everything",
    heroTitlePart3: "about Portuguese",
    heroSub:
      "The first platform that teaches you European Portuguese from any language or dialect you speak. AI-powered, human-supported.",
    cta: "Start Learning Now",
    features: "Our Features",
    tutor: "24/7 AI Voice Tutor",
    dictionary: "Urban Dictionary",
    scheduler: "Smart Scheduler",
    human: "Human Tutor Sessions",
    footer: "© 2026 Nuno’s Lingo. Built for European Portuguese learners.",
  },
  "pt-pt": {
    brand: "Nuno's Lingo",
    login: "Entrar",
    heroTitlePart1: "Pergunta à IA",
    heroTitlePart2: "Tudo",
    heroTitlePart3: "sobre Português",
    heroSub:
      "A primeira plataforma que te ensina Português Europeu a partir de qualquer língua ou dialeto que fales. Potenciado por IA.",
    cta: "Começar a Aprender",
    features: "Funcionalidades",
    tutor: "Tutor de Voz IA 24/7",
    dictionary: "Dicionário Urbano",
    scheduler: "Agendamento Inteligente",
    human: "Aulas com Tutores Humanos",
    footer: "© 2026 Nuno’s Lingo. Criado para alunos de Português Europeu.",
  },
  "pt-br": {
    brand: "Nuno's Lingo",
    login: "Entrar",
    heroTitlePart1: "Pergunte à IA",
    heroTitlePart2: "Tudo",
    heroTitlePart3: "sobre Português",
    heroSub:
      "A primeira plataforma que te ensina Português Europeu a partir de qualquer língua ou dialeto que você fale. Com IA.",
    cta: "Começar a Aprender",
    features: "Funcionalidades",
    tutor: "Tutor de Voz IA 24/7",
    dictionary: "Dicionário Urbano",
    scheduler: "Agendamento Inteligente",
    human: "Aulas com Tutores Humanos",
    footer: "© 2026 Nuno’s Lingo. Criado para alunos de Português Europeu.",
  },
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState("us-en");
  
  const t = translations[lang];

  return (
    <AppContext.Provider value={{ 
      isDarkMode, 
      setIsDarkMode, 
      lang, 
      setLang, 
      t,
      translations 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);