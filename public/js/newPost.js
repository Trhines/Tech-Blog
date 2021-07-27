const postBtn = document.getElementById('newPost')

const createPost = async () => {
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const article = document.getElementById('article').value

  
    if(title && description && article){
        const posted = await fetch('/api/posts/newPost',{
            method: 'POST',
            body: JSON.stringify({ title, description, article }),
            headers: { 'Content-Type': 'application/json'}
        })
        if(posted.ok){
            document.location.replace('/dashboard')
        }   
    } else{
        alert("Please fill all text areas")
    }
    
}

postBtn.addEventListener('click', createPost)