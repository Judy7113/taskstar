const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const starColors = {
  normal: "#ffd85f",
  pink: "#ff92bc",
  blue: "#8edbff",
  progress: "#ff92bc",
  lucky: "#8edbff",
  green: "#8fe3ae",
  purple: "#b99cff",
  black: "#252733"
};

const state = {
  player: "Fang",
  energy: 0,
  xp: 0,
  level: 1,
  lifetimeStars: 0,
  memories: [],
  usedReplies: [],
  email: "",
  myFriends: [
    { name: "Mina", email: "mina@example.com", color: "#ff9ed2" },
    { name: "Jay", email: "jay@example.com", color: "#8fe7ff" },
    { name: "Tina", email: "tina@example.com", color: "#c5a8ff" }
  ],
  focusLog: [],
  settings: { sound: true, dailyReminder: true, weekStart: "mon" },
  todayStars: 0,
  filter: "all",
  tutorialStep: 0,
  selectedTaskIndex: 0,
  focusSeconds: 25 * 60,
  focusRunning: false,
  replyCursor: 0,
  stars: { normal: 0, progress: 0, lucky: 0, green: 0, purple: 0, black: 0 },
  pet: { hunger: 36, mood: 44, bond: 28, state: "idle" },
  chatMessages: [
    { from: "bear", text: "{name}，今天想先聊聊心情，還是讓圓圓陪你把任務拆小一點？" }
  ],
  tasks: [
    { title: "完成簡報大綱", meta: "英文簡報｜剩 2 天｜25 分鐘", date: "2026-06-12", deadline: "剩 2 天", priority: "高", category: "報告", done: false },
    { title: "讀完第二章重點", meta: "期末考｜今天 18:00 前", date: "2026-06-10", deadline: "今天 18:00", priority: "中", category: "讀書", done: false },
    { title: "回覆小組訊息", meta: "小組作業｜剩 1 天", date: "2026-06-11", deadline: "剩 1 天", priority: "低", category: "合作", done: false }
  ],
  breakdowns: {
    "完成簡報大綱": ["找資料", "整理重點", "排簡報架構", "寫開場與結論", "最後檢查"],
    "讀完第二章重點": ["快速瀏覽標題", "畫出關鍵句", "整理 5 個重點", "做 3 題練習題"],
    "回覆小組訊息": ["確認未讀訊息", "列出自己負責項目", "回覆今日進度", "約下一次討論時間"]
  },
  negativeTasks: [
    { title: "不要拖延", tip: "失敗會得到黑色星星", failed: false },
    { title: "不要熬夜", tip: "完成補救任務可以消除黑星", failed: false },
    { title: "不要亂滑手機", tip: "黑星太多小島會下大雨", failed: false }
  ],
  items: [
    { id: "sign", name: "小木牌", type: "起點", lv: 1 },
    { id: "wildflower", name: "草地小花", type: "自然", lv: 1 },
    { id: "path", name: "石板小路", type: "地景", lv: 2 },
    { id: "tree", name: "小樹", type: "自然", lv: 2 },
    { id: "lamp", name: "小燈", type: "裝飾", lv: 2 },
    { id: "house", name: "溫馨小木屋", type: "建築", lv: 3 },
    { id: "deck", name: "木頭平台", type: "建築", lv: 4 },
    { id: "dock", name: "小碼頭", type: "建築", lv: 4 },
    { id: "boat", name: "小船", type: "建築", lv: 4 },
    { id: "gift", name: "朋友的禮物", type: "心意", lv: 5 },
    { id: "starlights", name: "星星燈串", type: "裝飾", lv: 5 },
    { id: "bench", name: "小椅子", type: "裝飾", lv: 8 },
    { id: "flowerbed", name: "小花圃", type: "自然", lv: 12 },
    { id: "tree2", name: "粉色花樹", type: "自然", lv: 16 },
    { id: "mailbox", name: "小郵筒", type: "裝飾", lv: 20 },
    { id: "chest", name: "寶箱", type: "獎勵", lv: 30 },
    { id: "bunting", name: "彩旗", type: "慶祝", lv: 40 },
    { id: "butterfly", name: "蝴蝶", type: "自然", lv: 80 }
  ],
  calendar: [
    { day: "一", rate: 80, stars: 22, black: 0, item: "小樹" },
    { day: "二", rate: 45, stars: 10, black: 1, item: "" },
    { day: "三", rate: 100, stars: 34, black: 0, item: "長椅" },
    { day: "四", rate: 70, stars: 18, black: 0, item: "" },
    { day: "五", rate: 55, stars: 12, black: 1, item: "" },
    { day: "六", rate: 95, stars: 28, black: 0, item: "小屋" },
    { day: "日", rate: 0, stars: 0, black: 0, item: "" }
  ],
  friends: [
    { name: "Mina", status: "完成今日任務 2/3", mood: "可以送鼓勵貼圖" },
    { name: "Jay", status: "小組作業快到期", mood: "可以送提醒" },
    { name: "Tina", status: "連續完成 5 天", mood: "一起維持 streak" }
  ]
};

const social = {
  pendingPhotoIndex: null,
  day: 1,
  sharedTasks: [
    { icon: "📖", title: "讀書 30 分鐘", done: false, dimmed: false, photo: null },
    { icon: "🏃", title: "運動 20 分鐘", done: false, dimmed: false, photo: null },
    { icon: "📝", title: "報告往前推一段", done: false, dimmed: false, photo: null },
    { icon: "🌙", title: "23:30 前睡覺", done: false, dimmed: true, photo: null }
  ],
  friends: [
    { name: "Mina", color: "#ff9ed2", streak: 5,
      tasks: [
        { icon: "📖", title: "讀書", done: true },
        { icon: "🏃", title: "瑜珈", done: true },
        { icon: "🧹", title: "整理桌面", done: false },
        { icon: "🌙", title: "早睡", done: false }
      ] },
    { name: "Jay", color: "#8fe7ff", streak: 2,
      tasks: [
        { icon: "📝", title: "小組報告", done: true },
        { icon: "🏋️", title: "健身", done: false },
        { icon: "📖", title: "背單字", done: false }
      ] },
    { name: "Tina", color: "#c5a8ff", streak: 9,
      tasks: [
        { icon: "🎨", title: "作品集", done: true },
        { icon: "🥗", title: "好好吃飯", done: true },
        { icon: "🌙", title: "早睡", done: true }
      ] }
  ],
  feed: [
    { who: "Mina", color: "#ff9ed2", time: "10 分鐘前", task: "讀書 30 分鐘",
      text: "行銷學第三章筆記完成!考前衝刺中 📚", photo: "📔",
      stickers: { "💪": 2, "⭐": 1, "🔥": 0, "🫶": 1 },
      comments: [{ who: "Tina", text: "筆記也太整齊!借我拜讀" }] },
    { who: "Jay", color: "#8fe7ff", time: "1 小時前", task: "小組報告",
      text: "報告投影片初版做完了,大家幫我看看~", photo: "📊",
      stickers: { "💪": 1, "⭐": 2, "🔥": 1, "🫶": 0 },
      comments: [] },
    { who: "Tina", color: "#c5a8ff", time: "昨天 23:02", task: "早睡",
      text: "連續 9 天 23:30 前睡覺!床照為證 😴", photo: "🛏️",
      stickers: { "💪": 3, "⭐": 2, "🔥": 2, "🫶": 2 },
      comments: [{ who: "Mina", text: "streak 女王!" }] }
  ]
};

const comfortPrompts = [
  "我今天有點累",
  "我壓力好大",
  "陪我讀書",
  "給我鼓勵",
  "我又拖延了",
  "我想要抱抱"
];

