document.addEventListener("DOMContentLoaded", function(event) {

require( ["https://unpkg.com/axios/dist/axios.min.js"],
  axios => {
    //First get all story ID's from hacker news api
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then( response => {

        //put all id's in an array called storyIds
        const storyIds = response.data

        //index is how we're keeping track of what articles we've loaded, indexes through storyIds
        let index = 0

        //loads chunks of 30 articles when called
        async function loadPosts(startIndex, storyIds) {
          for(let i=startIndex; i<startIndex+30; i++){

            //get individual article
            await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyIds[i]}.json?print=pretty`)
              .then( story => {
                (async function getMetadata(url){ //function that gets metadata, then appends stories

                  //calls for metadata made on back end
                  await axios.get('/show/stories', {
                    params: {
                      url: url
                    }
                  })
                  .then(response=>{
                    let metaData = JSON.parse(response.data)
                    if(i===0){ //put first post into featured post
                      appendFeatureTemplate(story.data.title, story.data.url, metaData.image, metaData.blurb)
                    }else{ //the rest go into recent-posts__container
                      if(i%2===0){ //set odd class for filters
                        appendStoryTemplate(story.data.title, story.data.url, metaData.image, metaData.blurb, 'odd')
                      }else{ //set even vlass for filters
                        appendStoryTemplate(story.data.title, story.data.url, metaData.image, metaData.blurb, 'even')
                      }
                    }
                  })
                })(story.data.url) //immediately invoke self
              })
          }
        }

        //call loadPosts to get first 30 stories on page load
        loadPosts(index, storyIds)
        index = index+30

        //detects if user at bottom of page, calls loadPosts again
        window.onscroll = function(ev) {
          if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            loadPosts(index, storyIds)
            index = index+30
          }
        };

      })


  }
);


//activates storyTemplate, passes it appropriate data, and appends it to recent-posts__container
const appendStoryTemplate = (header, url, image, blurb, oddOrEven) => {
  let t = document.querySelector('#storyTemplate');
  let clone = document.importNode(t.content, true); //activate template
  clone.querySelector('.recent-post').setAttribute('class', clone.querySelector('.recent-post').getAttribute('class')+' '+oddOrEven); //attach proper odd/even class for filters
  clone.querySelector('.recent-post__header').textContent = header //attach proper header
  clone.querySelector('a').setAttribute('href', url); //attach proper link url
  if(image){ //if image from metaData doesn't exist, leave image alone and default image from template will load
    clone.querySelector('.recent-post__img').setAttribute('src', image); //if image does exist, override default image src
  }
  clone.querySelector('.recent-post__blurb').textContent = blurb //attach proper blurb
  document.querySelector('.recent-posts__container').appendChild(clone); //append to recent-posts__container
}

//activates featureTemplate, passes it appropriate data, and appends it to post--featured__id
const appendFeatureTemplate = (header, url, image, blurb) => {
  let t = document.querySelector('#featuredTemplate');
  let clone = document.importNode(t.content, true);
  clone.querySelector('.excerpt__header').textContent = header
  clone.querySelector('a').setAttribute('href', url);
  if(image){
    clone.querySelector('.post--featured__img').setAttribute('src', image);
  }
  clone.querySelector('.excerpt__blurb').textContent = blurb
  document.querySelector('#post--featured__id').replaceChild(clone, document.querySelector('#post--featured__id').firstChild);
}


});