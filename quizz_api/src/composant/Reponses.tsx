import { useQuizzStore } from '../store/useStore'
import Reponse from './Reponse'

export default function Reponses() {
  const { questions, indexQuestionActuelle, reponsesJoueur, enregistrerReponse } = useQuizzStore();
  const questionActuelle = questions[indexQuestionActuelle];
  const reponseChoisie = reponsesJoueur[indexQuestionActuelle];

  if (!questionActuelle) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px', marginBottom: '20px' }}>
      {questionActuelle.shuffled_answers.map((texteDeLaReponse, index) => (
        <Reponse 
          key={index} 
          texte={texteDeLaReponse}
          selectionnee={reponseChoisie === texteDeLaReponse}
          onSelect={() => enregistrerReponse(texteDeLaReponse)}
        />
      ))}
    </div>
  );
}