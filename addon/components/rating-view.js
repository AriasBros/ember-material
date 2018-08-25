import Component from '@ember/component';
import { computed } from '@ember/object';
import { bool, not } from '@ember/object/computed';

export default Component.extend({
    /**
     * @public
     * @since 1.0.0
     * @type {string}
     */
    tagName: "div",

    /**
     * @public
     * @since 1.0.0
     * @type {string[]}
     */
    classNames: ["rating-view"],

    /**
     * @public
     * @since 1.0.0
     * @type {string[]}
     */
    classNameBindings: ["unrated:rating-view--unrated", "usingIconsAsResources:rating-view--icon:rating-view--image"],

    /**
     * @public
     * @since 1.0.0
     * @type {string[]}
     */
    attributeBindings: ["title"],

    /**
     * @public
     * @since 1.0.0
     * @type {number}
     */
    ratings: 1,

    /**
     * @public
     * @since 1.0.0
     * @type {number}
     */
    value: -1,

    /**
     * @public
     * @since 1.0.0
     * @type {number}
     */
    items: 10,

    /**
     * @public
     * @since 1.0.0
     * @type {number}
     */
    max: 10,

    /**
     * @public
     * @since 1.0.0
     * @type {number}
     */
    min: 0,

    /**
     * @public
     * @since 1.0.0
     * @type {string}
     */
    resourceType: "icon",

    /**
     * @public
     * @since 1.0.0
     * @type {boolean}
     */    
    rated: bool("ratings"),

    /**
     * @public
     * @since 1.0.0
     * @type {boolean}
     */    
    unrated: not("rated"),

    /**
     * @public
     * @since 1.0.0
     * @type {string}
     */    
    full: "star",

    /**
     * @public
     * @since 1.0.0
     * @type {string}
     */    
    half: "star_half",

    /**
     * @public
     * @since 1.0.0
     * @type {string}
     */    
    empty: "star_border",

    /**
     * @public
     * @since 1.0.0
     * @type {boolean}
     */
    usingIconsAsResources: computed("resourceType", function() {
        return this.get("resourceType") === "icon";
    }),

    /**
     * @protected
     * @since 1.0.0
     * @return {number}
     */
    fullCounter: computed("roundedValue", function() {
        const counter = [];

        for (let i = 0; i < this.get("roundedValue"); i++) {
            counter.push(1);
        }

        return counter;
    }),

    /**
     * @protected
     * @since 1.0.0
     * @return {number}
     */
    emptyCounter: computed("offsetValue", function() {
        const counter = [];

        for (let i = 1; i < this.get("offsetValue"); i++) {
            counter.push(1);
        }

        return counter;
    }),

    /**
     * @protected
     * @since 1.0.0
     * @return {number}
     */
    normalizedValue: computed("value", "items", "max", function() {        
        return this.get("value") * this.get("items") / this.get("max"); 
    }),

    /**
     * @protected
     * @since 1.0.0
     * @return {number}
     */
    roundedValue: computed("normalizedValue", function() {
        return Math.floor(this.get("normalizedValue"));
    }),

    /**
     * @protected
     * @since 1.0.0
     * @return {number}
     */
    offsetValue: computed("normalizedValue", function() {
        let value = Math.ceil(this.get("items") - this.get("normalizedValue"));

        if (this.get("isRoundedValue")) {
            value++;
        }

        return value;
    }),

    /**
     * @protected
     * @since 1.0.0
     * @return {boolean}
     */
    isRoundedValue: computed("normalizedValue", function() {
        const value = this.get("items") - this.get("normalizedValue");
        return value - Math.floor(value) === 0;
    }),
}).reopenClass({
    /**
     * @since 1.0.0
     * @type {string[]}
     */
    positionalParams: ["value", "max", "items"],
});