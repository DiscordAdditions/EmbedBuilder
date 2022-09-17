import type { EmbedAuthorOptions, EmbedField, EmbedImageOptions, EmbedOptions } from "oceanic.js";
export default class EmbedBuilder {
	/**
	 * create an embed builder instance (or multiple) from the provided json
	 *
	 * @param {(EmbedOptions | Array<EmbedOptions>)} json - the embed json - accepts singular & array
	 * @param {boolean} [forceSingular=false] - force a singular return when an array is supplied
	 * @returns {(EmbedBuilder | Array<EmbedBuilder>)}
	 */
	static loadFromJSON(json: EmbedOptions): EmbedBuilder;
	static loadFromJSON<T extends boolean = false>(json: Array<EmbedOptions>, forceSingular?: T): T extends true ? EmbedBuilder : Array<EmbedBuilder>;
	static loadFromJSON(json: EmbedOptions | Array<EmbedOptions>, forceSingular?: boolean) {
		if (Array.isArray(json)) {
			const val = json.map((v) => EmbedBuilder.loadFromJSON(v));
			return forceSingular ? val[0] : val;
		} else return new EmbedBuilder().load(json);
	}
	private json: EmbedOptions = {};
	/**
	 * load json into this embed builder instance - use static loadFromJSON method
	 *
	 * @private
	 * @param {EmbedOptions} json - the json to load
	 * @returns {this}
	 */
	private load(json: EmbedOptions) {
		this.json = json;
		return this;
	}

	/**
	 * set the embed author
	 *
	 * @param {string} name - the name of the author
	 * @param {string} [iconURL] - an icon url for the author
	 * @param {string} [url] - a url for the author
	 * @returns {this}
	 */
	setAuthor(name: string, iconURL?: string, url?: string) {
		this.json.author = {
			name,
			iconURL,
			url
		};

		return this;
	}
	/**
	 * get the current author
	 *
	 * @returns {(EmbedAuthorOptions | undefined)}
	 */
	getAuthor() { return this.json.author; }
	/**
	 * remove the current author
	 *
	 * @returns {this}
	 */
	removeAuthor() { this.json.author = undefined; return this; }

	/**
	 * set the embed color
	 *
	 * @param {number} color - the color
	 * @returns {this}
	 */
	setColor(color: number) {
		this.json.color = color;
		return this;
	}
	/**
	 * get the current color
	 *
	 * @returns {(number | undefined)}
	 */
	getColor() { return this.json.color; }
	/**
	 * remove the current color
	 *
	 * @returns {this}
	 */
	removeColor() { this.json.color = undefined; return this; }

	/**
	 * set the embed description
	 *
	 * @param {...(string | Array<string>)} value - the description value
	 * @returns {this}
	 */
	setDescription(first: string | Array<string>, ...other: Array<(string | Array<string>)>) { this.json.description = [...(Array.isArray(first) ? first : [first]), ...(other.map(o => [...(Array.isArray(o) ? o : [o])].join("\n")))].join("\n"); return this; }
	/**
	 * get the current description
	 *
	 * @returns {(string | undefined)}
	 */
	getDescription() { return this.json.description; }
	/**
	 * remove the current description
	 *
	 * @returns {this}
	 */
	removeDescription() { this.json.description = undefined; return this; }

	/**
	 * add a field to the embed
	 *
	 * @param {string} name - the field name
	 * @param {string} value - the field value
	 * @param {boolean} [inline] - if the field should be inline
	 * @returns {this}
	 */
	addField(name: string, value: string, inline?: boolean) { this.json.fields = [...(this.json.fields ?? []), { name, value, inline }]; return this; }
	/**
	 * add a blank field to the embed (zero width spaces)
	 *
	 * @param {boolean} [inline] - if the field should be inline
	 * @returns {this}
	 */
	addBlankField(inline?: boolean) { return this.addField("\u200b", "\u200b", inline); }
	/**
	 * get the field at the specified index
	 *
	 * @param {number} index - the index of the field to get
	 * @returns {this}
	 */
	getField(index: number) { return (this.json.fields ?? [])[index]; }
	/**
	 * add multiple raw fields
	 *
	 * @param {...EmbedField} args - the fields to add
	 * @returns {this}
	 */
	addFields(...args: Array<EmbedField>) { args.forEach(arg => this.addField(arg.name, arg.value, arg.inline)); return this; }
	/**
	 * get the current fields
	 *
	 * @returns {Array<EmbedField>}
	 */
	getFields() { return (this.json.fields ?? []); }

