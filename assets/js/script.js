const dataEvento = new Date("2026-07-23 09:00:00").getTime();

setInterval(() => {
    const agora = new Date().getTime();
    const distancia = dataEvento - agora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    const texto = `Faltam ${dias}d ${horas}h ${minutos}m ${segundos}s para o evento`;

    const topo = document.getElementById("contador");
    const footer = document.getElementById("contador-footer");

    if(topo) topo.innerHTML = texto;
    if(footer) footer.innerHTML = texto;

}, 1000);

let campo = document.getElementById("meuInput");
if (campo) {
    campo.disabled = true;
}

function toggleCampo() {
    let checkbox = document.getElementById("check");
    let campo = document.getElementById("meuInput");
    
    
    campo.disabled = !checkbox.checked;
}

if (document.getElementById("tabelaInscritos")) {
     carregarInscritos();
}

async function carregarInscritos() {

    const { data, error } = await supabaseClient

        .from("Cadastro")

        .select("*");

    console.log(data);

    console.log(error);

    if (error) {

        console.error(error);

        alert(error.message);

        return;
    }

    const tabela =
        document.getElementById("tabelaInscritos");

    if (!tabela) return;

    tabela.innerHTML = "";

    data.forEach(inscrito => {

        tabela.innerHTML += `
            <tr>
                <td>
                    <input
                        type="text"
                        id="nome-${inscrito.id}"
                        value="${inscrito.nome ?? ""}"
                        readonly
                    >
                </td>

                <td>
                    <input
                        type="email"
                        id="email-${inscrito.id}"
                        value="${inscrito.email ?? ""}"
                        readonly
                    >
                </td>

                <td>
                    <input
                        type="text"
                        id="telefone-${inscrito.id}"
                        value="${inscrito.telefone ?? ""}"
                        readonly
                    >
                </td>

                <td>
                    <input
                        type="text"
                        id="atuacao-${inscrito.id}"
                        value="${inscrito.atuacao ?? ""}"
                        readonly
                    >
                </td>

                <td>
                    <input
                        type="text"
                        id="interesse-${inscrito.id}"
                        value="${inscrito.interesse ?? ""}"
                        readonly
                    >
                </td>

                <td>
                    ${inscrito.data ?? ""}
                </td>

                <td>
                   <button
                      id="btnEditar-${inscrito.id}"
                      onclick="habilitarEdicao(${inscrito.id})"]
                    >
                       Editar
                    </button>

                    <button
                      id="btnExcluir-${inscrito.id}"
                      onclick="excluirRegistro(${inscrito.id})"
                    >
                       Excluir
                    </button>

                    <button
                      id="btnCancelar-${inscrito.id}"
                      onclick="cancelarEdicao(${inscrito.id})
                    >
                       Cancelar
                    </button>
                </td>


            </tr>
        `;

    });
}

document.addEventListener("DOMContentLoaded", function () {
 
    const form = document.getElementById("formCadastro");
    const botao = document.getElementById("btnEnviar");
 
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
 
        botao.disabled = true;
        botao.innerText = "Enviando...";
 
        const formData = new FormData(form);
 
 const dados = {
    nome: formData.get("nome"),
    email: formData.get("email"),
    telefone: formData.get("telefone"),
    nascimento: formData.get("nascimento"),
    atuacao: formData.get("atuacao"),
    interesse: formData.get("interesse"),
    fonte: formData.getAll("origem[]").join(", "),
    fonte_outros: formData.get("outrostexto"),
    outros: formData.get("outros")
};
 
        try {
            const { error } = await supabaseClient
                .from("Cadastro")
                .insert([dados]);
 
            if (error) { 
             
                 alert(error.message);
                 return;
             
                }
 
        } catch (err) {
            console.error(err);
            alert("Erro ao salvar no banco.");
        }
 
        botao.disabled = false;
        botao.innerText = "Confirmar Inscrição";
    });
 
});

document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("formLogin");
        const mensagemErro = document.getElementById("mensagemErro");

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const usuario = document.getElementById("loginUsuario").value;
            const senha = document.getElementById("loginSenha").value;

            if (usuario === "Tigas" && senha === "Tigas458") {
                window.location.href = "Relatorio.html";
            } else {
                mensagemErro.style.display = "block";
                mensagemErro.innerText = "Usuário ou senha incorretos.";
            }
        });
    });

