## Discord Additions - Embed Builder
Some helpful additions to make creating embeds easier.

Versions `1.0.2` and beyond have been changed to be compatible with [Oceanic](https://github.com/OceanicJS/Oceanic) instead of Eris. If you're using this module with eris, do not update.

Get started by using our main class, the `EmbedBuilder`.
```ts
// const EmbedBuilder = require("@discord-additions/embed-builder");
import EmbedBuilder from "@discord-additions/embed-builder";

// undefined can be used to skip uneeded parameters - don't use null!
const embed = new EmbedBuilder();

// set author - name, icon url, url
embed.setAuthor("Hello", "https://i.furry.cool/DonPeek.png", "https://furry.cool");
// the get/remove helper methods exist for most functions
console.log(embed.getAuthor()); // { name: "Hello", icon_url: "https://i.furry.cool/DonPeek.png", url: "https://furry.cool" }
embed.removeAuthor();

// set color, accepts a number
embed.setColor(0xFFA500);

// set description
embed.setDescription("hi this is some description content");
console.log(embed.getDescription()); // hi this is some description content"
embed.setDescription("separate parameters will be", "joined by newlines");
console.log(embed.getDescription()); // separate parameters will be
// joined by newlines
embed.setDescription(["arrays are also", "accepted"], ["these will also be", "joined by newlines"]);
console.log(embed.getDescription()); // arrays are also
// accepted
// these will also be
// joined by newlines

// add a field - name, value, inline (optional)
embed.addField("field name", "field value");
embed.addField("field name", "field value", true);
embed.addField("field name", "field value", false);

// add a field with a blank name & value (zero width space) - inline
embed.addBlankField();
embed.addBlankField(true);
embed.addBlankField(false);

// add multiple fields manually
embed.addFields([/*(...)*/]);

// set the footer - text, icon url
embed.setFooter("hi", "https://i.furry.cool/DonMaidCrop.png");

// set the image - url
embed.setImage("https://i.furry.cool/DonCoffee.png");

// set the timestamp - time (accepts iso timestamp, a Date instance, or "now")
embed.setTimestamp("now");
// to retrieve current value as a Date: getTimestampDate

// set the title - title
embed.setTitle("some title stuff");

// set the url - url
embed.setURL("https://furry.cool");

// convert the embed to a json object
const json = embed.toJSON();
// convert the embed into a json object, inside of an array
const jsonArray = embed.toJSON(true);

// to load an embed from json, use the static loadFromJSON method - this accepts both a singular embed, and multiple embeds
const load1 = EmbedBuilder.loadFromJSON({ title: "embed #1" }); // EmbedBuilder
const load2 = EmbedBuilder.loadFromJSON([ { title: "embed #1" }, { title: "embed #2" } ]); // [EmbedBuilder, EmbedBuilder]
// if you still want to load from an array, but want a singular instance returned, you can set the forceSingular parameter to true
// this will throw away anything but the first embed
const load1FromArray = EmbedBuilder.loadJSON([ { title: "embed #1" } ], true); // EmbedBuilder 
```

## Install
```sh
npm i @discord-additions/embed-builder
```
