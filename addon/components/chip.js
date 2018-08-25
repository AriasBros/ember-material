import Component from './material-component';
import { bool } from '@ember/object/computed';
import { computed } from '@ember/object';

/**
 * @since 1.0.0
 * @public
 * @abstract
 */
export default Component.extend({
  /**
   * @since 1.0.0
   * @type {string}
   */
  layoutName: 'components/chip',

  /**
   * @since 1.0.0
   * @type {string}
   */
  tagName: "div",

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNames: ["chip"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["hasLeadingIcon:chip--with-leading-icon", "kindClass"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  attributeBindings: ["disabled"],

  /**
   * @since 1.0.0
   * @return {boolean}
   */
  hasLeadingIcon: bool("icon"),

  /**
   * @protected
   * @since 1.0.0
   * @type {string}
   */
  kind: null,

  /**
   * @private
   * @since 1.0.0
   * @type {string}
   */
  kindClass: computed("kind", function() {
    return "chip--" + this.get("kind");
  }),
}).reopenClass({
  /**
   * @since 1.0.0
   * @type {string[]}
   */
  positionalParams: ["label", "icon"],
});
