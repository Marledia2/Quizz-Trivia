import { useQuizzStore } from '../store/useStore';

export default function Recapitulatif() {
  const { questions, reponsesJoueur, resetJeu } = useQuizzStore();

  let scoreFinal = 0;
  questions.forEach((question, index) => {
    if (reponsesJoueur[index] === question.correct_answer) {
      scoreFinal += 10;
    }
  });

  const scoreMax = questions.length * 10;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left', marginTop: '20px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px', padding: '20px', borderRadius: '12px' }}>
        <h2 style={{ color: '#ffffff', margin: '0 0 10px 0' }}>Partie terminée !</h2>
        <h3 style={{ fontSize: '32px', color: '#aa3bff', margin: '0 0 20px 0' }}>
          Ton Score : {scoreFinal} / {scoreMax}
        </h3>
        {/* BOUTON NOUVELLE PARTIE */}
        <button 
          onClick={resetJeu}
          style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#aa3bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          🔄 Rejouer une partie
        </button>
      </div>

      <h2 style={{ borderBottom: '2px solid #e5e4e7', paddingBottom: '10px' }}>Détail de tes réponses :</h2>

      {questions.map((question, index) => {
        const reponseDuJoueur = reponsesJoueur[index];
        const bonneReponse = question.correct_answer;
        const toutesLesReponses = question.shuffled_answers;

        return (
          <div key={index} style={{ marginBottom: '25px', padding: '20px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid #333', borderRadius: '12px' }}>
            <p style={{ marginTop: 0 }}><strong>Question {index + 1} :</strong> {question.question}</p>
            
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {toutesLesReponses.map((reponse, i) => {
                let couleur = 'transparent';
                let bordure = '1px solid transparent';
                
                if (reponse === bonneReponse) {
                  couleur = 'rgba(0, 255, 0, 0.15)';
                  bordure = '1px solid rgba(0, 255, 0, 0.5)';
                } else if (reponse === reponseDuJoueur && reponse !== bonneReponse) {
                  couleur = 'rgba(255, 0, 0, 0.15)';
                  bordure = '1px solid rgba(255, 0, 0, 0.5)';
                }

                return (
                  <li 
                    key={i} 
                    style={{ 
                      backgroundColor: couleur, 
                      border: bordure,
                      padding: '8px 12px', 
                      borderRadius: '8px',
                      marginBottom: '6px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <input 
                      type="radio" 
                      readOnly 
                      checked={reponse === reponseDuJoueur} 
                      style={{ marginRight: '10px' }}
                    />
                    {reponse}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}