import Component from './material-component';

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
  classNames: ["spacer"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["vertical:spacer--vertical", "horizontal:spacer--horizontal"],

  /**
   * @since 1.0.0
   * @type {string}
   */
  layoutName: 'components/spacer',

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  vertical: true,

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  horizontal: true
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  positionalParams: ["horizontal", "vertical"],
});
