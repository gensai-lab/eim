// 1. 地図（SVG）を読み込んで画面に表示する関数
async function loadMapSVG() {
    const container = document.getElementById('map-container');
    const status = document.getElementById('status-message');
    
    try {
        status.innerText = "地図を読み込み中...";
        const response = await fetch('assets/map.svg');
        if (!response.ok) throw new Error("map.svgが見つかりません");
        
        const svgText = await response.text();
        // SVGのテキストをそのままHTMLの中に流し込む
        container.innerHTML = svgText;
        status.innerText = "地図の読み込み完了";
        
        // 読み込み直後は全体を表示するようにViewBoxを調整（必要に応じて）
        const svg = container.querySelector('svg');
        if (svg && !svg.getAttribute('viewBox')) {
            // もしViewBoxがなければ、初期設定
            svg.setAttribute('viewBox', "0 0 1280 720");
        }
    } catch (error) {
        console.error(error);
        status.innerText = "地図の読み込みに失敗しました。assets/map.svg を確認してください。";
    }
}

// 2. ページ読み込み時の初期化
window.addEventListener('DOMContentLoaded', () => {
    loadMapSVG();
});

// 3. ボタンのイベント設定
document.getElementById('btn-update').onclick = () => {
    window.fetchLatestQuake();
};

document.getElementById('btn-download').onclick = function() {
    const displayArea = document.getElementById('app');
    const status = document.getElementById('status-message');
    status.innerText = "画像を生成中...";

    html2canvas(displayArea, {
        width: 1280,
        height: 720,
        scale: 2,
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `quake_map_${new Date().getTime()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        status.innerText = "画像を保存しました";
    });
};
