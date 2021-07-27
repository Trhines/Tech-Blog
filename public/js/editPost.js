const editBtn = document.querySelectorAll('#edit')

const editPost = (event) => {
    const postId = event.target.getAttribute('postId')
    location.replace(`/editPost?id=${postId}`)
}

for(i=0; i<editBtn.length; i++){
    editBtn[i].addEventListener('click', editPost)
}
