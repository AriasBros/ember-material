import Component from './material-component';
import { inject as service } from '@ember/service';
import { tryInvoke } from '@ember/utils';
import { bool } from '@ember/object/computed';
import { computed } from '@ember/object';

/**
 * @since 1.0.0
 * @public
 * @abstract
 */
export default Component.extend({
  tooltipService: service("tooltip"),

  /**
   * @since 1.0.0
   * @type {string}
   */
  layoutName: 'components/button',

  /**
   * @since 1.0.0
   * @type {string}
   */
  tagName: "button",

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNames: ["button"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["hasLeadingIcon:button--with-leading-icon", "kindClass"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  attributeBindings: ["disabled", "type"],

  /**
   * @since 1.0.0
   * @return {boolean}
   */
  hasLeadingIcon: bool("icon"),

  /**
   * @public
   * @since 1.0.0
   * @type {string}
   */
  type: "button",

  /**
   * @public
   * @since 1.0.0
   * @type {string}
   */
  tooltip: null,

  /**
   * @protected
   * @since 1.0.0
   * @type {string}
   */
  kind: null,

  /**
   * @private
   * @since 1.0.0
   * @type {string}
   */
  kindClass: computed("kind", function() {
    return "button--" + this.get("kind");
  }),

  /**
   * @since 1.0.0
   * @public
   * @type {boolean}
   */
  disabled: false,

  /**
   * @since 1.0.0
   * @protected
   */
  click() {
    this.blur();

    const href = this.get("href");

    if (href) {
      return window.open(href, this.get("target"));
    } else {
      return tryInvoke(this, "action", [this]) === true;
    }
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

  /**
   * @since 1.0.0
   * @protected
   */
  blur() {
    this.$().blur();
  }
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  positionalParams: ["label"],
});
