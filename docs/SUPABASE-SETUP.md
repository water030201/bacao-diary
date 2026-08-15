# Supabase 云端数据 配置说明

> 这份文档教你把"拔草日记"从纯本地存储升级到云端公共数据。
> **不配置也能跑**——网站会自动降级到 LocalStorage 模式。

## 📋 你需要做的 6 步

### Step 1 — 注册 Supabase 账号

打开 https://supabase.com → 右上角 **Sign in** → 用 GitHub 账号登录最快。

### Step 2 — 创建项目

1. 进 Dashboard → **New project**
2. Organization 选默认即可
3. **Project name**：`bacao-diary`
4. **Database password**：随便填一个长密码，**复制保存好**（之后用不到，但万一要进数据库要用）
5. **Region**：选 **East Asia (Tokyo)** 或 **Northeast Asia (Seoul)**，国内访问最快
6. **Pricing Plan**：**Free**（免费计划：500MB 数据库 + 5GB 流量/月，毕设绰绰有余）
7. 点 **Create new project** → 等 1-2 分钟初始化

### Step 3 — 跑建表 SQL

1. 项目就绪后，左侧栏点 **SQL Editor**
2. 点 **+ New query**
3. 打开本仓库的 `docs/supabase-schema.sql`，**全选复制**，粘贴进 SQL Editor
4. 点右下角 **Run**（或 Ctrl+Enter）
5. 应该看到 "Success. No rows returned" — 成功
6. 左侧栏点 **Table Editor**，应该能看到一个空的 `diaries` 表

### Step 4 — 拿到 URL 和 anon key

1. 左侧栏底部齿轮 **Settings** → **API**
2. 复制以下两个值：
   - **Project URL**（类似 `https://xxxxxxxxxxxx.supabase.co`）
   - **Project API keys** → **anon public**（一长串以 `eyJ...` 开头的 token）

> ⚠️ 注意：anon key 是**公开**的，可以放在前端代码里。**绝对不要**复制 service_role key（那个是后端用的，泄漏会出事）。

### Step 5 — 在项目里配置环境变量

在项目根目录（`拔草计划/`）创建文件 `.env.local`，内容：

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJI...你的token
```

把 `xxxxxxxxxxxx` 和 `eyJhbGciOiJI...` 换成你自己的。

> `.env.local` 已经在 `.gitignore` 里，不会被提交，安全。

### Step 6 — 部署到线上

```bash
npm run deploy
```

这会自动 `build` + 推到 `gh-pages` 分支。
线上访问 https://water030201.github.io/bacao-diary/ 后，**打开 F12 控制台**应该看到：

```
[拔草日记] 数据模式：☁️ Supabase 云端
[启动] 云端无数据，正在初始化种子数据...
```

第一次会把种子数据自动上传到云端。之后任何人写的日记都是真·公共数据，所有访客都能看到。

## 🧪 验证云端真的生效

1. 在浏览器 A 写一篇日记
2. 换浏览器 B（或者无痕模式）打开网站
3. 应该能看到浏览器 A 写的那篇日记 ✅

如果看不到，回到 Supabase Dashboard → Table Editor → diaries，看是否有那一行数据。

## 🔧 常见问题

**Q：写日记没报错，但浏览器 B 看不到？**
A：F12 看 console，是不是显示 "💾 LocalStorage 本地"——说明 `.env.local` 没生效，需要重启 dev server (`Ctrl+C` → `npm run dev`) 或重新 deploy。

**Q：免费额度够吗？**
A：500MB DB ≈ 几十万条日记。5GB 流量/月 ≈ 几十万次访问。毕设完全够。

**Q：能让别人看不见我的数据吗？**
A：当前 RLS 策略是公共读写。如果想加权限隔离，需要接 Supabase Auth（毕设不需要）。

**Q：答辩时网络抽风怎么办？**
A：已经做了**自动降级**——云端拉取失败会无缝切到 LocalStorage 缓存（数据一直会镜像存一份在浏览器本地）。所以**完全断网也能演示**。
