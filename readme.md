<h1>DOM Bind - A Simple HTML DOM to JavaScript data binder</h1>
Binds DOM elements to JS variables, two way bindings supported for text input elements.

<h2>Simple Bindings</h2>
Simple binding which binds a variable to a DOM element

// JS
```
var input = new Bind.Binding("input1", "hello");
input.onChanged = function(old_value, new_value)
{
	console.log("Changed from " + old_value + " to " + new_value);
};
```

// HTML
```
<input id="input1" type="text" />
```

<h2>Simple Array Bindings</h2>
Array binding which binds an array to a group of DOM elements

// JS
```
var DataArray = new Bind.BindingArray("t", [
	"Top 1",
	"Top 2",
	"Top 3",
	"Top 4",
]);
```

// HTML
```
<ul id="list1">
	<li id="t0" />
	<li id="t1" />
	<li id="t2" />
	<li id="t3" />
</ul>
```

<h2>Object Bindings</h2>
Object binding which binds an object to a group of DOM elements

// JS
```
var BindObject = new Bind.BindingObject("t", {
	name: "Mat",
	age: "21"
}
```

// HTML
```
<ul id="list1">
	<li id="tname" />
	<li id="tage" />
</ul>
```

<h2>Array of Object Bindings</h2>
Array binding which binds an array to a group of DOM elements

// JS
```
var DataArrayObj = new Bind.BindingArrayObj("t", [
{
	name: "Mat",
	age: "21"
},
{
	name: "Marie",
	age: "20"
},
{
	name: "Doogle",
	age: "26"
}
]);

DataArrayObj.setAt(1, "name", "Maz");
console.log(DataArrayObj.getAt(1, "name"));
```

// HTML
```
<ul id="list1">
	<li id="t0name" />
	<li id="t0age" />
	<li id="t1name" />
	<li id="t1age" />
	<li id="t2name" />
	<li id="t2age" />
</ul>
```

