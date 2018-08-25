import Component from './material-component';
import { inject as service } from '@ember/service';
import { addListener } from '@ember/object/events';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';
import { htmlSafe } from '@ember/string';

/**
 * @public
 * @since 1.0.0
 * @abstract
 */
export default Component.extend({
  tooltip: service(),

  /**
   * @since 1.0.0
   * @type {string}
   */
  layoutName: 'components/tooltip',

  /**
   * @since 1.0.0
   * @type {string}
   */
  tagName: "div",

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNames: ["tooltip"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["visible:tooltip--visible", "hiding:tooltip--hiding"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  attributeBindings: ["id", "styleAttribute:style"],

  /**
   * @since 1.0.0
   * @type {string}
   */
  id: computed("name", function() {
    return "tooltip--" + this.get("name");
  }),

  /**
   * @protected
   * @since 1.0.0
   * @type {string}
   */
  styleAttribute: computed("visible", function() {
    const parent = this.$().parent();

    if (parent.length) {
      const sidesMargin = 8;
      let position = { top: 0, left: 0 };

      if (this.get("position") === "right") {
        position = this.rightPosition(parent, sidesMargin);
      } else {
        position = this.bottomPosition(parent, sidesMargin);
      }

      return htmlSafe(`top:${position.top}px; left:${position.left}px;`);
    }
  }),

  /**
   * @private
   * 
   * @param {*} parent 
   * @param {*} sidesMargin 
   */
  rightPosition(parent, sidesMargin) {
    const offset = parent.offset();
    const height = this.$().outerHeight();
    const parentHeight = parent.outerHeight();
    const parentWidth = parent.outerWidth();

    const top = offset.top + (parentHeight - height) / 2;
    let left = offset.left + parentWidth + sidesMargin;

    return { top, left };
  },

  /**
   * @private
   * 
   * @param {*} parent 
   * @param {*} sidesMargin 
   */
  bottomPosition(parent, sidesMargin) {
    const offset = parent.offset();
    const width = this.$().outerWidth();
    const parentWidth = parent.outerWidth();

    const top = offset.top + parent.outerHeight() + 12;
    let left = offset.left + (parentWidth - width) / 2;

    if (left < sidesMargin) {
      left = sidesMargin;
    } else if (left + width + sidesMargin >= window.innerWidth) {
      left = window.innerWidth - width - sidesMargin;
    }

    return { top, left };
  },

  /**
   * @since 1.0.0
   * @type {string}
   */
  name: null,

  /**
   * @since 1.0.0
   * @type {string}
   */
  label: null,

  /**
   * @private
   * @since 1.0.0
   * @type {boolean}
   */
  visible: false,

  /**
   * @private
   * @since 1.0.0
   * @type {boolean}
   */
  hiding: false,

  /**
   * @public
   * @since 1.0.0
   * @type {string}
   */
  position: "bottom",

  /**
   * @protected
   * @since 1.0.0
   */
  init() {
    this._super(...arguments);

    const name = this.get("name");
    const service = this.get("tooltip");

    addListener(service, `tooltip.${name}.present`, this, "present");
    addListener(service, `tooltip.${name}.dismiss`, this, "dismiss");
  },

  /**
   * @public
   * @since 1.0.0
   */
  present() {
    this.set("visible", true);
  },

  /**
   * @public
   * @since 1.0.0
   */
  dismiss() {
    this.set("hiding", true);

    later(this, function() {
      this.set("hiding", false);
      this.set("visible", false);
    }, 75);
  },
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  positionalParams: ["label", "name"],
});
