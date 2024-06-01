let medicos = [];
const botaoSalvar = document.getElementById('Salvar');
let medicoId = null;
let medicoParaExcluir = null;

const postMedico = async function() {
    let url = 'https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/novo/medico';
    let method = 'POST';

    let nome = document.getElementById('nome').value;
    let crm = document.getElementById('crm').value;
    let imagem = document.getElementById('image').value;
    let especialidade = document.getElementById('especialidade').value;

    let medicoJSON = {
        nome,
        crm,
        image: imagem,
        especialidade
    };

    if (medicoId) {
        url = `https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/atualizar/medico/${medicoId}`;
        method = 'PUT';
    }

    const request = await fetch(url, {
        method: method,
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medicoJSON)
    });

    if (request.ok) {
        alert(`Médico ${medicoId ? 'atualizado' : 'salvo'} com sucesso.`);
        resetForm();
        getAPIMedicos(); 
    } else {
        alert('Não foi possível salvar o médico.');
    }
};

const getAPIMedicos = async function() {
    let url = 'https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/listar/medicos';

    let response = await fetch(url);

    let resultMedicos = await response.json();

    if (response.status == 200) {
        medicos = resultMedicos.medicos;
        setListDados(resultMedicos);
    } else {
        alert('A API não retornou dados ou está fora do ar.');
    }
};

const deleteMedico = async function(id) {
    let url = `https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/excluir/medico/${id}`;

    let response = await fetch(url, {
        method: 'DELETE'
    });

    if (response.status == 200) {
        alert('Médico excluído com sucesso.');
        getAPIMedicos(); 
    } else {
        alert('Não foi possível excluir o médico.');
    }
};

const editarMedico = function(id) {
    medicoId = id;
    let medicoParaEditar = medicos.find(medico => medico.id === id);

    if (medicoParaEditar) {
        document.getElementById('nome').value = medicoParaEditar.nome;
        document.getElementById('crm').value = medicoParaEditar.crm;
        document.getElementById('image').value = medicoParaEditar.image;
        document.getElementById('especialidade').value = medicoParaEditar.especialidade;

        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        alert('Médico não encontrado.');
    }
};

const resetForm = function() {
    medicoId = null;
    document.getElementById('nome').value = '';
    document.getElementById('crm').value = '';
    document.getElementById('image').value = '';
    document.getElementById('especialidade').value = '';
};

const confirmarExclusao = function(id) {
    medicoParaExcluir = medicos.find(medico => medico.id === id);
    if (medicoParaExcluir) {
        document.getElementById('confirmMessage').textContent = `Tem certeza que deseja excluir ${medicoParaExcluir.nome}: CRM ${medicoParaExcluir.crm}?`;
        document.getElementById('confirmModal').style.display = 'block';
    } else {
        alert('Médico não encontrado.');
    }
};

const fecharModal = function() {
    document.getElementById('confirmModal').style.display = 'none';
    medicoParaExcluir = null;
};

const confirmarSim = function() {
    if (medicoParaExcluir) {
        deleteMedico(medicoParaExcluir.id);
    }
    fecharModal();
};

const confirmarNao = function() {
    fecharModal();
};

document.getElementById('confirmYes').addEventListener('click', confirmarSim);
document.getElementById('confirmNo').addEventListener('click', confirmarNao);
document.getElementsByClassName('close')[0].addEventListener('click', fecharModal);

botaoSalvar.addEventListener('click', function() {
    postMedico();
});

window.addEventListener('load', function() {
    getAPIMedicos();
});

const setListDados = function(dadosMedicos) {
    let tabela = document.getElementById('cards');
    tabela.innerHTML = '';

    dadosMedicos.medicos.forEach(function(medico) {
        let linha = `
            <div class="card">
                <h4>${medico.nome}</h4>
                <p>${medico.crm}</p>
                <p>${medico.especialidade}</p>
                ${medico.image ? `<img src="${medico.image}" alt="Imagem do Médico" style="width:50px;height:50px;">` : 'N/A'}
                <p>
                    <span class="editar linha" onclick="editarMedico(${medico.id})">Editar</span> | 
                    <span class="excluir linha" onclick="confirmarExclusao(${medico.id})">Excluir</span>
                </p>
            </div>
        `;

        tabela.innerHTML += linha;
    });
};
