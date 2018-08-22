

document.addEventListener("DOMContentLoaded", function(event) {

// function supportsTemplate() {
//   return 'content' in document.createElement('template');
// }

// if (supportsTemplate()) {
//   console.log('good')
// } else {
//   console.log('poo')
// }





require( ["https://unpkg.com/axios/dist/axios.min.js"],
  axios => {
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then( response => {
        let stories = []
        const storyIds = response.data

        let index = 1

        async function loop(startIndex, storyIds) {
          for(let i=startIndex; i<startIndex+30; i++){
            console.log(i)
            await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyIds[i]}.json?print=pretty`)
                    .then( story => {
                      appendStoryTemplate(story.data.title, story.data.url)
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



const appendStoryTemplate = (content, url) => {
  let t = document.querySelector('#storyTemplate');
  let clone = document.importNode(t.content, true);
  clone.querySelector('.recent-post__header').textContent = content
  clone.querySelector('a').setAttribute('href', 'github.com');
  document.querySelector('.recent-posts__container').appendChild(clone);
}


});