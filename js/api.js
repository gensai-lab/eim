// 関数をブラウザ全体で使えるように窓口（window）に登録します
window.fetchLatestQuake = async function() {
    const status = document.getElementById('status-message');
    status.innerText = "データ取得中...";

    try {
        const response = await fetch("https://api.p2pquake.net/v2/history?codes=551&limit=1");
        const data = await response.json();
        const latest = data[0];

        if (latest && latest.points) {
            status.innerText = "地図を描画中...";
            // 地図描画関数を呼び出す（次のステップで作る renderer.js 内の関数）
            if (window.drawShindoIcons) {
                window.drawShindoIcons(latest.points);
            }
            status.innerText = "更新完了: " + latest.earthquake.time;
        }
    } catch (error) {
        console.error(error);
        status.innerText = "エラーが発生しました";
    }
};
