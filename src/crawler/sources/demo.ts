import { BaseCrawler } from "../base";
import type { CrawlResult } from "@/lib/types";

const DEMO_JOBS: CrawlResult[] = [
  {
    source_id: "demo-001",
    title: "后端开发实习生",
    company: "字节跳动",
    city: "beijing",
    job_type: "intern_cs",
    description: "参与抖音/TikTok 后端服务开发，使用 Go/Python 构建高并发系统。要求：计算机相关专业，熟悉至少一门后端语言，有项目经验优先。",
    apply_url: "https://jobs.bytedance.com/campus/position",
    posted_date: new Date().toISOString().split("T")[0],
    salary: "400-500元/天",
  },
  {
    source_id: "demo-002",
    title: "量化研究实习生",
    company: "幻方量化",
    city: "shanghai",
    job_type: "intern_finance",
    description: "参与量化策略研究与开发，使用 Python 进行数据分析和回测。要求：数学/物理/计算机/金融工程背景，熟悉 Python 和统计学。",
    apply_url: "https://www.high-flyer.cn/recruit/",
    posted_date: new Date().toISOString().split("T")[0],
    salary: "500-800元/天",
  },
  {
    source_id: "demo-003",
    title: "前端开发工程师（校招）",
    company: "腾讯",
    city: "shenzhen",
    job_type: "fulltime_cs",
    description: "负责微信小程序/公众号前端开发，使用 React/TypeScript 构建用户体验。要求：2026届本科及以上，计算机相关专业。",
    apply_url: "https://join.qq.com/",
    posted_date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    salary: "20-35K·14薪",
  },
  {
    source_id: "demo-004",
    title: "AI 算法实习生",
    company: "阿里巴巴",
    city: "hangzhou",
    job_type: "intern_cs",
    description: "参与大语言模型训练与优化，研究 NLP/CV 前沿技术。要求：硕士及以上，有顶会论文发表经验优先。",
    apply_url: "https://talent.alibaba.com/",
    posted_date: new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0],
    salary: "350-450元/天",
  },
  {
    source_id: "demo-005",
    title: "投行部实习生",
    company: "中金公司",
    city: "beijing",
    job_type: "intern_finance",
    description: "协助进行 IPO/并购项目的财务分析和尽职调查。要求：金融/会计/经济专业，有相关实习经验优先，CFA/CPA 优先。",
    apply_url: "https://www.cicc.com/career",
    posted_date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    salary: "200-300元/天",
  },
  {
    source_id: "demo-006",
    title: "数据分析实习生",
    company: "美团",
    city: "beijing",
    job_type: "intern_cs",
    description: "负责业务数据分析与可视化，使用 SQL/Python 进行数据挖掘。要求：统计/计算机相关专业，熟练使用 SQL。",
    apply_url: "https://zhaopin.meituan.com/",
    posted_date: new Date(Date.now() - 86400000 * 3).toISOString().split("T")[0],
    salary: "250-350元/天",
  },
  {
    source_id: "demo-007",
    title: "量化交易员",
    company: "Citadel Securities",
    city: "shanghai",
    job_type: "fulltime_finance",
    description: "在全球市场执行量化交易策略，监控风险敞口。要求：数学/物理/CS 博士优先，熟悉 C++/Python。",
    apply_url: "https://www.citadelsecurities.com/careers/",
    posted_date: new Date().toISOString().split("T")[0],
    salary: "50-80K·14薪",
  },
  {
    source_id: "demo-008",
    title: "云计算开发实习生",
    company: "华为",
    city: "chengdu",
    job_type: "intern_cs",
    description: "参与华为云基础设施开发，使用 Go/Java 构建云原生应用。要求：计算机相关专业，熟悉 Linux 和容器技术。",
    apply_url: "https://career.huawei.com/",
    posted_date: new Date(Date.now() - 86400000 * 4).toISOString().split("T")[0],
    salary: "300-400元/天",
  },
  {
    source_id: "demo-009",
    title: "风险管理实习生",
    company: "招商银行",
    city: "shenzhen",
    job_type: "intern_finance",
    description: "协助信用风险和市场风险模型的开发与验证。要求：金融工程/统计学背景，熟悉 R/Python 和风险管理基础知识。",
    apply_url: "https://career.cmbchina.com/",
    posted_date: new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0],
    salary: "150-200元/天",
  },
  {
    source_id: "demo-010",
    title: "安全工程师（校招）",
    company: "百度",
    city: "beijing",
    job_type: "fulltime_cs",
    description: "负责网络安全攻防研究与系统安全架构设计。要求：信息安全/计算机相关专业，熟悉 Web 安全和渗透测试。",
    apply_url: "https://talent.baidu.com/",
    posted_date: new Date(Date.now() - 86400000 * 5).toISOString().split("T")[0],
    salary: "18-30K·15薪",
  },
];

export class DemoCrawler extends BaseCrawler {
  name = "demo";

  async scrape(): Promise<CrawlResult[]> {
    await this.sleep(500);
    return DEMO_JOBS;
  }
}
