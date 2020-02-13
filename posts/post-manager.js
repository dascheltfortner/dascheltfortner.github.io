const POSTS = [
  { title: 'On Righteousness', path: 'on-righteousness.txt' }
]

const getPost = index => {
  let post = POSTS[index]
  return fetch(`./posts/${post.path}`)
}

const setPostPreview = () => {
  let postTitleContainer = document.getElementById('new-post-title')
  postTitleContainer.innerHTML = POSTS[0].title

  getPost(0).then(post => {
    post.text().then(text => {
      let previewText = `${text.substring(0, 1000)}...`
      let previewContainer = document.getElementById('post-content')
      previewContainer.innerHTML = previewText
    })
  })
}

const viewPost = index => {
  document.getElementById('post-title').innerHTML = POSTS[index].title

  getPost(index).then(post => {
    post.text().then(text => {
      document.getElementById('post-content').innerHTML = text
    })
  })
}
