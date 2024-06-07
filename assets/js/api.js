

const medicos = [];
const botaoSalvar = document.getElementById('Salvar');
let medicoId = null;
let medicoParaExcluir = null;

const postMedico = async () => {
    const url = 'https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/novo/medico';
    let method = 'POST';

    const { value: nome } = document.getElementById('nome');
    const { value: crm } = document.getElementById('crm');
    const { value: imagem } = document.getElementById('image');
    const { value: especialidade } = document.getElementById('especialidade');

    const medicoJSON = { nome, crm, image: imagem, especialidade };

    if (medicoId) method = 'PUT';

    const response = await fetch(method === 'PUT' ? `https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/atualizar/medico/${medicoId}` : url, {
        method,
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medicoJSON)
    });

    if (response.ok) {
        alert(`Médico ${medicoId ? 'atualizado' : 'salvo'} com sucesso.`);
        resetForm();
        getAPIMedicos();
    } else {
        alert('Não foi possível salvar o médico.');
    }
};

const getAPIMedicos = async () => {
    const url = 'https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/listar/medicos';
    const response = await fetch(url);
    const { medicos: resultMedicos } = await response.json();

    if (response.ok) {
        medicos.splice(0, medicos.length, ...resultMedicos);
        setListDados();
    } else {
        alert('A API não retornou dados ou está fora do ar.');
    }
};

const deleteMedico = async (id) => {
    const url = `https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/excluir/medico/${id}`;
    const response = await fetch(url, { method: 'DELETE' });

    if (response.ok) {
        alert('Médico excluído com sucesso.');
        getAPIMedicos();
    } else {
        alert('Não foi possível excluir o médico.');
    }
};

const editarMedico = (id) => {
    medicoId = id;
    const medicoParaEditar = medicos.find(medico => medico.id === id);

    if (medicoParaEditar) {
        const { nome, crm, image, especialidade } = medicoParaEditar;
        document.getElementById('nome').value = nome;
        document.getElementById('crm').value = crm;
        document.getElementById('image').value = image;
        document.getElementById('especialidade').value = especialidade;

        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        alert('Médico não encontrado.');
    }
};

const resetForm = () => {
    medicoId = null;
    document.getElementById('nome').value = '';
    document.getElementById('crm').value = '';
    document.getElementById('image').value = '';
    document.getElementById('especialidade').value = '';
};

const confirmarExclusao = (id) => {
    medicoParaExcluir = medicos.find(medico => medico.id === id);
    if (medicoParaExcluir) {
        const { nome, crm } = medicoParaExcluir;
        document.getElementById('confirmMessage').textContent = `Tem certeza que deseja excluir ${nome}: CRM ${crm}?`;
        document.getElementById('confirmModal').style.display = 'block';
    } else {
        alert('Médico não encontrado.');
    }
};

const fecharModal = () => {
    document.getElementById('confirmModal').style.display = 'none';
    medicoParaExcluir = null;
};

const confirmarSim = () => {
    if (medicoParaExcluir) {
        deleteMedico(medicoParaExcluir.id);
    }
    fecharModal();
};

const confirmarNao = () => {
    fecharModal();
};

document.getElementById('confirmYes').addEventListener('click', confirmarSim);
document.getElementById('confirmNo').addEventListener('click', confirmarNao);
document.getElementsByClassName('close')[0].addEventListener('click', fecharModal);

botaoSalvar.addEventListener('click', postMedico);

window.addEventListener('load', getAPIMedicos);

const setListDados = () => {
    const tabela = document.getElementById('cards');
    tabela.innerHTML = '';

    medicos.forEach(({ nome, crm, especialidade, image, id }) => {
        const cards = `
        <div class="card">
        <h4>${nome}</h4>
        <p>${crm}</p>
        <p>${especialidade}</p>
        ${image ? `<img src="${image}" alt="Imagem do Médico" style="width:50px;height:50px; cursor:pointer;" onclick="exibirImagemGrande('${image}')">` : 'N/A'}
        <p>
            <span class="editar" onclick="editarMedico(${id})"  data-bs-toggle="modal" data-bs-target="#cadastroMedicosModal">Editar</span> | 
            <span class="excluir" onclick="confirmarExclusao(${id})">Excluir</span>
        </p>
    </div>
        `;

        tabela.innerHTML += cards;
    });
};

function exibirImagemGrande(imagem) {
    document.getElementById("imagemGrande").src = imagem;
    var modal = new bootstrap.Modal(document.getElementById('imagemModal'));
    modal.show();
}