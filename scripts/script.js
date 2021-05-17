// script.js
/* eslint-disable */
import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
let id = 0;
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
          setState({state: 'entry', id: newPost.id}, false);
        })
        document.querySelector('main').appendChild(newPost);
      });
    });
});


document.querySelector('img').addEventListener('click', () => {
  setState({state: 'settings', title: 'Settings', url: '#settings'}, false);
})

document.querySelector('h1').addEventListener('click', () => {
  setState({state: 'home', title: 'Journal Entries', url: ''}), false;
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