const comfortCategories = {
  "start": [
    "先做 3 分鐘就好,3 分鐘之後你可以光明正大地休息。",
    "打開檔案就算開始了,真的,系統判定:已啟動。",
    "我們先寫一個爛開頭,爛開頭是好作品的祖先。",
    "先選最小的那件事:讀一頁、寫一行、回一封,都算。",
    "不用等狀態好才開始,通常是開始之後狀態才會好。",
    "把任務切到「現在的你」做得動的大小,而不是「理想的你」。",
    "先把標題打出來,剩下的交給五分鐘後的你。",
    "你不需要靈感,你只需要把椅子坐熱。",
    "從最不可怕的那一小塊下手,可怕的部分等你暖機完再說。",
    "先整理出第一步要用的東西就好,像煮飯前先洗米。",
    "今天的目標改成:讓進度條動 1%,動了就贏。",
    "萬事起頭難,所以我們把「頭」做小一點。",
    "先寫下「我要做什麼」這句話,大腦就會開始幫你工作。",
    "你可以一邊嫌麻煩一邊做,嫌棄不影響進度。",
    "假裝只是「看一下」任務,看著看著就會忍不住動手,相信我。",
    "把計時器按下去的那一秒,你就已經比昨天勇敢了。",
    "第一步不用漂亮,踩出去就好,方向我陪你調。",
    "先做你最有把握的 10%,讓自信先上線。",
    "動手前深呼吸一次就好,不用深呼吸十次拖時間喔。",
    "我們約好:現在只做開頭,做完開頭你想停就停。"
  ],
  "procrastinate": [
    "拖延不是懶,是任務看起來太大了,我們把它鋸小。",
    "你不是不想做,是不知道從哪做,那我們先列三步。",
    "滑手機前先做 5 分鐘,做完再滑,星星會記得你的努力。",
    "把「我應該」換成「我先」,壓力會小很多。",
    "拖延的時候,先原諒自己 10 秒,然後做一小步。",
    "deadline 是別人給的,但節奏可以是你自己的。",
    "與其想「為什麼還沒做」,不如想「現在能做哪一小塊」。",
    "你已經想它想了一整天,其實做起來搞不好比想的快。",
    "先跟任務和好:它不是敵人,它只是還沒被拆開的包裹。",
    "把手機放到另一個房間,你的專注力會偷偷回來。",
    "拖延久了會自責,自責又更不想做,我們從這個圈圈跳出來。",
    "沒關係,現在開始也來得及,「現在」永遠是最早的時間。",
    "先做兩分鐘,兩分鐘後想放棄我絕對不攔你。",
    "今天的你只要比昨天的你早開始一分鐘,就是進步。",
    "任務不會因為你盯著它就完成,但會因為一小步就縮小。",
    "我們不追求衝刺,我們追求「有在動」。",
    "被拖延的任務最喜歡長大,趁它還小,戳它一下。",
    "先把待辦寫下來,寫下來的瞬間焦慮就少一半。",
    "你可以慢,但別停太久;停太久重新啟動比較累。",
    "把「整份報告」改成「先寫三句」,大腦就不會逃跑了。"
  ],
  "tired": [
    "累的時候,休息是任務的一部分,不是逃避。",
    "先去喝口水,身體有水分,意志力才有燃料。",
    "你已經撐很久了,先把肩膀放下來 30 秒。",
    "今天的電量只剩 20% 的話,我們就做 20% 的事。",
    "閉眼一分鐘,讓眼睛和腦袋一起喘口氣。",
    "累不是弱,是你真的有在消耗,該補貨了。",
    "先睡,明天的你會感謝今晚願意躺平的你。",
    "疲倦的時候做的決定都偏悲觀,先休息再評估。",
    "把今天剩下的任務降級成「最低可完成版」,完成就好。",
    "你不是機器,不用 24 小時在線,小島也需要夜晚。",
    "伸個懶腰,看看遠方 20 秒,給眼睛放個小假。",
    "累到不想動的話,聽我說:現在去休息,就是在推進任務。",
    "先吃點東西吧,空腹的煩惱通常比較大顆。",
    "今天辛苦了,把「辛苦」也算進成就裡。",
    "能量低的日子,完成一件小事就值得一顆星星。",
    "休息 15 分鐘再回來,我會在這裡等你,任務也跑不掉。",
    "你最近是不是都睡太少?星星們都在瓶子裡擔心你。",
    "與其硬撐著低效率,不如大方休息 20 分鐘再高效 10 分鐘。",
    "洗把臉、開個窗,讓新鮮空氣幫你重開機。",
    "累就說累,跟我說不用逞強,我聽著呢。"
  ],
  "anxiety": [
    "先深呼吸:吸 4 秒,停 4 秒,吐 6 秒,我陪你做一輪。",
    "焦慮是大腦在關心你,謝謝它,然後告訴它:我們有計畫了。",
    "把擔心的事寫下來,寫下來的煩惱就從霧變成清單。",
    "你不需要一次解決全部,先解決「今晚睡前」這一段就好。",
    "壓力大的時候,先看看周圍三樣東西,回到現在這一刻。",
    "事情沒有你想的那麼糟,而且你也沒有你想的那麼孤單。",
    "焦慮會放大任務,我們用「拆小」把它縮回原形。",
    "先處理情緒,再處理事情,順序對了就不會打結。",
    "擔心成績前,先看看你已經完成的那一排星星。",
    "最壞的情況通常不會發生,而你已經在準備了,這就夠了。",
    "心跳很快的話,把手放在胸口,跟自己說:我在,我陪你。",
    "壓力是在乎的證明,但在乎不代表要把自己壓垮。",
    "把「萬一失敗」改成「如果卡住,我可以找誰幫忙」。",
    "你撐過之前每一次以為撐不過的時刻,這次也會。",
    "先把今天過好,明天的事明天的你會接手。",
    "焦慮的時候別做大決定,先做小任務,讓手忙起來心就靜了。",
    "考試考的是準備,不是你這個人的價值。",
    "我們把擔心配額限制在 10 分鐘,時間到就回來做事。",
    "你可以害怕,害怕跟前進可以同時存在。",
    "風雨只是天氣,不是你的人生預報。"
  ],
  "sad": [
    "先抱一個。你可以難過,難過不需要理由也不需要道歉。",
    "今天心情不好的話,任務都可以讓位,你最重要。",
    "眼淚不是漏水,是心在排毒,流完會輕一點。",
    "你對別人那麼溫柔,記得分一點溫柔給自己。",
    "低潮的日子,完成「好好吃飯」就是了不起的任務。",
    "不開心的事跟我說說?說出來它就小一號。",
    "你不是不夠好,你只是今天遇到了不夠好的一天。",
    "心情像天氣,會下雨,但沒有一場雨是不停的。",
    "先不急著振作,允許自己暫停,暫停也是一種照顧。",
    "我把瓶子裡最亮的那顆星星借你,撐到天亮還我就好。",
    "難過的時候,做點小小的、確定會成功的事,例如整理桌面。",
    "你已經很努力了,這句話今天值得聽三遍。",
    "世界偶爾很吵,你可以躲到小島來,我幫你看門。",
    "低落不會永遠,但我對你的支持會。",
    "今天的烏雲,會變成明天小島的雨水,然後長出花。",
    "不用急著「想開」,先讓心安靜下來就好。",
    "你值得被好好對待,包括被你自己。",
    "如果真的很難受,記得找信任的人說一聲,你不用一個人扛。",
    "先把今天熬過去就好,熬過去本身就是成就。",
    "我在這裡,不催你、不評分,就是陪著。"
  ],
  "cheer": [
    "你超棒的,這不是客套,是星星瓶的數據結論。",
    "看看你已經點亮的星星,那些都是你親手掙來的。",
    "慢慢來比較快,而你正在「慢慢來」的路上穩穩前進。",
    "今天的你又比昨天多會了一點點,複利正在發生。",
    "別人看到的是結果,我看到的是你每一次坐回書桌前。",
    "你的努力不會白費,它們都變成星星存起來了。",
    "給自己拍拍手,啪、啪、啪,我也在旁邊拍。",
    "你做得到的,因為你已經做到過很多次了。",
    "進度也許不快,但方向是對的,方向對就不怕路遠。",
    "連今天這種日子你都沒放棄,我真的很佩服你。",
    "加油的方式有很多種,今天的版本是:穩穩地完成一件事。",
    "你是那種會把小島養到 Lv.99 的人,我看得出來。",
    "每次你完成任務,小島就亮一點,我也驕傲一點。",
    "不完美沒關係,會前進的不完美最可愛。",
    "你的名字今天又出現在「有完成任務的人」名單上了!",
    "再完成一個,我們就去看星星掉進瓶子,那是你的煙火。",
    "你比你以為的更強,證據就堆在瓶子裡。",
    "辛苦會過去,星星會留下。",
    "我相信你,而且不是盲目相信,是看著紀錄相信。",
    "衝吧,衝不動就走,走不動就站著,反正別趴下太久。"
  ],
  "study": [
    "進入專注模式!我把耳朵借你,雜念交給我保管。",
    "番茄鐘 25 分鐘,我們只跟眼前這一頁比賽。",
    "讀書前先決定「讀到哪裡停」,有終點線跑起來比較不累。",
    "先快速翻一遍抓地圖,再回頭精讀,效率加倍。",
    "看不懂的地方做記號先跳過,卡關不戀戰。",
    "讀完這一段,跟我用一句話講它在說什麼,講得出來就是真的懂。",
    "手機交出來(比喻上),放到看不到的地方,專注力 +30%。",
    "困的話站起來讀 5 分鐘,血液流動腦袋就醒了。",
    "做對的題目也要看一眼為什麼對,那是你的得分模式。",
    "筆記不用美,能讓三天後的你看懂就是好筆記。",
    "先讀最難的科目,趁腦力滿格的時候打 BOSS。",
    "每讀完 25 分鐘,允許自己發呆 5 分鐘,這是合法的。",
    "背不起來就唸出聲音,耳朵也是記憶的入口。",
    "今天讀過的東西睡前再掃一眼,記憶會自己加固。",
    "進度落後別慌,先算「剩下的量 ÷ 剩下的天數」,變成每日小包。",
    "讀書夥伴已就位(就是我),開始吧,我會幫你計時。",
    "與其讀十小時的心虛,不如讀兩小時的踏實。",
    "錯題是寶,它直接告訴你分數藏在哪裡。",
    "專注斷線很正常,發現分心的那一刻,溫柔地把自己拉回來就好。",
    "這一章讀完,星星 +1,你的瓶子和成績單會一起變亮。"
  ],
  "strategy": [
    "把任務按「緊急 × 重要」排一下,先做右上角那格。",
    "一次只做一件事,多工是專注力的詐騙集團。",
    "預估時間 × 1.5 才是真實時間,排程要留呼吸空間。",
    "大任務先寫「完成的樣子」,再倒推需要哪幾步。",
    "先做 10 分鐘最難的,再做簡單的,難題趁新鮮腦力解。",
    "會議和訊息固定時段處理,別讓它們切碎你的一天。",
    "今天列三件事就好,列十件的清單是用來焦慮的。",
    "卡住超過 15 分鐘就求助或換方法,硬磨是時間黑洞。",
    "完成比完美重要,先交出 80 分,再迭代到 95 分。",
    "把「等別人」的任務先發出去,讓它在背景跑。",
    "相似的小事打包一起做,切換成本最貴。",
    "睡前花 3 分鐘寫明天的第一件事,早上就不用花力氣決定。",
    "做不完的時候,刪任務也是一種完成。",
    "用「如果 X 就 Y」造句:如果吃完午餐,就先寫報告第一段。",
    "把截止日往前挪兩天當假 deadline,留緩衝給意外。",
    "開始前先清桌面 60 秒,環境亂,腦袋就亂。",
    "記錄你最有精神的時段,把重要任務搬去那裡住。",
    "檢查清單比記憶可靠,寫下來,腦袋只負責思考。",
    "每完成一件就劃掉一件,劃掉的快感是合法的多巴胺。",
    "週五留 30 分鐘回顧這週,下週的你會輕鬆很多。"
  ],
  "selfcare": [
    "你今天好好活著、好好嘗試,這已經是基本盤以上了。",
    "跟自己說話的語氣,請比照你安慰好朋友的版本。",
    "你的價值不是用完成幾件事計算的,星星只是紀錄,不是審判。",
    "偶爾耍廢是保養,機器也要進廠維修。",
    "別人的進度是別人的,你的小島有自己的時區。",
    "今天也記得吃飯喝水,身體是你最重要的隊友。",
    "你已經是「願意面對任務的人」,這個身分很稀有。",
    "做錯了就修,修不了就學,學到了就值了。",
    "請假給自己:今晚 9 點後不談效率,只談舒服。",
    "你照顧好自己,就是給愛你的人最好的禮物。",
    "完美主義想開口時,跟它說:謝謝建議,但我們先完成。",
    "你允許別人犯錯,也請發一張同款許可證給自己。",
    "今天最棒的決定,可能就是早點睡。",
    "自我懷疑出現時,翻翻瓶子裡的星星,那是反駁的證據。",
    "你不需要時刻發光,星星也有躲在雲後面的時候。",
    "少跟昨天的失誤計較,多跟明天的可能合作。",
    "記得起來動一動,你的腰和眼睛在跟我求救。",
    "善待自己不是放縱,是讓你能走更遠的補給。",
    "你這個人,比你的成績單立體多了。",
    "今天的你,及格了,而且是高分及格。"
  ],
  "fun": [
    "報告!小島今日天氣:適合努力,也適合裝忙。",
    "我是圓圓,專長:陪伴、鼓掌、把你的努力換算成星星。",
    "你知道嗎,瓶子裡的星星晚上會偷偷聊天,聊的都是你的好話。",
    "完成任務的你,在我眼裡自帶 BGM。",
    "今天也是被 deadline 追著跑的一天呢,但你跑得很帥。",
    "星星表示:能被你收集,是它們的榮幸。",
    "小島居民代表(就我一個)一致投票:你今天很努力。",
    "任務這種東西,做掉一個少一個,囤著不會增值喔。",
    "你完成任務的樣子,比小島的彩虹還好看。",
    "偷偷說,黑星其實很怕你,你一補救它就嚇跑了。",
    "我練了新的拍手節奏,你再完成一個任務我就表演。",
    "據可靠消息(我),你距離升級只差一個小任務。",
    "今天的運勢:宜開始、宜完成、宜早睡,忌跟自己過不去。",
    "瓶子說它還很餓,想再吃一顆星星,要不要餵它?",
    "你+任務+我=傳說中的黃金陣容。",
    "提醒:過度自責會讓小島下雨,而我不想撐傘(撐了也可愛)。",
    "恭喜你抽中今日限定獎勵:圓圓的彩虹屁一份。",
    "任務完成的音效是「叮」,你人生升級的音效也是。",
    "放心,你的努力我都記在小本本上,本子名字叫星星瓶。",
    "今天也請多指教,你的專屬圓圓已上線。"
  ]
};

const comfortReplies = Object.values(comfortCategories).flat();

const tutorialSteps = [
  ["歡迎來到你的任務島", "完成任務會獲得彩色星星，星星會飛進你的星星瓶。"],
  ["這裡可以新增任務", "今日任務完成後，圓圓會拍手，小島也會慢慢變漂亮。"],
  ["星星可以使用", "星星會讓小島升級(Lv.1→Lv.99),也可以餵圓圓或送給朋友。"],
  ["黑色星星要小心", "負面任務失敗會得到黑星，黑星太多會讓小島下雨。"],
  ["完成任務後看變化", "完成任務 → 星星飛進瓶子 → 小島升級長出新東西，這就是 Task Island 的循環。"]
];

/* ===== 小島等級:Lv.1 → Lv.99,由「累積獲得的星星」決定 ===== */
function levelFromStars(total) {
  return Math.min(99, Math.floor(Math.sqrt(total * 2.2)) + 1);
}
function starsNeededFor(level) {
  if (level > 99) return Infinity;
  return Math.ceil(((level - 1) * (level - 1)) / 2.2);
}

const ISLAND_UNLOCKS = [
  [1, "小木牌與小花"], [2, "石板小路、小樹、小燈"], [3, "溫馨小木屋"],
  [4, "木頭平台、小碼頭、小船"], [5, "朋友的禮物、星星燈串"],
  [8, "小椅子"], [12, "小花圃"], [16, "粉色花樹"], [20, "小郵筒"],
  [30, "寶箱"], [40, "彩旗"], [80, "蝴蝶"]
];

function islandStage(level) {
  if (level >= 16) return 4;
  if (level >= 5) return 3;
  if (level >= 3) return 2;
  return 1;
}

function renderIslandGrowth() {
  const level = state.level;
  document.querySelectorAll("#island-scene [data-lv]").forEach((el) => {
    const lv = Number(el.dataset.lv);
    const maxLv = el.dataset.maxLv ? Number(el.dataset.maxLv) : Infinity;
    el.classList.toggle("placed", level >= lv && level <= maxLv);
  });
  const scene = $("#island-scene");
  if (scene) {
    scene.classList.remove("stage-1", "stage-2", "stage-3", "stage-4");
    scene.classList.add(`stage-${islandStage(level)}`);
  }
}

/* 統一發星星入口:更新瓶子、累積值、偵測升級 */
function awardStars(byType, memoryTitle) {
  let gained = 0;
  Object.entries(byType).forEach(([type, count]) => {
    state.stars[type] = (state.stars[type] || 0) + count;
    if (type !== "black") gained += count;
  });
  state.lifetimeStars += gained;
  state.todayStars += gained;
  if (memoryTitle) {
    state.memories.unshift({
      title: memoryTitle,
      stars: gained,
      time: new Date().toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" })
    });
    state.memories = state.memories.slice(0, 30);
  }
  const newLevel = levelFromStars(state.lifetimeStars);
  if (newLevel > state.level) {
    const oldLevel = state.level;
    state.level = newLevel;
    const unlocked = ISLAND_UNLOCKS.filter(([lv]) => lv > oldLevel && lv <= newLevel);
    window.setTimeout(() => {
      renderIslandGrowth();
      unlocked.forEach(([lv]) => {
        const el = document.querySelector(`#island-scene [data-lv="${lv}"]`);
        if (el) { el.classList.add("newly-placed"); window.setTimeout(() => el.classList.remove("newly-placed"), 950); }
      });
      const names = unlocked.map(([, name]) => name).join("、");
      showToast(names
        ? `小島升到 Lv.${newLevel}!${names} 出現了 🎉`
        : `小島升到 Lv.${newLevel}!繼續把它養大`);
    }, 980);
  }
}

