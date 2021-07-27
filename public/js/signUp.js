const signUpBtn = document.querySelector('.button')

const createAccount = async ()=>{
    const email = document.querySelector('#email').value.trim()
    const password = document.querySelector('#password').value.trim()
    const verify = document.querySelector('#verify').value.trim()
    if(password === verify){ 
        if(email){
            const response = await fetch('/api/users/signUp',{
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json'},
            })
            if(response.ok){
                document.location.replace('/login')
            }
        }
    } else{
        alert("passwords do not match")

    }
}

signUpBtn.addEventListener('click', createAccount)