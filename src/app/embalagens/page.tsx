'use client'

import React, { useEffect, useState } from 'react';
import Botao from '@/components/botao';
import FormularioEmbalagem from '@/components/embalagem/formulario';
import Layout from '@/components/layout';
import TabelaEmbalagem from '@/components/embalagem/tabela';
import Embalagem from '@/core/Embalagem';
import { atualizarEmbalagem, cadastrarEmbalagem, excluirEmbalagem, fetchEmbalagens } from '@/service/embalagemService'; // Certifique-se de criar os serviços relevantes

export default function Embalagens() {
  const [embalagem, setEmbalagem] = useState<Embalagem>(Embalagem.vazio());
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela');
  const [embalagens, setEmbalagens] = useState<Embalagem[]>([]);

  useEffect(() => {
    if (visivel === 'tabela') {
      const loadEmbalagens = async () => {
        try {
          const dados = await fetchEmbalagens();
          setEmbalagens(dados);
        } catch (error) {
          console.error('Erro ao buscar embalagens:', error);
        }
      };

      loadEmbalagens();
    }
  }, [visivel]);

  function embalagemSelecionada(embalagem: Embalagem) {
    setEmbalagem(embalagem);
    setVisivel('form');
  }

  async function embalagemExcluida(embalagem: Embalagem) {
    const confirmacao = window.confirm('Tem certeza de que deseja excluir esta embalagem?');
    if (confirmacao) {
      try {
        if (embalagem.id !== null) {
          await excluirEmbalagem(embalagem.id);
        } else {
          console.error('embalagemId é null!');
        }
        setEmbalagens(prevEmbalagens => prevEmbalagens.filter(emb => emb.id !== embalagem.id));
      } catch (error) {
        console.error('Erro ao excluir embalagem:', error);
      }
    }
  }

  function salvarOuAlterarEmbalagem(embalagem: Embalagem) {
    if (embalagem.id) {
      alterarEmbalagem(embalagem);
    } else {
      salvarEmbalagem(embalagem);
    }
  }

  async function alterarEmbalagem(embalagem: Embalagem) {
    try {
      await atualizarEmbalagem(embalagem);
      setVisivel('tabela');
    } catch (error) {
      console.error('Erro ao atualizar embalagem:', error);
    }
  }

  async function salvarEmbalagem(embalagem: Embalagem) {
    try {
      await cadastrarEmbalagem(embalagem);
      setVisivel('tabela');
    } catch (error) {
      console.error('Erro ao salvar embalagem:', error);
    }
  }

  function novaEmbalagem() {
    setEmbalagem(Embalagem.vazio());
    setVisivel('form');
  }

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-bl from-gray-950 via-blue-950 to-gray-950
      text-white`}
    >
      <Layout titulo="Cadastro de embalagens">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao
                className="mb-4"
                cor="bg-gradient-to-r from-green-500 to-green-700"
                onClick={() => novaEmbalagem()}
              >
                Nova embalagem
              </Botao>
            </div>
            <TabelaEmbalagem
              embalagens={embalagens}
              embalagemSelecionada={embalagemSelecionada}
              embalagemExcluida={embalagemExcluida}
            />
          </>
        ) : (
          <FormularioEmbalagem
            embalagem={embalagem}
            embalagemMudou={salvarOuAlterarEmbalagem}
            cancelado={() => setVisivel('tabela')}
          />
        )}
      </Layout>
    </div>
  );
}
