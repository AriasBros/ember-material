import Component from './material-component';
import { tryInvoke } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Component.extend({
  tooltipService: service("tooltip"),

  /**
   * @since 1.0.0
   * @type {string}
   */
  tagName: "li",

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNames: ["navigation-item"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["divider:navigation-item--divider", "push:navigation-item--push"],

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  divider: false,

  /**
   * @type {boolean}
   */
  push: false,

  /**
   * @since 1.0.0
   * @type {String}
   */
  label: null,

  /**
   * @since 1.0.0
   * @type {String}
   */
  route: null,

  /**
   * @since 1.0.0
   * @type {String}
   */
  icon: null,

  /**
   * @since 1.0.0
   */
  click() {
    return tryInvoke(this, "action", [this]) === true;
  },

  /**
   * @since 1.0.0
   * @protected
   */
  mouseEnter() {
    if (this.get("tooltip")) {
      this.get("tooltipService").present(this.elementId);
    }
  },

  /**
   * @since 1.0.0
   * @protected
   */
  mouseLeave() {
    if (this.get("tooltip")) {
      this.get("tooltipService").dismiss(this.elementId);
    }
  },
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  positionalParams: ["label", "route", "model"],
});

