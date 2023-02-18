import type { App } from "vue";
import CheckCircleOutlineIcon from 'vue-material-design-icons/CheckCircleOutline.vue';
import ViewDashboardIcon from "vue-material-design-icons/ViewDashboard.vue"
import ListBoxIcon from "vue-material-design-icons/ListBox.vue"
import AccountCircleIcon from "vue-material-design-icons/AccountCircle.vue"
export default(app: App):void => {
  app
  .component("check-circle-outline", CheckCircleOutlineIcon)
  .component("view-dashboard", ViewDashboardIcon)
  .component("list-box", ListBoxIcon)
  .component("account-circle", AccountCircleIcon)
}