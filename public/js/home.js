const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", function(){
    window.location.href = "transactions.html";
})

//ADICIONAR LANÇAMENTOS
document.getElementById("transaction-form").addEventListener("submit", function(e){
    e.preventDefault();
    //parseFloat faz com que receba números com vírgula.
    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    //está pegando o valor que está checado no checkbox.
    const type = document.querySelector('input[name="type-input"]:checked').value;
    //unshift faz com que o último lançamento seja o primeiro da lista.
    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    //limpa todos os campos do formulário depois do lançamento.
    e.target.reset();
    myModal.hide();
    getCashIn();
    getCashOut();
    getTotal();

    alert("Lançamento adicionado com sucesso!");

});

checkLogged();

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    };
    //se o usuário marcou que é pra permanecer logado, precisa manter ele logado, se tiver algum valor no session.
    if(!logged){
        window.location.href = "index.html"
        return;
    };
    //vai pegar os dados do usuário logado.
    const dataUser = localStorage.getItem(logged);

    if(dataUser){
        //JSON.parse para transformar a string novamente em objeto.
        data = JSON.parse(dataUser);
    };

    getCashIn();
    getCashOut();
    getTotal();

};

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
};

function getCashIn(){
    const transactions = data.transactions;
    //só vai filtrar itens igual a "1 = entrada (checkbox)"
    const cashIn = transactions.filter((item) => item.type == "1");

    if(cashIn.length){
        let cashInHtml = ``;
        let limit = 0;

        if(cashIn.length > 5){
            limit = 5;
        } else{
        //se o limite não for igual a 5, apenas vai mostrar o que tem.
        limit = cashIn.length;
    }

    for (let index = 0; index < limit; index++) {
        cashInHtml += `
        <div class="row mb-4">
        <div class="col-12">
            <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
            <div class="container p-0">
                <div class="row">
                    <div class="col-12 col-md-8">
                       <p>${cashIn[index].description}</p> 
                    </div>
                    <div class="col-12 col-md-3 d-flex justify-content-end">
                        ${cashIn[index].date}
                    </div>
                </div>
            </div>
        </div>
    </div>
       `       
    };

    document.getElementById("cash-in-list").innerHTML = cashInHtml;

    };

};

function getCashOut(){
    const transactions = data.transactions;
    //só vai filtrar itens igual a "1 = entrada (checkbox)"
    const cashIn = transactions.filter((item) => item.type == "2");

    if(cashIn.length){
        let cashInHtml = ``;
        let limit = 0;

        if(cashIn.length > 5){
            limit = 5;
        } else{
        //se o limite não for igual a 5, apenas vai mostrar o que tem.
        limit = cashIn.length;
    }

    for (let index = 0; index < limit; index++) {
        cashInHtml += `
        <div class="row mb-4">
        <div class="col-12">
            <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
            <div class="container p-0">
                <div class="row">
                    <div class="col-12 col-md-8">
                       <p>${cashIn[index].description}</p> 
                    </div>
                    <div class="col-12 col-md-3 d-flex justify-content-end">
                        ${cashIn[index].date}
                    </div>
                </div>
            </div>
        </div>
    </div>
       `       
    };

    document.getElementById("cash-out-list").innerHTML = cashInHtml;

    };

};

function getTotal(){
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if(item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
};

function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
};