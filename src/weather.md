---
theme: dashboard
toc: false
---

# Weather report

```js
const forecast = FileAttachment("./data/forecast.json").json();
const kbdata = FileAttachment("./data/20240613_KB.json").json();
```

```js
display(forecast);
display(kbdata);
```

```js
function temperaturePlot(data, { width } = {}) {
  return Plot.plot({
    title: "Hourly temperature forecast",
    x: { type: "utc", ticks: "day", label: null },
    y: { grid: true, inset: 10, label: "Degrees (F)" },
    marks: [
      Plot.lineY(forecast.properties.periods, {
        x: "startTime",
        y: "temperature",
        z: null, // varying color, not series
        stroke: "temperature",
        curve: "step-after",
      }),
    ],
  });
}
```

<!-- ```js
display(temperaturePlot(forecast));
``` -->

<div class="grid grid-cols-1">
  <div class="card">${resize((width) => temperaturePlot(forecast, {width}))}</div>
</div>

<div class="card" style="max-width: 640px;">
  <h2>It gets hotter during summer</h2>
  <h3>And months have 28–31 days</h3>
  ${Plot.cell(weather.slice(-365), {x: (d) => d.date.getUTCDate(), y: (d) => d.date.getUTCMonth(), fill: "temp_max", tip: true, inset: 0.5}).plot({marginTop: 0, height: 240, padding: 0})}
</div>


```js
const industryInput = Inputs.select(
  industries.map((d) => d.industry),
  { unique: true, sort: true, label: "Industry:" }
);
const industry = Generators.input(industryInput);
```

  <div class="card" style="padding: 0;">
    ${Inputs.table(industries)}
  </div>

<div class="card" style="display: flex; flex-direction: column; gap: 1rem;">
  ${industryInput}
  ${resize((width) => Plot.plot({
    width,
    y: {grid: true, label: "Unemployed (thousands)"},
    marks: [
      Plot.areaY(industries.filter((d) => d.industry === industry), {x: "date", y: "unemployed", fill: "var(--theme-foreground-muted)", curve: "step"}),
      Plot.lineY(industries.filter((d) => d.industry === industry), {x: "date", y: "unemployed", curve: "step"}),
      Plot.ruleY([0])
    ]
  }))}
</div>

<div class="grid grid-cols-4">
  <div class="card">

Putting all the **Markdown** stuff at the end... this is inside of _HTML_!

  </div>
</div>

<details>
  <summary>Click me</summary>
  This text is not visible by default.
</details>

<div class="grid grid-cols-2">
  <div class="card grid-colspan-2">one–two</div>
  <div class="card">three</div>
  <div class="card">four</div>
</div>

<div class="grid grid-cols-2">
  <div class="card"><h1>A</h1>1 × 1</div>
  <div class="card grid-rowspan-2"><h1>B</h1>1 × 2</div>
  <div class="card"><h1>C</h1>1 × 1</div>
  <div class="card grid-colspan-2"><h1>D</h1>2 × 1</div>
</div>

## A second-level heading

### A third-level heading

this is **bold** text
this is **bold** text
this is _italic_ text
this is _italic_ text
this is ~~strikethrough~~ text
this is `monospaced` text

> this is quoted text

- red
- green
- blue
  - light blue
  - dark blue

1. first
1. second
1. third
   1. third first
   1. third second

[relative link](./dashboard)
[external link](https://example.com)
[external link](<https://en.wikipedia.org/wiki/Tar_(computing)>)

<div class="grid grid-cols-4">
  <div class="card">

![A horse](./horse.jpg)
![A happy kitten](https://placekitten.com/200/300)

  </div>
</div>

```js
   Plot.lineY(aapl, {x: "Date", y: "Close"}).plot({y: {grid: true}})
```

```js
   html`<span style=${{color: `hsl(${(now / 10) % 360} 100% 50%)`}}>Rainbow text!</span>`
```

<!-- Inline expressions: -->

You rolled ${Math.floor(Math.random() * 20) + 1}.

The current time is ${new Date(now).toLocaleTimeString("en-US")}.

```js
const numberInput = Inputs.input(0);
const number = Generators.input(numberInput);
```

interpolate a sparkline
${Plot.plot({axis: null, margin: 0, width: 80, height: 17, x: {type: "band", round: false}, marks: [Plot.rectY(aapl.slice(-15 - number, -1 - number), {x: "Date", y1: 150, y2: "Close", fill: "var(--theme-foreground-focus)"})]})}

or even a reactive input 
${Inputs.bind(html`<input type=range style="width: 120px;">`, numberInput)} ${number}

Your lucky number is ${Math.floor(Math.random () * 10)}!


```js
const width = 1152;
const name = Generators.input(nameInput);
```

resize((width) => `I am ${width} pixels wide.`)

<input id="nameInput">

Hello, ${name || "anonymous"}!

```js
const pointer = Generators.observe((change) => {
  const pointermoved = (event) => change([event.clientX, event.clientY]);
  addEventListener("pointermove", pointermoved);
  change([0, 0]);
  return () => removeEventListener("pointermove", pointermoved);
});
```


```js
pointer.map(Math.round) // try moving your mouse
```

<!-- React -->
```jsx
function Greeting({subject}) {
  return <div>Hello, <b>{subject}</b>!</div>
}
```

<!-- Note: use js for declaring vars -->
```js
const name2 = view(Inputs.text({label: "Name", placeholder: "Anonymous"}));
```

```jsx
display(<Greeting subject={name2 || "anonymous"} />);
```