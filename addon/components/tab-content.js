import Component from '@ember/component';
import { computed } from '@ember/object';

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
  classNames: ["tab-content"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["tabClass", "isActive:tab-content--active"],

  /**
   * @since 1.0.0
   * @type {string}
   */
  active: "",

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  tabClass: computed("tab-id", function() {
    return "tab-content--" + this.get("tab-id").replace("#", "");
  }),

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  isActive: computed("active", function() {
    return this.get("active") === this.get("tab-id");
  }),
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  positionalParams: ["tab-id"],
});
