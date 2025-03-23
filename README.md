# Betashares search (code test)
Hello and welcome to my code test submission for the position as a Lead Web Developer with Betashares!



## Requirements
If you have the appropriate access, you can [view the requirements here](https://betashares.notion.site/Lead-Web-Developer-coding-test-1b9abb64f4128009918ff980c5438b00).

For the most part these requirements made sense and I was able to follow them without issue.

One thing to note is that I set this up based on the presumption that when you query the Search API with an empty `search_text` parameter, it returns _"popular / commonly searched"_ results (no endpoint was specified for this in the provided documentation).



## Design
As I am also a UX / UI designer, I created a supporting design in Figma:

- [Download the Figma file](https://jamenlyndon.com/_other/betashares/search.fig)
- [View a PDF export](https://jamenlyndon.com/_other/betashares/search.pdf)



## Tech stack
Here's the tech stack I chose to build this with:
- Vanilla Javascript
- Node.js (used to create a very basic server)
- SASS / CSS
- HTML

Though I am proficient in React.js, I chose to use Vanilla Javascript for this coding test.
This is closer to what is being used on the Betashares website and I feel helps to demonstrate a deeper / more comprehensive understanding of Javascript itself (without frameworks).

In addition to the above, linting has also been included in this project. The linting includes the following standard tools (with custom configurations):
- [ESLint](https://eslint.org/)
- [ESLint Stylistic](https://eslint.style/)
- [Stylelint](https://stylelint.io/)



## Codebase overview
To better understand where everything is and what it does, take a look at the below info:
```javascript
index.js // The world's most basic node server
index.html // The entry point for the app

// JS
/js/
  script.js // The app's main JS (this loads the search component)
  /partials/ // Partial JS files which can be dynamically included anywhere (helper functions, etc)

// SASS
/scss/
  style.scss // The app's main SASS
  /partials/ // Partial SASS files which can be dynamically included anywhere (variables, typography, etc)

// Fonts
/fonts/

// Components
/components/
  /search/ // The search component
    /scss/ // The search component's SASS
    _index.js // The search component's JS and HTML
```

Please note: In the real world, this sort of thing would probably be comprised of many smaller components. For example; pagination, input fields, select fields, buttons, etc.

However, as this was created without a supporting design system, I simply developed a single "search component" which handles all of this functionality and layout.



## Installation
### Requirements
1. Install [Git](https://git-scm.com/)
2. Install [Node.js](https://nodejs.org/en)
3. Install [npm](npmjs.com)


### Setup instructions
1. Clone the Git repository
```javascript
git clone https://github.com/jamenlyndon/betashares-search.git
```
2. Install the dependencies
```javascript
npm install
```

3. Start the server
```javascript
npm run start
```

4. Open `http://localhost:3000` in your browser to view the app

5. (Optional) You can also use the following commands for development purposes
```javascript
// Watch + compile the SASS, watch + compile the JS, run the linting, start the server
npm run watch

// Run the linting
npm run lint

// Watch + compile the SASS only
npm run sass

// Watch + compile the Javascript only
npm run js
```
