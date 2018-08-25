import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { A } from '@ember/array';

export default Service.extend({
  router: service("router"),

  /**
   * @since 1.0.0
   * @private
   * @return {Route}
   */
  route: computed("router.currentRouteName", function() {
    const name = this.get("router.currentRouteName").replace(".index", "");
    return getOwner(this).lookup('route:' + name);
  }),

  /**
   * @since 1.0.0
   * @public
   * @return {array}
   */
  actionItems: computed("route.{navigationActionItems,appBarItem.actionItems,actionItems}", function() {
    const actions = A(this.get("route.navigationActionItems") || this.get("route.appBarItem.actionItems") || this.get("route.actionItems"));

    actions.forEach((action) => {
      if (!action.target) {
        let target = this.get("route");

        if (!target.actions[action.action]) {
          target = this.get("route.controller");
        }

        action.target = target;
      }
    });

    return actions;
  }),

  /**
   * @since 1.0.0
   * @public
   * @return {string}
   */
  title: computed("route.{navigationTitle,appBarItem.title,title}", function() {
    return this.get("route.navigationTitle") || this.get("route.appBarItem.title") || this.get("route.title");
  }),

  /**
   * @since 1.0.0
   * @public
   * @return {string}
   */
  navigation: computed("route.{navigationType,appBarItem.navigation}", function() {
    return this.get("route.navigationType") || this.get("route.appBarItem.navigation");
  }),

  /**
   * @since 1.0.0
   * @public
   * @return {string}
   */
  icon: computed("route.{navigationIcon,appBarItem.icon}", function() {
    return this.get("route.navigationIcon") || this.get("route.appBarItem.icon");
  }),

  /**
   * @since 1.0.0
   * @public
   * @return {string}
   */
  progress: computed("route.{navigationProgress,appBarItem.progress}", function() {
    return this.get("route.navigationProgress") || this.get("route.appBarItem.progress");
  }),

  /**
   * @since 1.0.0
   * @public
   */
  goToBack() {
    return this.get("route").send("onBackNavigation");
  }
});
