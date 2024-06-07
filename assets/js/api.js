const medicos = [];
let medicoId = null;
let medicoParaExcluir = null;

const postMedico = async () => {
    const url = 'https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/novo/medico';
    let method = 'POST';

    const nome = $('#nome').val();
    const crm = $('#crm').val();
    const imagem = $('#image').val();
    const especialidade = $('#especialidade').val();

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
        $('#nome').val(nome);
        $('#crm').val(crm);
        $('#image').val(image);
        $('#especialidade').val(especialidade);

        $('html, body').animate({ scrollTop: 0 }, 'smooth');
    } else {
        alert('Médico não encontrado.');
    }
};

const resetForm = () => {
    medicoId = null;
    $('#nome').val('');
    $('#crm').val('');
    $('#image').val('');
    $('#especialidade').val('');
};

const confirmarExclusao = (id) => {
    medicoParaExcluir = medicos.find(medico => medico.id === id);
    if (medicoParaExcluir) {
        const { nome, crm } = medicoParaExcluir;
        $('#confirmMessage').text(`Tem certeza que deseja excluir ${nome}: CRM ${crm}?`);
        $('#confirmModal').show();
    } else {
        alert('Médico não encontrado.');
    }
};

const fecharModal = () => {
    $('#confirmModal').hide();
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

$('#confirmYes').on('click', confirmarSim);
$('#confirmNo').on('click', confirmarNao);
$('.close').on('click', fecharModal);

$('#Salvar').on('click', postMedico);

$(window).on('load', getAPIMedicos);

const setListDados = () => {
    const tabela = $('#cards');
    tabela.html('');

    medicos.forEach(({ nome, crm, especialidade, image, id }) => {
        const cards = `
        <div class="card text-center p-3">
        <h4>${nome}</h4>
        <p>${crm}</p>
        <p>${especialidade}</p>
        ${image ? `<img src="${image}" alt="Imagem do Médico" style="width:90px;height:90px; cursor:pointer; margin-bottom: 5px" onclick="exibirImagemGrande('${image}', '${nome}')">` : 'N/A'}
        <p>
            <span class="editar" onclick="editarMedico(${id})"  data-bs-toggle="modal" data-bs-target="#cadastroMedicosModal">Editar</span> | 
            <span class="excluir" onclick="confirmarExclusao(${id})">Excluir</span>
        </p>
    </div>
        `;

        tabela.append(cards);
    });
};

function exibirImagemGrande(imagem, nome) {
    console.log(nome);
    const imagemElemento = $("#imagemGrande");
    if (imagemElemento.length) {
        imagemElemento.attr("src", imagem);
    } else {
        console.error('Elemento com id "imagemGrande" não encontrado.');
    }

    const modalTitleElemento = $('#imagemModalLabeltext');
    if (modalTitleElemento.length) {
        modalTitleElemento.html(nome);
    } else {
        console.error('Elemento com a classe "modal-title" não encontrado.');
    }

    var modal = new bootstrap.Modal($('#imagemModal')[0]);
    modal.show();
}
