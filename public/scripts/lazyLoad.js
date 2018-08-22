document.addEventListener("DOMContentLoaded", function(event) {

require( ["https://unpkg.com/axios/dist/axios.min.js"],
  axios => {
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then( response => {
        const storyIds = response.data
        let stories = []
        let index = 0

        async function loadPosts(startIndex, storyIds) {
          for(let i=startIndex; i<startIndex+30; i++){
            await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyIds[i]}.json?print=pretty`)
              .then( story => {
                (async function getMetadata(url){
                  await axios.get('/show/stories', {
                    params: {
                      url: url
                    }
                  })
                  .then(response=>{
                    let metaData = JSON.parse(response.data)
                    let storyObj = {
                      header: story.data.title,
                      url: story.data.url,
                      image: metaData.image,
                      blurb: metaData.blurb
                    }
                    if(i%2===0){
                      storyObj.oddOrEven = 'odd'
                      stories.push(storyObj)
                    }else{
                      storyObj.oddOrEven = 'even'
                      stories.push(storyObj)
                    }
                    if(i===0){
                      appendFeatureTemplate(story.data.title, story.data.url, metaData.image, metaData.blurb)
                    }else{
                      if(i%2===0){
                        appendStoryTemplate(story.data.title, story.data.url, metaData.image, metaData.blurb, 'odd')
                      }else{
                        appendStoryTemplate(story.data.title, story.data.url, metaData.image, metaData.blurb, 'even')
                      }

                    }
                  })
                })(story.data.url)
              })
          }
        }
        loadPosts(index, storyIds)
        index = startIndex+30

        window.onscroll = function(ev) {
          if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            loadPosts(index, storyIds)
            index = startIndex+30
          }
        };

      })


  }
);



const appendStoryTemplate = (header, url, image, blurb, oddOrEven) => {
  let t = document.querySelector('#storyTemplate');
  let clone = document.importNode(t.content, true);
  clone.querySelector('.recent-post').setAttribute('class', clone.querySelector('.recent-post').getAttribute('class')+' '+oddOrEven);
  clone.querySelector('.recent-post__header').textContent = header
  clone.querySelector('a').setAttribute('href', url);
  if(image){
    clone.querySelector('.recent-post__img').setAttribute('src', image);
  }
  clone.querySelector('.recent-post__blurb').textContent = blurb
  document.querySelector('.recent-posts__container').appendChild(clone);
}

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