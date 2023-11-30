import React from 'react';
import Embalagem from '@/core/Embalagem';
import { IconeEdicao, IconeLixo } from '../icones/tabela';

interface TabelaEmbalagemProps {
  embalagens: Embalagem[];
  embalagemSelecionada?: (embalagem: Embalagem) => void;
  embalagemExcluida?: (embalagem: Embalagem) => void;
}

export default function TabelaEmbalagem(props: TabelaEmbalagemProps) {
  const exibirAcoes = props.embalagemSelecionada || props.embalagemExcluida;

  function renderHeader() {
    return (
      <tr>
        <th className="text-left p-3 text-gray-300">ID</th>
        <th className="text-left p-3 text-gray-300">Descrição</th>
        <th className="text-left p-3 text-gray-300">Número de Sementes</th>
        {exibirAcoes && <th className="p-3 text-gray-300">Ações</th>}
      </tr>
    );
  }

  function renderDados() {
    return props.embalagens?.map((embalagem, i) => (
      <tr
        key={embalagem.id}
        className={`${i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} text-white`}
      >
        <td className="text-left p-3">{embalagem.id}</td>
        <td className="text-left p-3">{embalagem.descricao}</td>
        <td className="text-left p-3">{embalagem.numeroSementes}</td>
        {exibirAcoes && renderizarAcoes(embalagem)}
      </tr>
    ));
  }

  function renderizarAcoes(embalagem: Embalagem) {
    return (
      <td className="flex justify-center">
        {props.embalagemSelecionada && (
          <button
            onClick={() => props.embalagemSelecionada?.(embalagem)}
            className="flex justify-center items text-green-500 rounded-full p-2 m-1 hover:bg-gray-700"
          >
            {IconeEdicao}
          </button>
        )}
        {props.embalagemExcluida && (
          <button
            onClick={() => props.embalagemExcluida?.(embalagem)}
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
