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
        return "mil " + this.convertirCentos(num % 1000, false)
      }else{
        if(num >= 2000 && num < 10000){
          return this.unidades[Math.floor(num / 1000)] + " mil " + this.convertirCentos(num % 1000, false)
        }else if(num >= 10000 && num < 20000){
          return this.doDezAoDezenove[(Math.floor(num / 1000)) - 10] + " mil " + this.convertirCentos(num % 1000, false)
        }else{
          console.log( "paso 1");
          return this.convertirCentos(Math.floor(num / 1000), true) + " mil " + this.convertirCentos(num % 1000, false)
        }
      }
    }else{
      return this.convertirCentos(num, false)
    }
  }

  convertirCentos (num, mil:boolean) {
    if(num > 99){
        if( num == 100){
          return " cem "
        }else{
          if(Math.floor(num % 100) === 0 ){
            return this.centenas[Math.floor(num / 100)] + this.convertirCentavos(num % 100, mil)
          }else{
            return this.centenas[Math.floor(num / 100)] + " e " + this.convertirDezenas( num % 100, mil)
          }
        }
    }else{
      console.log('Paso 2')
      return this.convertirDezenas(num)
    }
  }
  convertirDezenas (num, mil:boolean) {
    if(num < 10){
      return this.unidades[Math.floor(num / 1)] + this.convertirCentavos(num % 1, mil)
    }else if(num >= 10 && num < 20 ){
      return this.doDezAoDezenove[Math.floor((num - 10) / 1)] + this.convertirCentavos(num % 1, mil)
    }else{
      console.log('Paso 3')
      if((num % 10) != 0){
        if((num % 10) > 0 && (num % 10) < 1){
          return this.dezenas[Math.floor(num / 10)] + this.convertirCentavos(num % 1, mil);
        }else{
          return this.dezenas[Math.floor(num / 10)] + " e " + this.unidades[Math.floor(num % 10)] + this.convertirCentavos(num % 1, mil)
        }
      }else{
        console.log('Paso 4')
        return this.dezenas[Math.floor(num / 10)]  + this.convertirCentavos(num % 1, mil)
      }
      
    }
  }

  convertirCentavos (num, mil:boolean) {
    if(num > 0 && num < 1){
      if((num * 100) < 10){
        return " reais e " + this.unidades[num * 100] + " centavos"
      }else if((num * 100) >= 10 && (num * 100) < 20){
        return " reais e " + this.doDezAoDezenove[num * 100] + " centavos"
      }else{
        if(((num * 100) % 10) != 0){
          return " reais e " + this.dezenas[Math.floor(num * 10)] + " e "  + this.unidades[Math.round((num * 100) % 10)] + " centavos"
        }else{
          return " reais e " + this.dezenas[Math.floor(num * 10)] + " centavos"
        }
      }
    }else if(num === 0 && mil == false){
      return " reais"
    }else{
      return ""
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
    this.valueString = this.convertir(numericValue);
  }
}
