export default class Embalagem {
    id: number | null;
    descricao: string;
    numeroSementes: number;
  
    constructor(id: number | null, descricao: string, numeroSementes: number) {
      this.id = id;
      this.descricao = descricao;
      this.numeroSementes = numeroSementes;
    }
  
    static vazio(): Embalagem {
      return new Embalagem(null, "", 0);
    }
  }
  