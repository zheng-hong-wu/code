import React from 'react';
import { MessageSquare, Home, Award, Leaf, ChevronRight, RefreshCw } from 'lucide-react';
import { useState } from 'react';

// 定義遊戲關卡數據
const levels = [
  {
    id: 1,
    name: "動物醫院",
    description: "我們要設計一個對動物和環境都友善的醫院！",
    question: "動物醫院應該採用什麼綠建築設計功能來節省能源？",
    options: [
      { id: "A", text: "安裝大型冷氣系統，讓動物一直保持涼爽" },
      { id: "B", text: "在屋頂安裝太陽能板，提供醫院部分用電需求" },
      { id: "C", text: "使用普通材料，但多放一些綠色植物作為裝飾" }
    ],
    correctAnswer: "B",
    feedback: {
      "A": "冷氣雖然能讓動物涼爽，但會消耗大量能源，也不環保喔！",
      "B": "太棒了！太陽能板能利用陽光轉換成電能，是很好的再生能源選擇！",
      "C": "放置植物是好事，但如果只是裝飾用途，對節能幫助有限呢！"
    },
    image: "動物醫院"
  },
  {
    id: 2,
    name: "沙漠學校",
    description: "在炎熱乾燥的沙漠中，我們要蓋一所環保又節水的學校！",
    question: "在沙漠地區，學校應該設置什麼功能來解決用水問題？",
    options: [
      { id: "A", text: "挖一口很深的井，從地下抽取更多水" },
      { id: "B", text: "從遠處的城市運水到學校" },
      { id: "C", text: "安裝雨水收集系統，收集和過濾稀少的雨水資源" }
    ],
    correctAnswer: "C",
    feedback: {
      "A": "挖井雖然可行，但在沙漠地區地下水資源可能很珍貴，過度抽取不環保喔！",
      "B": "從遠處運水會消耗很多能源，而且不是長久之計！",
      "C": "好聰明！即使沙漠雨水稀少，收集每一滴雨水都很重要，這是很好的節水方式！"
    },
    image: "沙漠學校"
  },
  {
    id: 3,
    name: "森林圖書館",
    description: "我們要在森林裡蓋一座與自然共存的圖書館！",
    question: "森林圖書館應該如何設計屋頂才最環保？",
    options: [
      { id: "A", text: "使用一般的混凝土屋頂，堅固耐用" },
      { id: "B", text: "設計屋頂花園，增加綠化和生物多樣性" },
      { id: "C", text: "使用玻璃屋頂，讓陽光照進圖書館" }
    ],
    correctAnswer: "B",
    feedback: {
      "A": "混凝土雖然堅固，但不利於生態環境，也會讓室內溫度升高！",
      "B": "太棒了！屋頂花園不只美觀，還能提供隔熱、減少能源消耗，還能增加生物多樣性！",
      "C": "玻璃屋頂雖然透光，但可能造成室內過熱，增加冷氣使用，不太節能喔！"
    },
    image: "森林圖書館"
  },
  {
    id: 4,
    name: "社區住宅",
    description: "我們要建造一個環保節能的社區住宅，減少對環境的影響！",
    question: "社區住宅應該採用什麼綠建築材料最環保？",
    options: [
      { id: "A", text: "全新製造的高級建材，堅固耐用" },
      { id: "B", text: "回收再利用的建材，如回收木材、舊磚塊等" },
      { id: "C", text: "一般市售的混凝土和鋼材，施工方便" }
    ],
    correctAnswer: "B",
    feedback: {
      "A": "高級建材雖然堅固，但製造過程常常會消耗大量能源和資源，不太環保！",
      "B": "太棒了！使用回收建材可以減少砍伐和開採，還能減少垃圾，是非常環保的選擇！",
      "C": "一般的混凝土和鋼材雖然常見，但生產過程會排放大量二氧化碳，對環境影響較大！"
    },
    image: "社區住宅"
  },
  {
    id: 5,
    name: "海濱公園",
    description: "我們要在海邊設計一個美麗的公園，又要避免雨水流失和海水倒灌！",
    question: "海濱公園應該如何設計地面才能幫助環境？",
    options: [
      { id: "A", text: "鋪設傳統混凝土地面，平整好走" },
      { id: "B", text: "使用透水性鋪面，讓雨水滲入地下" },
      { id: "C", text: "鋪設美觀的彩色瓷磚，吸引更多遊客" }
    ],
    correctAnswer: "B",
    feedback: {
      "A": "混凝土地面雖然平整，但會阻礙雨水滲透，容易造成積水或水資源流失！",
      "B": "太棒了！透水性鋪面可以讓雨水自然滲入地下，補充地下水，還能減少積水和水土流失！",
      "C": "彩色瓷磚雖然美觀，但像混凝土一樣不透水，不利於水資源循環利用！"
    },
    image: "海濱公園"
  },
  {
    id: 6,
    name: "城市大樓",
    description: "我們要在城市大樓外牆設計一道美麗又環保的垂直花園！",
    question: "垂直綠化牆最主要的環保功能是什麼？",
    options: [
      { id: "A", text: "純粹增加建築美觀度，吸引更多遊客" },
      { id: "B", text: "降低建築物表面溫度，減少能源消耗" },
      { id: "C", text: "遮蔽建築外觀缺陷，減少維修成本" }
    ],
    correctAnswer: "B",
    feedback: {
      "A": "綠化牆確實很美觀，但它的環保價值遠不止於此喔！",
      "B": "太棒了！垂直綠化牆能有效降低建築溫度，減少冷氣使用，還能淨化空氣和減少噪音！",
      "C": "雖然綠化牆可以美化外牆，但它的環保功能更重要，不只是為了遮蔽缺陷喔！"
    },
    image: "城市大樓"
  },
  {
    id: 7,
    name: "大型購物中心",
    description: "我們要在大型購物中心安裝節能環保的智慧空調系統！",
    question: "哪種智慧空調設計最能節省能源？",
    options: [
      { id: "A", text: "全天候維持固定低溫，確保顾客舒適" },
      { id: "B", text: "安裝感應器，根據人流及溫度自動調節空調運作" },
      { id: "C", text: "只在人多的時候開啟，其他時間完全關閉" }
    ],
    correctAnswer: "B",
    feedback: {
      "A": "固定低溫雖然舒適，但會浪費很多能源，尤其是在人少的時候！",
      "B": "太棒了！智慧感應系統能根據實際需求調整空調運作，既舒適又節能！",
      "C": "完全關閉雖然省電，但會影響顧客體驗，而且溫度忽冷忽熱反而需要更多能源恢復舒適溫度！"
    },
    image: "大型購物中心"
  },
  {
    id: 8,
    name: "社區中心",
    description: "我們要在社區中心設計一個環保的垃圾分類區，幫助資源回收再利用！",
    question: "哪種垃圾分類設計對環境最友善？",
    options: [
      { id: "A", text: "一個大型垃圾桶，方便居民一次丟棄所有垃圾" },
      { id: "B", text: "僅分為一般垃圾和資源回收兩類" },
      { id: "C", text: "詳細分類系統，包含廚餘、塑膠、紙類、金屬、電池等多種分類" }
    ],
    correctAnswer: "C",
    feedback: {
      "A": "雖然方便，但混合各種垃圾會讓許多可回收資源無法被再利用，增加環境負擔！",
      "B": "基本分類是好的第一步，但更詳細的分類能提高回收效率和資源再利用率！",
      "C": "太棒了！詳細的分類系統能大幅提高資源回收率，減少垃圾掩埋量，對環境非常友善！"
    },
    image: "社區中心"
  }
];

