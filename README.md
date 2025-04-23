# Choice Light

這個專案包含多種互動式學習遊戲，包括 Bingo Game、Choice Game、Choice Light 和 Bike Game。

## 線上演示

訪問 [https://yanchen184.github.io/choiceLight](https://yanchen184.github.io/choiceLight) 查看線上演示。

目前版本：**v0.1.0**

## 可用腳本

在專案目錄中，您可以運行：

### `npm start`

在開發模式下運行應用程序。
打開 [http://localhost:3000](http://localhost:3000) 在瀏覽器中查看。

當您進行更改時，頁面將重新加載。
您也可能會在控制台中看到任何 lint 錯誤。

### `npm test`

在互動式監視模式下啟動測試運行程序。
有關更多信息，請參閱關於[運行測試](https://facebook.github.io/create-react-app/docs/running-tests)的部分。

### `npm run build`

將應用程序構建到 `build` 文件夾。
它在生產模式下正確捆綁 React，並優化構建以獲得最佳性能。

構建是壓縮的，文件名包含哈希值。
您的應用程序已準備好部署！

### `npm run deploy`

將應用程序部署到 GitHub Pages。此命令會先構建應用程序，然後將構建結果推送到 gh-pages 分支。

## 技術堆棧

- React
- React Router
- Firebase
- Chart.js
- Ant Design
- Tailwind CSS

## 功能

- **登錄系統**：用戶可以通過登錄頁面訪問各種遊戲
- **Bingo Game**：經典的賓果遊戲
- **Choice Game**：選擇題遊戲
- **Choice Light**：反應速度遊戲
- **Bike Game**：自行車相關遊戲，包括卡片管理

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
