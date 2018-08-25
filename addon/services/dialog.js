import Service from '@ember/service';
import { sendEvent } from '@ember/object/events';


export default Service.extend({
  /**
   * @since 1.0.0
   * @type {string}
   */
  name: null,

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  visible: false,

  /**
   * @since 1.0.0
   */
  present(name, ...params) {
    sendEvent(this, "dialog." + name + ".present", params);
  },

  /**
   * @since 1.0.0
   */
  dismiss(name) {
    sendEvent(this, "dialog." + name + ".dismiss");
  }
});
