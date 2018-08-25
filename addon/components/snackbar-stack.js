import Component from './material-component';
import { inject } from '@ember/service';

/**
 * @since 1.0.0
 * @public
 * @abstract
 */
export default Component.extend({
  service: inject("snackbar"),

  /**
   * @since 1.0.0
   * @type {string}
   */
  tagName: "div",

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNames: ["snackbar-stack"],
});