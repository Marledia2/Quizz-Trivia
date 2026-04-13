import { useQuizzStore } from '../store/useStore'
import Question from './Question'
import Reponses from './Reponses'

export default function Questions() {
  const { questions, indexQuestionActuelle } = useQuizzStore();
  const questionAfficher = questions[indexQuestionActuelle];

  if (!questionAfficher) return null;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Question 
        numero={indexQuestionActuelle + 1} 
        total={questions.length}
        texte={questionAfficher.question} 
        categorie={questionAfficher.category}
      />
      <Reponses />
    </div>
  );
}