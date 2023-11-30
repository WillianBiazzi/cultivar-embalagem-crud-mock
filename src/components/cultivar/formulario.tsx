import Cultivar from "@/core/Cultivar";
import Entrada from "../entrada";
import { useState } from "react";
import Botao from "../botao";

interface FormularioProps {
  cultivar: Cultivar;
  cultivarMudou?: (cultivar: Cultivar) => void;
  cancelado?: () => void;
}

export default function Formulario(props: FormularioProps) {
  const id = props.cultivar?.id;
  const [nomeFantasia, setNomeFantasia] = useState(props.cultivar?.nomeFantasia);
  const [nomeRegistro, setNomeRegistro] = useState(props.cultivar?.nomeRegistro);
  const [pmsMedio, setPmsMedio] = useState(props.cultivar?.pmsMedio);
  const [plantasMetroLinear, setPlantasMetroLinear] = useState(props.cultivar?.plantasMetroLinear);

  return (
    <div>
      {id && <Entrada texto="ID" valor={id} somenteLeitura />}
      <Entrada texto="Nome Fantasia" valor={nomeFantasia} onChange={setNomeFantasia} />
      <Entrada texto="Nome de Registro" valor={nomeRegistro} onChange={setNomeRegistro} />
      <Entrada texto="PMS Médio" tipo="number" valor={pmsMedio} onChange={setPmsMedio} />
      <Entrada texto="Plantas por Metro Linear" tipo="number" valor={plantasMetroLinear} onChange={setPlantasMetroLinear} />

      <div className="flex justify-end mt-5">
        <Botao
          className="mr-3"
          cor="bg-gradient-to-r from-blue-500 to-blue-700"
          onClick={() =>
            props.cultivarMudou?.(
              new Cultivar(id, nomeFantasia, nomeRegistro, pmsMedio, plantasMetroLinear)
            )
          }
        >
          {id ? 'Alterar' : 'Salvar'}
        </Botao>
        <Botao
          cor="bg-gradient-to-r from-gray-500 to-gray-700"
          onClick={props.cancelado}
        >
          Cancelar
        </Botao>
      </div>
    </div>
  );
}
