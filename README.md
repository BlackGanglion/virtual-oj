# Virtual-OJ
虚拟OJ实验项目

- [ ] ZOJ题目解析规则编写
- [ ] 模拟登录与提交架构设计与实验
- [ ] 页面解析粒度较粗, 会有爬取偏差
- [ ] 无法同时解析latex与markdown

## v1.0.3

- [x] redux页面存在跳转后state清空的问题(不应使用`<a>`而应使用`<Link>`)
- [x] Select组件默认值问题修复

## v1.0.2

- [x] 可爬取POJ题目

## v1.0.1

- [x] 题目详情页面完成, 可支持`markdown`与`latex`
- [x] 重新调整项目版本号

## v1.0.0

### 前端:
- [x] redux架构搭建完成
- [x] problem列表页面完成
- [x] 与后端完成联调, 

### Node模块
- [x] 已可以爬取HDOJ题目, 并通过一定并发测试(与模块所处网络环境有较大关联)

### API
* 请求题目列表 `/problem?OJId=&searchPid=`
