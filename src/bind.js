var Bind = {}

//
// Simple binding which binds a variable to a DOM element
//
// e.g.
// var input = new Bind.Binding("input1", "hello");
// input.onChanged = function(old_value, new_value)
// {
//     console.log("Changed from " + old_value + " to " + new_value);
// };
//
// <input id="input1" tye="text />
//
Bind.Binding = function(elem_name, init_value)
{
    this.elem = document.getElementById(elem_name);
    if (this.elem === null)
    {
        console.log("Warning: Element '" + elem_name + "' not found in the DOM");
        return;
    }
    this._value = init_value;
    this.onChanged = undefined;
};

Object.defineProperty(Bind.Binding.prototype, "_value", {
    get: function()
    {
        return this.value;
    },
    set: function(value)
    {
        if (this.value !== value)
        {
            var old = this.value;
            this.value = value;
            if (this.elem.type && (this.elem.type === "text" || this.elem.type === "textarea"))
            {
                this.elem.value = value;
                if (this.elem.oninput === null)
                {
                    this.elem.oninput = function()
                    {
                        this.value = this.elem.value;
                        if (this.onChanged !== undefined)
                        {
                            this.onChanged(old, this.value);
                        }
                    }.bind(this);
                }
            }
            else
                this.elem.innerHTML = value;
            if (this.onChanged !== undefined)
            {
                this.onChanged(old, value);
            }
        }
    }
});

//
// Array binding which binds an array to a group of DOM elements
//
// e.g.
// var DataArray = new Bind.BindingArray("t", [
//     "Top 1",
//     "Top 2",
//     "Top 3",
//     "Top 4",
// ]);
//
// <ul id="list1">
//  <li id="t0" />
//  <li id="t1" />
//  <li id="t2" />
//  <li id="t3" />
// </ul>
//
Bind.BindingArray = function(base_elem_name, data)
{
    var arr = false;
    var length = data;
    if (data instanceof Array)
    {
        length = data.length;
        arr = true;
    }
    this.base_elem_name = base_elem_name;
    this.bindings = [];
    this.onChanged = undefined;
    for (var t = 0; t < length; t++)
    {
        this.bindings.push(new Bind.Binding(base_elem_name + t, arr ? data[t] : ""));
    }
};

Bind.BindingArray.prototype.setAt = function(index, value)
{
    if (this.bindings[index] === undefined)
    {
        this.bindings[index] = new Bind.Binding(this.base_elem_name + t, value);
        if (this.onChanged !== undefined)
        {
            this.onChanged(null, value);
        }
    }
    else
    {
        var old = this.bindings[index]._value;
        this.bindings[index]._value = value;
        if (this.onChanged !== undefined)
        {
            this.onChanged(old, value);
        }
    }
};

Bind.BindingArray.prototype.getAt = function(index)
{
    if (this.bindings[index] === undefined)
    {
        return null;
    }
    else
    {
        return this.bindings[index]._value;
    }
};

//
// Object binding which binds an object to a group of DOM elements
//
// e.g.
// var BindObject = new Bind.BindingObject("t", {
//    name: "Mat",
//    age: "21"
// }
//
// <ul id="list1">
//  <li id="tname" />
//  <li id="tage" />
// </ul>
//
Bind.BindingObject = function(base_elem_name, object)
{
    this.base_elem_name = base_elem_name;
    this.bindings = {};
    this.onChanged = undefined;
    for (var prop in object)
    {
        if (object.hasOwnProperty(prop))
        {
            this.bindings[prop] = new Bind.Binding(base_elem_name + prop, object[prop]);
        }
    }
};

Bind.BindingObject.prototype.set = function(property, value)
{
    if (this.bindings[property] === undefined)
    {
        this.bindings[property] = new Bind.Binding(this.base_elem_name + property, value);
        if (this.onChanged !== undefined)
        {
            this.onChanged(null, value);
        }
    }
    else
    {
        var old = this.bindings[property]._value;
        this.bindings[property]._value = value;
        if (this.onChanged !== undefined)
        {
            this.onChanged(old, value);
        }
    }
};

Bind.BindingObject.prototype.get = function(property)
{
    if (this.bindings[property] === undefined)
    {
        return null;
    }
    else
    {
        return this.bindings[property]._value;
    }
};


//
// Array binding which binds an array to a group of DOM elements
//
// e.g.
// var DataArrayObj = new Bind.BindingArrayObj("t", [
//  {
//      name: "Mat",
//      age: "21"
//  },
//  {
//      name: "Marie",
//      age: "20"
//  },
//  {
//      name: "Doogle",
//      age: "26"
//  }
// ]);
// DataArrayObj.setAt(1, "name", "Maz");
// console.log(DataArrayObj.getAt(1, "name"));
//
// <ul id="list1">
//  <li id="t0name" />
//  <li id="t0age" />
//  <li id="t1name" />
//  <li id="t1age" />
//  <li id="t2name" />
//  <li id="t2age" />
// </ul>
//
Bind.BindingArrayObj = function(base_elem_name, obj_array)
{
    var length = obj_array.length;
    this.base_elem_name = base_elem_name;
    this.bindings = [];
    this.onChanged = undefined;
    for (var t = 0; t < length; t++)
    {
        this.bindings.push(new Bind.BindingObject(base_elem_name + t, obj_array[t]));
    }
};

Bind.BindingArrayObj.prototype.setAt = function(index, prop, value)
{
    var old = this.bindings[index].get(prop);
    this.bindings[index].set(prop, value);
    if (this.onChanged !== undefined)
    {
        this.onChanged(old, value);
    }
};

Bind.BindingArrayObj.prototype.getAt = function(index, prop)
{
    if (this.bindings[index] === undefined)
    {
        return null;
    }
    else
    {
        return this.bindings[index].get(prop);
    }
};

