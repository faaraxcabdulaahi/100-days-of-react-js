1. Why do we need to `import React from "react"` in our files ?
- React defines JSX

2. If i were to console.log(page) in index.js, what would show up ?
- A Javascript object. React element that describe what react should eventually add to the real DOM for us.

3. What's wrong with this code :
- const Page = (
    <h1>Hello Man</h1>
    <p>This is my website</p>
)
- You forget to `wrap it` with `div` element or `<>` fragment.

4. What does it mean for something to be `declarative` instead of `imperative` ?

- `Declarative` means i can tell the computer ` WHAT to do` and expect it to handle the details
- Imperalitive means I need to tell it HOW to do each step.

5. What does it mean for something to be `composable` ?

- We have small pieces that we can put together to make something larger/greater than the individuals pieces.