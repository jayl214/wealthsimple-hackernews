document.addEventListener("DOMContentLoaded", function(event) {

require( ["https://unpkg.com/axios/dist/axios.min.js"],
  axios => {
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then( response => {
        let stories = []
        const storyIds = response.data

        let index = 0



        async function loop(startIndex, storyIds) {
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
                    if(i===0){
                      appendFeatureTemplate(story.data.title, story.data.url, metaData.image, metaData.blurb)
                    }else{
                      appendStoryTemplate(story.data.title, story.data.url, metaData.image, metaData.blurb)
                    }
                  })
                })(story.data.url)

              })
          }
          index = startIndex+30
        }
        loop(index, storyIds)

        window.onscroll = function(ev) {
          if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            loop(index, storyIds)
          }
        };

      })


  }
);



const appendStoryTemplate = (header, url, image, blurb) => {
  let t = document.querySelector('#storyTemplate');
  let clone = document.importNode(t.content, true);
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
  document.querySelector('#post--featured__id').appendChild(clone);
}


});