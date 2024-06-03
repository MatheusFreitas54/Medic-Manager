async function validateLogin(event) {
    event.preventDefault(); // Previne o envio do formulário
    
    var login = document.getElementById('login').value.toLowerCase();
    var password = document.getElementById('password').value;

    // Puxando usuarios da api do professor
    let url = 'https://back-login.vercel.app/usuarios';
    let response = await fetch(url);
    let userData = await response.json();

    let authenticated = userData.some(user => {
        return (login === user.email.toLowerCase() || login == user.nome.toLowerCase()) && password === user.senha;
    });

    if (authenticated) {
        localStorage.setItem('authenticated', 'true');
        window.location.href = '../admin/index.html'; // Redireciona para o diretório cadastro/
    } else {
        alert('Login ou senha incorretos!');
        document.querySelector('#login').value = '';
        document.querySelector('#password').value = '';
    }
    // https://back-login.vercel.app/usuarios
}
