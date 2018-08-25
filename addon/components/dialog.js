import Component from '@ember/component';
import { computed } from '@ember/object';
import { addListener, removeListener } from '@ember/object/events';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { tryInvoke } from '@ember/utils';
import { A } from '@ember/array';

export default Component.extend({
  dialog: service(),

  /**
   * @since 1.0.0
   * @type {string}
   */
  tagName: "div",

  /**
   * @since 1.0.0
   * @type {string}
   */
  layoutName: 'components/dialog',

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNames: ["dialog-scrim"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["visible:dialog-scrim--visible", "hiding:dialog-scrim--hiding", "clickable:dialog-scrim--clickable", "identifierClass"],

  /**
   * @private
   * @since 1.0.0
   * @return {string}
   */
  identifierClass: computed("name", function() {
    return "dialog--" + this.get("name");
  }),

  /**
   * @since 1.0.0
   * @type {string}
   */
  type: null,

  /**
   * @since 1.0.0
   * @type {string}
   */
  name: null,

  /**
   * @since 1.0.0
   * @type {string}
   */
  title: null,

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  clickable: true,

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  dismissable: true,

  /**
   * @since 1.0.0
   * @type {string}
   */
  dismissive: "Cancel",

  /**
   * @since 1.0.0
   * @type {string}
   */
  confirmation: "Accept",

  /**
   * @since 1.0.0
   * @return {boolean}
   */
  hasActions: computed("dismissive", "confirmation", function() {
    return this.get("dismissive") || this.get("confirmation");
  }),

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  actionsDisabled: computed("confirmationDisabled", "dismissiveDisabled", {
    get() {
      return this.get("confirmationDisabled") && this.get("dismissiveDisabled");
    },

    set(key, value) {
      this.setProperties({
        confirmationDisabled: value,
        dismissiveDisabled: value
      });
      
      return value;
    }
  }),

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  confirmationDisabled: false,

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  dismissiveDisabled: false,

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

  present(...params) {
    this.presentedParams = params ? A(params) : A([]);
    this.set("visible", true);
  },

  dismiss() {
    if (this.get("dismissable")) {
      this.set("hiding", true);

      later(this, function() {
        this.enabled();
        this.set("hiding", false);
        this.set("visible", false);
      }, 350);
    }
  },

  /**
   * @public
   * @since 1.0.0
   */
  disabled() {
    this.set("clickable", false);
    this.set("actionsDisabled", true);
  },

  /**
   * @public
   * @since 1.0.0
   */
  enabled() {
    this.set("clickable", true);
    this.set("actionsDisabled", false);
  },

  /**
   * @protected
   * @since 1.0.0
   */
  click(event) {
    if (this.get("clickable") && this.element === event.target) {
      this.send("onDismissDialog");
    }
  },

  /**
   * @protected
   * @since 1.0.0
   */
  keyUp(event) {
    if (event.keyCode === 27) { // Escape key
      this.send("onDismissDialog");
    }
  },

  /**
   * @protected
   * @since 1.0.0
   */
  didInsertElement() {
    const service = this.get("dialog");
    const name = this.get("name");

    addListener(service, `dialog.${name}.present`, this, "present");
    addListener(service, `dialog.${name}.dismiss`, this, "dismiss");

    this.$(document).on("keyup", (event) => {
      if (this.visible) {
        this.keyUp(event);
      }
    });
  },

  /**
   * @protected
   * @since 1.0.0
   */
  willDestroyElement() {
    const service = this.get("dialog");
    const name = this.get("name");

    removeListener(service, `dialog.${name}.present`, this, "present");
    removeListener(service, `dialog.${name}.dismiss`, this, "dismiss");

    this.$(document).off("keyup");
  },

  /**
   * @since 1.0.0
   * @type {object}
   */
  actions: {
    onDismissDialog() {
      const params = this.presentedParams.insertAt(0, this);
      const dismiss = tryInvoke(this, "onDismiss", params);

      if (dismiss === true || dismiss === undefined) {
        this.dismiss();
      }

      return dismiss;
    },

    onConfirmDialog() {
      const params = this.presentedParams.insertAt(0, this);
      const dismiss = tryInvoke(this, "onConfirm", params);

      if (dismiss === true || dismiss === undefined) {
        this.dismiss();
      }

      return dismiss;
    },
  }
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  positionalParams: ["name", "title", "confirmation", "dismissive"],
});
