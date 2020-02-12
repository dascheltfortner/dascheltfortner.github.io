const POSTS = {
  'On Righteousness': 'on-righteousness.txt'
}

const setPostContent = post => {
  fetch(post).then(res => {
    let postContainer = document.getElementById('post-content')
    postContainer.innerHTML = res.text()
  })
}
