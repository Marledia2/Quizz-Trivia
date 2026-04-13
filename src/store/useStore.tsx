import { create } from 'zustand'

const nettoyerTexte = (texte: string) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = texte;
  return textarea.value;
};

interface quizzProps {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  shuffled_answers: string[];
}

interface QuizzStore {
  questions: quizzProps[];
  isLoading: boolean;
  indexQuestionActuelle: number;
  isEndGame: boolean;
  reponsesJoueur: { [index: number]: string };
  enregistrerReponse: (reponse: string) => void;
  questionPrecedente: () => void;
  finJeu: () => void;
  questionSuivante: () => void;
  fetchQuestions: () => Promise<void>;
  resetJeu: () => void;
}

export const useQuizzStore = create<QuizzStore>((set) => ({
  questions: [],
  isLoading: false,
  indexQuestionActuelle: 0,
  isEndGame: false,
  reponsesJoueur: {},

  enregistrerReponse: (reponse) => set((state) => ({
    reponsesJoueur: {
      ...state.reponsesJoueur,
      [state.indexQuestionActuelle]: reponse
    }
  })),

  questionPrecedente: () => set((state) => {
    if (state.indexQuestionActuelle !== 0) {
      return { indexQuestionActuelle: state.indexQuestionActuelle - 1 };
    }
    return {};
  }),

  finJeu: () => set(() => ({
    isEndGame: true
  })),

  questionSuivante: () => set((state) => ({
    indexQuestionActuelle: state.indexQuestionActuelle + 1
  })),

  fetchQuestions: async () => {
    set({ isLoading: true });
    const reponse = await fetch('https://opentdb.com/api.php?amount=10');
    const valeurs = await reponse.json();

    const questionsPropres = valeurs.results.map((q: quizzProps) => {
      const reponseJuste = nettoyerTexte(q.correct_answer);
      const reponsesFausses = q.incorrect_answers.map((r) => nettoyerTexte(r));
      const melange = [reponseJuste, ...reponsesFausses].sort(() => Math.random() - 0.5);

      return {
        ...q,
        question: nettoyerTexte(q.question),
        correct_answer: reponseJuste,
        incorrect_answers: reponsesFausses,
        shuffled_answers: melange
      };
    });

    set({ questions: questionsPropres, isLoading: false });
  },

  resetJeu: () => set({
    questions: [],
    indexQuestionActuelle: 0,
    isEndGame: false,
    reponsesJoueur: {}
  })
}))