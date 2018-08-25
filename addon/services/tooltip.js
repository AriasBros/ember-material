import Service from '@ember/service';
import { sendEvent } from '@ember/object/events';


export default Service.extend({
  /**
   * @since 1.0.0
   */
  present(name) {
    sendEvent(this, "tooltip." + name + ".present");
  },

  /**
   * @since 1.0.0
   */
  dismiss(name) {
    sendEvent(this, "tooltip." + name + ".dismiss");
  }
});
