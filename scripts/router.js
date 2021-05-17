// router.js
export const router = {};

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function(state, backButt) {
  /**
   * - There are three states that your SPA app will have
   *    1. The home page
   *    2. The entry page (showing one individual entry)
   *    3. The settings page (currently blank, no actual settings here, just a placeholder where a real settings page would go)
   *
   * - If you look at the CSS, we have 2 classes you can add to the body element to help change states, "settings" and "single-entry"
   * - Changing states will require more than just changing these classes, for example the settings page requires you to change the title to "Settings"
   * - And each individual entry the title changes to "Entry #" based on it's number in the entry order
   *
   * - When changing states, make sure the back and forward buttons work. You can use hash URLs (e.g. https://someurl.com/#settings) when changing states
   *   to make things easier.
   * - Similarly, when viewing an individual entry, a hashed URL might look like https://someurl.com/#entry3
   *
   * - Some tips:
   *    1. Push a new state object to the history object using history.pushState()
   *    2. look up the documentation for how to use pushState() when you try it
   *    3. look up the documentation for the "popstate" event listener (fires only on back button), useful in your script.js file
   */

  const title = document.querySelector("h1");
  const body = document.querySelector('body');

  if(state.state == 'home') {
    title.innerHTML = 'Journal Entries';
    body.className = 'home';

    if(!backButt) {
      history.pushState(state, 'Journal Entries', ''); //push state & change URL
    }
  }
  else if (state.state == 'settings') {
    title.innerHTML = 'Settings';
    body.className = 'settings';

    if(!backButt) {
      history.pushState(state, 'Settings', '#settings'); //push state & change URL
    }
  }
  else if (state.state == 'entry'){
    title.innerHTML = 'Entry ' + state.id;
    body.className = 'single-entry';
    const ent = document.createElement('entry-page');
    ent.entry = document.getElementById(state.id).entry;
    body.removeChild(document.getElementsByTagName('entry-page')[0]);
    body.appendChild(ent);

    if(!backButt) {
      history.pushState(state, 'Entry '+state.id, '#entry'+state.id); //push state & change URL
    }
  }
}
