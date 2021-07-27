
const viewBtn = document.querySelectorAll('#view')

const getPost = async (event) => {
    const postId = event.target.getAttribute('postId')

    location.replace(`/viewPost?id=${postId}`)
}

for(i=0; i<viewBtn.length; i++){
    viewBtn[i].addEventListener('click', getPost)

}