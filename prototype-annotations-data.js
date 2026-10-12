window.PROTOTYPE_ANNOTATIONS = [
  {
    "id": "default-1",
    "page": "index.html",
    "context": "index.html::page",
    "target": "a[href=\"green-cross.html\"]",
    "title": "绿十字电脑端管理",
    "body": "来源：导航首页\n触发：点击绿十字电脑端管理\n目标：green-cross.html\n在当前窗口进入对应应用，不改变业务数据和权限。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-2",
    "page": "index.html",
    "context": "index.html::page",
    "target": "a[href=\"visitor-admin.html\"]",
    "title": "访客管理电脑端",
    "body": "来源：导航首页\n触发：点击访客管理电脑端\n目标：visitor-admin.html\n在当前窗口进入对应应用，不改变业务数据和权限。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-3",
    "page": "index.html",
    "context": "index.html::page",
    "target": "a[href=\"visitor.html\"]",
    "title": "访客移动端",
    "body": "来源：导航首页\n触发：点击访客移动端\n目标：visitor.html\n在当前窗口进入对应应用，不改变业务数据和权限。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-4",
    "page": "index.html",
    "context": "index.html::page",
    "target": "a[href=\"安全生产移动端.html\"]",
    "title": "安全生产移动端",
    "body": "来源：导航首页\n触发：点击安全生产移动端\n目标：安全生产移动端.html\n在当前窗口进入对应应用，不改变业务数据和权限。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-5",
    "page": "安全生产移动端.html",
    "context": "安全生产移动端.html::page",
    "target": ".app-grid",
    "title": "工作台应用入口",
    "body": "保留原14个应用及顺序，末尾追加绿十字管理和访客管理，共16项。原应用未提供目标页面，点击提示未接入。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-6",
    "page": "安全生产移动端.html",
    "context": "安全生产移动端.html::page",
    "target": "a[href=\"绿十字管理移动端.html\"]",
    "title": "绿十字管理",
    "body": "来源：安全生产移动工作台 → 点击绿十字管理 → 绿十字管理移动端.html。同页跳转。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-7",
    "page": "安全生产移动端.html",
    "context": "安全生产移动端.html::page",
    "target": "a[href=\"访客管理移动端.html\"]",
    "title": "访客管理",
    "body": "来源：安全生产移动工作台 → 点击访客管理 → 访客管理移动端.html。同页跳转。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-8",
    "page": "visitor-admin.html",
    "context": "visitor-admin.html::page",
    "target": ".role-switch",
    "title": "角色切换",
    "body": "接待人仅查看分配给韦宝亭的申请；门卫查看全部申请。角色仅为静态演示，不代表服务端认证。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-9",
    "page": "visitor-admin.html",
    "context": "visitor-admin.html::page",
    "target": "#visit-time-tabs",
    "title": "今日到访 / 全部",
    "body": "默认今日到访。按预计到达的本地日期等于今天筛选；全部不限制日期。切换保留状态和关键词条件。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-10",
    "page": "visitor-admin.html",
    "context": "visitor-admin.html::page",
    "target": "#visitor-metrics",
    "title": "统计筛选",
    "body": "点击待审核、已审核、当前场内或超期在场筛选。再次点击已选统计恢复全部状态。统计按角色和日期范围计算，当前场内包含超期在场。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-11",
    "page": "visitor-admin.html",
    "context": "visitor-admin.html::page",
    "target": "#keyword-filter",
    "title": "关键词搜索",
    "body": "按姓名、单位、编号、接待人及全部车辆车牌搜索，包含列表未展示的车辆；与日期及状态筛选叠加。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-12",
    "page": "visitor-admin.html",
    "context": "visitor-admin.html::page",
    "target": "#visitor-tbody",
    "title": "访客申请列表",
    "body": "申请状态与场内状态分列。未进场不合并审核文案；进场中表示已进场且未离场。已审核且有效期内可循环进出，每轮保留记录。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-13",
    "page": "visitor-admin.html",
    "context": "visitor-admin.html::page",
    "target": "#admin-empty",
    "title": "无结果状态",
    "body": "当前角色、日期、状态和关键词无匹配结果时展示空态。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-14",
    "page": "visitor-admin.html",
    "context": "visitor-admin.html::page",
    "target": "#status-filter",
    "title": "状态条件",
    "body": "筛选待审核、已审核、已驳回、已取消、已过期及场内状态，与统计选中同步。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-15",
    "page": "访客管理移动端.html",
    "context": "访客管理移动端.html::page",
    "target": ".role-switch",
    "title": "角色切换",
    "body": "接待人仅查看分配给韦宝亭的申请；门卫查看全部申请。角色仅为静态演示，不代表服务端认证。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-16",
    "page": "访客管理移动端.html",
    "context": "访客管理移动端.html::page",
    "target": "#visit-time-tabs",
    "title": "今日到访 / 全部",
    "body": "默认今日到访。按预计到达的本地日期等于今天筛选；全部不限制日期。切换保留状态和关键词条件。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-17",
    "page": "访客管理移动端.html",
    "context": "访客管理移动端.html::page",
    "target": "#visitor-metrics",
    "title": "统计筛选",
    "body": "点击待审核、已审核、当前场内或超期在场筛选。再次点击已选统计恢复全部状态。统计按角色和日期范围计算，当前场内包含超期在场。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-18",
    "page": "访客管理移动端.html",
    "context": "访客管理移动端.html::page",
    "target": "#keyword-filter",
    "title": "关键词搜索",
    "body": "按姓名、单位、编号、接待人及全部车辆车牌搜索，包含列表未展示的车辆；与日期及状态筛选叠加。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-19",
    "page": "访客管理移动端.html",
    "context": "访客管理移动端.html::page",
    "target": "#visitor-tbody",
    "title": "访客申请列表",
    "body": "申请状态与场内状态分列。未进场不合并审核文案；进场中表示已进场且未离场。已审核且有效期内可循环进出，每轮保留记录。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-20",
    "page": "访客管理移动端.html",
    "context": "访客管理移动端.html::page",
    "target": "#admin-empty",
    "title": "无结果状态",
    "body": "当前角色、日期、状态和关键词无匹配结果时展示空态。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-21",
    "page": "访客管理移动端.html",
    "context": "访客管理移动端.html::page",
    "target": "#mobile-filter",
    "title": "状态条件",
    "body": "筛选待审核、已审核、已驳回、已取消、已过期及场内状态，与统计选中同步。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-22",
    "page": "访客管理移动端.html",
    "context": "访客管理移动端.html::page",
    "target": "#visitor-tbody",
    "title": "卡片核心信息与详情入口",
    "body": "预计到达、来访车牌、来访人数按三列上下结构展示，数值加粗。人数为主联系人1人加同行人。多车展示第一辆车牌及总辆数；点击卡片打开完整详情，操作按钮独立执行。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-23",
    "page": "green-cross.html",
    "context": "green-cross.html::page",
    "target": "#hierarchy",
    "title": "组织范围",
    "body": "选择公司、部门或班组查看对应年度卡。统计排除无需参与填报人员。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-24",
    "page": "green-cross.html",
    "context": "green-cross.html::page",
    "target": "#annual-card",
    "title": "绿十字年度卡",
    "body": "每人每天一条记录。组织每日等级取已填报人员最高事故等级；无事故但缺报时显示缺报，有事故且缺报时保留缺报提示。点击日期查看日详情。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-25",
    "page": "green-cross.html",
    "context": "green-cross.html::page",
    "target": "#cross-metrics",
    "title": "安全统计",
    "body": "按当前组织和自然日期汇总填报情况；事故与未填报人数遵循业务规则。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-26",
    "page": "green-cross.html",
    "context": "green-cross.html::page",
    "target": "#exempt-view",
    "title": "无需参与填报人员",
    "body": "新增打开居中人员选择弹窗，支持组织、姓名搜索和多选；确认更新完整名单及相关统计。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-27",
    "page": "绿十字管理移动端.html",
    "context": "绿十字管理移动端.html::page",
    "target": "#switch-role",
    "title": "切换演示身份",
    "body": "支持个人、班组长、部门管理员和公司管理员。个人填报本人；管理角色在所辖范围查看、代填及修改，修改留痕。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-28",
    "page": "绿十字管理移动端.html",
    "context": "绿十字管理移动端.html::page",
    "target": "#content",
    "title": "填报与管理内容",
    "body": "本人日期展示31格十字布局。未填报默认选无事故，只有提交后才生成记录；未来日期只读。本人已有记录修改走更正申请。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-29",
    "page": "绿十字管理移动端.html",
    "context": "绿十字管理移动端.html::page",
    "target": "#main-navigation",
    "title": "本人 / 管理填报",
    "body": "个人身份隐藏底部导航；管理身份可切换我的填报与我管理的填报。组织异常人员行只读，不打开弹窗。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-30",
    "page": "visitor.html",
    "context": "visitor.html::page",
    "target": "#visit-form",
    "title": "预约表单",
    "body": "来访信息按字段单行展示。必填项和手机号格式校验通过、同意信息声明后提交；有效期不超过30天。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-31",
    "page": "visitor.html",
    "context": "visitor.html::page",
    "target": "[name=\"hostName\"]",
    "title": "接待人姓名",
    "body": "必填，填写接待人姓名；无需单独验证接待人。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-32",
    "page": "visitor.html",
    "context": "visitor.html::page",
    "target": "[name=\"hostPhone\"]",
    "title": "接待人手机号",
    "body": "填写完整11位手机号并校验格式，不再填写后四位。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-33",
    "page": "visitor.html",
    "context": "visitor.html::page",
    "target": "[name=\"expectedAt\"]",
    "title": "预计到达",
    "body": "必填，供门卫首次进场参考，同时作为今日到访筛选日期。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-34",
    "page": "visitor.html",
    "context": "visitor.html::page",
    "target": "#add-visitor",
    "title": "同行人员",
    "body": "新增姓名与手机号码字段；详情按列表展示，不编造历史缺失手机号。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-35",
    "page": "visitor.html",
    "context": "visitor.html::page",
    "target": "#add-vehicle",
    "title": "车辆信息",
    "body": "支持多辆车，保存车牌、来源地和上传照片；详情逐辆展示。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  },
  {
    "id": "default-36",
    "page": "visitor.html",
    "context": "visitor.html::page",
    "target": "#booking-list",
    "title": "我的预约",
    "body": "查看本人的预约状态，点击详情查看完整字段和图片。未进场且状态为待审核或已审核时允许取消。",
    "updatedAt": "2026-10-12T00:00:00.000Z",
    "system": true
  }
];
