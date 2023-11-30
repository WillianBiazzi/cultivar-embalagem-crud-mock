import Embalagem from "@/core/Embalagem";
import Entrada from "../entrada";
import { useState } from "react";
import Botao from "../botao";

interface FormularioEmbalagemProps {
  embalagem: Embalagem;
  embalagemMudou?: (embalagem: Embalagem) => void;
  cancelado?: () => void;
}

export default function FormularioEmbalagem(props: FormularioEmbalagemProps) {
  const id = props.embalagem?.id;
  const [descricao, setDescricao] = useState(props.embalagem?.descricao);
  const [numeroSementes, setNumeroSementes] = useState(props.embalagem?.numeroSementes);

  return (
    <div>
      {id && <Entrada texto="ID" valor={id} somenteLeitura />}
      <Entrada texto="Descrição" valor={descricao} onChange={setDescricao} />
      <Entrada texto="Número de Sementes" tipo="number" valor={numeroSementes} onChange={setNumeroSementes} />

      <div className="flex justify-end mt-5">
        <Botao
          className="mr-3"
          cor="bg-gradient-to-r from-blue-500 to-blue-700"
          onClick={() =>
            props.embalagemMudou?.(
              new Embalagem(id, descricao, numeroSementes)
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
