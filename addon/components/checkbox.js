import Component from './material-component';
import { tryInvoke } from '@ember/utils';

/**
 * @public
 * @since 1.0.0
 * @abstract
 */
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
  classNames: ["checkbox"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["selected:checkbox--selected:checkbox--unselected", "indeterminate:checkbox--indeterminate", "disabled:checkbox--disabled"],

  /**
   * @since 1.0.0
   * @type {string}
   */
  layoutName: 'components/checkbox',

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  selected: false,

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  indeterminate: false,

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  disabled: false,

  /**
   * @since 1.0.0
   * @type {string}
   */
  label: null,

  /**
   * @since 1.0.0
   */
  click() {
    if (!this.get("disabled")) {
      this.toggleProperty("selected");
      tryInvoke(this, "action", [this]);
    }

    return false;
  }
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  positionalParams: ["selected", "label"],
});
