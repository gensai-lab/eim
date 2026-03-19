/**
 * main.js - 地図の読み込みと全体制御
 */

async function loadMapSVG() {
    const container = document.getElementById('map-container');
    const status = document.getElementById('status-message');
    const loadingText = document.getElementById('loading-text');
    
    try {
        status.innerText = "地図(3.3MB)をロード中...";
        
        // fetchのキャッシュを避けるためにタイムスタンプを付与
        const response = await fetch(`assets/map.svg?v=${new Date().getTime()}`);
        
        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status} - map.svgが見つからないか、読み込めません。`);
        }
        
        const svgText = await response.text();
        
        // SVGを注入
        container.innerHTML = svgText;
        
        // 注入後の微調整
        const svg = container.querySelector('svg');
        if (svg) {
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            
            // ViewBoxがない場合は強制設定（パワポ書き出しだと抜けることがあるため）
            if (!svg.getAttribute('viewBox')) {
                svg.setAttribute('viewBox', "0 0 1280 720");
            }
            
            status.innerText = "地図の読み込み完了";
            if (loadingText) loadingText.remove();
            console.log("SVGの読み込みに成功しました。");
        } else {
            throw new Error("SVGタグが見つかりません。ファイル形式を確認してください。");
        }

    } catch (error) {
        console.error("Error details:", error);
        status.innerText = "エラー: " + error.message;
        if (loadingText) loadingText.innerText = "地図の読み込みに失敗しました。";
        
        // ローカル実行（file://）でのエラー対策
        if (window.location.protocol === 'file:') {
            alert("ブラウザのセキュリティ制限により、ローカルファイルを直接開くと地図が読み込めません。VS CodeのLive Serverなどを使うか、GitHub Pagesにアップロードして確認してください。");
        }
    }
}

// 初期化
window.addEventListener('DOMContentLoaded', () => {
    loadMapSVG();
});

// ボタンイベント
document.getElementById('btn-update').onclick = () => {
    if (typeof window.fetchLatestQuake === 'function') {
        window.fetchLatestQuake();
    } else {
        alert("APIの準備ができていません。");
    }
};

document.getElementById('btn-download').onclick = function() {
    const displayArea = document.getElementById('app');
    const status = document.getElementById('status-message');
    
    status.innerText = "画像を生成中...";

    html2canvas(displayArea, {
        width: 1280,
        height: 720,
        scale: 2,
        useCORS: true,
        backgroundColor: null // 背景を透明にしたい場合はここ
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Kactuif_Map_${new Date().getTime()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        status.innerText = "画像を保存しました";
    }).catch(err => {
        console.error(err);
        status.innerText = "画像保存に失敗しました。";
    });
};
