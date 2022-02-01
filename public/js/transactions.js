const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);

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
    getTransactions();

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

    getTransactions();

};

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
};

function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
};

function getTransactions (){
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length){
        transactions.forEach((item) =>  {
            let type = "Entrada";

            if (item.type === "2"){
                type = "Saida";
            }

            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                </tr>
            `
        })
    }

    document.getElementById("transactions-list").innerHTML = transactionsHtml;
}