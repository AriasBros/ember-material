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
  classNames: ["card"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["elevated:card--elevated", "outlined:card--outlined"],

  /**
   * @since 1.0.0
   * @type {string}
   */
  style: "elevated",

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  elevated: computed("style", function () {
    return this.get("style") === "elevated";
  }),

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  outlined: computed("style", function () {
    return this.get("style") === "outlined";
  }),
});
