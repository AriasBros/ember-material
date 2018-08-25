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
  classNames: ["switch"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["on:switch--on:switch--off", "disabled:switch--disabled"],

  /**
   * @since 1.0.0
   * @type {string}
   */
  layoutName: 'components/switch',

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  on: false,

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  disabled: false,

  /**
   * @since 1.0.0
   */
  click() {
    this.toggleProperty("on");
    tryInvoke(this, "action", [this]);
  }
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  positionalParams: ["on"],
});
