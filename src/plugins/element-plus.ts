import 'element-plus/theme-chalk/index.css'
import type { App } from 'vue'
import { 
  ElRow,
  ElCol,
  ElMenu,
  ElContainer,
  ElAside,
  ElMain,
  ElMenuItem,
  ElSubMenu,
  ElButton,
  ElForm,
  ElFormItem,
  ElTable,
  ElTableColumn,
  ElCard,
  ElInput,
  ElMessage,
  ElUpload,
  ElTree,
  ElTag,
  ElTabs,
  ElTabPane,
  ElTooltip,
  ElDatePicker,
  ElScrollbar,
  ElConfigProvider,
  ElIcon,
  ElLoading,
  ElDescriptions,
  ElDialog,
  ElSwitch,
  ElDivider,
  ElOption,
  ElInputNumber,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElPageHeader,
  ElPagination
} from "element-plus";

import {
  ZoomIn,
  Edit,
  Delete,
  CirclePlus,
  View,
  Search,
  EditPen,
  Close,
  User,
  UserFilled,
  Download,
  Refresh,
  Connection,
  CircleCloseFilled,
  SuccessFilled,
  Back,
  ArrowDown
} from "@element-plus/icons-vue";

export default (app: App): void => {
  app
    .use(ElRow)
    .use(ElCol)
    .use(ElMenu)
    .use(ElContainer)
    .use(ElAside)
    .use(ElMain)
    .use(ElMenuItem)
    .use(ElSubMenu)
    .use(ElButton)
    .use(ElForm)
    .use(ElFormItem)
    .use(ElTable)
    .use(ElTableColumn)
    .use(ElCard)
    .use(ElInput)
    .use(ElMessage)
    .use(ElUpload)
    .use(ElTree)
    .use(ElTag)
    .use(ElTabs)
    .use(ElTabPane)
    .use(ElTooltip)
    .use(ElDatePicker)
    .use(ElScrollbar)
    .use(ElConfigProvider)
    .use(ElIcon)
    .use(ElLoading)
    .use(ElDescriptions)
    .use(ElDialog)
    .use(ElSwitch)
    .use( ElDivider)
    .use(ElOption)
    .use( ElInputNumber)
    .use( ElDropdown)
    .use(ElDropdownMenu)
    .use(ElDropdownItem)
    .use(ElPageHeader)
    .use(ElPagination)
    .component("el-icon-zoomin", ZoomIn)
    .component("Edit", Edit)
    .component("Delete", Delete)
    .component("Add", CirclePlus)
    .component("View", View)
    .component("EditPen", EditPen)
    .component("User", User)
    .component("User", User)
    .component("Close", Close)
    .component("UserFilled", UserFilled)
    .component("Download", Download)
    .component("Refresh", Refresh)
    .component("Connection", Connection)
    .component("CirclePlus", CirclePlus)
    .component("CicleCloseFilled", CircleCloseFilled)
    .component("SuccessFilled", SuccessFilled)
    .component("Back", Back)
    .component("ArrowDown", ArrowDown)
}