// P2P地震情報 APIのURL（地震情報＝551）
const P2P_API_URL = "https://api.p2pquake.net/v2/history?codes=551&limit=1";

/**
 * APIから最新の地震情報を取得する関数
 */
async function fetchLatestQuake() {
    try {
        const response = await fetch(P2P_API_URL);
        if (!response.ok) throw new Error("ネットワークエラーが発生しました");
        
        const data = await response.json();
        const latest = data[0]; // 最新の1件

        if (latest) {
            updateUI(latest);
        }
    } catch (error) {
        console.error("データの取得に失敗しました:", error);
        alert("データの取得に失敗しました。コンソールを確認してください。");
    }
}

/**
 * 取得したデータをHTML（画面）に反映させる関数
 */
function updateUI(data) {
    const eq = data.earthquake;
    
    // 1. 最大震度の反映（P2Pは数値を10倍にしているので10で割る）
    // 例：55 -> 5.5 (5+)
    const rawScale = eq.maxScale;
    document.getElementById('max-shindo').innerText = formatShindo(rawScale);

    // 2. 発生日時の反映
    // 文字列 "2026/03/17 12:30:45" を見やすく加工
    const timeStr = eq.time.replace(/\//g, '年').replace(' ', '月') + '日'; 
    // ※簡易的な加工なので、後でよりきれいに調整可能です
    document.getElementById('quake-time').innerText = eq.time;

    // 3. 震源情報の表示切り替え
    const hypoDetails = document.getElementById('hypo-details');
    if (eq.hypocenter.name) {
        // 震源地がある場合（震源情報）
        hypoDetails.classList.remove('hidden');
        document.getElementById('hypo-name').innerText = eq.hypocenter.name;
        document.getElementById('mag-value').innerText = "M" + eq.magnitude.toFixed(1);
        document.getElementById('depth-value').innerText = "約" + eq.hypocenter.depth + "km";
    } else {
        // 震源地がない場合（震度速報のみなど）
        hypoDetails.classList.add('hidden');
    }

    // 4. テロップ（津波）の制御
    const tsunamiInfo = document.getElementById('tsunami-info');
    if (data.issue.type === "Foreign" || eq.domesticTsunami !== "None") {
        tsunamiInfo.classList.remove('hidden');
    } else {
        tsunamiInfo.classList.add('hidden');
    }
    
    // 地図への描画司令（renderer.jsは後ほど作ります）
    if (window.drawMapIcons) {
        window.drawMapIcons(data.points);
    }
}

/**
 * P2Pの震度数値を「5+」などの形式に変換する補助関数
 */
function formatShindo(scale) {
    const shindoMap = {
        10: "1", 20: "2", 30: "3", 40: "4",
        45: "5-", 50: "5+", 55: "6-", 60: "6+", 70: "7"
    };
    return shindoMap[scale] || "X";
}
