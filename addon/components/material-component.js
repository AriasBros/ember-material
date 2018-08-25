import Component from '@ember/component';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

/**
 * @since 1.0.0
 * @public
 * @abstract
 */
export default Component.extend({
  init() {
    this._super(...arguments);

    let owner = getOwner(this);
    this.set("config", owner.factoryFor('config:environment').class);
  },

  /**
   * @since 1.0.0
   * @public
   * @type {boolean}
   */
  iconType: computed("icon-type", function() {
    const type = this.get("icon-type");
    return type ? type : this.get("config.MATERIAL.ICON_TYPE");
  }),

  /**
   * @since 1.0.0
   * @public
   * @type {boolean}
   */
  isClassIconType: computed("icon-type", function() {
    return this.get("iconType") === "class";
  }),

  /**
   * @since 1.0.0
   * @public
   * @type {boolean}
   */
  isContentIconType: computed("icon-type", function() {
    return this.get("iconType") === "content";
  }),

  /**
   * @since 1.0.0
   * @public
   * @type {string}
   */
  iconClass: computed("icon", "icon-class", "icon-type", function() {
    if (this.get("isClassIconType")) {
      return this.get("icon");
    }

    const iconClass = this.get("icon-class");
    return iconClass ? iconClass : this.get("config.MATERIAL.ICON_CLASS");
  }),
});
