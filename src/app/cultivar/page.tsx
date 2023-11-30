'use client'
import React, { useEffect, useState } from 'react';
import Botao from '@/components/botao';
import Formulario from '@/components/cultivar/formulario';
import Layout from '@/components/layout';
import Tabela from '@/components/cultivar/tabela';
import Cultivar from '@/core/Cultivar';
import { atualizarCultivar, cadastrarCultivar, excluirCultivar, fetchCultivares } from '@/service/cultivarService';

export default function Cultivares() {
  const [cultivar, setCultivar] = useState<Cultivar>(Cultivar.vazio());
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela');
  const [cultivares, setCultivares] = useState<Cultivar[]>([]);

  useEffect(() => {
    if (visivel === 'tabela') {
      const loadCultivares = async () => {
        try {
          const dados = await fetchCultivares();
          setCultivares(dados);
        } catch (error) {
          console.error('Erro ao buscar cultivares:', error);
        }
      };

      loadCultivares();
    }
  }, [visivel]);

  function cultivarSelecionada(cultivar: Cultivar) {
    setCultivar(cultivar);
    setVisivel('form');
  }

  async function cultivarExcluida(cultivar: Cultivar) {
    const confirmacao = window.confirm('Tem certeza de que deseja excluir esta cultivar?');
    if (confirmacao) {
      try {
        if (cultivar.id !== null) {
          await excluirCultivar(cultivar.id);
        } else {
          console.error('cultivarId é null!');
        }
        setCultivares(prevCultivares => prevCultivares.filter(cult => cult.id !== cultivar.id));
      } catch (error) {
        console.error('Erro ao excluir cultivar:', error);
      }
    }
  }

  function salvarOuAlterarCultivar(cultivar: Cultivar) {
    if (cultivar.id) {
      alterarCultivar(cultivar);
    } else {
      salvarCultivar(cultivar);
    }
  }

  async function alterarCultivar(cultivar: Cultivar) {
    try {
      await atualizarCultivar(cultivar);
      setVisivel('tabela');
    } catch (error) {
      console.error('Erro ao atualizar cultivar:', error);
    }
  }

  async function salvarCultivar(cultivar: Cultivar) {
    try {
      await cadastrarCultivar(cultivar);
      setVisivel('tabela');
    } catch (error) {
      console.error('Erro ao salvar cultivar:', error);
    }
  }

  function novaCultivar() {
    setCultivar(Cultivar.vazio());
    setVisivel('form');
  }

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-bl from-gray-950 via-blue-950 to-gray-950
      text-white`}
    >
      <Layout titulo="Cadastro de cultivares">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao
                className="mb-4"
                cor="bg-gradient-to-r from-green-500 to-green-700"
                onClick={() => novaCultivar()}
              >
                Nova cultivar
              </Botao>
            </div>
            <Tabela
              cultivares={cultivares}
              cultivarSelecionada={cultivarSelecionada}
              cultivarExcluida={cultivarExcluida}
            />
          </>
        ) : (
          <Formulario
            cultivar={cultivar}
            cultivarMudou={salvarOuAlterarCultivar}
            cancelado={() => setVisivel('tabela')}
          />
        )}
      </Layout>
    </div>
  );
}
