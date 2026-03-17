// プログラムが動いているか確認するためのログ
console.log("main.js loaded");

window.addEventListener('load', () => {
    console.log("Window loaded");
    
    // 1. 起動時に地図を読み込む
    loadMap();

    // 2. 更新ボタンに機能を割り当てる
    const updateBtn = document.getElementById('btn-update');
    if(updateBtn) {
        updateBtn.addEventListener('click', () => {
            console.log("更新ボタンが押されました");
            fetchLatestQuake(); // api.jsの関数を呼ぶ
        });
    }
});

async function loadMap() {
    const container = document.getElementById('map-container');
    try {
        // キャッシュ対策としてURLの後ろに時間を付ける
        const response = await fetch('assets/map.svg?t=' + new Date().getTime());
        const svgText = await response.text();
        container.innerHTML = svgText;
        console.log("地図の読み込みが完了しました");
    } catch (e) {
        console.error("地図の読み込みに失敗しました", e);
    }
}
