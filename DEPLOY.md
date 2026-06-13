# 🚀 部署到 GitHub Pages

把 `taskstar` 變成一個可以用網址打開的真網站，完全免費。完成後網址會是：

```
https://judy7113.github.io/taskstar/
```

---

## 步驟（網頁操作，不需打指令）

1. 打開你的 repo：<https://github.com/Judy7113/taskstar>
2. 點上方的 **Settings**（設定）
3. 左側選單往下找到 **Pages**
4. 在 **Build and deployment** 區塊：
   - **Source** 選 **Deploy from a branch**
   - **Branch** 選 **main**，資料夾選 **/ (root)**
   - 按 **Save**
5. 等 1～3 分鐘，重新整理這個 Pages 頁面，最上方會出現綠色框：
   > ✅ Your site is live at `https://judy7113.github.io/taskstar/`
6. 點那個網址，就能看到你的任務島上線了 🎉

---

## 之後要更新網站怎麼辦？

只要把新版的 `index.html` / `app.js` / `style.css` / `jar.js` 重新上傳到 repo（覆蓋舊的），
GitHub Pages 會自動重新部署，過 1～2 分鐘網址內容就更新了，**不用再設定一次**。

> 小提醒：更新後若沒看到變化，是瀏覽器快取。按 `Ctrl/Cmd + Shift + R` 強制重新整理即可。

---

## 常見問題

**Q：開啟後是一片空白 / 樣式跑掉？**
A：確認 `index.html`、`style.css`、`app.js`、`jar.js` 和 `assets/` 資料夾都在 repo 的**根目錄**（跟 README 同一層），不要放在子資料夾裡。

**Q：星星圖示沒出現？**
A：確認 `assets/star-gem.png` 有上傳成功。

**Q：可以用自己的網域嗎？**
A：可以，在 Pages 設定頁的 **Custom domain** 填入你的網域即可。
