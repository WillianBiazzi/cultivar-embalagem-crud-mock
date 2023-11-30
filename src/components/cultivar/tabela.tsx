import React from 'react';
import Cultivar from '@/core/Cultivar';
import { IconeEdicao, IconeLixo } from '../icones/tabela';

interface TabelaProps {
  cultivares: Cultivar[];
  cultivarSelecionada?: (cultivar: Cultivar) => void;
  cultivarExcluida?: (cultivar: Cultivar) => void;
}

export default function Tabela(props: TabelaProps) {
  const exibirAcoes = props.cultivarSelecionada || props.cultivarExcluida;

  function renderHeader() {
    return (
      <tr>
        <th className="text-left p-3 text-gray-300">ID</th>
        <th className="text-left p-3 text-gray-300">Nome Fantasia</th>
        <th className="text-left p-3 text-gray-300">Nome de Registro</th>
        <th className="text-left p-3 text-gray-300">PMS Médio</th>
        <th className="text-left p-3 text-gray-300">Plantas por Metro Linear</th>
        {exibirAcoes && <th className="p-3 text-gray-300">Ações</th>}
      </tr>
    );
  }

  function renderDados() {
    return props.cultivares?.map((cultivar, i) => (
      <tr
        key={cultivar.id}
        className={`${i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} text-white`}
      >
        <td className="text-left p-3">{cultivar.id}</td>
        <td className="text-left p-3">{cultivar.nomeFantasia}</td>
        <td className="text-left p-3">{cultivar.nomeRegistro}</td>
        <td className="text-left p-3">{cultivar.pmsMedio}</td>
        <td className="text-left p-3">{cultivar.plantasMetroLinear}</td>
        {exibirAcoes && renderizarAcoes(cultivar)}
      </tr>
    ));
  }

  function renderizarAcoes(cultivar: Cultivar) {
    return (
      <td className="flex justify-center">
        {props.cultivarSelecionada && (
          <button
            onClick={() => props.cultivarSelecionada?.(cultivar)}
            className="flex justify-center items text-green-500 rounded-full p-2 m-1 hover:bg-gray-700"
          >
            {IconeEdicao}
          </button>
        )}
        {props.cultivarExcluida && (
          <button
            onClick={() => props.cultivarExcluida?.(cultivar)}
            className="flex justify-center items text-red-500 rounded-full p-2 m-1 hover:bg-gray-700"
          >
            {IconeLixo}
          </button>
        )}
      </td>
    );
  }

  return (
    <table className="w-full rounded-xl overflow-hidden">
      <thead className="text-white bg-gradient-to-r from-gray-900 to-gray-800">
        {renderHeader()}
      </thead>
      <tbody>{renderDados()}</tbody>
    </table>
  );
}

