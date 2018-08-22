document.addEventListener("DOMContentLoaded", function(event) {

  const oddFilterElement = document.getElementById("filter--odd")
  oddFilterElement.onclick = filterOdd

  const allFilterElement = document.getElementById("filter--all")
  allFilterElement.onclick = filterAll

  const evenFilterElement = document.getElementById("filter--even")
  evenFilterElement.onclick = filterEven

  //show odd posts, hide even posts, highlight 'odd' filter button
  function filterOdd(e){
    fadeAllLinks()
    oddFilterElement.setAttribute('class', oddFilterElement.getAttribute('class')+' filter__link--active')
    showPosts('odd')
    hidePosts('even')
  }

  //show all posts, highlight 'all' filter button
  function filterAll(e){
    fadeAllLinks()
    allFilterElement.setAttribute('class', allFilterElement.getAttribute('class')+' filter__link--active')
    showPosts('recent-post')
  }

  //show even posts, hide odd posts, highlight 'even' filter button
  function filterEven(e){
    fadeAllLinks()
    evenFilterElement.setAttribute('class', evenFilterElement.getAttribute('class')+' filter__link--active')
    showPosts('even')
    hidePosts('odd')
  }

  //reset class of filter buttons to default class, corresponds to light gray
  function fadeAllLinks(){
    oddFilterElement.setAttribute('class', 'filter__link')
    evenFilterElement.setAttribute('class', 'filter__link')
    allFilterElement.setAttribute('class', 'filter__link')
  }

  //hide (display none) the specified type of post by adding hidden class
  function hidePosts(type){
    document.querySelectorAll(`.${type}`).forEach(function(post) {
      let postClass = post.getAttribute('class')
      if(!postClass.includes(" hidden")){ //first check if hidden class already exists before appending
        let newClass = postClass + " hidden"
        post.setAttribute('class', newClass)
      }
    })
  }


  //show the specified type of post by removing hidden class
  function showPosts(type){
    document.querySelectorAll(`.${type}`).forEach(function(post) {
      let postClass = post.getAttribute('class')
      if(postClass.includes(" hidden")){ //check if hidden class exists, then replace with empty string
        let newClass = postClass.replace(" hidden", "")
        post.setAttribute('class', newClass)
      }
    })
  }

})