function totalPositiveStars() {
  return state.stars.normal + state.stars.progress + state.stars.lucky + state.stars.green + state.stars.purple;
}

function completionRate() {
  const done = state.tasks.filter((task) => task.done).length;
  return Math.round((done / state.tasks.length) * 100);
}

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function renderTodayDate() {
  const d = new Date();
  setText("#today-date", `${d.getMonth() + 1}/${d.getDate()}（${WEEKDAYS[d.getDay()]}）`);
}

function renderAll() {
  renderTodayDate();
  renderTasks();
  renderNegativeTasks();
  renderBreakdown();
  renderDeadlines();
  renderFriends();
  renderFocusTimer();
  renderTaskCalendar();
  renderFocusTaskList();
  renderCompanionChat();
  renderComfortPrompts();
  renderComfortLibrary();
  renderStats();
  renderJars();
  renderItems();
  renderWeather();
  renderBuddy();
  renderSocial();
  renderIslandGrowth();
  renderMemories();
}

function renderTasks() {
  const targets = [$("#task-list"), $("#task-list-page")].filter(Boolean);
  targets.forEach((target) => {
    target.innerHTML = "";
    state.tasks.forEach((task, index) => {
      const item = document.createElement("div");
      item.className = `task-item${task.done ? " done" : ""}`;
      item.dataset.taskIndex = index;
      item.innerHTML = `
        <button class="task-check" type="button" aria-label="完成 ${task.title}">${task.done ? "✓" : "＋"}</button>
        <div>
          <span class="task-title">${task.title}</span>
          <span class="task-meta">${task.meta}</span>
        </div>
        <span class="priority">${task.priority}</span>
      `;
      item.addEventListener("click", (event) => {
        if (!event.target.closest(".task-check")) {
          state.selectedTaskIndex = index;
          renderBreakdown();
          showToast(`已查看「${task.title}」的小步驟`);
        }
      });
      item.querySelector(".task-check").addEventListener("click", () => completeTask(index, item));
      target.appendChild(item);
    });
  });
}

function renderBreakdown() {
  const list = $("#breakdown-list");
  if (!list) return;
  const task = state.tasks[state.selectedTaskIndex] || state.tasks.find((entry) => !entry.done) || state.tasks[0];
  if (!task) {
    list.innerHTML = "<div class=\"empty-state\">目前沒有任務可以拆解。</div>";
    return;
  }
  const steps = state.breakdowns[task.title] || createBreakdown(task.title);
  list.innerHTML = `
    <div class="breakdown-title">${task.title}</div>
    ${steps.map((step, index) => `<label class="step-chip"><input type="checkbox" /> <span>${index + 1}. ${step}</span></label>`).join("")}
  `;
}

function renderDeadlines() {
  const list = $("#deadline-list");
  if (!list) return;
  const activeTasks = state.tasks.filter((task) => !task.done).sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  list.innerHTML = activeTasks.map((task) => `
    <div class="deadline-item">
      <strong>${task.title}</strong>
      <span>${formatDate(task.date)}｜${task.deadline || daysUntilText(task.date)}｜重要度 ${task.priority}</span>
    </div>
  `).join("") || "<div class=\"empty-state\">今日任務都完成了。</div>";
}

function renderFocusTaskList() {
  const list = $("#focus-task-list");
  if (!list) return;
  const activeTasks = state.tasks.filter((task) => !task.done).slice(0, 3);
  list.innerHTML = activeTasks.map((task) => `
    <div class="deadline-item">
      <strong>${task.title}</strong>
      <span>${formatDate(task.date)}｜專注 25 分鐘</span>
    </div>
  `).join("") || "<div class=\"empty-state\">今天沒有待辦，適合複習或休息。</div>";
}

