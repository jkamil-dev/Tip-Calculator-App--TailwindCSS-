# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person

### Links

- Solution URL:(https://github.com/jkamil-dev/Tip-Calculator-App--TailwindCSS-https://github.com/jkamil-dev/Tip-Calculator-App--TailwindCSS-)
- Live Site URL: (https://jkamil-dev.github.io/Tip-Calculator-App--TailwindCSS-/)

## My process

### Built with

- Semantic HTML5 marku
- Mobile-first workflow
- Vanilla JavaScript
- TailwindCSS

### What I learned

This project helped me practice working with:

- Parsing and validating user inputs in JavaScript.
- Using TailwindCSS for styling and creating responsive layouts.
- Managing application state and dynamically updating the UI.
- Handling user interactions such as button clicks and input changes.

Here is an example of the JavaScript function used to calculate the tip per person:

```javascript
function calculateTipPerPerson(bill, tipPercent, people) {
  const tipTotal = bill * (tipPercent / 100);
  const tipPerPerson = tipTotal / people;
  const totalPerPerson = (bill + tipTotal) / people;
  return { tipPerPerson, totalPerPerson };
}
```
