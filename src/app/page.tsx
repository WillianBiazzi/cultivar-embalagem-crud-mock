'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tabela from '../components/cultivar/tabela';
import Cultivar from '../core/Cultivar';

const Home: React.FC = () => {
  const [cultivares, setCultivares] = useState<Cultivar[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Cultivar[]>('http://localhost:8080/cultivares');
        console.log('Dados da API:', response.data);
        setCultivares(response.data);
      } catch (error) {
        console.error('Erro ao buscar cultivares:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-bl from-gray-950 via-blue-950 to-gray-950
      text-white`}
    >
      <div className="bg-gradient-to-r from-purple-700 to-blue-700 p-4 rounded-xl">
        <h1 className="text-3xl font-sans-serif mb-4">Cultivar e Embalagem</h1>
        {cultivares.length > 0 ? (
          <Tabela cultivares={cultivares} />
        ) : (
          <p>CRUD com os dados mockados</p>
        )}
      </div>
    </div>
  );
};

export default Home;