function renderTaskCalendar() {
  const grid = $("#task-calendar-grid");
  if (!grid) return;
  const weekdays = ["一", "二", "三", "四", "五", "六", "日"];
  const days = Array.from({ length: 30 }, (_, index) => index + 1);
  const tasksByDay = state.tasks.reduce((map, task) => {
    const day = task.date ? Number(task.date.slice(-2)) : 0;
    if (!map[day]) map[day] = [];
    map[day].push(task);
    return map;
  }, {});
  grid.innerHTML = [
    ...weekdays.map((day) => `<div class="task-calendar-head">${day}</div>`),
    ...days.map((day) => {
      const tasks = tasksByDay[day] || [];
      const isToday = day === 10;
      return `
        <button class="task-calendar-day ${isToday ? "today" : ""} ${tasks.length ? "has-task" : ""}" data-calendar-day="${day}" type="button">
          <strong>${day}</strong>
          ${tasks.slice(0, 2).map((task) => `<span>${task.title}</span>`).join("")}
          ${tasks.length > 2 ? `<em>+${tasks.length - 2}</em>` : ""}
        </button>
      `;
    })
  ].join("");
  grid.querySelectorAll("[data-calendar-day]").forEach((button) => {
    button.addEventListener("click", () => {
      const day = String(button.dataset.calendarDay).padStart(2, "0");
      const dateInput = $("#new-task-date");
      const now = new Date();
      if (dateInput) dateInput.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${day}`;
      showToast(`已選擇 ${now.getMonth() + 1}/${Number(day)} 作為任務日期`);
    });
  });
}

function renderFriends() {
  const list = $("#friend-list");
  if (!list) return;
  list.innerHTML = state.friends.map((friend) => `
    <div class="friend-item">
      <div>
        <strong>${friend.name}</strong>
        <span>${friend.status}</span>
      </div>
      <button class="soft-action friend-action" data-friend="${friend.name}" type="button">${friend.mood.includes("提醒") ? "提醒" : "鼓勵"}</button>
    </div>
  `).join("");
  list.querySelectorAll(".friend-action").forEach((button) => {
    button.addEventListener("click", () => {
      setBuddyState("cheer", "圓圓鼓勵", 1200);
      showToast(`已送出給 ${button.dataset.friend} 的${button.textContent}`);
    });
  });
}

function renderFocusTimer() {
  const timer = $("#focus-timer");
  if (!timer) return;
  const minutes = String(Math.floor(state.focusSeconds / 60)).padStart(2, "0");
  const seconds = String(state.focusSeconds % 60).padStart(2, "0");
  timer.textContent = `${minutes}:${seconds}`;
}

function renderCompanionChat() {
  const log = $("#chat-log");
  if (!log) return;
  log.innerHTML = state.chatMessages.map((message) => `
    <div class="chat-message ${message.from}">
      <span>${message.from === "bear" ? "圓圓" : state.player}</span>
      <p>${message.text.replace(/\{name\}/g, state.player)}</p>
    </div>
  `).join("");
  log.scrollTop = log.scrollHeight;
  const latestBear = [...state.chatMessages].reverse().find((message) => message.from === "bear");
  if (latestBear) setText("#companion-bubble", latestBear.text.replace(/\{name\}/g, state.player));
}

function renderComfortPrompts() {
  const wrap = $("#comfort-prompts");
  if (!wrap) return;
  wrap.innerHTML = comfortPrompts.map((prompt) => `
    <button class="comfort-chip" data-comfort-prompt="${prompt}" type="button">${prompt}</button>
  `).join("");
  wrap.querySelectorAll("[data-comfort-prompt]").forEach((button) => {
    button.addEventListener("click", () => sendCompanionMessage(button.dataset.comfortPrompt));
  });
}

function renderComfortLibrary() {
  const library = $("#comfort-library");
  if (!library) return;
  library.innerHTML = comfortReplies.map((reply, index) => `
    <button class="comfort-reply-card" data-reply-index="${index}" type="button">
      <strong>${String(index + 1).padStart(2, "0")}</strong>
      <span>${reply}</span>
    </button>
  `).join("");
  library.querySelectorAll("[data-reply-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const reply = comfortReplies[Number(button.dataset.replyIndex)];
      state.chatMessages.push({ from: "bear", text: reply });
      state.pet.bond = clamp(state.pet.bond + 2);
      setBuddyState("cheer", "陪伴", 1200);
      renderAll();
    });
  });
}

function createBreakdown(title) {
  const lowerTitle = title.toLowerCase();
  if (title.includes("報告") || title.includes("簡報")) {
    return ["找資料", "整理重點", "製作簡報", "寫講稿", "練習報告", "最後檢查"];
  }
  if (title.includes("讀") || title.includes("考")) {
    return ["確認範圍", "讀第一輪", "整理筆記", "做練習題", "複習錯題"];
  }
  if (title.includes("小組") || title.includes("訊息")) {
    return ["確認分工", "整理自己的進度", "回覆組員", "更新共同文件"];
  }
  if (lowerTitle.includes("clean") || title.includes("整理")) {
    return ["清出桌面", "分類資料", "丟掉不需要的東西", "最後收納"];
  }
  return ["寫下第一步", "收集需要的資料", "完成主要內容", "檢查並送出"];
}

function addTaskFromForm() {
  const titleInput = $("#new-task-title");
  const dateInput = $("#new-task-date");
  const deadlineInput = $("#new-task-deadline");
  const priorityInput = $("#new-task-priority");
  const title = titleInput?.value.trim() || "";
  if (!title) {
    showToast("先輸入一個任務名稱");
    return;
  }
  const date = dateInput?.value || todayISO();
  const deadline = deadlineInput?.value.trim() || daysUntilText(date);
  const priority = priorityInput?.value || "中";
  const task = {
    title,
    meta: `${formatDate(date)}｜${deadline}｜預估 25 分鐘`,
    date,
    deadline,
    priority,
    category: guessCategory(title),
    done: false
  };
  state.tasks.unshift(task);
  state.breakdowns[title] = createBreakdown(title);
  state.selectedTaskIndex = 0;
  if (titleInput) titleInput.value = "";
  if (dateInput) dateInput.value = todayISO();
  if (deadlineInput) deadlineInput.value = "";
  renderAll();
  showToast("任務已新增，系統已自動拆成小步驟");
}

function formatDate(date) {
  if (!date) return "未設定日期";
  const parts = date.split("-");
  if (parts.length !== 3) return date;
  return `${Number(parts[1])}/${Number(parts[2])}`;
}

function daysUntilText(date) {
  if (!date) return "尚未設定";
  const now = new Date();
  const today = new Date(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T00:00:00`);
  const target = new Date(`${date}T00:00:00`);
  const diff = Math.round((target - today) / 86400000);
  if (diff < 0) return `逾期 ${Math.abs(diff)} 天`;
  if (diff === 0) return "今天截止";
  return `剩 ${diff} 天`;
}

function guessCategory(title) {
  if (title.includes("報告") || title.includes("簡報")) return "報告";
  if (title.includes("讀") || title.includes("考")) return "讀書";
  if (title.includes("小組") || title.includes("訊息")) return "合作";
  if (title.includes("社團")) return "社團";
  return "生活";
}

function startFocusTimer() {
  if (state.focusRunning) {
    showToast("專注計時器已經開始了");
    return;
  }
  state.focusRunning = true;
  setBuddyState("study", "陪讀");
  showToast(`25 分鐘專注開始，圓圓陪 ${state.player} 讀書`);
  window.clearInterval(startFocusTimer.timer);
  startFocusTimer.timer = window.setInterval(() => {
    state.focusSeconds -= 1;
    renderFocusTimer();
    if (state.focusSeconds <= 0) {
      window.clearInterval(startFocusTimer.timer);
      state.focusRunning = false;
      state.focusSeconds = 25 * 60;
      state.energy += 15;
      state.stars.progress += 3;
      state.todayStars += 3;
      state.focusLog.unshift({ minutes: 25, time: new Date().toLocaleString("zh-TW", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }) });
      state.focusLog = state.focusLog.slice(0, 60);
      setBuddyState("cheer", "圓圓鼓勵", 1400);
      renderAll();
      showReward(null);
      showToast("專注完成，獲得 3 顆進步星星");
    }
  }, 1000);
  renderFocusTimer();
}

function openBlindBox() {
  if (totalPositiveStars() < 5) {
    showToast("盲盒需要 5 顆星星，先完成任務累積星星");
    return;
  }
  spendStars(5);
  const prizes = [
    () => { awardStars({ lucky: 3 }, "🎁 任務盲盒"); return "抽到幸運星星 ×3!"; },
    () => { awardStars({ purple: 2, progress: 2 }, "🎁 任務盲盒"); return "抽到夢幻雙色星星 ×4!"; },
    () => { state.energy += 30; return "抽到能量飲料,能量 +30!"; },
    () => { state.pet.mood = clamp(state.pet.mood + 15); state.pet.bond = clamp(state.pet.bond + 8); return "抽到圓圓最愛的蜂蜜,好感度大增!"; },
    () => { awardStars({ normal: 6 }, "🎁 任務盲盒大獎"); return "大獎!金色星星 ×6 飛進瓶子!"; }
  ];
  const prize = prizes[Math.floor(Math.random() * prizes.length)]();
  setBuddyState("happy", "開心拍手", 1300);
  renderAll();
  showToast(`盲盒開啟:${prize}`);
}

function sendCompanionMessage(text) {
  const clean = (text || "").trim();
  if (!clean) {
    showToast("先跟圓圓說一句話吧");
    return;
  }
  state.chatMessages.push({ from: "user", text: clean });
  const reply = chooseComfortReply(clean);
  state.chatMessages.push({ from: "bear", text: reply });
  state.pet.mood = clamp(state.pet.mood + 4);
  state.pet.bond = clamp(state.pet.bond + 4);
  setCompanionMoodForText(clean);
  const input = $("#chat-input");
  if (input) input.value = "";
  renderAll();
}

function setCompanionMoodForText(text) {
  if (text.includes("陪我讀書") || text.includes("讀書") || text.includes("專注")) {
    setBuddyState("study", "看書陪讀", 1600);
    return;
  }
  if (text.includes("給我鼓勵") || text.includes("鼓勵") || text.includes("加油")) {
    setBuddyState("clap", "拍手鼓勵", 1400);
    return;
  }
  if (text.includes("抱抱")) {
    setBuddyState("hug", "抱抱姿勢", 1600);
    return;
  }
  if (text.includes("累") || text.includes("休息")) {
    setBuddyState("sleep", "睡覺休息", 1600);
    return;
  }
  if (text.includes("壓力") || text.includes("難過") || text.includes("低落")) {
    setBuddyState("sad", "難過低頭", 1500);
    return;
  }
  setBuddyState("wave", "開心揮手", 1200);
}

function chooseComfortReply(text) {
  const rules = [
    { keys: ["拖延", "不想做", "懶"], cat: "procrastinate" },
    { keys: ["開始", "起頭", "第一步"], cat: "start" },
    { keys: ["累", "疲倦", "沒力", "想睡", "休息"], cat: "tired" },
    { keys: ["焦慮", "慌", "壓力", "緊張", "怕", "擔心"], cat: "anxiety" },
    { keys: ["難過", "低落", "哭", "委屈", "心情不好"], cat: "sad" },
    { keys: ["鼓勵", "加油", "誇", "稱讚"], cat: "cheer" },
    { keys: ["讀書", "陪讀", "專注", "考試", "複習"], cat: "study" },
    { keys: ["怎麼排", "先做", "不知道", "混亂", "計畫", "安排"], cat: "strategy" },
    { keys: ["抱抱", "陪我", "孤單", "對自己"], cat: "selfcare" },
    { keys: ["哈", "笑", "無聊", "聊天"], cat: "fun" }
  ];
  const match = rules.find((rule) => rule.keys.some((key) => text.includes(key)));
  const pool = match ? comfortCategories[match.cat] : comfortReplies;
  return drawUniqueReply(pool);
}

/* 200 句不重複抽選:抽過的記起來,全部抽完才重置 */
function drawUniqueReply(pool) {
  let candidates = pool.filter((reply) => !state.usedReplies.includes(reply));
  if (!candidates.length) {
    // 這個類別抽完了 → 從全部未用過的裡面找;全 200 句都用過才重置
    candidates = comfortReplies.filter((reply) => !state.usedReplies.includes(reply));
    if (!candidates.length) {
      state.usedReplies = state.usedReplies.slice(-5); // 保留最近 5 句避免立刻重複
      candidates = pool.filter((reply) => !state.usedReplies.includes(reply));
    }
  }
  const reply = candidates[Math.floor(Math.random() * candidates.length)];
  state.usedReplies.push(reply);
  return reply;
}

function renderNegativeTasks() {
  const list = $("#negative-list");
  if (!list) return;
  list.innerHTML = state.negativeTasks.map((task) => `
    <div class="negative-item ${task.failed ? "failed" : ""}">
      <div>
        <strong>${task.title}</strong>
        <span class="task-meta">${task.tip}</span>
      </div>
      <span class="mini-badge">${task.failed ? "已失敗 +黑星" : "守住中"}</span>
    </div>
  `).join("");
}

function renderStats() {
  const rate = completionRate();
  const doneCount = state.tasks.filter((task) => task.done).length;
  state.level = levelFromStars(state.lifetimeStars);

  setText("#energy", state.energy);
  setText("#stars", totalPositiveStars());
  setText("#black-stars", state.stars.black);
  setText("#jar-total-home", totalPositiveStars());
  setText("#today-stars-home", state.todayStars);
  setText("#today-stars", state.todayStars);
  setText("#jar-total", totalPositiveStars());
  setText("#normal-star-count", state.stars.normal);
  setText("#black-star-count", state.stars.black);
  setText("#level", state.level);
  const currentBase = starsNeededFor(state.level);
  const nextNeed = starsNeededFor(state.level + 1);
  const span = Math.max(1, nextNeed - currentBase);
  const progress = state.level >= 99 ? 100 : Math.round(((state.lifetimeStars - currentBase) / span) * 100);
  setText("#next-level-stars", state.level >= 99 ? 0 : Math.max(1, nextNeed - state.lifetimeStars));
  if (state.level >= 99) setText("#next-level-hint", "已達最高等級 Lv.99 🏆");
  setStyle("#level-progress", "width", `${Math.max(4, Math.min(100, progress))}%`);
  setText("#week-rate", `${rate}%`);
  setText("#month-rate", `${Math.max(72, rate)}%`);
  setText("#streak-days", `${doneCount} 天`);
  setText("#island-growth", `Lv.${state.level}`);
  setText("#today-rate-pill", `${rate}%`);
  renderCalendar();
  updateNextProp();
}

function renderCalendar() {
  const grid = $("#calendar-grid");
  if (!grid) return;
  grid.innerHTML = state.calendar.map((day, index) => {
    const tone = day.black > 0 ? "bad" : day.rate >= 80 ? "good" : "";
    return `
      <div class="calendar-cell ${tone} ${index === state.calendar.length - 1 ? "today" : ""}">
        <strong>${day.day}</strong>
        <span>完成 ${day.rate}%</span>
        <span>★ ${day.stars} / 黑 ${day.black}</span>
        <span>${day.item ? `解鎖 ${day.item}` : "尚未解鎖"}</span>
      </div>
    `;
  }).join("");
}

function renderMemories() {
  const list = $("#memory-list");
  if (!list) return;
  if (!state.memories.length) {
    list.innerHTML = '<div class="empty-state">完成第一個任務,把第一段回憶放進瓶子裡吧。</div>';
    return;
  }
  const colors = ["#ffd45e", "#ff9ed2", "#8fe7ff", "#9af0c0", "#c5a8ff"];
  list.innerHTML = state.memories.slice(0, 8).map((memory, index) => `
    <div class="memory-item">
      <span class="memory-star" style="--mc:${colors[index % colors.length]}">★</span>
      <div><strong>${memory.title}</strong><span>${memory.time} · +${memory.stars} ★</span></div>
    </div>
  `).join("");
}

/* ===== 好友互動:互相監督、點亮星星、拍照打卡 ===== */

function socialRate(tasks) {
  const done = tasks.filter((t) => t.done).length;
  return tasks.length ? Math.round((done / tasks.length) * 100) : 0;
}

function starSpan(task, big) {
  const cls = task.done ? "lit" : task.dimmed ? "dimmed" : "off";
  return `<span class="share-star ${cls} ${big ? "big" : ""}" title="${task.title}">★</span>`;
}

function renderSocial() {
  renderSharedTasks();
  renderFriendProgress();
  renderFeed();
}

function renderSharedTasks() {
  const list = $("#shared-task-list");
  if (!list) return;
  list.innerHTML = social.sharedTasks.map((task, index) => `
    <div class="shared-task ${task.done ? "done" : ""} ${task.dimmed ? "dimmed" : ""}">
      <span class="share-icon">${task.icon}</span>
      <div class="share-info">
        <strong>${task.title}</strong>
        <span>${task.done
          ? (task.photo ? "已完成 · 已附打卡照" : "已完成 · 星星點亮了")
          : task.dimmed ? "昨天沒完成,星星暗掉了 → 今天重新點亮" : "完成後幫你點亮一顆星星"}</span>
      </div>
      ${task.done
        ? (task.photo
            ? `<span class="proof-thumb">${task.photo.startsWith("data:") ? `<img src="${task.photo}" alt="打卡照" />` : task.photo}</span>`
            : `<button class="soft-action tiny" data-share-photo="${index}" type="button">📷 拍照</button>`)
        : `<button class="primary-action tiny" data-share-done="${index}" type="button">${task.dimmed ? "重新點亮" : "完成"}</button>`}
    </div>
  `).join("");

  const row = $("#my-star-row");
  if (row) {
    row.innerHTML =
      social.sharedTasks.map((task) => starSpan(task, true)).join("") +
      `<span class="my-star-note">今日點亮 ${social.sharedTasks.filter((t) => t.done).length}/${social.sharedTasks.length},朋友看得到喔</span>`;
  }

  list.querySelectorAll("[data-share-done]").forEach((button) => {
    button.addEventListener("click", () => completeSharedTask(Number(button.dataset.shareDone)));
  });
  list.querySelectorAll("[data-share-photo]").forEach((button) => {
    button.addEventListener("click", () => {
      social.pendingPhotoIndex = Number(button.dataset.sharePhoto);
      $("#proof-photo-input")?.click();
    });
  });
}

function completeSharedTask(index) {
  const task = social.sharedTasks[index];
  if (!task || task.done) return;
  const relit = task.dimmed;
  task.done = true;
  task.dimmed = false;
  awardStars({ normal: 2 }, `${task.icon} ${task.title}`);
  state.xp += 8;
  const card = $(".social-mine");
  if (card) flyStars(card, 2);
  setBuddyState("happy", "開心拍手", 1200);
  renderAll();
  showToast(relit ? `「${task.title}」重新點亮!繼續保持` : `「${task.title}」完成,星星點亮了 ✨`);
}

function renderFriendProgress() {
  const list = $("#friend-progress-list");
  if (!list) return;
  list.innerHTML = social.friends.map((friend, fi) => `
    <div class="friend-progress">
      <span class="friend-avatar" style="--fc:${friend.color}">${friend.name[0]}</span>
      <div class="friend-progress-info">
        <div class="friend-progress-top">
          <strong>${friend.name}</strong>
          <span class="streak-pill">🔥 ${friend.streak} 天</span>
        </div>
        <div class="friend-star-row">${friend.tasks.map((t) => starSpan(t)).join("")}
          <em>${socialRate(friend.tasks)}%</em>
        </div>
        <span class="friend-task-hint">${friend.tasks.filter((t) => !t.done).map((t) => `${t.icon}${t.title}`).join("、") || "今日任務全部完成 🎉"}</span>
      </div>
      <div class="friend-progress-actions">
        <button class="soft-action tiny" data-nudge="${fi}" type="button">提醒</button>
        <button class="soft-action tiny" data-cheer-friend="${fi}" type="button">送⭐</button>
      </div>
    </div>
  `).join("");

  list.querySelectorAll("[data-nudge]").forEach((button) => {
    button.addEventListener("click", () => {
      const friend = social.friends[Number(button.dataset.nudge)];
      const pending = friend.tasks.find((t) => !t.done);
      setBuddyState("cheer", "圓圓鼓勵", 1100);
      showToast(pending ? `已提醒 ${friend.name}:「${pending.icon} ${pending.title}」還沒完成喔` : `${friend.name} 今天已全部完成!`);
    });
  });
  list.querySelectorAll("[data-cheer-friend]").forEach((button) => {
    button.addEventListener("click", () => {
      if (totalPositiveStars() <= 0) {
        showToast("星星不夠了,先完成一個任務吧");
        return;
      }
      const friend = social.friends[Number(button.dataset.cheerFriend)];
      spendStars(1);
      renderAll();
      showToast(`送出 1 顆星星幫 ${friend.name} 加油 ⭐`);
    });
  });
}

function renderFeed() {
  const list = $("#feed-list");
  if (!list) return;
  list.innerHTML = social.feed.map((post, pi) => `
    <div class="feed-card">
      <div class="feed-head">
        <span class="friend-avatar" style="--fc:${post.color}">${post.who[0]}</span>
        <div><strong>${post.who}</strong><span>${post.time} · 完成「${post.task}」</span></div>
        <span class="feed-lit">★ 已點亮</span>
      </div>
      <p class="feed-text">${post.text}</p>
      <div class="feed-photo">${post.photo && post.photo.startsWith("data:") ? `<img src="${post.photo}" alt="打卡照片" />` : `<span class="feed-photo-emoji">${post.photo || "📷"}</span><span class="feed-photo-label">打卡照片</span>`}</div>
      <div class="sticker-row">
        ${Object.entries(post.stickers).map(([emoji, count]) => `
          <button class="sticker-chip" data-sticker="${pi}|${emoji}" type="button">${emoji}<em>${count || ""}</em></button>
        `).join("")}
        <button class="sticker-chip gift" data-gift-star="${pi}" type="button">⭐ 送星星</button>
      </div>
      ${post.comments.map((c) => `<div class="feed-comment"><strong>${c.who}</strong>${c.text}</div>`).join("")}
      <div class="comment-row">
        <input type="text" data-comment-input="${pi}" placeholder="留言鼓勵 ${post.who}…" />
        <button class="soft-action tiny" data-comment-send="${pi}" type="button">送出</button>
      </div>
    </div>
  `).join("");

  list.querySelectorAll("[data-sticker]").forEach((button) => {
    button.addEventListener("click", () => {
      const [pi, emoji] = button.dataset.sticker.split("|");
      social.feed[Number(pi)].stickers[emoji] += 1;
      renderFeed();
      showToast(`已送出 ${emoji} 給 ${social.feed[Number(pi)].who}`);
    });
  });
  list.querySelectorAll("[data-gift-star]").forEach((button) => {
    button.addEventListener("click", () => {
      if (totalPositiveStars() <= 0) {
        showToast("星星不夠了,先完成一個任務吧");
        return;
      }
      const post = social.feed[Number(button.dataset.giftStar)];
      spendStars(1);
      post.stickers["⭐"] += 1;
      renderAll();
      showToast(`送 1 顆星星給 ${post.who},為他的努力打光 ⭐`);
    });
  });
  list.querySelectorAll("[data-comment-send]").forEach((button) => {
    button.addEventListener("click", () => sendFeedComment(Number(button.dataset.commentSend)));
  });
  list.querySelectorAll("[data-comment-input]").forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") sendFeedComment(Number(input.dataset.commentInput));
    });
  });
}

