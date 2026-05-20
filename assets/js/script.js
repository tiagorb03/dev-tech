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
                      btnEditar.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10L2 14l.146-3.854 10-10zM11.207 2 3 10.207V13h2.793L14 4.793 11.207 2z"/>
                      </svg>
                      `;
                      onclick="habilitarEdicao(${inscrito.id})"
                    >
                       Editar
                    </button>

                    <button
                      id="btnExcluir-${inscrito.id}"
                      btnExcluir.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm5 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1 0-2H5V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2.5a1 1 0 0 1 1 1z"/>
                      </svg>
                      `;
                      onclick="excluirRegistro(${inscrito.id})"
                    >
                       Excluir
                    </button>

                    <button
                      id="btnCancelar-${inscrito.id}"
                      btnCancelar.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                      `;
                      onclick="cancelarEdicao(${inscrito.id})"
                    >
                       Cancelar
                    </button>
                </td>


            </tr>
        `;

    });
}

function habilitarEdicao(id) {

    document.getElementById(
        `nome-${id}`
    ).readOnly = false;

    document.getElementById(
        `email-${id}`
    ).readOnly = false;

    document.getElementById(
        `telefone-${id}`
    ).readOnly = false;

    document.getElementById(
        `atuacao-${id}`
    ).readOnly = false;

    document.getElementById(
        `interesse-${id}`
    ).readOnly = false;

    const botao =
        document.getElementById(
            `btnEditar-${id}`
        );

    botao.innerText = "Salvar";

    botao.onclick = function () {

        salvarEdicao(id);
    };
}

async function salvarEdicao(id) {

    const nome =
        document.getElementById(
            `nome-${id}`
        ).value;

    const email =
        document.getElementById(
            `email-${id}`
        ).value;

    const telefone =
        document.getElementById(
            `telefone-${id}`
        ).value;

    const atuacao =
        document.getElementById(
            `atuacao-${id}`
        ).value;

    const interesse =
        document.getElementById(
            `interesse-${id}`
        ).value;

    const { error } =
        await supabaseClient
            .from("Cadastro")
            .update({

                nome,
                email,
                telefone,
                atuacao,
                interesse

            })
            .eq("id", id);

    if (error) {

        console.error(error);

        alert(
            "Erro ao atualizar registro."
        );

        return;
    }

    document.getElementById(
        `nome-${id}`
    ).readOnly = true;

    document.getElementById(
        `email-${id}`
    ).readOnly = true;

    document.getElementById(
        `telefone-${id}`
    ).readOnly = true;

    document.getElementById(
        `atuacao-${id}`
    ).readOnly = true;

    document.getElementById(
        `interesse-${id}`
    ).readOnly = true;

    const botao =
        document.getElementById(
            `btnEditar-${id}`
        );

    botao.innerHTML = "Editar";

    botao.onclick = function () {

        habilitarEdicao(id);
    };

    alert(
        "Registro atualizado com sucesso!"
    );
}

async function excluirRegistro(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir?"
        );

    if (!confirmar) return;

    const { error } =
        await supabaseClient
            .from("Cadastro")
            .delete()
            .eq("id", id);

    if (error) {

        console.error(error);

        alert(
            "Erro ao excluir registro."
        );

        return;
    }

    alert(
        "Registro excluído!"
    );

    carregarInscritos();
}

async function cancelarEdicao(id) {

    // Busca os dados originais do banco
    const { data, error } = await supabaseClient
        .from("Cadastro")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        alert("Erro ao cancelar edição.");
        return;
    }

    // Restaura os valores originais nos inputs
    document.getElementById(`nome-${id}`).value = data.nome ?? "";
    document.getElementById(`email-${id}`).value = data.email ?? "";
    document.getElementById(`telefone-${id}`).value = data.telefone ?? "";
    document.getElementById(`atuacao-${id}`).value = data.atuacao ?? "";
    document.getElementById(`interesse-${id}`).value = data.interesse ?? "";

    // Coloca todos os campos de volta como readonly
    document.getElementById(`nome-${id}`).readOnly = true;
    document.getElementById(`email-${id}`).readOnly = true;
    document.getElementById(`telefone-${id}`).readOnly = true;
    document.getElementById(`atuacao-${id}`).readOnly = true;
    document.getElementById(`interesse-${id}`).readOnly = true;

    // Restaura o botão Editar
    const botao = document.getElementById(`btnEditar-${id}`);
    botao.innerText = "Editar";
    botao.onclick = function () {
        habilitarEdicao(id);
    };
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

