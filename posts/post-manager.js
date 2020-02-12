const POSTS = {
  'On Righteousness': 'on-righteousness.txt'
}

const setPostContent = post => {
  fetch(`posts/${post}`).then(res => {
    res.text().then(text => {
      let postContainer = document.getElementById('post-content')
      document.getElementById('post-content').innerHTML = text
    })
  })
}
