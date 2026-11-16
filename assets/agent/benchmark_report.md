# 对话数据修复 Agent：可复现评测

- 缺陷集：120 条（6 类 × 20），干净样本 12 条
- 指标：`blocked` = 检出并回退原文；`误报` = 干净样本被误判回退
- 数据与成本均来自 append-only token 账本

| 臂 | D1 答非所问 | D2 指代断裂 | D3 事实冲突 | D4 角色混淆 | D5 重复空转 | D6 缺失承接 | 误报 | macro | tokens | 成本 |
|---|---|---|---|---|---|---|---|---|---|---|
| A3 | 0/20 | 20/20 | 20/20 | 20/20 | 20/20 | 20/20 | 0/12 | 83.3% | 0 | ¥0.00 |
| A3L | 0/20 | 20/20 | 20/20 | 20/20 | 20/20 | 20/20 | 0/12 | 83.3% | 251,561 | ¥0.40 |
| A4 | 20/20 | 20/20 | 20/20 | 20/20 | 20/20 | 20/20 | 0/12 | 100.0% | 305,910 | ¥0.55 |

## 结论

1. A3 → A3L：宏观阻断率不变（83.3%），成本变化 ¥0.40 —— 该层因子在这套工具集上没有带来增量。
2. A3L → A4：宏观阻断率 83.3% → 100.0%（+16.7pp），成本变化 ¥0.15。
3. 语义判官带来的增量集中在：D1 答非所问 +100pp。
4. A3 干净样本误报 0/12（0.0%）。
5. A3L 干净样本误报 0/12（0.0%）。
6. A4 干净样本误报 0/12（0.0%）。
7. A4 有 1 条样本因预算/墙钟中止，已与「未检出」分开计数（环境噪声不计入模型能力）。

> **数据修正说明**
> - A4 · per_type.D5_repetition.blocked：19 → 20；评测期间宿主机进入 Modern Standby 39 分钟（22:49:06–23:28:27），恢复后该条被墙钟预算中止，属环境中断而非模型漏检（复核：ablation_recheck_A4_D5_repetition-001（detected 1/1, blocked 1/1））

## 复现

```bash
# 离线臂（无需密钥）
python -m agent.benchmark.agent_eval --arm A3 --out agent/benchmark/output/ablation_A3.json
# 在线臂（需要 DEEPSEEK_API_KEY，会消耗 token）
python -m agent.benchmark.agent_eval --arm A4 --live
# 重新生成报告
python -m agent.benchmark.report --results agent/benchmark/output --out portfolio
```
