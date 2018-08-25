import Component from './material-component';

export default Component.extend({
  /**
   * @since 1.0.0
   * @type {string}
   */
  tagName: "span",

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNames: ["icon"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["iconClass"],
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  positionalParams: ["icon"],
});
