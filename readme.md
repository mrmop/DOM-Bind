<h1>DOM Bind - A Simple HTML DOM to JavaScript data binder</h1>
Binds DOM elements to JS variables, two way bindings supported for text input elements.

<h2>Simple Bindings</h2>
Simple binding which binds a variable to a DOM element

// JS
var input = new Bind.Binding("input1", "hello");
input.onChanged = function(old_value, new_value)
{
	console.log("Changed from " + old_value + " to " + new_value);
};


// HTML
// &lt;input id="input1" tye="text /&gt;

<h2>Simple Array Bindings</h2>
Array binding which binds an array to a group of DOM elements

// JS
var DataArray = new Bind.BindingArray("t", [
	"Top 1",
	"Top 2",
	"Top 3",
	"Top 4",
]);

// HTML
&lt;ul id="list1"&gt;
	&lt;li id="t0" /&gt;
	&lt;li id="t1" /&gt;
	&lt;li id="t2" /&gt;
	&lt;li id="t3" /&gt;
&lt;/ul&gt;

<h2>Object Bindings</h2>
Object binding which binds an object to a group of DOM elements

// JS
var BindObject = new Bind.BindingObject("t", {
	name: "Mat",
	age: "21"
}

// HTML
&lt;ul id="list1"&gt;
	&lt;li id="tname" /&gt;
	&lt;li id="tage" /&gt;
&lt;/ul&gt;

<h2>Array of Object Bindings</h2>
Array binding which binds an array to a group of DOM elements

// JS
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

// HTML
&lt;ul id="list1"&gt;
	&lt;li id="t0name" /&gt;
	&lt;li id="t0age" /&gt;
	&lt;li id="t1name" /&gt;
	&lt;li id="t1age" /&gt;
	&lt;li id="t2name" /&gt;
	&lt;li id="t2age" /&gt;
&lt;/ul&gt;


