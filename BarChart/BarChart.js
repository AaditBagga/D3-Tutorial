function _1(md){return(
    md`# Let’s Make a Bar Chart, Part 1`
    )}

    function _44(md){return(
    md`Say you have a little data—an array of numbers:`
    )}
    
    function _data(){return(
    [4, 8, 15, 16, 23, 42]
    )}
    
    function _3(md){return(
    md`A bar chart is a simple yet <a href="https://flowingdata.com/2010/03/20/graphical-perception-learn-the-fundamentals-first/">perceptually-accurate</a> way to visualize such data. This [multipart tutorial](/collection/@d3/lets-make-a-bar-chart) will cover how to make a bar chart with <a href="https://d3js.org">D3.js</a>. First we’ll make a bare-bones version in HTML, then gradually a more complete chart in SVG.`
    )}
    
    function _4(md){return(
    md`This tutorial will assume you have some web development experience: some familiarity with JavaScript, HTML, CSS, and the like. If you have questions or want help, please [post a comment](https://talk.observablehq.com). All the code is editable, so feel free to tinker, and fork this notebook to save your work!`
    )}
    
    function _selecting(md){return(
    md`## Selecting an Element`
    )}
    
    function _43(md){return(
    md`In vanilla JavaScript, you typically deal with elements one at a time. For example, to create a DIV element and set its content:`
    )}
    
    function _6()
    {
      const div = document.createElement("div");
      div.innerHTML = "Hello, world!";
      return div;
    }
    
    
    function _7(md){return(
    md`With D3 (as with jQuery and other libraries), you instead handle groups of related elements called *selections*. Working with elements *en masse* gives selections their power; you can manipulate a single element or many elements without substantially restructuring your code. Although this may seem like a small change, eliminating loops and other control flow can simplify your code.`
    )}
    
    function _8(md){return(
    md`A selection can be created in myriad ways. You can create one by querying a <a href="https://www.w3.org/TR/selectors-api/">*selector*</a>, which is a special string that identifies desired elements by property, say by name or class (<code>div</code> or <code>.foo</code>, respectively).`
    )}
    
    function _9(d3)
    {
      const p = d3.selectAll("p");
      // p.style("color", "red"); // Uncomment this line and run the code!
      // p.style("color", null); // Uncomment this line to clear the color.
      return p;
    }
    
    
    function _10(md){return(
    md`Or you can create a selection for a new, solitary, detached element. Calling [*selection*.node](https://d3js.org/d3-selection/control-flow#selection_node) will return this element, allowing it to be displayed.`
    )}
    
    function _11(d3)
    {
      const div = d3.create("div");
      div.html("Hello, world!");
      return div.node();
    }
    
    
    function _chaining(md){return(
    md`## Chaining Methods`
    )}
    
    function _42(md){return(
    md`Selection methods such as [*selection*.attr](https://d3js.org/d3-selection/modifying#selection_attr) and [*selection*.style](https://d3js.org/d3-selection/modifying#selection_style) support chaining: they return the current selection. This lets you easily apply multiple operations to the same elements.`
    )}
    
    function _13(d3){return(
    d3.create("span")
        .style("color", "white")
        .style("background-color", "black")
        .html("Hello, world!")
      .node()
    )}
    
    function _14(md){return(
    md`Without method chaining, you must store the selection in a local variable and repeat it for each operation.`
    )}
    
    function _15(d3)
    {
      const span = d3.create("span");
      span.style("color", "white");
      span.style("background-color", "black");
      span.html("Hello, world!");
      return span.node();
    }
    
    
    function _16(md){return(
    md`*“Span, span, span, span… wonderful span!”*`
    )}
    
    function _41(md){return(
    md`Note we didn’t need a local variable for the selection when method chaining: after applying any operations, the selection can be discarded. Method chaining lets you fret less over naming variables.`
    )}
    
    function _17(md){return(
    md`There is a gotcha with method chaining: while most operations return the current selection, some methods return something else. For example, [*selection*.append](https://d3js.org/d3-selection/modifying#selection_append) returns a new selection containing the new elements. (I prefer to indent four spaces for methods that return the current selection and two spaces for methods that return something else, such as *selection*.node or *selection*.append.)`
    )}
    
    function _18(md){return(
    md`Since method chaining can only be used to descend into the DOM hierarchy, use local variables to keep references to selections and go back up.`
    )}
    
    function _19(d3)
    {
      const table = d3.create("table");
      const tbody = table.append("tbody");
      tbody.append("tr").append("td").text("First!");
      tbody.append("tr").append("td").text("Second.");
      tbody.append("tr").append("td").text("Third.");
      return table.node();
    }
    
    
    function _manual(md){return(
    md`## Coding a Chart, Manually`
    )}

    function _40(md){return(
    md`Now consider how you might create a bar chart without JavaScript. There are only six numbers in this trivial dataset, so it’s not too hard to write a few elements by hand and be done with it.`
    )}
    
    function _21(html){return(
    html`<div style="font: 10px sans-serif; text-align: right; color: white;">
      <div style="background: steelblue; padding: 3px; margin: 1px; width: 40px;">4</div>
      <div style="background: steelblue; padding: 3px; margin: 1px; width: 80px;">8</div>
      <div style="background: steelblue; padding: 3px; margin: 1px; width: 150px;">15</div>
      <div style="background: steelblue; padding: 3px; margin: 1px; width: 160px;">16</div>
      <div style="background: steelblue; padding: 3px; margin: 1px; width: 230px;">23</div>
      <div style="background: steelblue; padding: 3px; margin: 1px; width: 420px;">42</div>
    </div>`
    )}
    
    function _22(md){return(
    md`(Careful readers will note that the three-pixel padding here distorts the accuracy of the chart by making the bars longer! This can be fixed via <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing">box-sizing: border-box</a>, or by switching to SVG, as we will in part 2.)`
    )}
    
    function _automatic(md){return(
    md`## Coding a Chart, Automatically`
    )}
    
    function _39(md){return(
    md`Of course, hard-coding is impractical for most datasets! So now let’s create the identical chart using D3. We’ll start with an empty container, and append a DIV for each bar with the desired width.`
    )}
    
    function _24(d3,data)
    {
      const div = d3.create("div")
          .style("font", "10px sans-serif")
          .style("text-align", "right")
          .style("color", "white");
    
      div.selectAll("div")
        .data(data)
        .join("div")
          .style("background", "steelblue")
          .style("padding", "3px")
          .style("margin", "1px")
          .style("width", d => `${d * 10}px`)
          .text(d => d);
    
      return div.node();
    }
    
    
    function _25(md){return(
    md`And here’s the same code in long form, with a few explanatory comments.`
    )}
    
    function _26(d3,data)
    {
      // Create an empty (detached) chart container.
      const div = d3.create("div");
    
      // Apply some styles to the chart container.
      div.style("font", "10px sans-serif");
      div.style("text-align", "right");
      div.style("color", "white");
    
      // Define the initial (empty) selection for the bars.
      const bar = div.selectAll("div");
    
      // Bind this selection to the data (computing enter, update and exit).
      const barUpdate = bar.data(data);
    
      // Join the selection and the data, appending the entering bars.
      const barNew = barUpdate.join("div");
    
      // Apply some styles to the bars.
      barNew.style("background", "steelblue");
      barNew.style("padding", "3px");
      barNew.style("margin", "1px");
    
      // Set the width as a function of data.
      barNew.style("width", d => `${d * 10}px`);
    
      // Set the text of each bar as the data.
      barNew.text(d => d);
    
      // Return the chart container.
      return div.node();
    }
    
    
    function _27(md){return(
    md`This code introduces a core concept of D3: the *data join*. This is a general pattern for creating, updating or destroying elements to reflect new data. It might feel odd—especially here where we’re only creating a static chart, joining an empty selection—but the benefit is generality. Whether you’re building a static chart or a dynamic one with animated transitions, this one pattern is all you need.`
    )}
    
    function _28(md){return(
    md`[*selection*.data](https://d3js.org/d3-selection/joining#selection_data) computes the *enter*, *update* and *exit* selections, while [*selection*.join](/@d3/selection-join) applies default logic for each, appending entering elements and removing exiting elements. (If desired, you can define more precise logic, say for animated transitions or incremental updates.)`
    )}
    
    function _29(md){return(
    md`D3’s selection methods such as <a href="https://d3js.org/d3-selection/modifying#selection_attr">*selection*.attr</a> and <a href="https://d3js.org/d3-selection/modifying#selection_style">*selection*.style</a> allow you to specify values either as a constant (the same for all selected elements) or a function (computed for each element). If the value of a particular attribute should be based on the element’s associated data, then use a function; otherwise, if it’s the same for all elements, then a string or number suffices.`
    )}
    
    function _scaling(md){return(
    md`## Scaling to Fit`
    )}
    function _31(md){return(
    md`A weakness of the code above is the <a href="https://en.wikipedia.org/wiki/Magic_number_(programming)#Unnamed_numerical_constants">magic number</a> 10 used to scale the data value to the appropriate pixel width. This number implicitly depends on the domain of the data (the maximum value, 42) and the width of the chart (420).`
    )}

    function _31(md){return(
    md`We can make these dependencies explicit by using a <a href="/@d3/d3-scalelinear">linear scale</a>. D3’s scales map a *domain* of abstract data to a *range* of a visual variable such as position.`
    )}
    
    function _x(d3,data){return(
    d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, 420])
    )}
    
    function _33(md){return(
    md`The returned *x*-scale is a function. When passed an abstract data value from the *domain*, it returns the corresponding visual value from the *range*.`
    )}
    
    function _34(x){return(
    x(4)
    )}
    
    function _35(x){return(
    x(16)
    )}
    
    function _36(md){return(
    md`To use the scale, we replace the hard-coded multiplication for the width by calling the scale function.`
    )}
    
    function _37(d3,data,x)
    {
      const div = d3.create("div")
          .style("font", "10px sans-serif")
          .style("text-align", "right")
          .style("color", "white");
    
      div.selectAll("div")
        .data(data)
        .join("div")
          .style("background", "steelblue")
          .style("padding", "3px")
          .style("margin", "1px")
          .style("width", d => `${x(d)}px`)
          .text(d => d);
    
      return div.node();
    }
    
    
    function _38(md){return(
    md`The bare-bones bar chart here is admittedly of limited value: it should have axes to assist in comparison, and you may prefer vertical columns to horizontal bars. For greater visual expression, let’s switch to Scalable Vector Graphics.`
    )}
    
    export default function define(runtime, observer) {
      const main = runtime.module();
      main.variable(observer()).define(["md"], _1);
      main.variable(observer()).define(["md"], _44);
      main.variable(observer("data")).define("data", _data);
      main.variable(observer()).define(["md"], _3);
      main.variable(observer()).define(["md"], _4);
      main.variable(observer("selecting")).define("selecting", ["md"], _selecting);
      main.variable(observer()).define(["md"], _43);
      main.variable(observer()).define(_6);
      main.variable(observer()).define(["md"], _7);
      main.variable(observer()).define(["md"], _8);
      main.variable(observer()).define(["d3"], _9);
      main.variable(observer()).define(["md"], _10);
      main.variable(observer()).define(["d3"], _11);
      main.variable(observer("chaining")).define("chaining", ["md"], _chaining);
      main.variable(observer()).define(["md"], _42);
      main.variable(observer()).define(["d3"], _13);
      main.variable(observer()).define(["md"], _14);
      main.variable(observer()).define(["d3"], _15);
      main.variable(observer()).define(["md"], _16);
      main.variable(observer()).define(["md"], _41);
      main.variable(observer()).define(["md"], _17);
      main.variable(observer()).define(["md"], _18);
      main.variable(observer()).define(["d3"], _19);
      main.variable(observer("manual")).define("manual", ["md"], _manual);
      main.variable(observer()).define(["md"], _40);
      main.variable(observer()).define(["html"], _21);
      main.variable(observer()).define(["md"], _22);
      main.variable(observer("automatic")).define("automatic", ["md"], _automatic);
      main.variable(observer()).define(["md"], _39);
      main.variable(observer()).define(["d3","data"], _24);
      main.variable(observer()).define(["md"], _25);
      main.variable(observer()).define(["d3","data"], _26);
      main.variable(observer()).define(["md"], _27);
      main.variable(observer()).define(["md"], _28);
      main.variable(observer()).define(["md"], _29);
      main.variable(observer("scaling")).define("scaling", ["md"], _scaling);
      main.variable(observer()).define(["md"], _31);
      main.variable(observer("x")).define("x", ["d3","data"], _x);
      main.variable(observer()).define(["md"], _33);
      main.variable(observer()).define(["x"], _34);
      main.variable(observer()).define(["x"], _35);
      main.variable(observer()).define(["md"], _36);
      main.variable(observer()).define(["d3","data","x"], _37);
      main.variable(observer()).define(["md"], _38);
      return main;
    }
    