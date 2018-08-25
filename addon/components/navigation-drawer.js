import Component from '@ember/component';

export default Component.extend({
  /**
   * @type {string}
   */
  tagName: "nav",

  /**
   * @type {string[]}
   */
  classNames: ["navigation__drawer"],

  /**
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["rail:navigation__drawer--rail"],

  /**
   * @since 1.0.0
   * @type {boolean}
   */
  rail: false,
});
