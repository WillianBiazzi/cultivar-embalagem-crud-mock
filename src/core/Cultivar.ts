
export default class Cultivar {
  id: number | null;
  nomeFantasia: string | null;
  nomeRegistro: string;
  pmsMedio: number | null;
  plantasMetroLinear: number | null;

  constructor(
    id: number | null,
    nomeFantasia: string | null,
    nomeRegistro: string,
    pmsMedio: number | null,
    plantasMetroLinear: number | null
  ) {
    this.id = id;
    this.nomeFantasia = nomeFantasia;
    this.nomeRegistro = nomeRegistro;
    this.pmsMedio = pmsMedio;
    this.plantasMetroLinear = plantasMetroLinear;
  }

  static vazio(): Cultivar {
    return new Cultivar(null, null, "", null, null);
  }
}
  