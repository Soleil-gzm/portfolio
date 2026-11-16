# Dialogue Quality Portfolio

这个作品集整理了我在合成训练数据生产、清洗增强和质量 Agent 方向完成的三个主要项目，重点展示项目背景、架构取舍、可复现评测与当前能力边界。

- **在线作品集**：https://soleil-gzm.github.io/portfolio/
- **Agent 源码**：https://github.com/Soleil-gzm/dialogue-repair-agent

## 主要项目

### 1. 可控多轮对话生成引擎

针对人工编写难以覆盖复杂场景组合的问题，我负责生成引擎的架构设计与主要实现，根据条件组合和模块路径生产可控的合成训练数据。

[查看项目案例](https://soleil-gzm.github.io/portfolio/cases/generator/)

### 2. 对话数据清洗与语义增强流水线

针对合成数据过于规整、缺乏真实电话对话特征的问题，我负责流水线的重构与主要实现，通过清洗与语义增强补充结巴、重复和口音相关转写差异，提升训练数据的多样性。

[查看项目案例](https://soleil-gzm.github.io/portfolio/cases/pipeline/)

### 3. 对话质量 Agent

在前两个项目的基础上，我独立设计并实现对话质量 Agent，用于处理规则流程难以覆盖的跨轮语义问题。项目的设计目标是先检测需要处理的轮次，再对问题局部进行受约束的改写，同时保留原文回退路径，并通过对照评测比较检测效果和调用成本。

**当前已完成语义检测与原文回退，局部改写仍在完善。**

[查看 Agent 案例](https://soleil-gzm.github.io/portfolio/cases/agent/) · [查看源码](https://github.com/Soleil-gzm/dialogue-repair-agent)

## Agent 评测结果

评测集包含 120 条程序化合成缺陷和 12 条干净样本，缺陷覆盖答非所问、指代断裂、事实冲突、角色混淆、重复空转和缺失承接六类。三个对照臂分别验证规则决策、LLM 决策和语义判官带来的变化。

| 指标 | 结果 |
| --- | --- |
| 公开 Agent 仓库测试 | 353 passed / 5 skipped |
| A3：规则决策 + 确定性工具 | 宏观阻断率 83.3%，0 token |
| A3L：LLM 决策 + 确定性工具 | 宏观阻断率 83.3%，251,561 tokens，¥0.3987 |
| A4：LLM 决策 + 确定性工具 + 语义判官 | 宏观阻断率 100%，305,910 tokens，¥0.5495 |
| 干净样本误报 | 三个对照臂均为 0/12 |

以上结果来自当前合成评测集上的单次运行，用于比较不同策略，不直接外推到真实生产场景。

## 仓库结构

```text
portfolio/
├── index.html                  # 作品集首页
├── cases/
│   ├── agent/                  # Agent 主案例、评测与 Trace
│   ├── generator/              # 对话生成引擎案例
│   └── pipeline/               # 清洗与语义增强流水线案例
├── notes/                      # ASR 错误建模与意图聚类补充笔记
└── assets/                     # 样式、脚本、图表与评测材料
```

本仓库只包含作品集站点内容。Agent 源码维护在独立仓库，不复制到本仓库。

## 本地预览

站点使用原生 HTML、CSS 和 JavaScript，无需构建。在仓库根目录运行：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 内容说明

涉及公司业务的项目仅展示本人负责的架构与设计取舍，不公开业务数据、对话原文或客户信息。公开评测材料使用合成数据，Agent 的当前能力边界和评测限制已在案例页中单独说明。
