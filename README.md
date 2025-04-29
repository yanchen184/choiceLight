# Choice Light

這個專案是一個互動式的反應速度遊戲。

## 線上演示

訪問 [https://yanchen184.github.io/choiceLight](https://yanchen184.github.io/choiceLight) 查看線上演示。

目前版本：**v0.3.0**

## 主要功能

- **Choice Light**：反應速度遊戲，測試用戶的反應能力和決策速度
- **用戶認證**：使用 Firebase 身份驗證保護遊戲訪問

## 更新日誌

### v0.3.0 (2025-04-29)
- 添加了 Firebase 身份驗證功能
- 實現了用戶註冊和登錄功能
- 添加了路由保護，確保只有已認證的用戶可以訪問遊戲
- 修復了 Firebase 身份驗證配置問題

### v0.2.0 (2025-04-23)
- 優化了用戶界面
- 修復了確認按鈕不顯示的問題
- 改進了「目前的登入玩家」顯示部分
- 更好的響應式佈局，支持各種屏幕尺寸

### v0.1.0 (2025-04-23)
- 初始版本
- 基本功能實現

## 可用腳本

在專案目錄中，您可以運行：

### `npm start`

在開發模式下運行應用程序。
打開 [http://localhost:3000](http://localhost:3000) 在瀏覽器中查看。

### `npm test`

在互動式監視模式下啟動測試運行程序。

### `npm run build`

將應用程序構建到 `build` 文件夾。

### `npm run deploy`

將應用程序部署到 GitHub Pages。

## 技術堆棧

- React
- React Router
- Firebase Authentication & Realtime Database
- Chart.js
- Ant Design
- Tailwind CSS

## Firebase 設置

這個專案使用 Firebase 進行身份驗證和數據存儲。如果您想要在本地運行此專案，您需要：

1. 在 [Firebase 控制台](https://console.firebase.google.com/) 中創建一個新的專案
2. 在專案設置中添加一個 Web 應用
3. 啟用電子郵件/密碼身份驗證方法
4. 創建一個 Realtime Database
5. 將您的 Firebase 配置更新到 `src/firebase.tsx` 文件中

## 本地開發

1. 克隆存儲庫：
   ```bash
   git clone https://github.com/yanchen184/choiceLight.git
   cd choiceLight
   ```

2. 安裝依賴：
   ```bash
   npm install
   ```

3. 運行開發服務器：
   ```bash
   npm start
   ```

## 部署

此專案使用 GitHub Actions 自動部署到 GitHub Pages。每當有新的提交推送到 main 分支時，都會觸發部署流程。

您也可以手動運行 `npm run deploy` 來部署應用程序。

## 故障排除

如果您遇到 "CONFIGURATION_NOT_FOUND" 錯誤，請確保：

1. 您的 Firebase 專案存在且配置正確
2. 您已啟用電子郵件/密碼身份驗證
3. API 金鑰正確且未過期
4. Firebase 專案已正確設置
