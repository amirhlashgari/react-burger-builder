# React Burger Builder

## Description
this repository contains my training process while coding along with react burger builder course academind by [Maximilian Schwarzmüller](https://www.linkedin.com/in/maximilian-schwarzmueller/).

## Usage

### Installing
you should start with `npm install` to create node_modules folder according to defined packages in `package.json` file.

### Used Stacks

  - ReactJs as Frontend
  - Firebase as Backend (uses built-in authentication of firebase)
  - Redux as state management system

### Folder Structure

```
react-burger-builder/     # Root directory
|- config/      # webpack and unit testing setup
|- public/      # where our main index.html exists
|- scripts/     # created main scripts by react-scripts for use in package.json 
|- src/
    |-- components/     # where stateless components exist
    |-- containers/     # where statefull components exist 
    |-- hoc/     # higher order components 
    |-- hoc/     # higher order components 
    |-- hooks/     # custom react hooks  
    |-- store/     # redux store  

```

### Start

`npm run build`: builds the app for production to the `build` folder.

`npm start`: run project in `http://localhost:3000/`.

`npm test`: launches the test runner in the interactive watch mode.
