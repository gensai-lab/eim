window.addEventListener('load', () => {
    // 1. 地図を読み込む
    loadMap();

    // 2. ボタン設定
    document.getElementById('btn-update').onclick = () => {
        window.fetchLatestQuake();
    };
});

async function loadMap() {
    const container = document.getElementById('map-container');
    try {
        const response = await fetch('assets/map.svg?t=' + new Date().getTime());
        const svgText = await response.text();
        container.innerHTML = svgText;
        console.log("SVG Map Loaded");
    } catch (e) {
        console.error("Map Load Error", e);
    }
}
