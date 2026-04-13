import Questions from './composant/Questions'
import Recapitulatif from './composant/Recapitulatif'
import { useQuizzStore } from './store/useStore'

export default function App() {
  const { fetchQuestions, questions, questionSuivante, questionPrecedente, finJeu, indexQuestionActuelle, isEndGame } = useQuizzStore()

  const estDerniereQuestion = indexQuestionActuelle === questions.length - 1;
  const estPremiereQuestion = indexQuestionActuelle === 0;

  return (
    <div>
      <h1>Trivia Quizz</h1>
      
      {!isEndGame && questions.length === 0 && (
        <div>
          <button onClick={() => fetchQuestions()}>
            Lancer le Quiz !
          </button>
        </div>
      )}

      {!isEndGame && questions.length > 0 && (
        <div>
          <Questions />
          
          {!estPremiereQuestion && (
            <button onClick={() => questionPrecedente()}>← Question Précédente</button>
          )}

          {estDerniereQuestion ? (
             <button onClick={() => finJeu()}>Terminer le Quiz</button>
          ) : (
            <button onClick={() => questionSuivante()}>Question suivante →</button>
          )}
        </div>
      )}

      {isEndGame && (
        <Recapitulatif />
      )}
    </div>
  )
}