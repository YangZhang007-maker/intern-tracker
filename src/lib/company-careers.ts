const COMPANY_CAREERS: Record<string, string> = {
  // 大厂
  "字节跳动": "https://jobs.bytedance.com/campus/position",
  "腾讯": "https://join.qq.com",
  "阿里巴巴": "https://talent.alibaba.com/campus/",
  "百度": "https://talent.baidu.com/external/baidu/campus.html",
  "美团": "https://campus.meituan.com/",
  "京东": "https://campus.jd.com/home",
  "快手": "https://zhaopin.kuaishou.cn/recruit/e/#/official/campus/index",
  "小红书": "https://campus.xiaohongshu.com",
  "滴滴": "https://talent.didiglobal.com/campus",
  "拼多多": "https://careers.pinduoduo.com/campus",
  "华为": "https://career.huawei.com/reccampportal/portal5/campus-recruitment.html",
  "小米": "https://hr.xiaomi.com/campus",
  "网易": "https://campus.163.com",
  "哔哩哔哩": "https://jobs.bilibili.com/campus",
  "携程": "https://campus.ctrip.com",
  "蚂蚁集团": "https://talent.antgroup.com/campus",
  "蚂蚁金服": "https://talent.antgroup.com/campus",
  "SHEIN": "https://app.mokahr.com/campus-recruitment/shein/41974#/jobs",

  // AI / 自动驾驶
  "商汤科技": "https://hr.sensetime.com/campus",
  "旷视科技": "https://app.mokahr.com/campus-recruitment/megviihr/38660#/jobs",
  "地平线": "https://wecruit.hotjob.cn/SU62f239670dcad45229bb3e1e/pb/school.html",
  "Momenta": "https://momenta.jobs.feishu.cn/campus",
  "小马智行": "https://app.mokahr.com/campus-recruitment/ponyai/43960#/jobs",
  "文远知行": "https://app.mokahr.com/campus-recruitment/weride/41454#/jobs",

  // 手机/硬件
  "OPPO": "https://careers.oppo.com/campus",
  "vivo": "https://hr.vivo.com/campus",
  "荣耀": "https://www.hihonor.com/cn/career/campus/",
  "大疆": "https://we.dji.com/cn/campus",

  // 金融机构/银行
  "中金公司": "https://cicc.zhiye.com/campus",
  "中信证券": "https://customer.citics.com/career/campus",
  "华泰证券": "https://www.hotjob.cn/wt/HTSC/web/index/campus",
  "招商银行": "https://cmb.zhiye.com/campus",
  "兴业银行": "https://cib.zhiye.com/campus",
  "平安银行": "https://campus.pingan.com/bank",
  "中信银行": "https://citicbank.zhiye.com/campus",
  "中国银行": "https://campus.chinahr.com/pages/boc/",
  "工商银行": "https://job.icbc.com.cn",
  "建设银行": "http://job1.ccb.com/cn/jobv3/campus",
  "中国平安": "https://campus.pingan.com",
  "蚂蚁保": "https://talent.antgroup.com/campus",

  // 量化/对冲基金
  "幻方量化": "https://www.high-flyer.cn/recruit/",
  "九坤投资": "https://app.mokahr.com/campus-recruitment/ubiquant/43962#/jobs",
  "明投资": "https://www.citadelsecurities.com/careers/",

  // 外企
  "微软": "https://careers.microsoft.com/students",
  "谷歌": "https://careers.google.com/students",
  "亚马逊": "https://amazon.jobs/en/teams/student-programs",
  "苹果": "https://jobs.apple.com/cn/students",
  "特斯拉": "https://www.tesla.cn/careers/students",
  "英伟达": "https://nvidia.wd5.myworkdayjobs.com/UniversityJobs",
  "索尼": "https://www.sony.com.cn/careers/students",
  "索尼（中国）": "https://www.sony.com.cn/careers/students",

  // 其他知名公司
  "美图公司": "https://campus.meitu.com",
  "美图": "https://campus.meitu.com",
  "广联达": "https://campus.glodon.com",
  "知乎": "https://app.mokahr.com/campus-recruitment/zhihu/38331#/jobs",
  "得物": "https://app.mokahr.com/campus-recruitment/thedu/37445#/jobs",
  "米哈游": "https://campus.mihoyo.com",
  "莉莉丝": "https://app.mokahr.com/campus-recruitment/lilith/39434#/jobs",
  "搜狐": "https://hr.sohu.com/campus",
  "微博": "https://career.sina.com.cn/campus",
  "新浪": "https://career.sina.com.cn/campus",
  "陌陌": "https://app.mokahr.com/campus-recruitment/immomo/39608#/jobs",
  "北京陌陌信息技术有限公司": "https://app.mokahr.com/campus-recruitment/immomo/39608#/jobs",
  "贝壳": "https://campus.ke.com",
  "BOSS直聘": "https://app.mokahr.com/campus-recruitment/bosszhipin/96472#/jobs",
  "完美世界": "https://app.mokahr.com/campus-recruitment/pwrd/42319#/jobs",
  "Keep": "https://app.mokahr.com/campus-recruitment/keep/43175#/jobs",
  "猿辅导": "https://hr.yuanfudao.com/campus",
  "好未来": "https://job.100tal.com/campus",
  "学而思": "https://job.xueersi.com/campus",
  "作业帮": "https://app.mokahr.com/campus-recruitment/zuoyebang/39610#/jobs",

  // 运营商 / 国企
  "中国移动": "https://cmri.chinamobile.com/zhaopin",
  "中国电信": "https://campus.chinatelecom.com.cn",
  "中国联通": "https://chinaunicom.zhiye.com/campus",
  "国家电网": "https://zhaopin.sgcc.com.cn",
};

export function findCompanyCareerUrl(companyName: string): string | null {
  // Exact match
  if (COMPANY_CAREERS[companyName]) {
    return COMPANY_CAREERS[companyName];
  }

  // Partial match - check if companyName contains or is contained by a key
  for (const [key, url] of Object.entries(COMPANY_CAREERS)) {
    if (companyName.includes(key) || key.includes(companyName)) {
      return url;
    }
  }

  return null;
}

export function getAllCompanyNames(): string[] {
  return Object.keys(COMPANY_CAREERS);
}
