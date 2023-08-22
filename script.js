


const telaInformacoes = document.getElementById("main-informacoes")
const telaCadastrar = document.getElementById("main-cadastrar")
const telaLogin = document.getElementById('main-login')

let usuarios = []

if (!sessionStorage.getItem('meuLogin')) {
    sessionStorage.setItem('meuLogin', JSON.stringify(usuarios));
}

document.addEventListener('DOMContentLoaded', () => {

    userString = sessionStorage.getItem('meuLogin')
    usuarios = JSON.parse(userString)

    if(document.getElementById('main-login')) {
        const botao = document.getElementById("btn-login")
        const cadastrarLink = document.getElementById("cadastrar")
        const recuperarLink = document.getElementById("recuperarSenha")

        userString = sessionStorage.getItem('meuLogin')
        usuarios = JSON.parse(userString)




        botao.addEventListener('click', () => {
            let usuarioEncontrado = false
            let userNaoEncontrado = false
            
            const usuario = document.getElementById('usuario').value
            const password = document.getElementById('senha').value

            usuarios.forEach(u => {
                if (u.nome !== usuario) {
                    userNaoEncontrado = true
                } else {
                    userNaoEncontrado = false
                }

                if (u.nome === usuario && u.senha === password ) {
                    
                    usuarioEncontrado = true
                    u.valor = true

                }
            })
                if (userNaoEncontrado) {
                    document.getElementById("usuario").classList.add('error-class')
                    setTimeout(function(){
                        document.getElementById("usuario").classList.remove('error-class')
                    }, 500)
                } else if (usuarioEncontrado){

                    sessionStorage.setItem('meuLogin', JSON.stringify(usuarios));
                    window.location.href = "informacoes.html"

                } else {
                    document.getElementById("senha").classList.add('error-class')
                    setTimeout(function(){
                        document.getElementById("senha").classList.remove('error-class')
                    }, 500)
                    document.getElementById('senha').value = ""
                }

        })

        cadastrarLink.addEventListener('click', () => {
            sessionStorage.setItem('meuLogin', JSON.stringify(usuarios))
            window.location.href = "cadastrar.html"
            
        })

        recuperarLink.addEventListener('click', () => {
           window.location.href = "recuperar.html"
        })

    


    } else if (document.getElementById('main-cadastrar')) {

        userString = sessionStorage.getItem('meuLogin')
        usuarios = JSON.parse(userString)


        const btnCadastrar = document.getElementById('btn-cadastrar')
        const voltar = document.getElementById('voltar')
        const editar = document.getElementById('editar')
        const salvar = document.getElementById('salvar')
        const inputs = document.getElementsByClassName('inputs')
        const letraMaiuscula = document.querySelectorAll('.letraMaiuscula')

        letraMaiuscula.forEach(function(campo){
            campo.addEventListener('input', function(){
                this.value = this.value.toUpperCase()
            })
        })
        


        btnCadastrar.addEventListener('click', () => {

            const senhaCadastrar = document.getElementById('senhaCadastrar').value
            const repetirSenha = document.getElementById('repetirSenha').value
            const user = document.getElementById('usuario').value
            const name = document.getElementById('nome').value
            const sobreNome = document.getElementById('sobrenome').value
            const email = document.getElementById('email').value
            const animal = document.getElementById('animal').value
            const comida = document.getElementById('comida').value

            let userExistente = false;
            for (const chave in usuarios) {
                if (usuarios[chave].nome === user) {
                    userExistente = true;
                    break;
                }
            }

            let novoUsuario;
            
            if (senhaCadastrar !== repetirSenha) {

                document.getElementById('senhaCadastrar').value = ""
                document.getElementById('repetirSenha').value = ""
                document.getElementById('repetirSenha').classList.add("error-class")
                document.getElementById('senhaCadastrar').classList.add("error-class")

                setTimeout(function(){
                    document.getElementById("repetirSenha").classList.remove('error-class')
                    document.getElementById("senhaCadastrar").classList.remove('error-class')
                }, 500)

            } else if (senhaCadastrar === "" || repetirSenha === "") {

                document.getElementById('repetirSenha').classList.add("error-class")
                document.getElementById('senhaCadastrar').classList.add("error-class")

                setTimeout(function(){
                    document.getElementById("repetirSenha").classList.remove('error-class')
                    document.getElementById("senhaCadastrar").classList.remove('error-class')
                    document.getElementById("usuario").classList.remove('error-class')
                }, 500)

            } else if (user.length < 6 || user === "") {

                document.getElementById('usuario').classList.add("error-class")
                setTimeout(function(){
                    document.getElementById("usuario").classList.remove('error-class')
                }, 500)

            } else if (userExistente) {

                document.getElementById('usuario').classList.add("error-class")

                setTimeout(function(){

                    document.getElementById("usuario").classList.remove('error-class')

                }, 500)

            } else {
                novoUsuario = {name: name.trim(), sobrenome: sobreNome.trim(), email: email.trim(), comida: comida.trim(), animal: animal.trim(), nome: user.trim(), senha: senhaCadastrar.trim(), valor: false, salvar: true}
                usuarios.push(novoUsuario)

                sessionStorage.setItem('meuLogin', JSON.stringify(usuarios))

                for (let i = 0; i < inputs.length; i++){
                    inputs[i].disabled = true
                }
                btnCadastrar.style.display = "none"
                editar.style.display = "block"
            }
        })

        voltar.addEventListener('click', () => {

            for(const chave in usuarios){
                if(usuarios[chave].salvar === true){
                    usuarios[chave].salvar = false
                }
            }
            sessionStorage.setItem('meuLogin', JSON.stringify(usuarios));
            window.location.href = "index.html"
        })

        editar.addEventListener('click', () => {
            
            for (let i = 0; i < inputs.length; i++){
                inputs[i].disabled = false
            }

            editar.style.display = "none"
            salvar.style.display = "block"
            btnCadastrar.style.display = "none"
        })

        salvar.addEventListener('click', () => {

            let senhaCadastrar = document.getElementById('senhaCadastrar').value
            let repetirSenha = document.getElementById('repetirSenha').value
            let user = document.getElementById('usuario').value
            let name = document.getElementById('nome').value
            let sobreNome = document.getElementById('sobrenome').value
            let email = document.getElementById('email').value
            let animal = document.getElementById('animal').value
            let comida = document.getElementById('comida').value

            let userExistente = false;
            let usuarioAtual;

            for (const chave in usuarios) {

                if (usuarios[chave].salvar === true) {
                    usuarioAtual = usuarios[chave].nome
                }



                if (usuarios[chave].nome === user) {
                    userExistente = true;
                    break;
                }
            }


            if (senhaCadastrar !== repetirSenha) {
                document.getElementById('senhaCadastrar').value = ""
                document.getElementById('repetirSenha').value = ""
                document.getElementById('repetirSenha').classList.add("error-class")
                document.getElementById('senhaCadastrar').classList.add("error-class")

                setTimeout(function(){
                    document.getElementById("repetirSenha").classList.remove('error-class')
                    document.getElementById("senhaCadastrar").classList.remove('error-class')
                }, 500)

            } else if (senhaCadastrar === "" || repetirSenha === "" || user === "" ) {

                document.getElementById('repetirSenha').classList.add("error-class")
                document.getElementById('usuario').classList.add("error-class")
                document.getElementById('senhaCadastrar').classList.add("error-class")

                setTimeout(function(){
                    document.getElementById("repetirSenha").classList.remove('error-class')
                    document.getElementById("senhaCadastrar").classList.remove('error-class')
                    document.getElementById("usuario").classList.remove('error-class')
                }, 500)

            } else if (user.length < 6) {

                document.getElementById('usuario').classList.add("error-class")

                setTimeout(function(){
                    document.getElementById("usuario").classList.remove('error-class')
                }, 500)

            } else if (userExistente && user !== usuarioAtual){

                document.getElementById('usuario').classList.add("error-class")

                setTimeout(function(){
                    document.getElementById("usuario").classList.remove('error-class')
                }, 500)

            } else {



                usuarios.forEach(u => {

                    if(u.salvar === true) {
                        u.name = name.trim()
                        u.sobrenome = sobreNome.trim()
                        u.nome = user
                        u.email = email.trim()
                        u.comida = comida.trim()
                        u.animal = animal.trim()
                        u.senha = senhaCadastrar.trim()
                    }
                })

                for (let i = 0; i < inputs.length; i++){
                    inputs[i].disabled = true
                }

                editar.style.display = "block"
                salvar.style.display = "none"
                btnCadastrar.style.display = "none"
                sessionStorage.setItem('meuLogin', JSON.stringify(usuarios));

            }
        })

    } else if (document.getElementById('main-informacoes')) {

        const salvarInformacoes = document.getElementById("salvar-informacoes")
        const editarInformacoes = document.getElementById("editar-informacoes")
        const sair = document.getElementById('sair')
        const inputs = document.getElementsByClassName('inputs')
        const letraMaiuscula = document.querySelectorAll('.letraMaiuscula')

        letraMaiuscula.forEach(function(campo){
            campo.addEventListener('input', function(){
                this.value = this.value.toUpperCase()
            })
        })

        userString = sessionStorage.getItem('meuLogin')
        usuarios = JSON.parse(userString)


        usuarios.forEach(u => {

            const {name, sobrenome, email, comida, animal, nome, senha, valor} = u;


            if(valor === true) {

                document.getElementById('nome').value = name
                document.getElementById('sobrenome').value = sobrenome
                document.getElementById('usuario').value = nome
                document.getElementById('email').value = email
                document.getElementById('comida').value = comida
                document.getElementById('animal').value = animal
                document.getElementById('senhaCadastrar').value = senha
                document.getElementById('repetirSenha').value = senha


            }
        })

        

        editarInformacoes.addEventListener('click', () => {

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].disabled = false
            }

            editarInformacoes.style.display = "none"
            salvarInformacoes.style.display = "block"
        })

        salvarInformacoes.addEventListener('click', () => {


            let senhaCadastrar = document.getElementById('senhaCadastrar').value
            let repetirSenha = document.getElementById('repetirSenha').value
            let user = document.getElementById('usuario').value
            let name = document.getElementById('nome').value
            let sobreNome = document.getElementById('sobrenome').value
            let email = document.getElementById('email').value
            let animal = document.getElementById('animal').value
            let comida = document.getElementById('comida').value
            

            
            let userExistente = false;
            let usuarioAtual;

            for (const chave in usuarios) {

                if (usuarios[chave].valor === true) {
                    usuarioAtual = usuarios[chave].nome
                }

                if (usuarios[chave].nome === user) {
                    userExistente = true;
                    break;
                }
            }



            if (senhaCadastrar !== repetirSenha) {

                document.getElementById('senhaCadastrar').value = ""
                document.getElementById('repetirSenha').value = ""
                document.getElementById('repetirSenha').classList.add("error-class")
                document.getElementById('senhaCadastrar').classList.add("error-class")

                setTimeout(function(){
                    document.getElementById("repetirSenha").classList.remove('error-class')
                    document.getElementById("senhaCadastrar").classList.remove('error-class')
                }, 500)

            } else if (senhaCadastrar === "" || repetirSenha === "") {

                document.getElementById('repetirSenha').classList.add("error-class")
                document.getElementById('senhaCadastrar').classList.add("error-class")

                setTimeout(function(){
                    document.getElementById("repetirSenha").classList.remove('error-class')
                    document.getElementById("senhaCadastrar").classList.remove('error-class')
                    document.getElementById("usuario").classList.remove('error-class')
                }, 500)

            } else if (user.length < 6 || user === "") {

                document.getElementById('usuario').classList.add("error-class")

                setTimeout(function(){
                    document.getElementById("usuario").classList.remove('error-class')
                }, 500)

            } else if (userExistente && usuarioAtual !== user){

                document.getElementById('usuario').classList.add("error-class")

                setTimeout(function(){
                    document.getElementById("usuario").classList.remove('error-class')
                }, 500)

            }  else {

                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].disabled = true
                }


                usuarios.forEach(u => {

                    if(u.valor === true) {
                        u.name = name.trim()
                        u.sobrenome = sobreNome.trim()
                        u.nome = user
                        u.email = email.trim()
                        u.comida = comida.trim()
                        u.animal = animal.trim()
                        u.senha = senhaCadastrar.trim()
                    }

                })

                sessionStorage.setItem('meuLogin', JSON.stringify(usuarios));
                editarInformacoes.style.display = "block"
                salvarInformacoes.style.display = "none"
            }
        })

        sair.addEventListener('click', () => {
            
            usuarios.forEach(u => {
                if(u.valor === true) {
                    u.valor = false
                }
            })

            sessionStorage.setItem('meuLogin', JSON.stringify(usuarios));
            window.location.href = "index.html"

        })
        
    }  else if (document.getElementById('main-recuperar')) {

        const btnRecuperar = document.getElementById('alterar')
        const btnVoltar = document.getElementById('voltarRecuperar')
        const letraMaiuscula = document.querySelectorAll('.letraMaiuscula')
        let usuarioNaoExiste = false

        letraMaiuscula.forEach(function(campo){
            campo.addEventListener('input', function(){
                this.value = this.value.toUpperCase()
            })
        })

        userString = sessionStorage.getItem('meuLogin')
        usuarios = JSON.parse(userString)


        
        



        btnRecuperar.addEventListener('click', () => {

            
            const nomeUsuario = document.getElementById('nomeUsuario').value
            const sobrenomeUsuario = document.getElementById('sobrenomeUsuario').value
            const campoNome = document.getElementById('nomeUsuario')
            const campoSobrenome = document.getElementById('sobrenomeUsuario')
            const senhaNova = document.getElementById('senhaNova').value
            const repetirSenha = document.getElementById('repetirSenhaNova').value
            const campoSenha = document.getElementById('senhaNova')
            const campoNovaSenha = document.getElementById('repetirSenhaNova')
            const inputsRecuperar = document.getElementsByClassName('inputsRecuperar')

    
            usuarios.forEach(u => {
                console.log(`${u.name.trim()}, ${u.sobrenome.trim()}, ${nomeUsuario.trim()}, ${sobrenomeUsuario.trim()}`)
                if ((u.name !== nomeUsuario || u.sobrenome !== sobrenomeUsuario)) {
                    usuarioNaoExiste = true
                } else {
                    usuarioNaoExiste = false
                }
            })


            if (nomeUsuario === "" || sobrenomeUsuario === "" || usuarioNaoExiste) {
                campoNome.classList.add("error-class")
                campoSobrenome.classList.add("error-class")

                setTimeout(function(){
                    campoNome.classList.remove('error-class')
                    campoSobrenome.classList.remove('error-class')
                }, 500)
            } else if (senhaNova === "" || repetirSenha === "") {
                campoSenha.classList.add("error-class")
                campoNovaSenha.classList.add("error-class")

                setTimeout(function(){
                    campoSenha.classList.remove('error-class')
                    campoNovaSenha.classList.remove('error-class')
                }, 500)
            } else if (senhaNova !== repetirSenha) {
                campoSenha.classList.add("error-class")
                campoNovaSenha.classList.add("error-class")
                document.getElementById('senhaNova').value = ""
                document.getElementById('repetirSenhaNova').value = ""

                setTimeout(function(){
                    campoSenha.classList.remove('error-class')
                    campoNovaSenha.classList.remove('error-class')
                }, 500)
            } else if (usuarioNaoExiste) {

                campoNome.classList.add("error-class")
                campoSobrenome.classList.add("error-class")

                setTimeout(function(){
                    campoNome.classList.remove('error-class')
                    campoSobrenome.classList.remove('error-class')
                }, 500)
            } else {
                usuarios.forEach(u => {
                   
                    if ((u.name === nomeUsuario && u.sobrenome === sobrenomeUsuario)) {
                        u.senha = senhaNova.trim()
                    }

                    for (let i = 0; i < inputsRecuperar.length ; i++) {
                        inputsRecuperar[i].disabled = true
                    }

                })

                btnRecuperar.style.opacity = "0.5"
                btnRecuperar.style.pointerEvents = "none"
                btnRecuperar.disabled = "true"
                sessionStorage.setItem('meuLogin', JSON.stringify(usuarios));

            }

        })


        btnVoltar.addEventListener('click', () => {
            window.location.href = "index.html"
        })



    }
})




















