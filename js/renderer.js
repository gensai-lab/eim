// P2Pの「地域名」と、地図の「ID（番号）」を結びつける辞書（全国網羅版）
const AREA_DICTIONARY = {
    "石狩地方北部": "100", "石狩地方中部": "101", "石狩地方南部": "102",
    "渡島地方北部": "105", "渡島地方東部": "106", "渡島地方西部": "107",
    "檜山地方": "110", "後志地方北部": "115", "後志地方東部": "116", "後志地方西部": "117",
    "北海道奥尻島": "119", "空知地方北部": "120", "空知地方中部": "121", "空知地方南部": "122",
    "上川地方北部": "125", "上川地方中部": "126", "上川地方南部": "127",
    "留萌地方中北部": "130", "留萌地方南部": "131", "宗谷地方北部": "135", "宗谷地方南部": "136",
    "北海道利尻礼文": "139", "網走地方": "140", "北見地方": "141", "紋別地方": "142",
    "胆振地方西部": "145", "胆振地方中東部": "146", "日高地方西部": "150", "日高地方中部": "151", "日高地方東部": "152",
    "十勝地方北部": "155", "十勝地方中部": "156", "十勝地方南部": "157",
    "釧路地方北部": "160", "釧路地方中南部": "161", "根室地方北部": "165", "根室地方中部": "166", "根室地方南部": "167",
    "青森県津軽北部": "200", "青森県津軽南部": "201", "青森県三八上北": "202", "青森県下北": "203",
    "岩手県沿岸北部": "210", "岩手県沿岸南部": "211", "岩手県内陸北部": "212", "岩手県内陸南部": "213",
    "宮城県北部": "220", "宮城県南部": "221", "宮城県中部": "222",
    "秋田県沿岸北部": "230", "秋田県沿岸南部": "231", "秋田県内陸北部": "232", "秋田県内陸南部": "233",
    "山形県庄内": "240", "山形県最上": "241", "山形県村山": "242", "山形県置賜": "243",
    "福島県中通り": "250", "福島県浜通り": "251", "福島県会津": "252",
    "茨城県北部": "300", "茨城県南部": "301", "栃木県北部": "310", "栃木県南部": "311",
    "群馬県北部": "320", "群馬県南部": "321", "埼玉県北部": "330", "埼玉県南部": "331", "埼玉県秩父": "332",
    "千葉県北東部": "340", "千葉県北西部": "341", "千葉県南部": "342",
    "東京都２３区": "350", "東京都多摩東部": "351", "東京都多摩西部": "352",
    "神津島": "354", "伊豆大島": "355", "新島": "356", "三宅島": "357", "八丈島": "358", "小笠原": "359",
    "神奈川県東部": "360", "神奈川県西部": "361",
    "新潟県上越": "370", "新潟県中越": "371", "新潟県下越": "372", "新潟県佐渡": "375",
    "富山県東部": "380", "富山県西部": "381", "石川県能登": "390", "石川県加賀": "391",
    "福井県嶺北": "400", "福井県嶺南": "401",
    "山梨県中・西部": "411", "山梨県東部・富士五湖": "412",
    "長野県北部": "420", "長野県中部": "421", "長野県南部": "422",
    "岐阜県飛騨": "430", "岐阜県美濃東部": "431", "岐阜県美濃中西部": "432",
    "静岡県伊豆": "440", "静岡県東部": "441", "静岡県中部": "442", "静岡県西部": "443",
    "愛知県東部": "450", "愛知県西部": "451", "三重県北部": "460", "三重県中部": "461", "三重県南部": "462",
    "滋賀県北部": "500", "滋賀県南部": "501", "京都府北部": "510", "京都府南部": "511",
    "大阪府北部": "520", "大阪府南部": "521",
    "兵庫県北部": "530", "兵庫県南東部": "531", "兵庫県南西部": "532", "兵庫県淡路島": "535",
    "奈良県": "540", "和歌山県北部": "550", "和歌山県南部": "551",
    "鳥取県東部": "560", "鳥取県中部": "562", "鳥取県西部": "563",
    "島根県東部": "570", "島根県西部": "571", "島根県隠岐": "575",
    "岡山県北部": "580", "岡山県南部": "581",
    "広島県北部": "590", "広島県南東部": "591", "広島県南西部": "592",
    "徳島県北部": "600", "徳島県南部": "601",
    "香川県東部": "610", "香川県西部": "611",
    "愛媛県東予": "620", "愛媛県中予": "621", "愛媛県南予": "622",
    "高知県東部": "630", "高知県中部": "631", "高知県西部": "632",
    "山口県北部": "700", "山口県西部": "702", "山口県東部": "703", "山口県中部": "704",
    "福岡県福岡": "710", "福岡県北九州": "711", "福岡県筑豊": "712", "福岡県筑後": "713",
    "佐賀県北部": "720", "佐賀県南部": "721",
    "長崎県北部": "730", "長崎県南西部": "731", "長崎県島原半島": "732", "長崎県対馬": "735", "長崎県壱岐": "736", "長崎県五島": "737",
    "熊本県阿蘇": "740", "熊本県熊本": "741", "熊本県球磨": "742", "熊本県天草・芦北": "743",
    "大分県北部": "750", "大分県中部": "751", "大分県南部": "752", "大分県西部": "753",
    "宮崎県北部平野部": "760", "宮崎県北部山沿い": "761", "宮崎県南部平野部": "762", "宮崎県南部山沿い": "763",
    "鹿児島県薩摩": "770", "鹿児島県大隅": "771", "鹿児島県十島村": "774", "鹿児島県甑島": "775", "鹿児島県種子島": "776", "鹿児島県屋久島": "777", "鹿児島県奄美北部": "778", "鹿児島県奄美南部": "779",
    "沖縄県本島北部": "800", "沖縄県本島中南部": "801", "沖縄県久米島": "802", "沖縄県大東島": "803", "沖縄県宮古島": "804", "沖縄県石垣島": "805", "沖縄県与那国島": "806", "沖縄県西表島": "807"
};

