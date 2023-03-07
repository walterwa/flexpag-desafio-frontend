import { Component, NgModule, Input } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { types } from '../../tipos';
import { Marca } from '../../models/marca';
import { Veiculo } from '../../models/veiculo';
import { Ano } from '../../models/ano';
import { ModeloAno, ModeloVeiculo, AnoVeiculo } from '../../models/modelo';
import { ResultService } from '../../services/result.service';
import { NgModel } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { realMoeda } from 'src/app/pipes/brl.pipe';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})

export class SearchInputComponent {


  types = types; 

  marcas: Array<Marca> = [];
  modeloVeiculos: Array<ModeloVeiculo> = [];
  anosVeiculo: Array<AnoVeiculo> = [];
  anos: Array<Ano> = [];

  type: string = types[0];
  codigoMarca: string = "";
  codigoModelo: string = "";
  codigoAno: string = "";
  valor: number = 0;
  // valorNumerico: number = 0;

  veiculo: Veiculo = new Veiculo;

  //Adicionado recentemente
  //Parte de cálculo do veículo
  vvd: number = 0;
  vvf: number = 0;


  //comparação dos valores e se está "acima"/"abaixo" ou "igual" ao preço da tabela FIPE
  resultadoPercentual: number = 0;
  comparacaoPercentual: string = '';

  valorAtual: string = ''; 
  

  consultar = false;

  //Capturando as informações de preço do usuário digitados no input
  onKeyUp(evento: KeyboardEvent) {
      console.log((<HTMLInputElement>evento.target).value);
      this.valorAtual = (<HTMLInputElement>evento.target).value;
    } 


  constructor(
    private resultService: ResultService
  ) {}


  ngOnInit(): void {
    this.resultService.getMarcas(this.type).subscribe(data => this.marcas = data)
  }
  title = 'flexFipe';

  getMarcas() {
    this.codigoMarca = '';
    this.codigoAno  = '';
    this.codigoModelo = '';

    this.resultService.getMarcas(this.type).subscribe(data => this.marcas =  data)
  }

  getModelos() {
    this.codigoModelo = '';
    this.codigoAno = '';


    this.resultService.getModelos(this.type, this.codigoMarca).subscribe(data => {
      this.modeloVeiculos = data.modelos
      this.anosVeiculo = data.ano
    })
  }

  getAnos() {
    this.codigoAno = '';

    this.resultService.getAnos(this.type, this.codigoMarca, this.codigoModelo)
      .subscribe(data => { 
        this.anos = data})
  }

  getVeiculo() {
    this.resultService.getVeiculo(this.type, this.codigoMarca, this.codigoModelo, this.codigoAno)
      .subscribe(data => {
        this.veiculo = data
      })
  }

  public valorPercentual(): number {
    const currentResult = Number((this.vvd - this.vvf) / this.vvf) * 100;
    return currentResult;
  }


  //Ao clicar no botão consulta, o texto desse container será mostrado
    //e o valor  percentual  deve  aparecer
    //Nota  para correção:  o mesmo aparece via console.log, mas não consigo renderizá-lo
    // para que o mesmo apareça na tela principal via search-input.component.html  
  onClick() {
    this.consultar = !this.consultar;
    this.vvd = Number(this.valorAtual);
    //tirando o R$ da variável veiculo.Valor e  transformando ele em tipo number
    this.vvf = Number(this.veiculo.Valor.slice(3, -1).replaceAll('.', '').replace(',', '.'));
    
    
    //testes
    console.log(`Variável veiculo.Valor onClick ${ this.veiculo.Valor }`);
    console.log(`Variável vvd onClick ${ typeof this.vvd } `);
    console.log(`Variável vvf onClick ${ typeof this.vvf }`);


    //valor percentual
    this.resultadoPercentual = (((this.vvd - this.vvf) / this.vvf))*100;
    console.log(`L126 VVD onClick ${ typeof this.vvd } `);
    console.log(`Variável veiculo.ValorNumerico onClick ${ typeof this.vvf }`);
    console.log(`Resultado percentual é: ${ this.resultadoPercentual } % `);
    
    //Adicionando o resultado da comparacaoPercentual, 
      //variável que está sendo rendeizada em search-input
    if (this.vvd > this.vvf) {
      this.comparacaoPercentual = "O valor está acima da tabela FIPE";
    } 
    else if (this.vvd < this.vvf) {
      this.comparacaoPercentual = "O valor está abaixo da tabela FIPE";
    } 
    else {
      this.comparacaoPercentual = "O valor está igual da tabela FIPE";
    }
    
    return this.resultadoPercentual;
  }
}
