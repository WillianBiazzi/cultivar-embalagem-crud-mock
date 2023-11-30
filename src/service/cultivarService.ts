import Cultivar from '../core/Cultivar';

let cultivaresList: Cultivar[] = [
  new Cultivar(1, "Brasmax Vênus",
    "57K58RSF CE ",
    177,
    12
  ),
  new Cultivar(2, "Brasmax Zeus",
    "55I57RSF IPRO",
    185,
    12
  )
];

let proximoId = cultivaresList.length + 1;

export const fetchCultivares = async (): Promise<Cultivar[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return cultivaresList;
  } catch (error) {
    throw new Error('Erro ao buscar cultivares');
  }
};

export const cadastrarCultivar = async (novaCultivar: Cultivar): Promise<Cultivar> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    novaCultivar.id = proximoId++;
    cultivaresList.push(novaCultivar);

    // Retorna a cultivar cadastrada
    return novaCultivar;
  } catch (error) {
    console.error("Erro ao cadastrar cultivar:", error);
    throw error;
  }
};

export const atualizarCultivar = async (cultivarAtualizada: Cultivar): Promise<Cultivar> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = cultivaresList.findIndex((cultivar) => cultivar.id === cultivarAtualizada.id);

    if (index !== -1) {
      cultivaresList[index] = cultivarAtualizada;
      return cultivarAtualizada;
    } else {
      throw new Error('Cultivar não encontrada');
    }
  } catch (error) {
    console.error("Erro ao atualizar cultivar:", error);
    throw error;
  }
};

export const excluirCultivar = async (id: number): Promise<void> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    cultivaresList = cultivaresList.filter((cultivar) => cultivar.id !== id);
  } catch (error) {
    console.error("Erro ao excluir cultivar:", error);
    throw error;
  }
};