// アイコン Data URL キャッシュ用
const iconDataUrls = {};

// アイコンを Data URL に変換してキャッシュする
async function fetchAllIconDataUrls() {
    const scales = ["1", "2", "3", "4", "5-", "5+", "6-", "6+", "7"];
    for (const scale of scales) {
        try {
            const response = await fetch(`assets/${scale}.svg`);
            const svgText = await response.text();
            iconDataUrls[scale] = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgText)));
        } catch (e) {
            console.error(`アイコンの読み込みに失敗しました: assets/${scale}.svg`, e);
        }
    }
}

// P2Pの震度数値から Data URL を取得する
function getIconDataUrl(scale) {
    const scaleMap = {
        10: "1", 20: "2", 30: "3", 40: "4",
        45: "5-", 50: "5+", 55: "6-", 60: "6+", 70: "7"
    };
    const key = scaleMap[scale];
    return iconDataUrls[key] || null;
}

// 地図上にアイコンを描画するメイン機能（ `<path id="ID">` 方式）
window.drawShindoIcons = async function(points) {
    console.log("地図への描画を開始します...", points);
    const status = document.getElementById('status-message');

    const svgElement = document.querySelector('#map-container svg');
    if (!svgElement) {
        console.error("地図のSVGが見つかりません。");
        status.innerText = "エラー: 地図SVGが見つかりません";
        return;
    }

    // 以前に描画した本物のアイコンがあれば、一旦すべて消す
    const oldIcons = document.querySelectorAll('.dynamic-icon');
    oldIcons.forEach(icon => icon.remove());

    // アイコンのData URLがまだキャッシュされていなければ取得
    if (Object.keys(iconDataUrls).length === 0) {
        status.innerText = "アイコンを準備中...";
        await fetchAllIconDataUrls();
    }

    // ズーム用の範囲計算
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let hasValidPoint = false;

    // P2Pから送られてきた各地域のデータを1つずつ処理
    points.forEach(point => {
        const areaName = point.addr;
        const targetId = AREA_DICTIONARY[areaName];

        if (!targetId) {
            console.log(`辞書未登録: ${areaName}`);
            return;
        }

        const iconDataUrl = getIconDataUrl(point.scale);
        if (!iconDataUrl) return;

        // 地図の `<path id="ID">` 要素を探す
        const areaPath = document.getElementById(targetId);
        if (!areaPath) {
            // 地図上にそのIDの区域がない場合はスキップ
            console.warn(`ID: ${targetId} (${areaName}) がSVG地図内に見つかりません`);
            return;
        }

        // 区域の「中心座標」を計算
        const bbox = areaPath.getBBox();
        const centerX = bbox.x + bbox.width / 2;
        const centerY = bbox.y + bbox.height / 2;

        // アイコンのサイズ（地図上の大きさに合わせて調整してください）
        const iconSize = 30; // 例：30px x 30px

        // 新しい画像（本物の震度アイコン）を作る
        const newIcon = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        newIcon.setAttribute('href', iconDataUrl);
        newIcon.setAttribute('x', centerX - iconSize / 2); // 中心を合わせる
        newIcon.setAttribute('y', centerY - iconSize / 2); // 中心を合わせる
        newIcon.setAttribute('width', iconSize);
        newIcon.setAttribute('height', iconSize);
        newIcon.setAttribute('class', 'dynamic-icon');

        // 地図に追加
        svgElement.appendChild(newIcon);

        // ズーム用の範囲を更新
        hasValidPoint = true;
        minX = Math.min(minX, bbox.x);
        minY = Math.min(minY, bbox.y);
        maxX = Math.max(maxX, bbox.x + bbox.width);
        maxY = Math.max(maxY, bbox.y + bbox.height);
    });

    // ズーム（ViewBoxの設定）
    if (hasValidPoint) {
        status.innerText = "地図をズーム中...";
        
        // 少しマージンを追加
        const marginPercent = 0.1; // 10%
        const width = maxX - minX;
        const height = maxY - minY;
        const zoomWidth = width * (1 + marginPercent * 2);
        const zoomHeight = height * (1 + marginPercent * 2);
        const zoomX = minX - width * marginPercent;
        const zoomY = minY - height * marginPercent;

        // SVGのviewBoxを設定（x y width height）
        const newViewBox = `${zoomX} ${zoomY} ${zoomWidth} ${zoomHeight}`;
        svgElement.setAttribute('viewBox', newViewBox);

        console.log(`ViewBox更新: ${newViewBox}`);
    } else {
        // 震度があった区域がなかった（または地図上にない）場合は、全体表示に戻す
        // 元のviewBoxがわかる場合は、それを設定する
        console.log("ズーム対象なし、全体表示のまま");
    }

    status.innerText = "描画完了";
    console.log("アイコンの配置とズームが完了しました！");
};

// 地震情報パネル（HTML）を更新する機能
window.updateQuakeDetails = function(data) {
    const eq = data.earthquake;
    
    // 1. 最大震度の反映
    const rawScale = eq.maxScale;
    document.getElementById('max-shindo').innerText = formatShindo(rawScale);

    // 2. 発生日時の反映
    const timeStr = eq.time;
    // P2Pの形式 "2026/03/17 12:30:45" を "2026年03月17日 12時30分ごろ" に加工
    const processedTime = timeStr.replace(/\//g, '年').replace(' ', '月') + '日';
    // さらなる加工（時・分を抽出して「ごろ」を付けるなど）は、後ほどきれいに調整可能です
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
