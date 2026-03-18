// 関数をブラウザ全体で使えるように窓口（window）に登録します
window.fetchLatestQuake = async function() {
    const status = document.getElementById('status-message');
    status.innerText = "データ取得中...";

    try {
        const response = await fetch("https://api.p2pquake.net/v2/history?codes=551&limit=1");
        const data = await response.json();
        const latest = data[0];

        if (latest) {
            status.innerText = "地震情報を更新中...";
            // 1. 左下情報パネル（HTML）を更新
            if (window.updateQuakeDetails) {
                window.updateQuakeDetails(latest);
            }

            // 2. 地図（SVG）にアイコンを描画
            if (latest.points && latest.points.length > 0) {
                status.innerText = "地図を描画中...";
                if (window.drawShindoIcons) {
                    await window.drawShindoIcons(latest.points);
                }
            } else {
                console.log("震度地点データがありません");
            }
            status.innerText = "更新完了: " + latest.earthquake.time;
        }
    } catch (error) {
        console.error(error);
        status.innerText = "エラーが発生しました";
    }
};
