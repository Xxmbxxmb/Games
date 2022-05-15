class Buscaminas {

    constructor(filas, columnas){
        this.tablero = new Array(filas);
        this.tablero_usuario = new Array(filas)
        
        for (let i=0; i < this.tablero.length; i++){
            this.tablero[i] = new Array(columnas)
            this.tablero_usuario[i] = new Array(columnas)
        }
      
        for (let i=0; i < this.tablero.length; i++){
            for (let j=0; j < this.tablero[i].length; j++){
                this.tablero[i][j] = 0
                this.tablero_usuario[i][j] = '?'
            }
        }
    }

    imprimir(){
        let contenido = '---------Tablero Original--------\n'
        for (let i=0; i < this.tablero.length; i++){
            for (let j=0; j < this.tablero[i].length; j++){
                if (this.tablero[i][j] == -1){
                    contenido += `*\t`
                } else {
                    contenido += `${this.tablero[i][j]}\t`
                }
            }
            contenido += `\n`
        }

        contenido += '\n---------Tablero Usuario--------\n'

        for (let i=0; i < this.tablero_usuario.length; i++){
            for (let j=0; j < this.tablero_usuario[i].length; j++){
                if (this.tablero_usuario[i][j] == -1){
                    contenido += `*\t`
                } else {
                    contenido += `${this.tablero_usuario[i][j]}\t`
                }
            }
            contenido += `\n`
        }
        console.log(contenido)
    }

    agregarMinas(minas){
        while (minas > 0){
            let nueva_fila = Math.floor(Math.random()*this.tablero.length)
            let nueva_columna = Math.floor(Math.random()*this.tablero[nueva_fila].length)

            if (this.tablero[nueva_fila][nueva_columna] == 0){
                this.tablero[nueva_fila][nueva_columna] = -1
                minas = minas - 1
            }
        }
    }

    agregarNumeros(){
        let filas = [-1,-1,-1,0,0,1,1,1]
        let columnas = [-1,0,1,-1,1,-1,0,1]

        for (let i=0; i<this.tablero.length; i++){
            for (let j=0; j<this.tablero[i].length; j++){

                if (this.tablero[i][j] == -1){

                    let posicion = 0

                    while (posicion < filas.length){
                        let nf = i + filas[posicion]
                        let nc = j + columnas[posicion]

                        if (nf >= 0 && nf < this.tablero.length && nc >= 0 && nc < this.tablero[nf].length && this.tablero[nf][nc] != -1){
                            this.tablero[nf][nc] += 1
                        }

                        posicion += 1
                    }
                }
            }
        }
    }

    colocarPieza(f, c, pierde=true){
        let filas = [-1,-1,-1,0,0,1,1,1]
        let columnas = [-1,0,1,-1,1,-1,0,1]

        if (f >= 0 && f < this.tablero.length && c >= 0 && c < this.tablero[f].length){

            if (this.tablero[f][c] == 0 && this.tablero_usuario[f][c] == '?'){
                this.tablero_usuario[f][c] = this.tablero[f][c]

                let posicion = 0
                while (posicion < filas.length){
                    let nf = f + filas[posicion]
                    let nc = c + columnas[posicion]

                    let pierde = this.colocarPieza(nf, nc, false)
                    posicion ++
                }
            } else if (this.tablero[f][c] > 0){
                this.tablero_usuario[f][c] = this.tablero[f][c]
                pierde = false
            } else {
                this.tablero_usuario[f][c] = this.tablero[f][c]
            }
        }
        return pierde
    }
}


let a = new Buscaminas(4,4)

a.agregarMinas(5)
a.agregarNumeros()
a.colocarPieza(0,0)
a.imprimir()



