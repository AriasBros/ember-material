import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  /**
   * @since 1.0.0
   * @type {string}
   */
  tagName: "ul",

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNames: ["tab-bar"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["fixed:tab-bar--fixed", "clustered:tab-bar--clustered"],

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  fixed: computed("style", function() {
    return this.get("style") === "fixed";
  }),

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  clustered: computed("style", function() {
    return this.get("style") === "clustered";
  }),

  /**
   * @since 1.0.0
   * @type {string}
   */
  style: "fixed",
});
