import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { bool } from '@ember/object/computed';
import { tryInvoke } from '@ember/utils';

export default Component.extend({
  service: service("appBar"),

  /**
   * @type {string}
   */
  tagName: "header",

  /**
   * @type {string[]}
   */
  classNames: ["app-bar"],

  /**
   * @return {string}
   */
  title: computed("service.title", function () {
    return this.get("service.title");
  }),

  /**
   * @return {boolean}
   */
  navigation: bool("service.navigation", function () {
    return this.get("service.navigation");
  }),

  /**
   * @return {string}
   */
  icon: computed("service.icon", function () {
    return this.get("service.icon");
  }),

  /**
   * @since 1.0.0
   * @public
   * @return {number|boolean}
   */
  progress: computed("service.progress", function () {
    return this.get("service.progress");
  }),

  /**
   * @since 1.0.0
   * @protected
   * @return {boolean}
   */
  progressHidden: computed("progress", function() {
    const progress = this.get("progress");
    return progress === false || progress === undefined;
  }),

  /**
   * @since 1.0.0
   * @public
   * @return {array}
   */
  actionItems: computed("service.actionItems", function() {
    return this.get("service.actionItems");
  }),

  /**
   * @type {object}
   */
  actions: {
    navigationItemClicked() {
      const navigationType = this.get("service.navigation");

      if (navigationType === "back") {
        return this.get("service").goToBack() === true;
      }

      return tryInvoke(this, "onNavigation", [this]) === true;
    }
  }
});
