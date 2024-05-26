function validateLogin(event) {
    event.preventDefault(); // Previne o envio do formulário
    
    var login = document.getElementById('login').value;
    var password = document.getElementById('password').value;
    
    if (login === 'cadastro' && password === '102030') {
        window.location.href = 'cadastro/cadastro.html'; // Redireciona para o diretório cadastro/
    } else {
        alert('Login ou senha incorretos!');
    }
}
