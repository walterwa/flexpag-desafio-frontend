export class ModeloAno {
   ano: Array<AnoVeiculo> = [];
   modelos: Array<ModeloVeiculo> = [];
}

export class ModeloVeiculo {
    public "nome": string;
    public "codigo": string;
}

export class AnoVeiculo {
    public "nome": string;
    public "codigo": string;
}
