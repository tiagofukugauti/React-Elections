import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import CandidateCards from '../components/CandidateCards';
import CandidateCard from '../components/CandidateCard';
import ElectionCards from '../components/ElectionCards';
import ElectionCard from '../components/ElectionCard';
import { corrigeDados } from '../helpers/NovosDados';
import Select from 'react-select';
import Error from '../components/Error';
import Loading from '../components/Loading';

const options = [
  { value: 'Asgard', label: 'Asgard' },
  { value: 'Gotham', label: 'Gotham' },
  { value: 'Metropolis', label: 'Metropolis' },
  { value: 'Smallville', label: 'Smallville' },
  { value: 'Themyscira', label: 'Themyscira' },
];

export default function ReactElectionsPage() {
  const [allCities, setAllCities] = useState([]);
  const [cidadeFiltrada, setCidadeFiltrada] = useState([]);
  const [cidadeUnica, setCidadeUnica] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getAllElections() {
      try {
        await corrigeDados().then(novosDados => {
          setAllCities(novosDados);
          let cidadeSelecionadaInicial = novosDados
            .filter(cidade => cidade.nameCity === 'Asgard')
            .sort((a, b) => b.votes - a.votes);
          setCidadeFiltrada(cidadeSelecionadaInicial);
          let cidadeUniqueInicial = new Array(cidadeSelecionadaInicial[0]);
          setCidadeUnica(cidadeUniqueInicial);
        });
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    }
    getAllElections();
  }, []);

  function handleCityFilterChange(city) {
    //console.log(city.value);
    let filteredCity = [...allCities];
    //console.log(filteredCity);
    var cidadeSelecionada = filteredCity
      .filter(cidade => cidade.nameCity === city.value)
      .sort((a, b) => b.votes - a.votes);
    //console.log(cidadeSelecionada);
    setCidadeFiltrada(cidadeSelecionada);
    var cidadeUnique = new Array(cidadeSelecionada[0]);
    setCidadeUnica(cidadeUnique);
  }

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading && !error) {
    mainJsx = (
      <>
        <div>
          <div>
            <h2 className="mt-3 text-center">
              <strong>Selecione o município</strong>
            </h2>
          </div>
          <div
            style={{
              color: 'hsl(0, 0%, 40%)',
              display: 'flex',
              fontSize: 14,
              fontStyle: 'italic',
              marginTop: '15px',
              justifyContent: 'center',
            }}
          >
            <Select
              name="cidade"
              defaultValue={{ label: 'Asgard', value: 'Asgard' }}
              onChange={handleCityFilterChange}
              options={options}
              placeholder="Selecione o município"
            />
          </div>
        </div>
        <Main>
          <ElectionCards>
            {cidadeUnica.map(
              ({
                nameCity,
                electionId,
                votingPopulation,
                absence,
                presence,
                totalCandidatos,
              }) => {
                return (
                  <ElectionCard
                    key={electionId}
                    nCidade={nameCity}
                    totalEleitores={votingPopulation}
                    abstencao={absence}
                    comparecimento={presence}
                    totalCandidatos={totalCandidatos}
                  />
                );
              }
            )}
          </ElectionCards>
          <CandidateCards>
            {cidadeFiltrada.map(
              ({
                candidateId,
                votes,
                nameCandidate,
                percentualVotes,
                foto,
                resultado,
              }) => {
                return (
                  <CandidateCard
                    key={candidateId}
                    totalVotos={votes}
                    nomeCandidato={nameCandidate}
                    percentualVotos={percentualVotes}
                    foto={foto}
                    resultado={resultado}
                  />
                );
              }
            )}
          </CandidateCards>
        </Main>
      </>
    );
  }
  return (
    <>
      <Header>REACT ELECTIONS</Header>
      <Main>{mainJsx}</Main>
    </>
  );
}