// 定義遊戲評分等級
const ratings = [
  { min: 1, max: 8, label: "初級環保建築師", emoji: "🌱" },
  { min: 9, max: 16, label: "進階環保建築師", emoji: "🌿" },
  { min: 17, max: 24, label: "專業環保建築師", emoji: "🌳" },
  { min: 25, max: 32, label: "綠建築大師", emoji: "🌍" },
  { min: 33, label: "永續地球守護者", emoji: "🌟" }
];

// 主要遊戲組件
const GreenBuildingGame = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameState, setGameState] = useState("intro"); // intro, playing, question, design, feedback, rating, completed
  const [selectedOption, setSelectedOption] = useState(null);
  const [userDesign, setUserDesign] = useState("");
  const [currentScore, setCurrentScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  const [progress, setProgress] = useState(0);

  // 計算環保關鍵詞得分
  const calculateKeywordScore = (design) => {
    let keywordScore = 0;
    let usedKeywords = [];
    
    // 定義環保關鍵詞分類
    const keywordCategories = [
      {
        name: "太陽能相關",
        keywords: ["太陽", "陽光", "太陽能"],
        score: 2
      },
      {
        name: "節水相關", 
        keywords: ["水", "雨水", "節水", "集水"],
        score: 2
      },
      {
        name: "綠化相關",
        keywords: ["植物", "綠化", "花園", "樹", "草坪"],
        score: 2
      },
      {
        name: "回收相關",
        keywords: ["回收", "再利用", "循環", "重複使用"],
        score: 2
      },
      {
        name: "透水設計",
        keywords: ["透水", "滲水", "滲透", "排水"],
        score: 2
      },
      {
        name: "垂直綠化",
        keywords: ["垂直", "綠牆", "牆面植物", "立體綠化"],
        score: 2
      },
      {
        name: "智慧系統",
        keywords: ["感應", "智慧", "自動調節", "智能"],
        score: 2
      },
      {
        name: "垃圾分類",
        keywords: ["分類", "分開", "區分", "分離"],
        score: 2
      },
      {
        name: "廚餘處理",
        keywords: ["廚餘", "堆肥", "有機肥"],
        score: 2
      },
      {
        name: "教育宣導",
        keywords: ["教育", "指引", "說明", "宣導"],
        score: 2
      }
    ];
    
    // 檢查每個關鍵詞分類
    keywordCategories.forEach(category => {
      const hasKeyword = category.keywords.some(keyword => design.includes(keyword));
      if (hasKeyword) {
        keywordScore += category.score;
        usedKeywords.push(category.name);
      }
    });
    
    return { keywordScore, usedKeywords };
  };

  // 處理用戶選擇答案
  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setGameState("design");
    
    // 如果選擇正確答案，增加分數
    if (optionId === levels[currentLevel].correctAnswer) {
      setCurrentScore(3);
    } else {
      setCurrentScore(1);
    }
  };

  // 處理用戶設計描述提交
  const handleDesignSubmit = () => {
    // 計算環保關鍵詞加分
    const { keywordScore, usedKeywords } = calculateKeywordScore(userDesign);
    
    // 總分數 = 答題分數 + 關鍵詞加分
    const totalLevelScore = currentScore + keywordScore;
    
    setTotalScore(prevScore => prevScore + totalLevelScore);
    setGameHistory(prev => [...prev, {
      level: levels[currentLevel].name,
      score: totalLevelScore,
      design: userDesign,
      baseScore: currentScore,
      keywordScore: keywordScore,
      usedKeywords: usedKeywords
    }]);
    
    setGameState("rating");
    // 更新遊戲進度
    setProgress(((currentLevel + 1) / levels.length) * 100);
  };

  // 進入下一關
  const goToNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setGameState("playing");
      setSelectedOption(null);
      setUserDesign("");
      setCurrentScore(0);
    } else {
      setGameState("completed");
    }
  };

  // 重新開始遊戲
  const restartGame = () => {
    setCurrentLevel(0);
    setGameState("intro");
    setSelectedOption(null);
    setUserDesign("");
    setCurrentScore(0);
    setTotalScore(0);
    setGameHistory([]);
    setProgress(0);
  };

  // 獲取當前評分等級
  const getCurrentRating = (score) => {
    return ratings.find(r => score >= r.min && (!r.max || score <= r.max));
  };

  // 獲取針對用戶設計的具體反饋
  const getDesignFeedback = (design) => {
    const feedback = [];
    
    // 檢查設計的長度和詳細程度
    if (design.length > 80) {
      feedback.push("你的設計非常詳細，這樣的思考很棒！");
    } else if (design.length > 50) {
      feedback.push("你的設計包含了不少細節！");
    }
    
    // 檢查特定的環保元素
    if (design.includes("太陽") || design.includes("陽光") || design.includes("太陽能")) {
      feedback.push("利用太陽能是很棒的環保想法！");
    }
    if (design.includes("水") || design.includes("雨水") || design.includes("節水")) {
      feedback.push("你的節水設計很有創意！");
    }
    if (design.includes("植物") || design.includes("綠化") || design.includes("花園") || design.includes("樹")) {
      feedback.push("增加植物綠化確實能改善環境品質！");
    }
    if (design.includes("回收") || design.includes("再利用") || design.includes("循環")) {
      feedback.push("重視資源回收再利用，真是環保小達人！");
    }
    if (design.includes("透水") || design.includes("滲水") || design.includes("滲透")) {
      feedback.push("你對水資源的循環利用考慮得很周到！");
    }
    if (design.includes("垂直") || design.includes("綠牆") || design.includes("牆面植物")) {
      feedback.push("垂直綠化是解決城市熱島效應的好方法！");
    }
    if (design.includes("感應") || design.includes("智慧") || design.includes("自動調節")) {
      feedback.push("使用智慧系統確實能有效節省能源！");
    }
    // 為垃圾分類區添加特定反饋
    if (design.includes("分類") || design.includes("分開") || design.includes("區分")) {
      feedback.push("詳細的垃圾分類確實能提高資源回收效率！");
    }
    if (design.includes("廚餘") || design.includes("堆肥")) {
      feedback.push("處理廚餘變成堆肥是很棒的循環利用方式！");
    }
    if (design.includes("教育") || design.includes("指引") || design.includes("說明")) {
      feedback.push("加入教育元素能幫助大家更了解垃圾分類的重要性！");
    }
    
    // 如果沒有檢測到特定元素，給予一般性鼓勵
    if (feedback.length === 0) {
      feedback.push("你的想法很有創意！");
    }
    
    return feedback;
  };

  // 渲染進度條
  const renderProgressBar = () => {
    if (gameState === "intro" || gameState === "completed") return null;
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className="bg-green-500 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  // 渲染遊戲內容
  const renderGameContent = () => {
    switch (gameState) {
      case "intro":
        return (
          <div className="text-center p-6 max-w-lg mx-auto">
            <div className="flex justify-center mb-4">
              <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                <Home className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">歡迎來到綠建築遊戲！</h1>
            <p className="text-lg mb-4">我是建築師巴布！今天我要帶你一起學習如何設計環保、節能又可愛的綠建築！</p>
            <p className="mb-6">準備好了嗎？我們將設計八種不同的綠建築，考驗你的創意和環保知識！</p>
            <button 
              onClick={() => setGameState("playing")} 
              className="px-6 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-colors flex items-center justify-center mx-auto"
            >
              開始遊戲 <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        );
        
      case "playing":
        return (
          <div className="p-4 max-w-lg mx-auto">
            <div className="bg-green-50 rounded-lg p-4 mb-4 shadow-sm border border-green-100">
              <div className="flex items-center mb-2">
                <MessageSquare className="h-5 w-5 text-green-500 mr-2" />
                <h2 className="text-lg font-medium text-green-700">建築師巴布</h2>
              </div>
              <p className="text-gray-700">嗨，小朋友！歡迎來到第 {currentLevel + 1} 關：{levels[currentLevel].name}！</p>
              <p className="text-gray-700 mt-2">{levels[currentLevel].description}</p>
              <p className="text-gray-700 mt-2 font-medium">{levels[currentLevel].question}</p>
            </div>
            
            <div className="space-y-2 mt-4">
              {levels[currentLevel].options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className="w-full text-left p-3 rounded-md border border-gray-200 hover:border-green-400 hover:bg-green-50 transition-colors"
                >
                  <span className="font-medium text-green-600">{option.id}：</span> {option.text}
                </button>
              ))}
            </div>
          </div>
        );
        
      case "design":
        return (
          <div className="p-4 max-w-lg mx-auto">
            <div className="bg-green-50 rounded-lg p-4 mb-4 shadow-sm border border-green-100">
              <div className="flex items-center mb-2">
                <MessageSquare className="h-5 w-5 text-green-500 mr-2" />
                <h2 className="text-lg font-medium text-green-700">建築師巴布</h2>
              </div>
              <p className="text-gray-700">
                {levels[currentLevel].feedback[selectedOption]}
              </p>
              <p className="text-gray-700 mt-2">
                現在，請你發揮創意，告訴我你會怎麼設計這個{levels[currentLevel].name}？
                有什麼特別的環保設計想法嗎？
              </p>
            </div>
            
            <div className="mt-4">
              <textarea
                value={userDesign}
                onChange={(e) => setUserDesign(e.target.value)}
                placeholder="描述你的設計想法..."
                className="w-full p-3 rounded-md border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 h-32"
              />
              <button
                onClick={handleDesignSubmit}
                disabled={!userDesign.trim()}
                className={`mt-3 px-4 py-2 rounded-md text-white ${
                  userDesign.trim() ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'
                } transition-colors`}
              >
                提交我的設計
              </button>
            </div>
          </div>
        );
        
      case "rating":
        const levelScore = currentScore;
        const { keywordScore, usedKeywords } = calculateKeywordScore(userDesign);
        const totalLevelScore = levelScore + keywordScore;
        const designFeedback = getDesignFeedback(userDesign);
        
        return (
          <div className="p-4 max-w-lg mx-auto">
            <div className="bg-green-50 rounded-lg p-4 mb-4 shadow-sm border border-green-100">
              <div className="flex items-center mb-2">
                <Award className="h-5 w-5 text-green-500 mr-2" />
                <h2 className="text-lg font-medium text-green-700">設計評分</h2>
              </div>
              
              <div className="mb-3">
                <p className="font-medium text-gray-700">你在這關的得分：</p>
                <div className="flex items-center mt-1">
                  <span className="text-xl font-bold text-green-600">{totalLevelScore}</span>
                  <span className="text-gray-500 text-sm ml-2">
                    (答題：{levelScore} + 環保關鍵詞：{keywordScore})
                  </span>
                </div>
              </div>
              
              {/* 詳細分數分解 */}
              <div className="mb-3 bg-white rounded p-3 border">
                <p className="font-medium text-gray-700 mb-2">分數分解：</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>答題得分：</span>
                    <span className="font-medium">{levelScore} 分</span>
                  </div>
                  <div className="flex justify-between">
                    <span>環保關鍵詞加分：</span>
                    <span className="font-medium text-green-600">{keywordScore} 分</span>
                  </div>
                  {usedKeywords.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium text-green-600">獲得加分的環保元素：</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {usedKeywords.map((keyword, index) => (
                          <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            {keyword} (+2分)
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-3">
                <p className="font-medium text-gray-700">設計反饋：</p>
                <ul className="mt-1 space-y-1">
                  {designFeedback.map((feedback, index) => (
                    <li key={index} className="text-gray-600 flex items-start">
                      <Leaf className="h-4 w-4 text-green-500 mr-1 mt-1 flex-shrink-0" />
                      <span>{feedback}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <button
              onClick={goToNextLevel}
              className="w-full py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition-colors flex items-center justify-center"
            >
              {currentLevel < levels.length - 1 ? '前往下一關' : '查看最終結果'} <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        );
        
      case "completed":
        const finalRating = getCurrentRating(totalScore);
        
        return (
          <div className="p-4 max-w-lg mx-auto">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-4xl">{finalRating?.emoji}</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-green-600 mb-2">恭喜完成所有關卡！</h1>
              <p className="text-lg mb-2">你的最終得分：<span className="font-bold text-green-600">{totalScore}</span> 分</p>
              <p className="text-lg mb-4">你的等級：<span className="font-bold text-green-600">{finalRating?.label}</span></p>
            </div>
            
            {/* 遊戲歷史回顧 */}
            <div className="bg-green-50 rounded-lg p-4 mb-4 shadow-sm border border-green-100">
              <h3 className="text-lg font-medium text-green-700 mb-3">你的綠建築設計回顧</h3>
              <div className="space-y-3">
                {gameHistory.map((history, index) => (
                  <div key={index} className="bg-white rounded p-3 border">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-700">{history.level}</h4>
                      <span className="text-green-600 font-bold">{history.score} 分</span>
                    </div>
                    <p className="text-gray-600 text-sm">{history.design}</p>
                    {history.usedKeywords.length > 0 && (
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                          {history.usedKeywords.map((keyword, kidx) => (
                            <span key={kidx} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* 環保小貼士 */}
            <div className="bg-blue-50 rounded-lg p-4 mb-4 shadow-sm border border-blue-100">
              <h3 className="text-lg font-medium text-blue-700 mb-3 flex items-center">
                <Leaf className="h-5 w-5 mr-2" />
                環保小貼士
              </h3>
              <div className="space-y-2 text-sm text-blue-700">
                <p>🌱 在生活中，你也可以實踐這些環保理念：</p>
                <p>• 節約用水和用電</p>
                <p>• 做好垃圾分類和資源回收</p>
                <p>• 多種植物，愛護環境</p>
                <p>• 選擇環保材料和產品</p>
                <p>• 使用大眾運輸或步行減少污染</p>
              </div>
            </div>
            
            <button
              onClick={restartGame}
              className="w-full py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition-colors flex items-center justify-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              重新挑戰
            </button>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto py-4">
        {/* 遊戲標題和進度 */}
        {gameState !== "intro" && gameState !== "completed" && (
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold text-green-600 mb-2">綠建築遊戲</h1>
            <p className="text-gray-600">關卡 {currentLevel + 1} / {levels.length}</p>
          </div>
        )}
        
        {/* 進度條 */}
        {renderProgressBar()}
        
        {/* 遊戲內容 */}
        {renderGameContent()}
      </div>
    </div>
  );
};

export default GreenBuildingGame;