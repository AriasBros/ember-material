import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  /**
   * @type {string}
   */
  tagName: "div",

  /**
   * @type {string[]}
   */
  classNames: ["backdrop"],

  /**
   * @type {string[]}
   */
  classNameBindings: ['frontLayerHidden:backdrop--front-layer-hidden'],

  /**
   * @type {boolean}
   */
  frontLayerHidden: false,

  /**
   * @return {string}
   */
  style: computed("frontLayerHidden", "$appBar", "$backLayer", function() {
    if (this.$backLayer && this.$appBar) {
      const hidden = this.get("frontLayerHidden");
      const top = hidden ? this.$backLayer.outerHeight() : this.$appBar.outerHeight();

      return htmlSafe("top:" + top + "px;");
    }
  }),

  /**
   * @type {object}
   */
  actions: {
    toggleFrontLayer() {
      const hidden = this.get("frontLayerHidden");
      this.set("frontLayerHidden", !hidden);
    },
  },

  didInsertElement() {
    this.set("$appBar", this.$(".app-bar"));
    this.set("$backLayer", this.$(".backdrop__layer--back"));
  },
});
