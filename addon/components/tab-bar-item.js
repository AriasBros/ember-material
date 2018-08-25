import Component from './material-component';
import { computed } from '@ember/object';

export default Component.extend({
  /**
   * @since 1.0.0
   * @type {string}
   */
  tagName: "li",

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNames: ["tab-bar-item"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["isActive:tab-bar-item--active"],

  /**
   * @since 1.0.0
   * @type {string}
   */
  active: "",

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  isActive: computed("active", function() {
    return this.get("active") === this.get("route");
  }),

  /**
   * @since 1.0.0
   * @type {string}
   */
  route: "#",

  labelOrIcon: computed("label", "icon", {
    set(key, value) {
      if (this.get("only-icon")) {
        this.set("icon", value);
      } else {
        this.set("label", value);
      }

      return value;
    },

    get() {
      return this.get("label") || this.get("icon");
    }
  }),

  /**
   * @since 1.0.0
   */
  click() {
    if (!this.get("isActive")) {
      this.set("active", this.get("route"));
    }

    return false;
  }
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  positionalParams: ["labelOrIcon", "route", "icon"],
});
