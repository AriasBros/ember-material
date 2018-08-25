import Component from './text-field';
import { computed } from '@ember/object';

export default Component.extend({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNames: ["text-area"],

  /**
   * @since 1.0.0
   * @type {string}
   */
  nameClass: computed("name", function() {
    return "text-area--" + this.get("name");
  }),

  ////////////////
  // region Events

  /**
   * @since 1.0.0
   * @protected
   */
  click() {
    this.send("focus");
  },

  // endregion
});
