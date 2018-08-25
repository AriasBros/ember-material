import Component from '@ember/component';
import { bool } from '@ember/object/computed';
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
  classNames: ["data-table"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["fullSize:data-table--full-size", "dividerStyle", "identifierClass"],

  /**
   * @since 1.0.0
   * @return {boolean}
   */
  fullSize: bool("full-size"),

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  "ful-size": false,

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  divider: false,

  /**
   * @since 1.0.0
   * @return {string|boolean}
   */
  dividerStyle: computed("divider", function() {
    if (this.get("divider") !== false) {
      const style = this.get("divider");

      if (style === true) {
        return "data-table--divider";
      } else {
        return "data-table--divider-" + style;
      }
    }

    return false;
  }),

    /**
   * @private
   * @since 1.0.0
   * @type {string}
   */
  identifierClass: computed("identifier", function() {
    const id = this.get("identifier");
    return id ? "data-table--" + id : null;
  }),
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  positionalParams: ["identifier"],
});

