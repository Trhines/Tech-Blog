const postBtn = document.getElementById('updatePost')

const updatePost = async (event) => {
    const post_id = event.target.getAttribute('postId')
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const article = document.getElementById('article').value

  
    if(title && description && article){
        const posted = await fetch('/api/posts/updatePost',{
            method: 'POST',
            body: JSON.stringify({ post_id, title, description, article }),
            headers: { 'Content-Type': 'application/json'}
        })
        if(posted.ok){
            //document.location.replace('/dashboard')
        }   
    } else{
        alert("Please fill all text areas")
    }
    
}

postBtn.addEventListener('click', updatePost)