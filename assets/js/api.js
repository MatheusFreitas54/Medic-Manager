// Listar Medicos

let urlApiListar = "https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/listar/medicos";

async function listarMedicos() {
    try {
        let response = await fetch(urlApiListar);
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Erro ao listar médicos:', error);
    }
}

listarMedicos();



// Salvar Medicos

let urlApiSalvar = "https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/novo/medico";

async function salvarMedico(medico) {
    try {
        let response = await fetch(urlApiSalvar, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medico)
        });
        let data = await response.json();
        console.log('Médico salvo:', data);
    } catch (error) {
        console.error('Erro ao salvar médico:', error);
    }
}

let novoMedico = {
    nome: "teste",
    crm: "teste",
    image: "teste",
    especialidade: "20"
};

salvarMedico(novoMedico);


// Atualizar Medicos
let urlApiAtualizar = "https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/atualizar/medico/";

async function atualizarMedico(medico) {
    try {
        let response = await fetch(urlApiAtualizar, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medico)
        });
        let data = await response.json();
        console.log('Médico atualizado:', data);
    } catch (error) {
        console.error('Erro ao atualizar médico:', error);
    }
}

let medicoAtualizado = {
    nome: "teste 2",
    crm: "teste",
    image: "teste",
    especialidade: "20"
};

atualizarMedico(medicoAtualizado);



// Excluir Medicos

let urlApiExcluir = "https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/excluir/medico/";

async function excluirMedico(crm) {
    try {
        let response = await fetch(`${urlApiExcluir}${crm}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('Médico excluído com sucesso.');
        } else {
            console.error('Erro ao excluir médico:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao excluir médico:', error);
    }
}

excluirMedico("teste"); // Substitua "teste" pelo CRM do médico que você deseja excluir
