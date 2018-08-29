import Service from '@ember/service';
import { sendEvent } from '@ember/object/events';

export default Service.extend({
  /**
   * @since 1.0.0
   * @type {Array}
   */
  stack: null,

  /**
   * @since 1.0.0
   * @type {object}
   */
  view: null,

  /**
   * @since 1.0.0
   */
  init() {
    this.set("stack", []);
    this._super(...arguments);
  },

  /**
   * @since 1.0.0
   */
  present(textLabel, actionLabel, action) {
    this.set("textLabel", textLabel);
    this.set("actionLabel", actionLabel);
    this.set("action", action);

    sendEvent(this, "snackbar.present");
  },

  textLabel: null,
  actionLabel: null,
});
