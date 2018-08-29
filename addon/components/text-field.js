import Component from '@ember/component';
import { computed } from '@ember/object';
import { bool } from '@ember/object/computed';
import { alias } from '@ember/object/computed';

export default Component.extend({
  /**
   * @since 1.0.0
   * @type {string}
   */
  tagName: "div",

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNames: ["text-field"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: [
    "filled:text-field--filled",
    "outlined:text-field--outlined",
    "activated:text-field--activated",
    "disabled:text-field--disabled",
    "value:text-field--with-input",
    "ripple:text-field--with-ripple",
    "errors:text-field--with-error",
    "nameClass"
  ],

  /**
   * @public
   * @since 1.0.0
   * @type {bool|Array|Object}
   *
   * @see https://emberjs.com/api/ember-data/3.3/classes/DS.Model/properties/errors?anchor=errors
   */
  errors: false,

  /**
   * @public
   * @since 1.0.0
   * @type {String}
   */
  label: null,

  /**
   * @public
   * @since 1.0.0
   * @type {String}
   */
  value: null,

  /**
   * @public
   * @since 1.0.0
   * @type {String}
   */
  name: null,

  /**
   * @since 1.0.0
   * @type {string}
   */
  nameClass: computed("name", function() {
    return "text-field--" + this.get("name");
  }),

  /**
   * @since 1.0.0
   * @type {Number}
   */
  count: computed("value", function() {
    return this.get("value").length;
  }),

  /**
   * @since 1.0.0
   * @type {Number|boolean}
   */
  max: false,

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  counter: bool("max"),

  /**
   * @since 1.0.0
   * @type {string}
   */
  helperText: alias("helper-text"),

  /**
   * @since 1.0.0
   * @type {string}
   */
  type: "text",

  /**
   * @since 1.0.0
   * @type {string}
   */
  style: "filled",

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  activated: false,

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  disabled: false,

  /**
   * @since 1.0.0
   * @type {boolean|string}
   */
  clearButton: computed("clear-button", "value", "activated", "cleaning", function() {
    const value = this.get("value");
    const cleaning = this.get("cleaning");
    const activated = this.get("activated");

    if ((value && activated) || cleaning) {
      return this.get("clear-button");
    }

    return false;
  }),

  /**
   * @since 1.0.0
   * @type {string}
   */
  customClearButtonIcon: computed("clear-button", function() {
    const icon = this.get("clear-button");
    return icon !== true ? icon : false;
  }),

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  ripple: computed("style", function() {
    return this.get("filled");
  }),

  /**
   * @since 1.0.0
   * @type {object}
   */
  actions: {
    /**
     * @since 1.0.0
     */
    clear() {
      this.set("cleaning", true);
      this.set("value", "");
      this.send("focus");
      this.set("cleaning", false);
    },

    focus() {
      this.$(".text-field__input").focus();
    }
  },

  /////////////////////////////
  // region Computed Properties

  /**
   * @since 1.0.0
   * @protected
   * @return {string}
   */
  inputId: computed("id", function () {
    const id = this.get("id");

    if (id) {
      return id + "-text-field";
    }

    return "";
  }),

  /**
   * @since 1.0.0
   * @public
   * @return {boolean}
   */
  filled: computed("style", function () {
    return this.get("style") === "filled";
  }),

  /**
   * @since 1.0.0
   * @public
   * @return {boolean}
   */
  outlined: computed("style", function () {
    return this.get("style") === "outlined";
  }),

  // endregion

  ////////////////
  // region Events

  /**
   * @since 1.0.0
   * @protected
   */
  focusIn() {
    if (!this.cleaning) {
      this.set("activated", true);
    }
  },

  /**
   * @since 1.0.0
   * @protected
   */
  input() {
    this.set("errors", false);
  },

  /**
   * @since 1.0.0
   * @protected
   */
  focusOut() {
    if (!this.cleaning) {
      this.set("activated", false);
    }
  },

  // endregion
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  positionalParams: ["name", "label", "value"],
});
