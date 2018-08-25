import Component from "./icon-button";

export default Component.extend({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["actived:button--actived"],

  /**
   * @protected
   * @since 1.0.0
   * @type {string}
   */
  kind: "toggle",

  /**
   * @public
   * @since 1.0.0
   * @type {boolean}
   */
  actived: false,

    /**
   * @since 1.0.0
   * @protected
   */
  click() {
    this.toggleProperty("actived");
    return this._super(...arguments);
  },
});
