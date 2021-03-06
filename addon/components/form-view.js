import Component from '@ember/component';
import { computed } from '@ember/object';
import { tryInvoke } from '@ember/utils';

export default Component.extend({
  /**
   * @since 1.0.0
   * @type {string}
   */
  tagName: "form",

  /**
   * @since 1.0.0
   * @type {string}
   */
  layoutName: 'components/form',

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNames: ["form"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["formNameClass"],

  /**
   * @since 1.0.0
   * @return {string}
   */
  formNameClass: computed("name", function() {
    return "form--" + this.get("name");
  }),

  /**
   * @since 1.0.0
   * @type {string}
   */
  name: "",

  submit() {
    return tryInvoke(this, "action", [this]) === true;
  }
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  positionalParams: ["name"],
});