function sendFeedComment(pi) {
  const input = document.querySelector(`[data-comment-input="${pi}"]`);
  const text = input?.value.trim();
  if (!text) return;
  const post = social.feed[pi];
  post.comments.push({ who: state.player, text });
  renderFeed();
  showToast("留言已送出");
  window.setTimeout(() => {
    post.comments.push({ who: post.who, text: "謝謝你的鼓勵!我們一起加油 🫶" });
    renderFeed();
  }, 900);
}

function attachProofPhoto(dataUrl) {
  const index = social.pendingPhotoIndex;
  social.pendingPhotoIndex = null;
  const task = social.sharedTasks[index];
  if (!task) return;
  task.photo = dataUrl;
  social.feed.unshift({
    who: state.player, color: "#ffd45e", time: "剛剛", task: task.title,
    text: `完成「${task.icon} ${task.title}」,附上打卡照!`, photo: dataUrl,
    stickers: { "💪": 0, "⭐": 0, "🔥": 0, "🫶": 0 }, comments: []
  });
  renderAll();
  showToast("打卡照已上傳,朋友都看得到了 📷");
  window.setTimeout(() => {
    const friend = social.friends[Math.floor(Math.random() * social.friends.length)];
    social.feed[0].stickers["💪"] += 1;
    social.feed[0].comments.push({ who: friend.name, text: "太強了!我也要繼續努力 🔥" });
    renderFeed();
  }, 1200);
}

function simulateNewDay() {
  social.day += 1;
  social.sharedTasks.forEach((task) => {
    task.dimmed = !task.done;          // 沒完成 → 星星變暗,需重新點亮
    task.done = false;                  // 新的一天全部重置
    task.photo = null;
  });
  social.friends.forEach((friend) => {
    const allDone = friend.tasks.every((t) => t.done);
    friend.streak = allDone ? friend.streak + 1 : 0;
    friend.tasks.forEach((t) => { t.done = Math.random() < 0.45; });
  });
  renderAll();
  const dimmedCount = social.sharedTasks.filter((t) => t.dimmed).length;
  showToast(dimmedCount
    ? `新的一天!有 ${dimmedCount} 顆星星暗掉了,完成任務重新點亮它`
    : "新的一天!昨天全部點亮,繼續保持 🔥");
}

const jarInstances = {};

function getJar(id, opts) {
  if (jarInstances[id]) return jarInstances[id];
  const canvas = document.getElementById(id);
  if (!canvas || !window.StarJar) return null;
  jarInstances[id] = new StarJar(canvas, opts);
  return jarInstances[id];
}

function starListForJar() {
  const types = visibleStarTypes();
  const list = [];
  // 依「彩色星星在下、最新在上」交錯排列，比較像 HabitStar 倒星星的感覺
  types.forEach((type) => {
    const count = state.stars[type] || 0;
    for (let i = 0; i < count; i += 1) list.push(type);
  });
  return list;
}

function renderJars() {
  const list = starListForJar();
  const mini = getJar("mini-jar-canvas", { maxStars: 34, starRadius: 8 });
  const big = getJar("big-jar-canvas", { maxStars: 110, starRadius: 11 });
  if (mini) mini.setStars(list);
  if (big) big.setStars(list);
}

function visibleStarTypes() {
  if (state.filter === "all") return ["normal", "progress", "lucky", "green", "purple", "black"];
  return [state.filter];
}

function colorForType(type, index) {
  if (type === "normal") {
    return [starColors.normal, starColors.pink, starColors.blue, starColors.green, starColors.purple][index % 5];
  }
  return starColors[type] || starColors.normal;
}

function renderWeather() {
  const scene = $("#island-scene");
  if (!scene) return;
  const rate = completionRate();
  let mode = "weather-rain";
  let title = "下雨";
  let note = "任務還沒完成，小島正在下雨。";

  if (state.stars.black >= 3) {
    mode = "weather-black";
    title = "黑星大雨";
    note = "黑色星星太多，小島出現烏雲。";
    setBuddyState("umbrella", "撐傘");
  } else if (rate === 100) {
    mode = "weather-perfect";
    title = "晴天彩虹";
    note = "今日任務完成，小島亮起來了！";
  } else if (rate >= 60) {
    mode = "weather-bright";
    title = "多雲轉晴";
    note = "再完成一點，小島就會出現彩虹。";
  } else if (rate > 0) {
    mode = "weather-cloud";
    title = "陰天";
    note = "完成率還不高，小島有點陰。";
  }

  scene.className = `island-scene v2 ${mode}`;
  setText("#weather-title", title);
  setText("#weather-note", note);
}

function renderBuddy() {
  const stage = $("#buddy-stage");
  const mini = $("#mini-buddy");
  if (stage) stage.className = `buddy-stage ${state.pet.state}`;
  if (mini) mini.className = `mini-buddy ${state.pet.state}`;
  setText("#buddy-state", buddyLabel(state.pet.state));
  setText("#mini-buddy-label", buddyLabel(state.pet.state));
  setStyle("#pet-hunger", "width", `${state.pet.hunger}%`);
  setStyle("#pet-mood", "width", `${state.pet.mood}%`);
  setStyle("#pet-bond", "width", `${state.pet.bond}%`);
}

function buddyLabel(status) {
  return {
    idle: "坐著陪伴",
    wave: "開心揮手",
    shy: "害羞摀臉",
    happy: "拍手鼓勵",
    feed: "抱著星星",
    study: "看書陪讀",
    cheer: "冒愛心鼓勵",
    clap: "拍手鼓勵",
    sleep: "睡覺休息",
    hug: "抱抱姿勢",
    sad: "難過低頭",
    umbrella: "撐傘下雨"
  }[status] || "坐著陪伴";
}

