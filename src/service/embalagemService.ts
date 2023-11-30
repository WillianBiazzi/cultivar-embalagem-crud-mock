import Embalagem from '../core/Embalagem';

let embalagensList: Embalagem[] = [
  new Embalagem(1, "Saco 200K", 200000),
  new Embalagem(2, "Bag 5,0M", 5000000),
];

let proximoId = embalagensList.length + 1;

export const fetchEmbalagens = async (): Promise<Embalagem[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return embalagensList;
  } catch (error) {
    throw new Error('Erro ao buscar embalagens');
  }
};

export const cadastrarEmbalagem = async (novaEmbalagem: Embalagem): Promise<Embalagem> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    novaEmbalagem.id = proximoId++;
    embalagensList.push(novaEmbalagem);

    // Retorna a embalagem cadastrada
    return novaEmbalagem;
  } catch (error) {
    console.error("Erro ao cadastrar embalagem:", error);
    throw error;
  }
};

export const atualizarEmbalagem = async (embalagemAtualizada: Embalagem): Promise<Embalagem> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = embalagensList.findIndex((embalagem) => embalagem.id === embalagemAtualizada.id);

    if (index !== -1) {
      embalagensList[index] = embalagemAtualizada;
      return embalagemAtualizada;
    } else {
      throw new Error('Embalagem não encontrada');
    }
  } catch (error) {
    console.error("Erro ao atualizar embalagem:", error);
    throw error;
  }
};

export const excluirEmbalagem = async (id: number): Promise<void> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    embalagensList = embalagensList.filter((embalagem) => embalagem.id !== id);
  } catch (error) {
    console.error("Erro ao excluir embalagem:", error);
    throw error;
  }
};
