interface ReponseProps {
  texte: string;
  selectionnee: boolean; 
  onSelect: () => void;
}

function Reponse({ texte, selectionnee, onSelect }: ReponseProps) {
  return (
    <label 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '15px', 
        padding: '15px 20px',
        border: selectionnee ? '2px solid #aa3bff' : '2px solid #e5e4e7',
        backgroundColor: selectionnee ? 'rgba(170, 59, 255, 0.1)' : 'transparent',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontWeight: selectionnee ? 'bold' : 'normal'
      }}
    >
      <input 
        type="radio" 
        name="choix_reponse"
        checked={selectionnee}
        onChange={onSelect}
        style={{ transform: 'scale(1.2)', accentColor: '#aa3bff' }}
      />
      <span style={{ fontSize: '16px' }}>{texte}</span>
    </label>
  )
}

export default Reponse