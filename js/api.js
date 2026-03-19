window.fetchLatestQuake = async function() {
    const status = document.getElementById('status-message');
    status.innerText = "データ取得中...";

    try {
        const response = await fetch("https://api.p2pquake.net/v2/history?codes=551&limit=1");
        const data = await response.json();
        const latest = data[0];

        if (latest && latest.points) {
            status.innerText = "地図を描画中...";
            await window.drawShindoIcons(latest.points);
            status.innerText = "更新完了: " + latest.earthquake.time;
        } else {
            status.innerText = "最新の震度データが見つかりません";
        }
    } catch (error) {
        console.error(error);
        status.innerText = "通信エラーが発生しました";
    }
};
