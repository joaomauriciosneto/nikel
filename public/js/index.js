// pegar um elemento com id "Link-conta" e adicionar um evento, ou seja, quando esse evento acontecer,
// no caso de um click, faça alguma coisa (function)
//document.getElementById("Link-conta").addEventListener("click", function() {
//alert, dá um aviso ao usuário na tela 
//alert("O usuário clicou no link criar conta.");
//})

// register-modal, é o nome da modal de criar conta
const myModal = new bootstrap.Modal("#register-modal");
//a variável let, o seu valor pode ser alterado, ao passo que, a const não pode alterar.
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
//assim que alguém entrar no index.html, a função checkLogged vai ser inicializada para verificar
//se já tem alguém logado.
checkLogged();

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault;

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);
 
      //! serve para identificar quando não tiver conta.
    if(!account){
        alert("Opss! Verifique o usuário ou a senha!");
        return;
     };

     //!== significa diferente no java script.
     if(account){
         if(account.password !== password){
            alert("Opss! Verifique o usuário ou a senha!");
            return;  
         };

         saveSession(email, checkSession);

        window.location.href = "home.html";
     };
});

//CRIAR CONTA
// preventDefault faz tudo na mesma aplicação
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 5){
        alert("Digite um endereço de e-mail válido!");
        return;
    };

    if(password.length < 4){
        alert("A senha deve ter no mínimo 4 dígitos!")
        return;
    };

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    // depois de criar a conta, myModal.hide() faz com que a modal saia
    myModal.hide();
    alert("Conta criada com sucesso!");
});

//se tiver alguém logado no session, vai ser setado quem estiver logado.
function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    };
    //se o usuário marcou que é pra permanecer logado, precisa manter ele logado, se tiver algum valor no session.
    if(logged){
        saveSession(logged, session);
        window.location.href = "home.html"
    }
};

//salva a conta do usuário no localStorage.
//o comando JSON.stringify, transforma os dados como se fossem apenas uma só string.
function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
};

//os nomes dos parâmetros podem ser qualquer um.
function saveSession(data, saveSession){
    if(saveSession){
        //salvando o usuário para permanecer no localStorage.
        //session, nome dado para o localStorage.
        localStorage.setItem("session", data);
    };

    //fica apenas salvo na sessão. se a página for fechada, não fica mais salvo.
    sessionStorage.setItem("logged", data);
};

//vai buscar os dados salvos pela função saveAccount.
//o parâmetro key, vai ser preciso para saber qual email que estará no localStorage.
function getAccount(key){
    const account = localStorage.getItem(key);

// teste para saber se o usuário existe no localStorage.
//JSON.parte, transforma novamente a variável em objeto.
    if(account){
        return JSON.parse(account);
    };
    return "";
};