import Component from '@ember/component';

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
  classNames: ["centered-container"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["vertical:centered-container--vertical", "horizontal:centered-container--horizontal"],

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  vertical: true,
  
  /**
   * @since 1.0.0
   * @type {boolean}
   */
  horizontal: true,
});
