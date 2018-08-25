import Component from "./button";

export default Component.extend({
  /**
   * @protected
   * @since 1.0.0
   * @type {string}
   */
  kind: "icon",

  /**
   * @since 1.0.0
   * @return {boolean}
   */
  hasLeadingIcon: false,
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  positionalParams: ["icon", "iconType"],
});
