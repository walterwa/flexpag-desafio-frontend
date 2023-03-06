//código de mansueio da API

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap } from 'rxjs';

import { Marca } from '../models/marca';
import { Ano } from '../models/ano';
import { ModeloAno } from '../models/modelo';
import { Veiculo  } from '../models/veiculo';
import { async, waitForAsync } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class ResultService extends  Veiculo {

  
  readonly apiUrl = 'https://parallelum.com.br/fipe/api/v1';
  

  constructor(private http: HttpClient) {
    super();
  }
  
  public getMarcas(type: string): Observable<Array<Marca>> {
    const subject = new Subject<Array<Marca>>();

    this.get(`${this.apiUrl}/${type}/marcas`).pipe(catchError((error) => {subject.error(error) 
      return error }),
      tap((result:  Array<Marca>) => {
        subject.next(result)
      })
      ).subscribe();

      return subject;
  }

  public getModelos(type: string, codigoMarca: string): Observable<ModeloAno> {
    const subject = new Subject<ModeloAno>();

    this.get(`${this.apiUrl}/${type}/marcas/${codigoMarca}/modelos`)
    .pipe(catchError((error) => {
      subject.error(error)
      return error
    }),
      tap((result: ModeloAno) => {
        subject.next(result)
      })).subscribe();

      return subject;
  }

  public getAnos(type: string, codigoMarca: string, codigoModelo: string): Observable<Array<Ano>> {
    const subject = new Subject<Array<Ano>>();

    this.get(`${this.apiUrl}/${type}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`)
      .pipe(catchError((error) => {
        subject.error(error)

        return error
      }),
        tap((result: Array<Ano>) => {
          subject.next(result)
        })
        ).subscribe();

        return subject;
  }
  //código pra pegar os dados do veículo via API e para
    // tentar converter o valor recebido para NUMBER
  public getVeiculo(type: string, codigoMarca: string, codigoModelo: string, codigoAno: string) {
    const subject = new Subject<Veiculo>();

    this.get(`${this.apiUrl}/${type}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAno}`)
      .pipe(catchError((error) => {
        subject.error(error)
        return error
      }),
        tap((result: Veiculo) => {
          subject.next(result)

          //tentativa de tratar o dado VALOR na entrada, para que ele se tornasse um tipo number
          // subject.next(result);
          // console.log(`Result: Valor  ${ result.Valor.slice(3, -1).replaceAll('.', '').replace(',', '.') }`);
          //   const valor = parseInt(result.Valor.slice(3, -1).replaceAll('.', '').replace(',', '.'));
          //   console.log(typeof valor);
          //   console.log(`Este é o valor: ${valor}`);
          //   //const valor = Number(result.Valor.substr(3));
          //   this.setValorNumerico(valor);
          //   this.setValor({...result, setValorNumerico: valor });
          //   console.log(`teste Valor numérico  pós getVeiculo ${this.ValorNumerico}`);
        })
      ).subscribe();
      return subject;
  }


 
  //pegar  qualquer URL
  get(url: string) {
    return this.http.get<any>(url)
  }

}
