document.addEventListener("DOMContentLoaded", function(event) {
  const oddFilterElement = document.getElementById("filter--odd")
  oddFilterElement.onclick = filterOdd

  const allFilterElement = document.getElementById("filter--all")
  allFilterElement.onclick = filterAll

  const evenFilterElement = document.getElementById("filter--even")
  evenFilterElement.onclick = filterEven

  function filterOdd(e){
    fadeAllLinks()
    oddFilterElement.setAttribute('class', oddFilterElement.getAttribute('class')+' filter__link--active')
    showPosts('odd')
    hidePosts('even')
  }
  function filterAll(e){
    fadeAllLinks()
    allFilterElement.setAttribute('class', allFilterElement.getAttribute('class')+' filter__link--active')
    showPosts('recent-post')
  }
  function filterEven(e){
    fadeAllLinks()
    evenFilterElement.setAttribute('class', evenFilterElement.getAttribute('class')+' filter__link--active')
    showPosts('even')
    hidePosts('odd')
  }

  function fadeAllLinks(){
    oddFilterElement.setAttribute('class', 'filter__link')
    evenFilterElement.setAttribute('class', 'filter__link')
    allFilterElement.setAttribute('class', 'filter__link')
  }

  function hidePosts(type){
    document.querySelectorAll(`.${type}`).forEach(function(post) {
      let postClass = post.getAttribute('class')
      if(!postClass.includes(" hidden")){
        let newClass = postClass + " hidden"
        post.setAttribute('class', newClass)
      }
    })
  }

  function showPosts(type){
    document.querySelectorAll(`.${type}`).forEach(function(post) {
      let postClass = post.getAttribute('class')
      if(postClass.includes(" hidden")){
        let newClass = postClass.replace(" hidden", "")
        post.setAttribute('class', newClass)
      }
    })
  }

})