import Component from '@ember/component';
import { computed } from "@ember/object"

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
  classNames: ["list-view"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["lineClassName", "bordered:list-view--bordered"],

  /**
   * @since 1.0.0
   * @type {number}
   */
  lines: 1,

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  bordered: true,

  /**
   * @since 1.0.0
   * @return {string}
   */
  lineClassName: computed("lines", function() {
    const lines = this.get("lines");

    switch (lines) {
      case 1:
        return "list-view--item-single-line";

      case 2:
        return "list-view--item-two-lines";

      case 3:
        return "list-view--item-three-lines";
      
      default:
        return "list-view--item-lines-" + lines;
    }
  })
});
