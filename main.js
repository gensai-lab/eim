window.addEventListener('DOMContentLoaded', () => {
    // 1. 起動時に地図を読み込む
    loadMap();

    // 2. 更新ボタンが押されたらAPIを叩く
    document.getElementById('btn-update').addEventListener('click', () => {
        fetchLatestQuake();
    });
});

async function loadMap() {
    const container = document.getElementById('map-container');
    try {
        const response = await fetch('assets/map.svg');
        const svgText = await response.text();
        container.innerHTML = svgText;
        console.log("地図の読み込みが完了しました");
    } catch (e) {
        console.error("地図の読み込みに失敗しました", e);
    }
}
