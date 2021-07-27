const logOutBtn = document.getElementById('logOutBtn')

const logout = async (event) => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response) {
      console.log('hit')
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  };

  if(logOutBtn){
    logOutBtn.addEventListener('click', logout);
  }