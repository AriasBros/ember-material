import Component from '@ember/component';
import { computed } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { not } from '@ember/object/computed';

export default Component.extend({
  /**
   * @since 1.0.0
   * @type {string}
   */
  tagName: "footer",

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNames: ["data-table__footer", "data-table__pager"],

  /**
   * @since 1.0.0
   * @return {number}
   */
  firstInCurrentPage: computed("page", "per-page", function() {
    return (this.get("page") - 1) * this.get("per-page") + 1;
  }),

  /**
   * @since 1.0.0
   * @return {number}
   */
  lastInCurrentPage: computed("page", "per-page", "count", function() {
    const value = this.get("page") * this.get("per-page");
    return Math.min(value, this.get("count"));
  }),

  /**
   * @since 1.0.0
   * @return {boolean}
   */
  canGoToPreviousPage: computed("page", "per-page", function() {
    return this.get("page") > 1;
  }),

  /**
   * @since 1.0.0
   * @return {boolean}
   */
  cannotGoToPreviousPage: not("canGoToPreviousPage"),

  /**
   * @since 1.0.0
   * @return {boolean}
   */
  canGoToNextPage: computed("page", "per-page", function() {
    return this.get("page") < this.get("pages");
  }),

  /**
   * @since 1.0.0
   * @return {boolean}
   */
  cannotGoToNextPage: not("canGoToNextPage"),

  /**
   * @since 1.0.0
   * @type {object}
   */
  actions: {
    onChangePage(page, method) {
      const invoked = tryInvoke(this, method, [page, this]);

      if (invoked === undefined) {
        return tryInvoke(this, "onChangePage", [page, this]) === true;
      } else {
        return invoked === true;
      }
    },
  }
});
