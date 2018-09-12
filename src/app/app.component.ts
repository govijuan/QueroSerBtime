import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gerando valor por extenso';
  unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove' ];
  dezenas = ['', '', 'veinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrozentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
  doDezAoDezenove = ['dez','onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  valorNumerico: number = 0
  valueString: string = '' 
  
  convertirMilhoes (num) {
    if(num >= 1000000) {
      if(num >= 1000000 && num < 2000000){
        return "um milhão " + this.convertirMilhoes(num % 1000000)
      }else{
        return this.convertirMilhoes(Math.floor(num / 1000000)) + " milhões " + this.convertirMiles(num % 1000000)
      }  
    }else{
      return this.convertirMiles(num);
    }
  }
  
  convertirMiles (num) {
    if(num >= 1000){
      if( num >= 1000 && num < 2000){
        return "mil " + this.convertirCentos(num % 1000)
      }else{
        return this.convertirCentos(Math.floor(num / 1000)) + " mil " + this.convertirCentos(num % 1000)
      }
    }else{
      return this.convertirCentos(num)
    }
  }

  convertirCentos (num) {
    if(num > 99){
        if( num == 100){
          return " cem "
        }else{
          if(Math.floor(num % 100) === 0 ){
            return this.centenas[Math.floor(num / 100)] + this.convertirCentavos(num % 100)
          }else{
            return this.centenas[Math.floor(num / 100)] + " e " + this.convertirDezenas( num % 100)
          }
        }
    }else{
      return this.convertirDezenas(num)
    }
  }
  convertirDezenas (num) {
    if(num < 10){
      return this.unidades[Math.floor(num / 1)] + this.convertirCentavos(num % 1)
    }else if(num >= 10 && num < 20 ){
      return this.doDezAoDezenove[Math.floor((num - 10) / 1)] + this.convertirCentavos(num % 1)
    }else{
      if((num % 10) != 0 && (num % 10) < 1){
        if(Math.floor(num % 10) == 0){
          return this.dezenas[Math.floor(num / 10)] + this.convertirCentavos(num % 1);
        }else{
          return this.dezenas[Math.floor(num / 10)] + " e " + this.unidades[Math.floor(num % 10)] + this.convertirCentavos(num % 1)
        }
      }else{
        return this.dezenas[Math.floor(num / 10)]  + this.convertirCentavos(num % 1)
      }
      
    }
  }

  convertirCentavos (num) {
    if(num > 0 && num < 1){
      if((num * 100) < 10){
        return " reais e " + this.unidades[num * 100] + " centavos"
      }else if((num * 100) >= 10 && (num * 100) < 20){
        return " reais e " + this.doDezAoDezenove[num * 100] + " centavos"
      }else{
        if(((num * 100) % 10) != 0){
          return " reais e " + this.dezenas[Math.floor(num * 10)] + " e "  + this.unidades[Math.floor((num *100) % 10)] + " centavos"
        }else{
          return " reais e " + this.dezenas[Math.floor(num * 10)] + " centavos"
        }
      }
    }else if(num === 0){
      return " reais"
    }
  }
  
  convertir (num) {
    if (num === 0) {
      return "zero"
    }else{
      return this.convertirMilhoes(num)
    }
  }

  definirValorExtenso (numericValue) {
    console.log(numericValue);
    this.valueString = this.convertir(numericValue);
  }
}
