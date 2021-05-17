// script.js
/* eslint-disable */
import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
var id = 1;
// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.id = id;
        id += 1;
        newPost.addEventListener('click', () => {
          setState({name: 'entry', id: newPost.id}, false);
        })
        document.querySelector('main').appendChild(newPost);
      });
    });
});
setState({name: 'home'}, false);
document.querySelector('img').addEventListener('click', () => {
  setState({name: 'settings'}, false);
})

document.querySelector('h1').addEventListener('click', () => {
  setState({name: 'home'}, false);
})

window.addEventListener('popstate', (event) => {
  setState(event.state, true);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
