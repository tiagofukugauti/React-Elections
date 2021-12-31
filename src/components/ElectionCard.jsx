export default function ElectionCard({
  //electionId = 'Id da eleição',
  nCidade = 'Nome da Cidade',
  totalEleitores = 'Total de Eleitores',
  abstencao = 'Abstenção',
  comparecimento = 'Comparecimento',
  totalCandidatos = 'Total de Candidatos',
}) {
  return (
    <div
      className={`p-2 m-2 mt-0 w-full h-36 text-md
    flex flex-col items-center justify-center
    `}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <div>
        Eleição em <strong>{nCidade}</strong>
      </div>
      <div className="flex flex-row text-center w-auto items-center flex-wrap p-2 m-2 justify-between">
        <div className="ml-3 mr-3 text-center">
          <strong>Total de Eleitores:</strong>
          {totalEleitores}
        </div>
        <div className="ml-3 mr-3 text-center">
          <strong>Abstenção:</strong> {abstencao}
        </div>
        <div className="ml-3 mr-3 mb-0 text-center">
          <strong>Comparecimento:</strong>
          {comparecimento}
        </div>
      </div>
      <div className="font-semibold">{totalCandidatos} candidatos</div>
    </div>
  );
}
