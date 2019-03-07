This project is a game engine written in React.js for playing interactive fiction games made with JSON files. I had a class project a while back to make a text adventure game in C++. I was very proud of it, but it wasn't very easy to share with my friends and family. I created this engine with that very game in mind so that I could send everyone to a simple website to play it. The first version of this engine is purpose-built with the features that I needed in that game.

## Creating a game

A game is written and stored in a properly-formatted JSON file. Perhaps a future project of mine will be to write a web app that allows you to create and edit these JSON files in the browser without writing any JSON directly. This JSON is saved as `src/game.json`. This is a guide to all of the features that `if-react` can implement based on your game file.

`game.json` has 3 properties, which are all objects:
* `variables`
* `inventory`
* `rooms`

```javascript
{
	"variables": {},
	"inventory": {},
	"rooms": {}
}
```

### Variables
`variables` is an object that can have 3 different properties: `preset`, `random`, and `permutation`, which each contain an array. These arrays contain one object for each variable you want to add into the game. They each have a `name` and a `value` property. All name values should be valid JavaScript variable names. This name is how you will refer to the variable in other parts of the code. The sepecifics differ for each type.

```javasscript
"variables": {
	"preset": [],
	"random": [],
	"permutation": []
}
```

#### `variables.preset`
These represent variables that have a pre-determined value at the beginning of the game. While nothing is stopping you from using any data type as their value, the engine currently only has the ability to update Booleans, so the values will most likely be true or false.

```javascript
"preset": [
	{
		"name": "bool1",
		"value": true
	},
	{
		"name": "bool1",
		"value": false
	}
]
```

#### `variables.random`
These represent a variable that will have a randomly-assigned value at the beginning of each new game, but that will stay persistent throughout one life in a game. The `value` should contain an array of the possible values.

```javascript
"random": [
	{
		"name": "multiple_choice",
		"value": [1, 2, 3, 4]
	}
]
```

#### `variables.permutation`
These represent multiple variables that will have randomly-assigned values, similar to `variables.random`. `variables.permutation` however ensure that each variable contains a distinct value from one another. `names` and `values` both contain an array.

```javascript
"permutation": [
	{
		"names": ["q1", "q2"],
		"values": [1, 2, 3, 4]
	}
]
```

### Inventory
`inventory` is an object used to manage an inventory system in the game. Each object contained in `inventory` is representative of one inventory item in your game and may be named as you see fit. This key to the object is how you will refer to it in other parts of the code, therefore it should be a valid JavaScript variable name.

```javascript
"inventory": {
	"pickaxe": {},
	"plank_of_wood": {},
	"rocks": {}
}
```

An item in the inventory has the following properties: `name`, `status`, `conditions`, and `default`.

`name` represents the text that will appear in the game when the item is in your inventory. It will appear on a button that will allow you to attempt to use the item.

`status` is the default status of the item, true or false. If it is true, you start the game with the item. If it is false, you don't. You'll pick it up later.

`default` represents the text that will be displayed if you attempt to use the object under any circumstances that don't produce a result.

`conditions` is an array containing objects. These objects contain a few properties. `room` is the ID of the room that will trigger a result if you use the item inside. `true` or `false` are arrays with additional booleans that must be correct in `variables` for this condition to trigger. `destination` is where you will be redirected when using the item in these circumstances. An optional property: `"used": true` may be added to remove the item from your inventory when it is used.

```javascript
"pickaxe": {
	"name": "Use the pickaxe.",
	"status": false,
	"default": "Ain't nothin' to pick here.",
	"conditions": [
		"room": "mine",
		"true": ["bool1"],
		"false": ["bool2", "bool3"],
		"destination": "gold_reserve",
		"used": true
	]
}
```

### Rooms
`rooms` are the core experience of the game and will make up the bulk of your game file. It contains objects that represent each room in the game. It also contains two special objects: `home` and `gameover`.

```javascript
"rooms": {
	"home": {},
	"gameover": {},
	"room1": {},
	"room2": {},
	"room3": {}
}
```

#### `rooms.home`
This is the homepage. The first thing that is shown when loading the page. It contains a `name` that will be displayed the top of the screen (a good place to put the title of your game), a `description` that can be as much text as you want, and `start` the ID of the room where your game starts. Note, this page is loaded outside of the of the game itself, and no variables will be loaded yet, so you cannot use variables on this page.

```javascript
"home": {
	"name": "My Game",
	"description": "Get ready to play my game.",
	"start": "room1"
}
```

#### `rooms.gameover`
This is an object containing more objects. Each object here represents a possible gameover scenario. These objects contain a `name` which will display as the title on the page and a `description`, which will be the body text on the page.

```javascript
"gameover": {
	"death": {
		"name": "You died.",
		"description": "What a loser. You deserve it. Game over."
	},
	"victory": {
		"name": "You win!",
		"description": "You're the best person who's ever lived. You killed the bad guy."
	}
}
```

#### Rooms
Rooms are a big topic with a lot to cover. They contain the following:

```javascript
"basement": {
	"name": "Basement",
	"description": "It's dark down here.",
	"links": [],
	"soft_links": [],
	"conditions": []
}
```

`name` represents the text that will be displayed as the title on the page. Usually the title of the room. This field is optional.

`description` represents the bulk of the text on the page. You describe the room. You describe the options. The narrative lives here. The bulk of the game lives in this section. You will often want to interpolate variable names into your text here. To do this, `description` may point to an array of strings rather than a single string. If any string in this array begins with a `$` character, the rest of the string will be interpreted as the ID for a variable, and that variable's value will replace that string. Make sure to be careful with spaces around these variables. `\n` works to create a new paragraph.

```javascript
"description": ["I am ", "$age", " years old."]
```

`links` is an array of objects that represents other rooms you can travel to from this room. Each link object contains a `text` that will be displayed on the button and an `action` that will contain the destination of the link.

```javascript
"links": [
	{
		"text": "Go back outside.",
		"action": "outside"
	}
]
```

`soft_links` are similar to `links`, except rather than take you to a new destination, its `action` displays text on the page, and the link disappears until you re-enter the room.

```javascript
"soft_links": [
	{
		"text": "Inspect the painting.",
		"action": "The painting looks like your mom."
	}
]
```

`links` and `soft_links` may contain an optional property called `udpdates` that updates certain variables as either true or false. These variables are in an array with `true` and `false` as keys.

```javascript
"links": [
	{
		"text": "",
		"action": "",
		"updates": {
			"true": ["bool1", "bool2"],
			"false": ["bool3"] }
	}
]
```

A variable here may be written as `inventory.itemName` if the goal is to update the status of an item in the inventory.

Similarly, a destination room may be written as `gameover.roomName` to take you to a gameover room.

`conditions` describe certain conditions that might change the description of the room you are in. These are an array of objects, one object for each condition. These conditions may be nested with additional conditions. Each contains a property with a key `true` or `false` which points to a variable you're checking for. It can also instead contain a key `equals` which points to an array containing a variable name and a value in that order. If this variable matches they key, the room will take this condition's `description` instead of the default one.

```javascript
"conditions": [
	{
		"true": "bool1",
		"description": "bool1 is true, bool2 is false",
		"conditions": [
			{
				"equals": ["bool2", true],
				"description": "bool1 and bool2 are both true"
			}
		]
	},
	{
		"false": "bool1",
		"description": "bool1 is false"
	}
]
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
