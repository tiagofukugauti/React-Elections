import {
  apiGetCities,
  apiGetElections,
  apiGetCandidates,
} from '../services/apiService';

export async function corrigeDados() {
  let dadosElections = await apiGetElections();
  let dadosCandidates = await apiGetCandidates();
  let dadosCities = await apiGetCities();

  var novosDados = [];
  for (var election of dadosElections) /*?*/ {
    var novoRegistro = {
      electionId: election['id'],
      cityId: election['cityId'],
      candidateId: election['candidateId'],
      votes: election['votes'],
    };
    for (var candidate of dadosCandidates) /*?*/ {
      if (election['candidateId'] === candidate['id']) {
        novoRegistro['nameCandidate'] = candidate['name'];
      }
    }
    for (var city of dadosCities) {
      if (election['cityId'] === city['id']) {
        novoRegistro['nameCity'] = city['name'];
        novoRegistro['votingPopulation'] = city['votingPopulation'];
        novoRegistro['votingPopulation'] = city['votingPopulation'];
        novoRegistro['absence'] = city['absence'];
        novoRegistro['presence'] = city['presence'];
      }
    }
    novosDados.push(novoRegistro);
  }
  novosDados = novosDados.sort((a, b) => {
    return a.nameCity.localeCompare(b.nameCity);
  });
  novosDados.push(novoRegistro);
  novosDados.pop();
  var listaId = [];
  for (let i = 0; i < novosDados.length; i++) /*?*/ {
    novosDados[i]['foto'] = '/img/' + novosDados[i]['nameCandidate'] + '.png';
    let votos = novosDados[i]['votes']; /*?*/
    let presenca = novosDados[i]['presence']; /*?*/
    novosDados[i]['percentualVotes'] = ((votos / presenca) * 100).toFixed(2);
    listaId.push(novosDados[i]['cityId']);
  }

  var qtdCityId = [];
  var listaTeste = [];
  for (let i = 0; i < listaId.length; i++) {
    if (!listaTeste.includes(listaId[i])) {
      listaTeste.push(listaId[i]);
    }
  }
  //console.log(listaTeste);
  for (let i = 0; i < listaTeste.length; i++) {
    let maioresVotacoes = 0;
    let count = 0;
    let votacoes = [];
    for (let j = 0; j < novosDados.length; j++) {
      if (listaTeste[i] === novosDados[j]['cityId']) {
        count++;
        votacoes.push(novosDados[j]['votes']);
        //console.log(novosDados[j]['votes']);
      }
    }
    //console.log(votacoes);
    maioresVotacoes = Math.max(...votacoes);
    //console.log(maioresVotacoes);
    qtdCityId.push({
      id: listaTeste[i],
      countId: count,
      qtdVotos: maioresVotacoes,
    });
  }
  //console.log(qtdCityId);
  for (let i = 0; i < qtdCityId.length; i++) {
    for (let j = 0; j < novosDados.length; j++) {
      if (qtdCityId[i]['id'] === novosDados[j]['cityId']) {
        novosDados[j]['totalCandidatos'] = qtdCityId[i]['countId'];
        if (qtdCityId[i]['qtdVotos'] === novosDados[j]['votes']) {
          novosDados[j]['resultado'] = 'Eleito';
        } else novosDados[j]['resultado'] = 'Não Eleito';
      }
    }
  }
  //console.log(novosDados);
  return novosDados;
}
