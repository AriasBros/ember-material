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
  classNames: ["data-table__column"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["identifierClass", "alignmentClass", "row-actions:data-table__column--row-actions"],

  /**
   * @since 1.0.0
   * @type {string}
   */
  placeholder: "-",

  /**
   * @since 1.0.0
   * @type {string}
   */
  align: "left",

  /**
   * @private
   * @since 1.0.0
   * @type {string}
   */
  identifierClass: computed("identifier", function() {
    const id = this.get("identifier");    
    return id ? "data-table__column--" + id : null;
  }),

  /**
   * @private
   * @since 1.0.0
   * @type {string}
   */
  alignmentClass: computed("align", function() {
    return "data-table__column--" + this.get("align") + "-align";
  }),

  /**
   * @since 1.0.0
   * @type {string}
   */
  content: null,
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  positionalParams: ["identifier", "content"],
});
