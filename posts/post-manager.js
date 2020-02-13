const POSTS = [
  { title: 'On Righteousness', path: 'on-righteousness.txt' }
]

const setPostContent = post => {
  fetch(`posts/${post}`).then(res => {
    res.text().then(text => {
      let postContainer = document.getElementById('post-content')
      document.getElementById('post-content').innerHTML = text
    })
  })
}

const getPost = index => {
  let post = POSTS[index]
  return fetch(`./posts/${post.path}`, { mode: 'no-cors' })
}

const setPostPreview = () => {
  getPost(0).then(post => {
    post.text().then(text => {
      let previewText = `${text.substring(0, 500)}...`
      let previewContainer = document.getElementById('post-content')
      previewContainer.innerHTML = previewText
    })
  })
}
