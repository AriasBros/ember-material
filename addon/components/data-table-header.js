import Component from '@ember/component';
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
  classNames: ["data-table__header"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["styleClass"],

  /**
   * @since 1.0.0
   * @type {string}
   */
  style: "row",

  /**
   * @since 1.0.0
   * @return {string}
   */
  styleClass: computed("style", function() {
    return "data-table__header--" + this.get("style") + "-style";
  }),
});
