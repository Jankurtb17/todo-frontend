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
  ElPagination,
  ElProgress,
  ElCalendar,
  ElTimeline,
  ElTimelineItem,
  ElSelect,
  ElTimePicker,
  ElNotification
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
  ArrowDown,
  Expand,
  Fold,
  Memo,
  Menu,
  SwitchButton,
  ArrowLeft,
  ArrowRight
} from "@element-plus/icons-vue";

export default (app: App): void => {
  app
    .use(ElRow)
    .use(ElCol)
    .use(ElMenu)
    .use(ElContainer)
    .use(ElAside)
    .use(ElMain)
    .use(ElTimePicker)
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
    .use(ElNotification)
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
    .use(ElProgress)
    .use(ElCalendar)
    .use(ElTimeline)
    .use(ElTimelineItem)
    .use(ElSelect)
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
    .component("Expand", Expand)
    .component("Fold", Fold)
    .component("Memo", Memo)
    .component("Menu", Menu)
    .component("SwitchButton", SwitchButton)
    .component("ArrowLeft", ArrowLeft)
    .component("ArrowRight", ArrowRight)
}