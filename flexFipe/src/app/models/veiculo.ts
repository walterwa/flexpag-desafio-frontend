//adicionado import de serviço  de comunicação com a API
import { ResultService } from "../services/result.service";


export class Veiculo {
    public "Valor": string;
    public "ValorNumerico": number;
    public "Marca": string;
    public "Modelo": string;
    public "AnoModelo": number;
    public "Combustivel": string;
    public "CodigoFipe": number;
    public "MesReferencia": string;
    public "TipoVeiculo": number;
    public "SiglaCombustivel": string;

    constructor() { }

    //Alterado a partir daqui
   
     public setValor(valor: any) {
        this.Valor = valor;
     }
     
     public get valor(): any {
        return this.Valor;
    }

    // public setValorNumerico(valor: any) {
    //     this.ValorNumerico = valor;
    //     console.log(`Veículo teste esse é o número convertido: ${this.ValorNumerico}`);
    // }

     public get valorNumerico():any {
         return this.ValorNumerico;

     }

    //  public get  calculoPercentual(): any {
    //     let resultadoPercentual = (((vvd - this.ValorNumerico) / this.ValorNumerico) * 100).toFixed(2);
    //     return
    //  }

     //finalizei acima
}

export interface result {
    result: number;
};

