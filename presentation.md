<!-- .slide: class="title" -->

## Using TypeScript with the ArcGIS API for JavaScript

Nick Senger
&
Jesse van den Kieboom

---

<!-- .slide: class="agenda" -->

## Agenda

- TypeScript?
- Fundamentals
- Development tooling & setup
- Working with the 4.x JS API
- Accessor, decorators, and advanced concepts

---

<!-- .slide: class="section" -->

# TypeScript?

---

## Superset of JavaScipt

- *Transpiles* to JavaScript
- ESNext features (import, =>, rest/spread, async/await, etc)
- Types
- Compatible with existing JavaScript

---

## Benefits of TypeScript

![TypeScript](images/typescript.jpg)
- Easier for multiple people to work on
- Easier to refactor
- Easier to test
- Can help prevent technical debt

---

<!-- .slide: class="section" -->

# Fundamentals

---

## Primitive (Basic) Types

- `boolean`, `number`, `string`, `[]`, `{}`
- `any`

```ts
type Foo = number;

const foo: Foo = 8;
const bar: string = "Lorem ipsum";

// Here be dragons
const waldo: any = {
  doStuff: (things: any) => something
};
```

---

## Type Inference

- TypeScript compiler can infer types automatically 

```ts
let foo = 8; // number type is inferred

foo = 12; // Ok

foo = "12"; // Error!
```

---

## Interfaces

- Define contracts between parts of an application

```ts
type Foo = number;
type Bar = string;

interface Foobar {
  foo: Foo,
  bar: Bar
}

const baz: Foobar = { foo: 8, bar: "Lorem ipsum" }; // Ok
const qux: Foobar = { foo: "12", bar: "Lorem ipsum" } // Error!
```

---

- Interfaces facilitate predictable behavior

```ts
interface Foobar {
  foo: number,
  bar: string
}

const waldo = {
  doStuff: (things: Foobar): Foobar => ({
    foo: things.foo + 1,
    bar: `${things.bar}!`
  })
};

waldo.doStuff({ foo: 1, bar: "a" }); // Ok, { foo: 2, bar: "a!" }
waldo.doStuff(1, "a"); // Error!
```

---

## Classes

```ts
class Waldo {
  public doStuff(things: Foobar): Foobar { ... }

  private iterateNumber(num: number) {
    return num + 1;
  }

  private addExclamationPoint(str: string) {
    return `${str}!`;
  }
}

const testWaldo = new Waldo(); // Create a Waldo instance
testWaldo.iterateNumber(2); // Error!
```

---

## Extension

- Interfaces can extend other interfaces *or* classes
- Classes can extend other classes and *implement* interfaces

```ts
interface Point {
  x: number;
  y: number;
}

interface Point3d extends Point { z: number; }

class MyPoint implements Point3d {
  x = 0;
  y = 0;
  z = 0;
}

class My4dPoint extends MyPoint {
  time = Date.now();
}
```

---

<!-- .slide: class="section" -->

# Development tooling

---

## Essentials

- typescript: `npm install -g typescript`
- JS API 4.x typings: `npm install --save @types/arcgis-js-api`
- JS API 3.x typings: `npm install --save @types/arcgis-js-api@3`

---

## Recommended

- [Visual Studio Code](https://code.visualstudio.com/)
- tslint: `npm install --save tslint`
- dojo typings: `npm install --save dojo-typings`
- ts-node: `npm install -g ts-node`

---

## Setting Up

- [developers.arcgis.com/javascript/latest/guide/typescript-setup](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html)

---

<!-- .slide: class="section" -->

# Working with the API

---

<!-- .slide: class="section" -->

# Advanced concepts

---

<!-- .slide: class="questions" -->

## Questions?

**Help us to improve** by filling out the survey

![Survey](images/survey-slide.png)

---


<!-- .slide: class="end" -->
