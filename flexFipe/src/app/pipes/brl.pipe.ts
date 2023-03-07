import {Pipe, PipeTransform } from "@angular/core";



@Pipe({name: 'realBRL'})
export class realMoeda implements PipeTransform {
    transform(value: number) {
        return value.toLocaleString('US', {minimumFractionDigits: 2,maximumFractionDigits: 2});
    }
}