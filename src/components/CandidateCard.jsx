export default function CandidateCard({
  //electionId = 'Id da eleição',
  foto = 'Foto',
  percentualVotos = '% Votos',
  totalVotos = 'Total de Votos',
  nomeCandidato = 'Nome do Candidato',
  resultado = 'Resultado',
}) {
  const classes =
    resultado === 'Eleito'
      ? 'border-solid border-2 border-green-200'
      : 'border-white';

  const classes2 = resultado === 'Eleito' ? 'text-green-500' : 'text-black';
  return (
    <div>
      <div
        className={`shadow-lg p-2 m-2 w-80 h-48 text-md
                  flex flex-col items-center justify-center ${classes}  
                  `}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <div className="flex flex-row mt-4 w-60 h-40 justify-between">
          <div className="justify-items-start w-14 h-14 rounded-full bg-center text-center">
            <img className="w-14 h-14 rounded-full" src={foto} alt="Foto" />
          </div>
          <div className="justify-items-end text-center">
            <div>{percentualVotos}%</div>
            <div>{totalVotos}</div>
          </div>
        </div>
        <div className="flex flex-col mb-4 items-center">
          <div>{nomeCandidato}</div>
          <div className={classes2}>{resultado}</div>
        </div>
      </div>
    </div>
  );
}
