import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  /**
   * @since 1.0.0
   * @public
   * @type {string[]}
   */
  classNames: ["linear-progress", "mdc-linear-progress"],

  /**
   * @since 1.0.0
   * @public
   * @type {string[]}
   */
  classNameBindings: [
    "indeterminate:mdc-linear-progress--indeterminate",
    "reversed:mdc-linear-progress--reversed",
    "closed:mdc-linear-progress--closed",
  ],

  /**
   * @since 1.0.0
   * @public
   * @type {string[]}
   */
  attributeBindings: ["role"],

  /**
   * @since 1.0.0
   * @public
   * @type {string}
   */
  role: "progressbar",

  /**
   * @since 1.0.0
   * @public
   * @return {boolean}
   */
  indeterminate: computed("progress", function() {
    return typeof this.get("progress") === "boolean";
  }),

  /**
   * @since 1.0.0
   * @public
   * @type {boolean}
   */
  reversed: false,

  /**
   * @since 1.0.0
   * @public
   * @type {boolean}
   */
  hidden: false,

  /**
   * @since 1.0.0
   * @protected
   * @return {boolean}
   */
  closed: computed("hidden", "progress", function() {
    return this.get("hidden") === true || (this.get("progressIsNumeric") && this.get("progress") >= 1);
  }),

  /**
   * @since 1.0.0
   * @public
   * @type {number}
   */
  progress: false,

  /**
   * @since 1.0.0
   * @protected
   * @return {boolean}
   */
  progressIsNumeric: computed("progress", function() {
    return typeof this.get("progress") === "number";
  }),

  /**
   * @since 1.0.0
   * @public
   * @return {string}
   */
  styleIndicatorBar: computed("progress", function() {
    if (this.get("progressIsNumeric")) {
      return htmlSafe("transform: scaleX(" + this.get("progress") + ");");
    }

    return null;
  }),
});
