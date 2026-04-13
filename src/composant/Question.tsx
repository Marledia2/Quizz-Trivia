interface QuestionProps {
  numero: number;
  total: number;
  texte: string;
  categorie: string;
}

const getLogoCategorie = (categorie: string) => {
  if (categorie.includes('Science')) return '🔬';
  if (categorie.includes('Entertainment') || categorie.includes('Film') || categorie.includes('Music')) return '🎬';
  if (categorie.includes('History')) return '🏛️';
  if (categorie.includes('Geography')) return '🌍';
  if (categorie.includes('Sports')) return '⚽';
  if (categorie.includes('Art')) return '🎨';
  if (categorie.includes('Mythology')) return '🐉';
  if (categorie.includes('Politics')) return '⚖️';
  if (categorie.includes('Animals')) return '🐾';
  if (categorie.includes('Vehicles')) return '🚗';
  if (categorie.includes('Video Games')) return '🎮';
  return '🧠';
}

function Question({ numero, total, texte, categorie }: QuestionProps) {
  return (
    <div style={{
      padding: '20px 30px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      marginBottom: '20px',
      color: '#ffffff'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#aa3bff' }}>
          Question {numero} / {total}
        </span>
        <span style={{ fontSize: '14px', padding: '5px 10px', borderRadius: '20px' }}>
          {getLogoCategorie(categorie)} {categorie}
        </span>
      </div>
      
      <h2 style={{ fontSize: '22px', margin: 0, lineHeight: '1.4' }}>{texte}</h2>
    </div>
  )
}

export default Question