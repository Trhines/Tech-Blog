const postBtn = document.getElementById('post')

const addComment = async (event)=>{
    const text = document.getElementById('comment').value
    const post_id = window.location.href.split("=")[1]
    
    const newComment = await fetch('/api/posts/addComment',{
        method: 'POST',
        body: JSON.stringify({ text, post_id }),
        headers: { 'Content-Type': 'application/json'}
    })
    if(newComment){
        document.location.reload();
    }

}

postBtn.addEventListener('click', addComment)