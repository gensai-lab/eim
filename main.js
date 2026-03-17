// 地震情報の取得先 (P2P地震情報 API)
const API_URL = "https://api.p2pquake.net/v2/history?codes=551&limit=1";

// ページが読み込まれたら実行
window.addEventListener('DOMContentLoaded', () => {
    loadMap();
    
    document.getElementById('btn-update').addEventListener('click', updateQuakeInfo);
});

// 1. SVG地図を読み込んで画面に表示する
async function loadMap() {
    const response = await fetch('assets/map.svg');
    const svgText = await response.text();
    document.getElementById('map-container').innerHTML = svgText;
    console.log("地図を読み込みました");
}

// 2. 最新の地震情報を取得する
async function updateQuakeInfo() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const latestQuake = data[0]; // 最新の1件

        if (latestQuake) {
            displayInfo(latestQuake);
            drawShindoIcons(latestQuake.points);
        }
    } catch (error) {
        console.error("データの取得に失敗しました", error);
    }
}

// 3. 震源情報などをテキストで表示
function displayInfo(quake) {
    const infoDiv = document.getElementById('quake-details');
    const time = quake.earthquake.time;
    const hypocenter = quake.earthquake.hypocenter.name;
    const maxScale = quake.earthquake.maxScale / 10; // P2Pは10倍の数値

    infoDiv.innerHTML = `
        <p>発生時刻: ${time}</p>
        <p>震源地: ${hypocenter}</p>
        <p>最大震度: ${maxScale}</p>
    `;
}
