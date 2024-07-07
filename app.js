

class Account {


    constructor() {
        this.accounts = this.caricaAccounts();
        console.log(`array degli accounts: ${this.accounts}`);
        this.creaCard(this.accounts);
    }


    caricaAccounts() {
        const acc = JSON.parse(localStorage.getItem("accounts")) ?? [];

        return acc
    }

    cercaAccount(arr, nome) {
        // console.log(`lunghezza: ${arr.length}, nome: ${nome}`);
        let temp = 0;
        for (let i = 0; i < arr.length; i++) {
            if (nome == arr[i]["nome"]) {
                // console.log(`ciao: ${arr[i]["nome"]}, ${arr[i]["bilancio"]}`);
                // console.log(arr[i]);
                temp += 1;
            }
        }
        return temp;

    }

    entrataUscita(nome, denaro) {
        // console.log("accounts------");
        // console.log(this.accounts);
        // console.log("---------");
        let presenza = this.cercaAccount(this.accounts, nome);
        // console.log(presenza);


        // console.log(presenza);


        if (presenza == 0) {

            let temp = {
                "nome": nome,
                "bilancio": denaro
            };

            let arrTemp = [temp];

            this.accounts.push(temp);
            localStorage.setItem("accounts", JSON.stringify(this.accounts))
            this.creaCard(arrTemp);
        }
        else {
            for (let i = 0; i < this.accounts.length; i++) {
                if (nome == this.accounts[i]["nome"]) {

                    let denaroTemp = this.accounts[i]["bilancio"] += denaro;
                    //console.log("il denaro sul conto è: " + this.accounts[i]["bilancio"] + " il denaro da aggiungere " + denaro);

                    let temp1 = {
                        "nome": nome,
                        "bilancio": denaroTemp
                    }
                    //console.log(temp1);
                    // console.log(`ciao: ${this.accounts[i]["nome"]}, ${this.accounts[i]["bilancio"]}`);
                    //this.accounts[i]["bilancio"] += denaro;
                    // console.log(this.accounts[i]);
                    localStorage.setItem("accounts", JSON.stringify(this.accounts));
                    document.getElementById(nome).innerHTML = this.accounts[i]["bilancio"];

                }
            }


        }

        // console.log("ehi ");
        // console.log(this.accounts);


    }

    creaCard(arr) {

        const seleziona = document.querySelector(".card-container");



        arr.forEach((item) => {

            let contenuto = `<div class="card-css">
            <h5>${item.nome}</h5>
            <p id="${item.nome}">${item.bilancio}</h5>
        
            </div>`;

            seleziona.innerHTML += contenuto;
        })
    }

    azzeraConto(nome) {
        if (confirm("azzerare il conto?")) {
            for (let i = 0; i < this.accounts.length; i++) {
                //console.log("ciao");
                if (this.accounts[i]["nome"] == nome) {
                    this.accounts[i]["bilancio"] = 0;
                    console.log(this.accounts);
                    localStorage.setItem("accounts", JSON.stringify(this.accounts));
                    document.getElementById(nome).innerHTML = this.accounts[i]["bilancio"];
                }
            }
        }

        //console.log("ciao");
    }

    aggiungiAccount(account) {
        const seleziona = document.getElementById("acc");

        let aggiugni = `<option value="${account}">${account}</option>`;

        seleziona.innerHTML += aggiugni;
    }

    ripulisci() {
        if (confirm("ripulire tutto?")) {
            //this.accounts = [];
            console.log(this.accounts);
            document.querySelector(".card-container").innerHTML = "";
            localStorage.clear();
        }

    }


};

let operazioni = new Account();







document.getElementById("aggiungiAccount").addEventListener("click", () => {
    let temp = document.getElementById("accountInput").value;

    operazioni.aggiungiAccount(temp);
})




function numero(stringa) {
    const pattern = /^-?\d*\.?\d+$/;
    //
    ///^[0-9]+$/
    return pattern.test(stringa);
}

document.querySelectorAll(".card-css").forEach(item => {
    item.addEventListener("click", (e) => {
        const temp = e.currentTarget.querySelector("p").id;
        const stringTemp = String(temp);
        operazioni.azzeraConto(stringTemp);
        //console.log(temp);
    })
})



let bottone = document.getElementById("invia");
bottone.addEventListener("click", (e) => {

    //let opzione: string = (document.getElementById("selezione") as HTMLSelectElement).value;
    let acc = (document.getElementById("acc")).value;
    let quantita = String((document.getElementById("quantita")).value);
    let controllo = numero(quantita);

    let quantitaNumero;

    if (controllo) {
        quantitaNumero = parseFloat(quantita);
        //console.log(quantitaNumero);
        operazioni.entrataUscita(acc, quantitaNumero);
    }
    else {
        console.log("errore")
    }


})


document.getElementById("ripulisci").addEventListener("click", () => {
    operazioni.ripulisci();
})