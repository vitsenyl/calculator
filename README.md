# Calculator
Calculator in HTML/CSS/JS for The Odin Project

## Thoughts
This project was harder than I initially anticipated. Making sure the expression built and evaluated property were two separate challenges that took more than a little bit of thought. I'm proud to have come up with the algorithm to successively evaluate one unit operation (x operation y) at a time without assistance or outside prompting, even if it may be implicitly obvious to more experienced developers.

Overall I'm going to ask for some eyes on this project. I have a lot of room to improve and learn from this. 

## Wishlist
- Implement keyboard entry (allow user to type variables and use Enter key to evalaute).
- Make the UI look more consistent. Right now Delete and Clear are second-class citizens that live off-the-(CSS)grid. 
- Add animation when a button is clicked
- Add more functions, e.g. inputting Answer, Exponential, Factorial, Sqrt, Parentheses, etc.
- Receive code review from more experienced JS dev on my code. Not happy with my variable nomenclature, and would love to see someone else's thoughts and examples.

## Lessons Learned
1. Array.splice works on arrays, not strings. Silly really, but I tried to splice my strings on numerous occasions.
2. Function expressions are extraordinarily convenient and can easily condense pieces of code. 
3. Wrote my own truncate function before I found this [Stackoverflow post](https://stackoverflow.com/questions/7312468/javascript-round-to-a-number-of-decimal-places-but-strip-extra-zeros). Should have used parseFloat()...
4. Using viewport dimensions to size elements looks great until you hit a minimum size. I'll probably need to refactor into something else.