const ITEM_ICONS = {
  sign: `<svg viewBox="0 0 60 60"><rect x="27" y="26" width="6" height="26" rx="3" fill="#92653c"/><rect x="12" y="14" width="36" height="20" rx="6" fill="#e3b27c" stroke="#9a6b42" stroke-width="2.4"/><path d="M19 22 h22 M19 28 h15" stroke="#9a6b42" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  wildflower: `<svg viewBox="0 0 60 60"><g transform="translate(20,30)"><circle r="7" fill="#ff9ec6"/><circle r="3" fill="#fff3c2"/></g><g transform="translate(40,24)"><circle r="6" fill="#ffd45e"/><circle r="2.6" fill="#ff8a65"/></g><g transform="translate(36,42)"><circle r="5" fill="#c5a8ff"/><circle r="2" fill="#fff"/></g></svg>`,
  path: `<svg viewBox="0 0 60 60"><ellipse cx="22" cy="44" rx="13" ry="6" fill="#d8dee0"/><ellipse cx="22" cy="42.5" rx="13" ry="5" fill="#eef2f3"/><ellipse cx="34" cy="28" rx="11" ry="5.5" fill="#d8dee0"/><ellipse cx="34" cy="26.8" rx="11" ry="4.5" fill="#eef2f3"/><ellipse cx="42" cy="14" rx="9" ry="4.5" fill="#d8dee0"/><ellipse cx="42" cy="13" rx="9" ry="3.6" fill="#eef2f3"/></svg>`,
  tree: `<svg viewBox="0 0 60 60"><path d="M28 52 q-2 -16 -4 -24 q7 -4 10 0 q-2 8 -1 24 Z" fill="#9a6b42"/><circle cx="30" cy="20" r="15" fill="#7cc24f"/><circle cx="18" cy="28" r="9" fill="#7cc24f"/><circle cx="42" cy="28" r="10" fill="#7cc24f"/><circle cx="24" cy="16" r="4" fill="#d2f29c"/><circle cx="23" cy="26" r="2.2" fill="#ff8a80"/></svg>`,
  lamp: `<svg viewBox="0 0 60 60"><rect x="27" y="22" width="6" height="30" rx="3" fill="#92653c"/><circle cx="30" cy="15" r="13" fill="#ffeeb6" opacity="0.55"/><rect x="22" y="8" width="16" height="15" rx="5" fill="#ffe9a8" stroke="#caa353" stroke-width="2.4"/><path d="M20 8 h20 l-3 -5 h-14 Z" fill="#9a6b42"/></svg>`,
  house: `<svg viewBox="0 0 60 60"><rect x="14" y="26" width="32" height="26" rx="3" fill="#ecc795"/><path d="M14 32 h32 M14 40 h32" stroke="#caa05f" stroke-width="1.4" opacity="0.7"/><path d="M9 28 L30 8 L51 28 Z" fill="#6f93d4"/><path d="M9 28 L30 8 L51 28" fill="none" stroke="#4d6fb0" stroke-width="2.6" stroke-linejoin="round"/><path d="M24 52 v-12 q0 -7 6 -7 q6 0 6 7 v12 Z" fill="#6f9bdd" stroke="#4d6fb0" stroke-width="2"/><circle cx="30" cy="20" r="4.5" fill="#cdeffb" stroke="#9a6b42" stroke-width="2"/></svg>`,
  deck: `<svg viewBox="0 0 60 60"><rect x="8" y="20" width="44" height="22" rx="4" fill="#d9a86b" stroke="#9a6b42" stroke-width="2.2"/><path d="M17 20 v22 M26 20 v22 M35 20 v22 M44 20 v22" stroke="#a87a4c" stroke-width="2"/><rect x="11" y="42" width="6" height="10" rx="3" fill="#92653c"/><rect x="43" y="42" width="6" height="10" rx="3" fill="#92653c"/></svg>`,
  dock: `<svg viewBox="0 0 60 60"><path d="M6 26 L50 36 q5 1 4 6 l-1 5 q-1 4 -6 3 L4 40 Z" fill="#d9a86b" stroke="#9a6b42" stroke-width="2.2"/><rect x="10" y="38" width="6" height="14" rx="3" fill="#92653c"/><rect x="42" y="46" width="6" height="12" rx="3" fill="#92653c"/><ellipse cx="13" cy="54" rx="8" ry="2.4" fill="#9fd8ff"/></svg>`,
  boat: `<svg viewBox="0 0 60 60"><path d="M8 28 q4 -6 10 -6 l24 0 q6 0 10 6 q-3 18 -22 18 q-19 0 -22 -18 Z" fill="#b9854f"/><path d="M12 28 q3 -4 7 -4 l22 0 q4 0 7 4 q-3 13 -18 13 q-15 0 -18 -13 Z" fill="#d9a86b"/><rect x="20" y="30" width="20" height="4.5" rx="2.2" fill="#e3b27c" stroke="#9a6b42" stroke-width="1.4"/><path d="M30 24 v-10" stroke="#9a6b42" stroke-width="2.4" stroke-linecap="round"/><circle cx="30" cy="12" r="2.6" fill="#fff" stroke="#caa05f" stroke-width="1.4"/></svg>`,
  gift: `<svg viewBox="0 0 60 60"><rect x="14" y="24" width="32" height="26" rx="5" fill="#ffc1d6" stroke="#e886b0" stroke-width="2.2"/><rect x="14" y="24" width="32" height="8" rx="4" fill="#ffd7e4"/><rect x="27" y="24" width="6" height="26" fill="#ff7fa6"/><path d="M30 22 q-10 -10 -3 -13 q5 -1 3 13 q2 -14 7 -13 q7 3 -7 13 Z" fill="#ff7fa6"/></svg>`,
  starlights: `<svg viewBox="0 0 60 60"><path d="M6 22 Q30 38 54 22" fill="none" stroke="#caa353" stroke-width="2"/><path d="M18 30 l2.4 4.8 5.3 0.5 -4 3.6 1.2 5.3 -4.9 -2.7 -4.9 2.7 1.2 -5.3 -4 -3.6 5.3 -0.5 Z" fill="#ffd45e"/><path d="M40 32 l2.4 4.8 5.3 0.5 -4 3.6 1.2 5.3 -4.9 -2.7 -4.9 2.7 1.2 -5.3 -4 -3.6 5.3 -0.5 Z" fill="#ffb3d3"/></svg>`,
  bench: `<svg viewBox="0 0 60 60"><rect x="10" y="28" width="40" height="7" rx="3.5" fill="#d9a86b" stroke="#9a6b42" stroke-width="2"/><rect x="10" y="16" width="40" height="6" rx="3" fill="#d9a86b" stroke="#9a6b42" stroke-width="2"/><path d="M16 35 v12 M44 35 v12 M16 22 v6 M44 22 v6" stroke="#8a5c36" stroke-width="3.4" stroke-linecap="round"/></svg>`,
  flowerbed: `<svg viewBox="0 0 60 60"><rect x="8" y="28" width="44" height="18" rx="9" fill="#b9854f" stroke="#7c5430" stroke-width="2.2"/><rect x="12" y="31" width="36" height="11" rx="5.5" fill="#6e4a28"/><g transform="translate(19,26)"><circle r="5" fill="#ff9ec6"/><circle r="2" fill="#fff3c2"/></g><g transform="translate(30,28)"><circle r="5" fill="#ffd45e"/><circle r="2" fill="#ff8a65"/></g><g transform="translate(41,26)"><circle r="5" fill="#c5a8ff"/><circle r="2" fill="#fff"/></g></svg>`,
  tree2: `<svg viewBox="0 0 60 60"><path d="M28 52 q-2 -14 -4 -20 q7 -4 10 0 q-2 6 -1 20 Z" fill="#9a6b42"/><circle cx="30" cy="20" r="14" fill="#ffb3d3"/><circle cx="19" cy="28" r="9" fill="#ffb3d3"/><circle cx="42" cy="28" r="9" fill="#ffb3d3"/><circle cx="25" cy="15" r="4" fill="#ffeaf4"/></svg>`,
  mailbox: `<svg viewBox="0 0 60 60"><rect x="27" y="30" width="6" height="22" rx="3" fill="#92653c"/><path d="M14 16 h26 q8 0 8 9 v9 h-34 Z" fill="#ff8a80" stroke="#d8645c" stroke-width="2.2"/><path d="M14 16 q-8 0 -8 9 v9 h8 Z" fill="#ffb0a8"/><rect x="40" y="6" width="4" height="12" fill="#ffd45e"/></svg>`,
  chest: `<svg viewBox="0 0 60 60"><rect x="12" y="26" width="36" height="22" rx="5" fill="#b9854f" stroke="#7c5430" stroke-width="2.4"/><path d="M12 28 q18 -14 36 0 l0 5 l-36 0 Z" fill="#d9a86b" stroke="#7c5430" stroke-width="2.4"/><rect x="25" y="30" width="10" height="11" rx="2.5" fill="#ffd45e" stroke="#caa353" stroke-width="1.8"/></svg>`,
  bunting: `<svg viewBox="0 0 60 60"><path d="M4 18 Q30 30 56 18" fill="none" stroke="#d8b78a" stroke-width="2.4"/><path d="M14 21 l6 11 l-12 0 Z" fill="#ff9ec6"/><path d="M30 24 l6 11 l-12 0 Z" fill="#ffd45e"/><path d="M46 21 l6 11 l-12 0 Z" fill="#8fe7ff"/></svg>`,
  butterfly: `<svg viewBox="0 0 60 60"><g transform="translate(30,30) scale(2.2)"><path d="M0 0 q-7 -8 -10 -2 q0 6 10 4 Z" fill="#ffb7e2"/><path d="M0 0 q7 -8 10 -2 q0 6 -10 4 Z" fill="#ff9ec6"/><line x1="0" y1="-2" x2="0" y2="4" stroke="#7c5a4a" stroke-width="1.6"/></g></svg>`
};

function renderItems() {
  const grid = $("#item-grid");
  if (!grid) return;
  const sorted = [...state.items].sort((a, b) => a.lv - b.lv);
  grid.innerHTML = sorted.map((item) => {
    const placed = state.level >= item.lv;
    const need = Math.max(1, starsNeededFor(item.lv) - state.lifetimeStars);
    return `
    <button class="item-card v2 ${placed ? "placed" : "locked"}" data-item="${item.id}" type="button">
      <span class="item-icon">${ITEM_ICONS[item.id] || ""}${placed ? "" : '<span class="item-lock">🔒</span>'}</span>
      <div class="item-info">
        <strong>${item.name}</strong>
        <span class="task-meta">${item.type}</span>
        <span class="item-progress-note">${placed ? "✓ 已在小島上" : `還差約 ${need} ★`}</span>
      </div>
      <span class="status">${placed ? "已長出" : `Lv.${item.lv}`}</span>
    </button>
  `;
  }).join("");

  grid.querySelectorAll("[data-item]").forEach((button) => {
    button.addEventListener("click", () => handleItem(button.dataset.item));
  });
}


function completeTask(index, element) {
  const task = state.tasks[index];
  if (!task || task.done) {
    showToast("這個任務已經完成囉");
    return;
  }

  task.done = true;
  element.classList.add("flash");
  awardStars({ normal: 6, progress: 2, lucky: 1, green: 1 }, task.title);
  state.energy += 25;
  state.xp += 25;
  state.pet.mood = clamp(state.pet.mood + 14);
  state.pet.bond = clamp(state.pet.bond + 8);

  flyStars(element, 10);
  setBuddyState("happy", "開心拍手", 1400);
  renderAll();
}



function handleItem(id) {
  const item = state.items.find((entry) => entry.id === id);
  if (!item) return;
  if (state.level < item.lv) {
    const need = starsNeededFor(item.lv) - state.lifetimeStars;
    showToast(`${item.name} 在 Lv.${item.lv} 解鎖,再收集約 ${Math.max(1, need)} 顆星星`);
    return;
  }
  bounceProp(item.id);
  showToast(`${item.name} 在小島上開心地跳了一下`);
}

function spendStars(amount) {
  let remaining = amount;
  ["normal", "progress", "lucky", "green", "purple"].forEach((type) => {
    const take = Math.min(state.stars[type], remaining);
    state.stars[type] -= take;
    remaining -= take;
  });
}

function failNegativeTask() {
  const task = state.negativeTasks.find((entry) => !entry.failed) || state.negativeTasks[0];
  task.failed = true;
  state.stars.black += 1;
  setBuddyState(state.stars.black >= 3 ? "umbrella" : "sad", state.stars.black >= 3 ? "撐傘" : "難過", 1600);
  renderAll();
  showToast(`${task.title} 失敗，獲得 1 顆黑色星星`);
}

function remedyNegativeTask() {
  if (state.stars.black <= 0) {
    showToast("目前沒有黑色星星");
    return;
  }
  state.stars.black -= 1;
  const failed = state.negativeTasks.find((entry) => entry.failed);
  if (failed) failed.failed = false;
  shatterBlackStar();
  setBuddyState("cheer", "圓圓鼓勵", 1300);
  renderAll();
  showToast("補救完成，黑色星星變成光點消失了");
}

function feedBear() {
  if (totalPositiveStars() <= 0) {
    showToast("星星不夠，先完成一個任務吧");
    return;
  }
  flyStarToBuddy();
  spendStars(1);
  state.pet.hunger = clamp(state.pet.hunger + 18);
  state.pet.bond = clamp(state.pet.bond + 10);
  setBuddyState("feed", "抱著星星", 1400);
  state.chatMessages.push({ from: "bear", text: `圓圓接住星星了。謝謝 ${state.player}，也把一點能量留給自己喔。` });
  renderAll();
  showToast("星星飛到圓圓手上了");
}

function studyWithBear() {
  state.energy += 10;
  state.pet.bond = clamp(state.pet.bond + 7);
  state.pet.mood = clamp(state.pet.mood + 5);
  setBuddyState("study", "看書陪讀", 1800);
  state.chatMessages.push({ from: "bear", text: "圓圓坐好陪你讀書。我們先專注 5 分鐘也可以。" });
  renderAll();
  switchView("focus");
  showToast("圓圓進入陪讀模式");
}

function cheerBear() {
  state.pet.mood = clamp(state.pet.mood + 12);
  state.pet.bond = clamp(state.pet.bond + 8);
  setBuddyState("clap", "拍手鼓勵", 1400);
  state.chatMessages.push({ from: "bear", text: `${state.player} 很棒，先完成一點點就好。圓圓幫你拍手！` });
  renderAll();
  showToast(`圓圓正在幫 ${state.player} 拍手加油`);
}

function hugBear() {
  state.pet.mood = clamp(state.pet.mood + 10);
  state.pet.bond = clamp(state.pet.bond + 10);
  setBuddyState("hug", "抱抱姿勢", 1600);
  state.chatMessages.push({ from: "bear", text: "抱抱。你可以先休息一下，等心變安靜一點，我們再回來做一小步。" });
  renderAll();
  showToast(`圓圓給 ${state.player} 一個溫柔抱抱`);
}

function sleepBear() {
  state.pet.mood = clamp(state.pet.mood + 6);
  setBuddyState("sleep", "睡覺休息", 1800);
  state.chatMessages.push({ from: "bear", text: "累了可以休息，休息不是偷懶。圓圓陪你安靜一下。" });
  renderAll();
  showToast("圓圓進入休息模式");
}

function flyStarToBuddy() {
  const source = ($("#jar-view")?.classList.contains("active") ? $("#big-jar") : $("#mini-jar")) || $("#mini-jar");
  const target = $("#buddy-view")?.classList.contains("active") ? $("#buddy-big") : $("#mini-buddy");
  if (!source || !target) return;
  const sourceBox = source.getBoundingClientRect();
  const targetBox = target.getBoundingClientRect();
  const star = document.createElement("span");
  star.className = "flying-star companion-feed-star";
  star.style.setProperty("--c", starColors.normal);
  star.style.left = `${sourceBox.left + sourceBox.width / 2}px`;
  star.style.top = `${sourceBox.top + sourceBox.height / 2}px`;
  document.body.appendChild(star);
  requestAnimationFrame(() => {
    const dx = targetBox.left + targetBox.width / 2 - (sourceBox.left + sourceBox.width / 2);
    const dy = targetBox.top + targetBox.height * 0.45 - (sourceBox.top + sourceBox.height / 2);
    star.style.transform = `translate(${dx}px, ${dy}px) scale(0.55) rotate(260deg)`;
    star.style.opacity = "0";
  });
  window.setTimeout(() => star.remove(), 960);
}

function setBuddyState(status, label, timeout = 0) {
  state.pet.state = status;
  renderBuddy();
  if (timeout) {
    window.clearTimeout(setBuddyState.timer);
    setBuddyState.timer = window.setTimeout(() => {
      if (state.stars.black >= 3) state.pet.state = "umbrella";
      else state.pet.state = "idle";
      renderBuddy();
    }, timeout);
  }
}

function flyStars(source, count) {
  const sourceBox = source.getBoundingClientRect();
  const target = ($("#jar-view")?.classList.contains("active") ? $("#big-jar") : $("#mini-jar")) || $("#mini-jar");
  const targetBox = target.getBoundingClientRect();
  if (!targetBox.width || !sourceBox.width) return;
  const colors = [starColors.normal, starColors.pink, starColors.blue, starColors.green, starColors.purple];

  const tx = targetBox.left + targetBox.width / 2;
  const ty = targetBox.top + targetBox.height * 0.1; // 瓶口位置

  for (let i = 0; i < count; i += 1) {
    window.setTimeout(() => {
      launchArcStar(
        sourceBox.left + 20 + (i % 4) * 14,
        sourceBox.top + sourceBox.height / 2,
        tx + (Math.random() - 0.5) * targetBox.width * 0.25,
        ty,
        colors[i % colors.length],
        i === count - 1 ? () => jarLandingFlash(target) : null
      );
    }, i * 90);
  }
}

/* 單顆星星沿貝茲曲線飛行,沿路掉星塵 */
function launchArcStar(sx, sy, tx, ty, color, onLand) {
  const star = document.createElement("span");
  star.className = "arc-star";
  star.textContent = "★";
  star.style.color = color;
  document.body.appendChild(star);

  // 控制點:往上拋的弧線
  const cx = (sx + tx) / 2 + (Math.random() - 0.5) * 60;
  const cy = Math.min(sy, ty) - 90 - Math.random() * 70;
  const duration = 760 + Math.random() * 160;
  const startTime = performance.now();
  let lastDust = 0;

  function frame(now) {
    const t = Math.min(1, (now - startTime) / duration);
    const ease = t * (2 - t); // easeOut
    const x = (1 - ease) * (1 - ease) * sx + 2 * (1 - ease) * ease * cx + ease * ease * tx;
    const y = (1 - ease) * (1 - ease) * sy + 2 * (1 - ease) * ease * cy + ease * ease * ty;
    star.style.transform = `translate(${x}px, ${y}px) rotate(${t * 420}deg) scale(${1 - t * 0.45})`;
    if (now - lastDust > 64 && t < 0.92) {
      lastDust = now;
      spawnDust(x, y, color);
    }
    if (t < 1) requestAnimationFrame(frame);
    else {
      star.remove();
      if (onLand) onLand();
    }
  }
  requestAnimationFrame(frame);
}

function spawnDust(x, y, color) {
  const dust = document.createElement("span");
  dust.className = "arc-dust";
  dust.style.background = color;
  dust.style.transform = `translate(${x + (Math.random() - 0.5) * 10}px, ${y + (Math.random() - 0.5) * 10}px)`;
  document.body.appendChild(dust);
  window.setTimeout(() => dust.remove(), 620);
}

/* 星星落進瓶口的閃光 */
function jarLandingFlash(jar) {
  const box = jar.getBoundingClientRect();
  if (!box.width) return;
  const flash = document.createElement("span");
  flash.className = "jar-flash";
  flash.style.left = `${box.left + box.width / 2}px`;
  flash.style.top = `${box.top + box.height * 0.12}px`;
  document.body.appendChild(flash);
  for (let i = 0; i < 6; i += 1) {
    const spark = document.createElement("span");
    spark.className = "jar-spark";
    spark.style.left = flash.style.left;
    spark.style.top = flash.style.top;
    document.body.appendChild(spark);
    requestAnimationFrame(() => {
      const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
      spark.style.transform = `translate(${Math.cos(angle) * 34}px, ${Math.sin(angle) * 26}px) scale(0.2)`;
      spark.style.opacity = "0";
    });
    window.setTimeout(() => spark.remove(), 560);
  }
  window.setTimeout(() => flash.remove(), 480);
}

function shatterBlackStar() {
  const jar = $("#big-jar") || $("#mini-jar");
  const box = jar.getBoundingClientRect();
  for (let i = 0; i < 12; i += 1) {
    const shard = document.createElement("span");
    shard.className = "black-shard";
    shard.style.left = `${box.left + box.width / 2}px`;
    shard.style.top = `${box.top + box.height / 2}px`;
    document.body.appendChild(shard);
    requestAnimationFrame(() => {
      const angle = (Math.PI * 2 * i) / 12;
      shard.style.transform = `translate(${Math.cos(angle) * 110}px, ${Math.sin(angle) * 85}px) scale(0.1) rotate(${i * 40}deg)`;
      shard.style.opacity = "0";
    });
    window.setTimeout(() => shard.remove(), 720);
  }
}

function bounceProp(id) {
  const prop = document.querySelector(`[data-prop="${id}"]`);
  if (!prop) return;
  prop.classList.add("placed", "newly-placed");
  window.setTimeout(() => prop.classList.remove("newly-placed"), 900);
}

function showReward(item) {
  const modal = $("#reward-modal");
  if (!modal) return;
  const propText = item ? `${item.name} 出現在小島` : "星星進入瓶子";
  setText("#reward-prop", propText);
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeReward() {
  const modal = $("#reward-modal");
  modal?.classList.remove("show");
  modal?.setAttribute("aria-hidden", "true");
}

function updateNextProp() {
  const next = ISLAND_UNLOCKS.find(([lv]) => lv > state.level);
  if (next) setText("#next-prop", `Lv.${next[0]} 會出現「${next[1]}」,再收集 ${Math.max(1, starsNeededFor(next[0]) - state.lifetimeStars)} ★`);
  else setText("#next-prop", "小島已經完全長大了 🏆");
}

function showTutorialStep() {
  const overlay = $("#tutorial-overlay");
  if (!overlay) return;
  const step = tutorialSteps[state.tutorialStep];
  if (!step) {
    overlay.classList.remove("show");
    return;
  }
  setText("#tutorial-title", state.tutorialStep === 0 ? `歡迎來到 ${state.player} 的任務島` : step[0]);
  setText("#tutorial-text", step[1]);
  setText("#tutorial-next", state.tutorialStep === tutorialSteps.length - 1 ? "開始經營小島" : "我知道啦");
}

function switchView(viewName) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === `${viewName}-view`));
  $$("[data-view]").forEach((button) => {
    if (button.classList.contains("tab") || button.classList.contains("nav-btn")) {
      button.classList.toggle("active", button.dataset.view === viewName);
    }
  });
  renderAll();
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function setText(selector, value) {
  const element = $(selector);
  if (element) element.textContent = value;
}

function setStyle(selector, property, value) {
  const element = $(selector);
  if (element) element.style[property] = value;
}

function bindEvents() {
  $$("[data-view]").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  $("#focus-button")?.addEventListener("click", startFocusTimer);
  $("#focus-page-button")?.addEventListener("click", startFocusTimer);
  $("#create-task")?.addEventListener("click", addTaskFromForm);
  $("#new-task-date")?.addEventListener("change", () => {
    const dateInput = $("#new-task-date");
    const deadlineInput = $("#new-task-deadline");
    if (dateInput && deadlineInput && !deadlineInput.value.trim()) {
      deadlineInput.value = daysUntilText(dateInput.value);
    }
  });
  $("#new-task-title")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addTaskFromForm();
  });
  $("#blind-box-button")?.addEventListener("click", openBlindBox);
  $("#send-chat")?.addEventListener("click", () => sendCompanionMessage($("#chat-input")?.value || ""));
  $("#chat-input")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") sendCompanionMessage(event.currentTarget.value);
  });
  $$(".focus-mode").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.focusRunning) {
        showToast("計時中不能切換時間");
        return;
      }
      $$(".focus-mode").forEach((entry) => entry.classList.toggle("active", entry === button));
      state.focusSeconds = Number(button.dataset.focusMinutes) * 60;
      renderFocusTimer();
    });
  });

  $("#add-negative")?.addEventListener("click", () => switchView("tasks"));
  $("#fail-negative")?.addEventListener("click", failNegativeTask);
  $("#remedy-negative")?.addEventListener("click", remedyNegativeTask);
  $("#clean-black-stars")?.addEventListener("click", remedyNegativeTask);
  $("#feed-bear-from-jar")?.addEventListener("click", feedBear);
  $("#reward-close")?.addEventListener("click", closeReward);
  $("#reward-modal")?.addEventListener("click", (event) => {
    if (event.target.id === "reward-modal") closeReward();
  });

  $("#buddy-big")?.addEventListener("click", () => {
    state.pet.mood = clamp(state.pet.mood + 3);
    const nextState = state.pet.state === "shy" ? "wave" : "shy";
    setBuddyState(nextState, buddyLabel(nextState), 1200);
    showToast(nextState === "shy" ? "圓圓害羞地摀臉了" : "圓圓開心揮手");
  });

  $("#mini-buddy")?.addEventListener("click", () => {
    setBuddyState("wave", "開心揮手", 1200);
  });

  $$(".pet-action").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.pet === "feed") feedBear();
      if (button.dataset.pet === "study") studyWithBear();
      if (button.dataset.pet === "play") cheerBear();
      if (button.dataset.pet === "hug") hugBear();
      if (button.dataset.pet === "sleep") sleepBear();
    });
  });

  $("#star-type-tabs")?.querySelectorAll("[data-star-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.starFilter;
      $("#star-type-tabs").querySelectorAll("button").forEach((entry) => entry.classList.toggle("active", entry === button));
      renderJars();
    });
  });

  $("#tutorial-next")?.addEventListener("click", () => {
    state.tutorialStep += 1;
    showTutorialStep();
  });

  $(".jar-summary")?.addEventListener("click", () => switchView("jar"));

  $("#menu-btn")?.addEventListener("click", openDrawer);
  $("#drawer-close")?.addEventListener("click", closeDrawer);
  $("#drawer-overlay")?.addEventListener("click", closeDrawer);
  $("#sheet-close")?.addEventListener("click", closeSheet);
  $("#sheet-overlay")?.addEventListener("click", (e) => { if (e.target.id === "sheet-overlay") closeSheet(); });
  $$("[data-menu]").forEach((btn) => btn.addEventListener("click", () => openMenuPanel(btn.dataset.menu)));
  $(".avatar-btn")?.addEventListener("click", () => { openDrawer(); openMenuPanel("profile"); });
  $("#buddy-hub")?.addEventListener("click", () => switchView("buddy"));
  $$("[data-quick]").forEach((btn) => btn.addEventListener("click", () => buddyQuickAction(btn.dataset.quick)));
  $("#add-task-quick")?.addEventListener("click", () => switchView("addtask"));
  $("#add-task-hub")?.addEventListener("click", () => switchView("addtask"));
  $("#social-newday")?.addEventListener("click", simulateNewDay);
  $("#proof-photo-input")?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => attachProofPhoto(reader.result);
    reader.readAsDataURL(file);
    event.target.value = "";
  });
}

function buddyQuickAction(kind) {
  const map = {
    mood: { say: "我想聊聊今天的心情", pool: "sad" },
    split: { say: "幫我把任務拆小一點", pool: "strategy" },
    cheer: { say: "給我一點打氣", pool: "cheer" },
    study: { say: "陪我一起讀書", pool: "study" }
  };
  const item = map[kind];
  if (!item) return;
  state.chatMessages.push({ from: "user", text: item.say });
  const reply = drawUniqueReply(comfortCategories[item.pool] || comfortReplies);
  state.chatMessages.push({ from: "bear", text: reply });
  if (kind === "study") setBuddyState("study", "陪讀", 1600);
  else if (kind === "cheer") setBuddyState("cheer", "圓圓鼓勵", 1400);
  else setBuddyState("happy", "微笑", 1200);
  renderCompanionChat();
}

/* ===== 側邊功能選單 ===== */
function openDrawer() {
  const drawer = $("#side-drawer");
  const overlay = $("#drawer-overlay");
  if (!drawer) return;
  setText("#drawer-name", state.player);
  setText("#drawer-email", state.email || "尚未填寫");
  const av = $("#drawer-avatar");
  if (av) av.textContent = (state.player.trim().charAt(0) || "我").toUpperCase();
  overlay?.removeAttribute("hidden");
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}
function closeDrawer() {
  $("#side-drawer")?.classList.remove("open");
  $("#side-drawer")?.setAttribute("aria-hidden", "true");
  $("#drawer-overlay")?.setAttribute("hidden", "");
}

function openSheet(title, bodyHTML) {
  setText("#sheet-title", title);
  const body = $("#sheet-body");
  if (body) body.innerHTML = bodyHTML;
  $("#sheet-overlay")?.removeAttribute("hidden");
  requestAnimationFrame(() => $("#sheet-panel")?.classList.add("show"));
}
function closeSheet() {
  $("#sheet-panel")?.classList.remove("show");
  window.setTimeout(() => $("#sheet-overlay")?.setAttribute("hidden", ""), 220);
}

function openMenuPanel(key) {
  closeDrawer();
  const panels = {
    profile: renderProfilePanel,
    addfriend: renderAddFriendPanel,
    calendar: renderCalendarPanel,
    achievements: renderAchievementsPanel,
    focuslog: renderFocusLogPanel,
    settings: renderSettingsPanel,
    about: renderAboutPanel
  };
  (panels[key] || (() => {}))();
}

/* — 個人資料 — */
function renderProfilePanel() {
  const done = state.tasks.filter((t) => t.done).length;
  const totalFocus = state.focusLog.reduce((s, f) => s + f.minutes, 0);
  openSheet(`${state.player} 的個人資料`, `
    <div class="profile-card">
      <span class="profile-avatar">${(state.player.charAt(0) || "我").toUpperCase()}</span>
      <strong>${state.player}</strong>
      <span class="profile-email">${state.email || "尚未填寫 Email"}</span>
    </div>
    <div class="profile-stats">
      <div><b>Lv.${state.level}</b><span>小島等級</span></div>
      <div><b>${state.lifetimeStars}</b><span>累積星星</span></div>
      <div><b>${state.streak || 0}</b><span>連續天數</span></div>
      <div><b>${totalFocus}</b><span>專注分鐘</span></div>
    </div>
    <p class="sheet-hint">今日已完成 ${done} 件任務,瓶子裡有 ${totalPositiveStars()} 顆星星。</p>
    <button class="sheet-btn ghost" id="profile-logout" type="button">登出</button>
  `);
  $("#profile-logout")?.addEventListener("click", () => {
    try { window.name = ""; } catch (e) { /* ignore */ }
    location.reload();
  });
}

/* — 添加好友(Email 搜尋) — */
const FRIEND_DIRECTORY = [
  { name: "Luna", email: "luna@example.com", color: "#ffd45e" },
  { name: "Kai", email: "kai@example.com", color: "#8fe7ff" },
  { name: "Sora", email: "sora@example.com", color: "#9af0c0" },
  { name: "Momo", email: "momo@example.com", color: "#ff9ed2" },
  { name: "Yuki", email: "yuki@example.com", color: "#c5a8ff" }
];

function renderAddFriendPanel() {
  openSheet("添加好友名單", `
    <div class="friend-search">
      <input type="email" id="friend-search-input" placeholder="輸入好友的 Email 搜尋…" />
      <button class="sheet-btn" id="friend-search-btn" type="button">搜尋</button>
    </div>
    <div id="friend-search-result"></div>
    <p class="sheet-subhead">我的好友 (<span id="my-friend-count">${state.myFriends.length}</span>)</p>
    <div class="my-friend-list" id="my-friend-list"></div>
  `);
  renderMyFriendList();
  const input = $("#friend-search-input");
  const doSearch = () => {
    const q = input.value.trim().toLowerCase();
    const box = $("#friend-search-result");
    if (!q) { box.innerHTML = '<p class="sheet-hint">輸入 Email 來找朋友,例如 luna@example.com</p>'; return; }
    const already = state.myFriends.some((f) => f.email.toLowerCase() === q);
    const found = FRIEND_DIRECTORY.find((f) => f.email.toLowerCase() === q);
    if (already) {
      box.innerHTML = '<div class="search-card"><span>這位朋友已經在你的名單裡了 🤝</span></div>';
    } else if (found) {
      box.innerHTML = `<div class="search-card">
        <span class="friend-avatar" style="--fc:${found.color}">${found.name[0]}</span>
        <div class="search-info"><strong>${found.name}</strong><span>${found.email}</span></div>
        <button class="sheet-btn tiny" id="add-found" type="button">＋ 加好友</button>
      </div>`;
      $("#add-found")?.addEventListener("click", () => {
        state.myFriends.push(found);
        showToast(`已加 ${found.name} 為好友!`);
        renderMyFriendList();
        setText("#my-friend-count", state.myFriends.length);
        box.innerHTML = `<div class="search-card"><span>已和 ${found.name} 成為好友 🎉</span></div>`;
      });
    } else {
      box.innerHTML = `<div class="search-card"><span>找不到這個 Email。可以邀請 <b>${input.value.trim()}</b> 一起玩任務島!</span></div>`;
    }
  };
  $("#friend-search-btn")?.addEventListener("click", doSearch);
  input?.addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(); });
}

function renderMyFriendList() {
  const list = $("#my-friend-list");
  if (!list) return;
  list.innerHTML = state.myFriends.map((f, i) => `
    <div class="my-friend-item">
      <span class="friend-avatar" style="--fc:${f.color || "#ffd45e"}">${f.name[0]}</span>
      <div class="search-info"><strong>${f.name}</strong><span>${f.email}</span></div>
      <button class="friend-remove" data-remove-friend="${i}" type="button" aria-label="移除">✕</button>
    </div>
  `).join("");
  list.querySelectorAll("[data-remove-friend]").forEach((b) => {
    b.addEventListener("click", () => {
      const f = state.myFriends[Number(b.dataset.removeFriend)];
      state.myFriends.splice(Number(b.dataset.removeFriend), 1);
      renderMyFriendList();
      setText("#my-friend-count", state.myFriends.length);
      showToast(`已移除 ${f.name}`);
    });
  });
}

/* — 任務日曆 — */
function renderCalendarPanel() {
  const now = new Date();
  const year = now.getFullYear(), month = now.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const today = now.getDate();
  let cells = "";
  ["日","一","二","三","四","五","六"].forEach((w) => { cells += `<span class="cal-wd">${w}</span>`; });
  for (let i = 0; i < first; i += 1) cells += '<span class="cal-cell empty"></span>';
  for (let d = 1; d <= days; d += 1) {
    const has = state.tasks.some((t) => t.date && Number(t.date.split("-")[2]) === d);
    cells += `<span class="cal-cell ${d === today ? "today" : ""} ${has ? "has-task" : ""}">${d}${has ? '<i></i>' : ''}</span>`;
  }
  openSheet("任務日曆", `
    <p class="cal-month">${year} 年 ${month + 1} 月</p>
    <div class="cal-grid">${cells}</div>
    <p class="sheet-hint"><span class="cal-dot"></span> 有安排任務的日子 · 今天是 ${month + 1}/${today}</p>
  `);
}

/* — 成就徽章 — */
function renderAchievementsPanel() {
  const totalFocus = state.focusLog.reduce((s, f) => s + f.minutes, 0);
  const badges = [
    { icon: "🌱", name: "第一步", desc: "完成第一個任務", got: state.lifetimeStars > 0 },
    { icon: "⭐", name: "集星新手", desc: "累積 20 顆星星", got: state.lifetimeStars >= 20 },
    { icon: "🌟", name: "集星達人", desc: "累積 100 顆星星", got: state.lifetimeStars >= 100 },
    { icon: "🏝️", name: "小島成形", desc: "小島升到 Lv.5", got: state.level >= 5 },
    { icon: "🏘️", name: "蓋好家園", desc: "小島升到 Lv.20", got: state.level >= 20 },
    { icon: "📚", name: "專注初心", desc: "完成 1 次專注", got: state.focusLog.length >= 1 },
    { icon: "⏰", name: "專注 100 分", desc: "累積專注 100 分鐘", got: totalFocus >= 100 },
    { icon: "🤝", name: "有伴同行", desc: "加 3 位好友", got: state.myFriends.length >= 3 },
    { icon: "🔥", name: "堅持一週", desc: "連續完成 7 天", got: (state.streak || 0) >= 7 }
  ];
  const gotCount = badges.filter((b) => b.got).length;
  openSheet("成就徽章", `
    <p class="sheet-hint">已解鎖 ${gotCount}/${badges.length} 個徽章</p>
    <div class="badge-grid">
      ${badges.map((b) => `
        <div class="badge ${b.got ? "got" : "locked"}">
          <span class="badge-icon">${b.got ? b.icon : "🔒"}</span>
          <strong>${b.name}</strong>
          <span>${b.desc}</span>
        </div>`).join("")}
    </div>
  `);
}

/* — 專注紀錄 — */
function renderFocusLogPanel() {
  const total = state.focusLog.reduce((s, f) => s + f.minutes, 0);
  const body = !state.focusLog.length
    ? '<div class="empty-state">還沒有專注紀錄。到「專注」頁開始第一個 25 分鐘番茄鐘吧!</div>'
    : `<div class="focus-summary"><div><b>${state.focusLog.length}</b><span>次專注</span></div><div><b>${total}</b><span>總分鐘</span></div></div>
       <div class="focus-log-list">
         ${state.focusLog.map((f) => `<div class="focus-log-item"><span class="fl-ico">⏱️</span><div><strong>專注 ${f.minutes} 分鐘</strong><span>${f.time}</span></div></div>`).join("")}
       </div>`;
  openSheet("專注紀錄", body);
}

/* — 設定 — */
function renderSettingsPanel() {
  const s = state.settings;
  openSheet("設定", `
    <div class="setting-row"><div><strong>音效提示</strong><span>完成任務時的音效回饋</span></div>
      <button class="toggle ${s.sound ? "on" : ""}" data-toggle="sound" type="button"><i></i></button></div>
    <div class="setting-row"><div><strong>每日提醒</strong><span>提醒你回島完成今日任務</span></div>
      <button class="toggle ${s.dailyReminder ? "on" : ""}" data-toggle="dailyReminder" type="button"><i></i></button></div>
    <div class="setting-row"><div><strong>每週起始日</strong><span>日曆從哪天開始</span></div>
      <select id="set-weekstart"><option value="mon"${s.weekStart === "mon" ? " selected" : ""}>星期一</option><option value="sun"${s.weekStart === "sun" ? " selected" : ""}>星期日</option></select></div>
    <button class="sheet-btn ghost" id="reset-tutorial" type="button">重新觀看新手導覽</button>
  `);
  $("#sheet-body").querySelectorAll("[data-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.toggle;
      state.settings[key] = !state.settings[key];
      btn.classList.toggle("on", state.settings[key]);
      showToast(`${key === "sound" ? "音效" : "每日提醒"}已${state.settings[key] ? "開啟" : "關閉"}`);
    });
  });
  $("#set-weekstart")?.addEventListener("change", (e) => { state.settings.weekStart = e.target.value; });
  $("#reset-tutorial")?.addEventListener("click", () => {
    state.tutorialStep = 0;
    closeSheet();
    showTutorialStep();
  });
}

/* — 關於 Task Island — */
function renderAboutPanel() {
  openSheet("關於 Task Island", `
    <div class="about-hero">
      <span class="about-emoji">🏝️</span>
      <strong>任務島 Task Island</strong>
      <span class="about-ver">把待辦變成一座慢慢長大的療癒小島</span>
    </div>
    <p class="about-intro">Task Island 把「完成任務」變成一場溫柔的養成遊戲。每完成一件事,就會得到星星、餵養小島,讓它從一塊空地長成有小屋、碼頭、花園的世界。</p>
    <div class="about-feat">
      <div class="af-item"><span>📝</span><div><strong>任務與專注</strong><span>新增每日任務、用番茄鐘專注,完成就得彩色星星。</span></div></div>
      <div class="af-item"><span>🫙</span><div><strong>星星瓶</strong><span>星星會飛進玻璃瓶堆積起來,是你努力的回憶收藏。</span></div></div>
      <div class="af-item"><span>🏝️</span><div><strong>小島養成</strong><span>星星讓小島從 Lv.1 升到 Lv.99,慢慢解鎖小屋、碼頭、花樹。</span></div></div>
      <div class="af-item"><span>🧸</span><div><strong>圓圓陪聊</strong><span>毛茸茸的圓圓會陪你聊心情、把任務拆小、給你打氣。</span></div></div>
      <div class="af-item"><span>🤝</span><div><strong>好友互相監督</strong><span>用 Email 加好友,互相點亮星星、拍照打卡、留言鼓勵。</span></div></div>
    </div>
    <p class="about-foot">願這座小島,陪你把每一個普通的一天,都過成值得收藏的樣子 🌈</p>
  `);
}

/* ===== 登入流程 ===== */
function initAuth() {
  const saved = loadSession();
  if (saved && saved.name) {
    state.player = saved.name;
    state.email = saved.email || "";
    showWelcome(saved.name);
  }
  const submit = $("#login-submit");
  const nameInput = $("#login-name");
  const emailInput = $("#login-email");
  const error = $("#login-error");

  function attempt() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if (!name) { showAuthError("請輸入你的名字"); nameInput.focus(); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { showAuthError("請輸入有效的 Email"); emailInput.focus(); return; }
    error.textContent = "";
    state.player = name;
    state.email = email;
    saveSession({ name, email });
    showWelcome(name);
  }
  submit?.addEventListener("click", attempt);
  [nameInput, emailInput].forEach((el) => el?.addEventListener("keydown", (e) => { if (e.key === "Enter") attempt(); }));

  $("#welcome-enter")?.addEventListener("click", enterApp);
}

function showAuthError(message) {
  const error = $("#login-error");
  if (error) { error.textContent = message; error.classList.add("show"); }
}

function showWelcome(name) {
  $("#login-screen")?.setAttribute("hidden", "");
  const welcome = $("#welcome-screen");
  welcome?.removeAttribute("hidden");
  setText("#welcome-greeting", `${name},圓圓已經在島上等你囉`);
  applyPlayerName(name);
}

function enterApp() {
  $("#welcome-screen")?.setAttribute("hidden", "");
  const shell = $("#app-shell");
  shell?.removeAttribute("hidden");
  shell?.classList.add("app-enter");
  showTutorialStep();
  renderAll();
}

function applyPlayerName(name) {
  const initial = name.trim().charAt(0).toUpperCase() || "我";
  const avatar = $(".avatar-btn");
  if (avatar) { avatar.textContent = initial; avatar.setAttribute("aria-label", `${name} 的個人檔案`); }
  document.querySelectorAll("[data-player-name]").forEach((el) => { el.textContent = name; });
}

function saveSession(data) {
  try { window.name = "TASKISLAND::" + JSON.stringify(data); } catch (e) { /* ignore */ }
}
function loadSession() {
  try {
    if (window.name && window.name.startsWith("TASKISLAND::")) return JSON.parse(window.name.slice(12));
  } catch (e) { /* ignore */ }
  return null;
}

bindEvents();
initAuth();
if ($("#new-task-date")) $("#new-task-date").value = todayISO();
renderAll();
