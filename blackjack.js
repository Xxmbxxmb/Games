let pintas = ['♥','♦','♣','♠'];
let monos = ['J','Q','K','A'];

class Carta {
    constructor (valor, pinta){
        this.valor = valor;
        this.pinta = pinta;
    }

    getValor(){
        if (this.valor in ['J','Q','K'] === true){
            return 10;
        } else if (this.valor === 'A'){
            return 11;
        } else {
            return this.valor
        }
    }
}

class Mazo {
    constructor(){
        this.mazo = []

        for (let i=2; i <= 10; i++){
            for (let pinta of pintas){
                this.mazo.push(new Carta(i, pinta))
            }          
        }
        
        for (let mono of monos){
            for (let pinta of pintas){
                this.mazo.push(new Carta(mono, pinta))
            }          
        }

    }

    imprimir(){
        for (let carta of this.mazo){
            console.log(carta.valor, carta.pinta)
        }

    }

    removerCarta(){
        let c = this.mazo.pop()
        return c
    }
}

class Jugador {
    constructor(){
        this.mano = []
        this.aces = 0
        this.cuenta = 0
    }

    imprimir(){
        let contenido = ''
        for (let carta of this.mano){
            contenido += `${carta.valor}${carta.pinta} `
        }
        contenido += ` --> ${this.cuenta}`
        console.log(contenido)
    }

    agregarCarta(carta){
        this.mano.push(carta)     
        this.cuenta += carta.getValor()  
        if (carta.valor === 'A'){
            this.aces += 1
        } 
        this.ajusteDeAces()
    }

    ajusteDeAces(){
        if (this.cuenta > 21 && this.aces > 0){
            this.cuenta -= 10;
            this.aces -= 1;
        }
    }
}

let mazo = new Mazo()
let j1 = new Jugador()

j1.agregarCarta(mazo.removerCarta())
j1.agregarCarta(mazo.removerCarta())

j1.imprimir()

console.log('párálelépíPÉÓÁ'.normalize())