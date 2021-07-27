const loginBtn = document.querySelector('.button')


loginBtn.addEventListener('click', async (event)=>{
    const email = document.querySelector('#email').value.trim()
    const password = document.querySelector('#password').value.trim()
    if(email && password){
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json'},
        });

    if(response.ok){
        document.location.replace('/dashboard')
    }
    }
})