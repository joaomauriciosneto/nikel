let nome = "jeiki";

let pessoa = {
    nome: "xupeta",
    idade: "50",
    trabalho: "febrento"
}

let pessoaDefault = {
    nome: "vedita",
    idade: "59",
    trabalho: "um peste"
}

let nomes = ["eu","tu","eles"];

let pessoas = [
    {
        nome: "xupeta",
        idade: "50",
        trabalho: "febrento"
},
{
    nome: "vedita",
    idade: "59",
    trabalho: "um peste" 
}
];

console.log(pessoas);



function alterarNome() {
    nome = "vedita";
    console.log("novo nome:");
    console.log(nome);
}

//alterarNome()

function imprimePessoa (pessoa){
console.log("Nome:");
console.log(pessoa.nome);

console.log("idade:");
console.log(pessoa.idade);

console.log("trabalho:");
console.log(pessoa.trabalho);
}

function recebeEalteraNome(novoNome){
    nome = novoNome;
    console.log("novo nome alterado:");
    console.log(novoNome);
}

//imprimePessoa(pessoaDefault);
//imprimePessoa({
//    nome : "cacaroto",
//    idade : "76",
//    trabalho : "uuu"
//})



//recebeEalteraNome("febe do rato");
//recebeEalteraNome("que nada rapaz");

