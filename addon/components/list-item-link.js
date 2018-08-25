import LinkComponent from '@ember/routing/link-component';
import { computed, get } from '@ember/object';

export default LinkComponent.extend({
  /**
   * @since 1.0.0
   * @type {string}
   */
  tagName: "li",

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNames: ["list-view__item", "list-view__item-link"],

  /**
   * @since 1.0.0
   * @type {string}
   */
  url: computed("models", "qualifiedRouteName", function() {
    let qualifiedRouteName = get(this, 'qualifiedRouteName');
    let models = get(this, 'models');

    if (get(this, 'loading')) {
      return get(this, 'loadingHref');
    }

    let routing = get(this, '_routing');
    let queryParams = get(this, 'queryParams.values');
    
    return routing.generateURL(qualifiedRouteName, models, queryParams);
  }),
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string}
   */
  positionalParams: 'params'
});