	/**
	 * set the embed footer
	 *
	 * @param {string} text - the text
	 * @param {string} [iconURL] - the icon url
	 * @returns {this}
	 */
	setFooter(text: string, iconURL?: string) { this.json.footer = { text, iconURL }; return this; }
	/**
	 * get the current footer
	 *
	 * @returns {(string | undefined)}
	 */
	getFooter() { return this.json.footer; }
	/**
	 * remove the current footer
	 *
	 * @returns {this}
	 */
	removeFooter() { this.json.footer = undefined; return this; }

	/**
	 * set the embed image
	 *
	 * @param {string} url - image url
	 * @returns {this}
	 */
	setImage(url: string) { this.json.image = { url }; return this; }
	/**
	 * get the current image
	 *
	 * @returns {(EmbedImageOptions | undefined)}
	 */
	getImage() { return this.json.image; }
	/**
	 * remove the current image
	 *
	 * @returns {this}
	 */
	removeImage() { this.json.image = undefined; return this; }

	/**
	 * set the embed thumbnail
	 *
	 * @param {string} url - thumbnail url
	 * @returns {this}
	 */
	setThumbnail(url: string) { this.json.thumbnail = { url }; return this; }
	/**
	 * get the current thumbnail
	 *
	 * @returns {(EmbedImageOptions | undefined)}
	 */
	getThumbnail() { return this.json.thumbnail; }
	/**
	 * remove the current thumbnail
	 *
	 * @returns {this}
	 */
	removeThumbnail() { this.json.thumbnail = undefined; return this; }

	/**
	 * set the embed timestamp
	 *
	 * @param {(string | Date | "now")} time - an iso timestamp, Date object, or "now"
	 * @returns {this}
	 */
	setTimestamp(time: string | Date | "now") {
		if (time === "now") time = new Date().toISOString();
		if (time instanceof Date) time = time.toISOString();
		this.json.timestamp = time;
		return this;
	}
	/**
	 * get the current timestamp
	 *
	 * @returns {(string | undefined)}
	 */
	getTimestamp() { return this.json.timestamp; }
	/**
	 * get the current timestamp as a date object
	 *
	 * @returns {(Date | undefined)}
	 */
	getTimestampDate() { return !this.json.timestamp ? undefined : new Date(this.json.timestamp); }
	/**
	 * remove the current timestamp
	 *
	 * @returns {this}
	 */
	removeTimestamp() { this.json.timestamp = undefined; return this; }

	/**
	 * set the embed title
	 *
	 * @param {string} title - the title
	 * @returns {this}
	 */
	setTitle(title: string) { this.json.title = title; return this; }
	/**
	 * get the current title
	 *
	 * @returns {(string | undefined)}
	 */
	getTitle() { return this.json.title; }
	/**
	 * remove the current title
	 *
	 * @returns {this}
	 */
	removeTitle() { this.json.title = undefined; return this; }

	/**
	 * set the embed url
	 *
	 * @param {string} url - the url
	 * @returns {this}
	 */
	setURL(url: string) { this.json.url = url; return this; }
	/**
	 * get the current url
	 *
	 * @returns {(string | undefined)}
	 */
	getURL() { return this.json.url; }
	/**
	 * remove the current url
	 *
	 * @returns {this}
	 */
	removeURL() { this.json.url = undefined; return this; }

	/**
	 * convert this embed to a json object
	 *
	 * @param {boolean} array - if the returned value should be contained in an array
	 * @returns {(EmbedOptions | Array<EmbedOptions>)}
	 */
	toJSON(array: true): [EmbedOptions];
	toJSON(array?: false): EmbedOptions;
	toJSON(array = false) { return array ? [this.json] : this.json; }
}
