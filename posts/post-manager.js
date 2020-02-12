const POSTS = {
  'On Righteousness': 'on-righteousness.txt'
}

const setPostContent = post => {
  fetch(`posts/${post}`).then(res => {
    let postContainer = document.getElementById('post-content')
    console.log(res)
    postContainer.innerHTML = res.text()
  })
}
