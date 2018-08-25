import Component from './material-component';
import { inject } from '@ember/service';
import { addListener } from '@ember/object/events';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { later, cancel } from '@ember/runloop';
import { tryInvoke } from '@ember/utils';

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
  layoutName: 'components/snackbar',

  /**
   * @since 1.0.0
   * @type {string}
   */
  tagName: "div",

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNames: ["snackbar"], 

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["actionLabel:snackbar--with-action", "visible:snackbar--visible", "hiding:snackbar--hiding"], 

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  attributeBindings: ["styleAttribute:style"],

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

  textLabel: computed("service.textLabel", function() {
    return this.get("service.textLabel");
  }),

  actionLabel: computed("service.actionLabel", function() {
    return this.get("service.actionLabel");
  }),

  /**
   * @protected
   * @since 1.0.0
   */
  init() {
    this._super(...arguments);

    const service = this.get("service");

    addListener(service, "snackbar.present", this, "present");
    addListener(service, "snackbar.dismiss", this, "dismiss");
  },

  /**
   * @public
   * @since 1.0.0
   */
  present() {
    this.set("visible", true);

    this.dismissTimer = later(this, function() {
      this.dismiss();
    }, 10000);
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
    }, 150);
  },

  /**
   * @protected
   * @since 1.0.0
   * @type {string}
   */
  styleAttribute: computed("visible", function() {
    const sidesMargin = 12;
    const width = this.$().outerWidth();
    let left = (window.innerWidth - width - (sidesMargin * 2)) / 2;

    return htmlSafe(`left:${left}px;`);
  }),

  actions: {
    onPerformAction() {
      cancel(this.dismissTimer);
      this.dismissTimer = null;

      const action = this.get("service.action");

      if (typeof action === "function") {
        action();
      }

      this.dismiss();
    }
  }
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  positionalParams: ["textLabel", "actionLabel"],
});