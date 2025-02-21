1. What is a React component ?
- Is a reusable building blocks of react application, and is a function that returns a react elements.

- And `react elements` are the objects that are created when we return the JSX.

- Jsx is a special syntax in react js and it allows us to write html and javascript together.

- JSX is converted to a javascript by a babel in order the website to execute it.

- Under the hood the JSX is returning `a regular javascript object`.

- And these javascript objects are eventually these elements are turned into a real DOM elements that people can see on the screen.

- A component can be used again and again by calling it from app.jsx.

2. What's wrong with this code ?
```
function myComponent(){
    return (
        <p>Iam a good text</p>
    )
}

```
- The component created is started through `small` letter so to fixed it `start it with capital letter`.


3. What's wrong with this code ?
```
function Header(){
    return (
        <header>Iam a good text</header>
    )
}
ReactDOM.render(header(), document.querySelector("#root))

```

- Instead of calling our function by adding `parenthesis` at the end, with function components in react when calling a function `you have to surround it with "angle brackets"` as if it's a regular html tag.

- In React this is the correct way to `call your component` or `create an instance of your component`.