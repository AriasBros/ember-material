import Component from '@ember/component';
import { tryInvoke } from '@ember/utils';

export default Component.extend({
  /**
   * @type {string}
   */
  tagName: "button",

  /**
   * @type {string[]}
   */
  classNames: ["action-item", "btn", "btn-link"],

  /**
   * @type {string}
   */
  tag: null,

  /**
   * @type {string}
   */
  icon: null,

  ////////////////
  // region Events

  click() {
    return tryInvoke(this, "action", [this.tag, this]) === true;
  }

  // endregion
}).reopenClass({
  /**
   * @type {string[]}
   */
  positionalParams: ['tag', "icon"],
});
