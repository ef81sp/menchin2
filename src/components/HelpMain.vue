<template>
  <h3>概要</h3>

  <p>自分のペースでチンイツ・牌理を練習するためのツールです。</p>
  <p>無料でご使用いただけます。</p>

  <h3>特徴</h3>
  <h4>ふたつのモード</h4>
  <ul>
    <li><span class="font-semibold">何待ち</span>: 待ち牌を当てます。</li>
    <li>
      <span class="font-semibold">何切る</span>:
      1枚ツモった状態から、最も有効牌の多い打牌を当てます。
    </li>
  </ul>

  <h4>時間制限なし</h4>
  <p>あせらされず、わかるまで考えることができます。</p>

  <h4>解説付き</h4>
  <p>問題の回答後に解説を見ることができます。</p>

  <ul class="mt-2">
    <li>
      「何待ち」では、その手牌のブロック分けの全パターンと、パターンごとの待ちを一覧できます。
    </li>
    <li>
      「何切る」では、各打牌ごとの待ちの種類と、その残り枚数（いわゆる「何種何枚」）を一覧できます。
    </li>
  </ul>

  <h4>自分にあったカスタマイズ</h4>
  <ul>
    <li><span class="font-semibold">手牌の枚数</span>: 7枚、10枚、13枚から選べます。</li>
    <li>
      <span class="font-semibold">牌の範囲</span>:
      1-9、2-8、3-7から選べます。範囲を狭くすると、ごちゃごちゃするので難易度が上がります。
    </li>
    <li>
      <span class="font-semibold">出題タイプ</span>:
      ノーテンのみ、テンパイ、多面待ち、ごちゃまぜから選べます。
    </li>
    <li><span class="font-semibold">牌の種類</span>: マンズ、ピンズ、ソーズから選べます。</li>
  </ul>

  <h4>PWA対応</h4>
  <p>お持ちのスマートフォンにインストールして、全画面表示で使うことができます。</p>

  <h4>キーボードショートカット</h4>
  <ul>
    <li>
      <span class="font-semibold">数字キー</span>: 牌の選択
      <ul>
        <li>テンキーの数字キーでもOK</li>
      </ul>
    </li>
    <li>
      <span class="font-semibold"><kbd>r</kbd></span
      >: 別の問題 (Reload)
      <ul>
        <li>テンキーの + でもOK</li>
      </ul>
    </li>
    <li>
      <span class="font-semibold"><kbd>j</kbd></span
      >: 判定 (Judge)
      <ul>
        <li>何待ちのみ</li>
        <li>テンキーの Enter でもOK</li>
      </ul>
    </li>
    <li>
      <span class="font-semibold"><kbd>t</kbd></span
      >: ツモ (Tsumo)
      <ul>
        <li>何切るのみ</li>
        <li>テンキーの Enter でもOK</li>
      </ul>
    </li>
    <li>
      <span class="font-semibold"><kbd>e</kbd></span
      >: 解説を見る (Explain)
      <ul>
        <li>テンキーの - でもOK</li>
      </ul>
    </li>
  </ul>

  <h3>動画・配信での使用</h3>
  <p>ご自由に使ってください。許可は不要ですので、許可を得る目的での連絡はしないでください。</p>
  <p>リンクを貼っていただけると喜びます。</p>

  <h3>牌の画像</h3>
  <a
    href="https://mj-king.net/sozai/"
    target="_blank"
    rel="noopener noreferrer"
  >
    麻雀王国
  </a>

  <h3>作った人</h3>
  <p>
    <a
      href="https://twitter.com/p_craft"
      target="_blank"
      rel="noopener noreferrer"
    >
      @p_craft
    </a>
    (かみくず)
  </p>
  <p>
    <a
      href="https://github.com/ef81sp/menchin2"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="/github-mark.png"
        alt="GitHub (open in new tab)"
        class="h-6 object-contain"
      />
    </a>
  </p>
</template>
<style scoped>
h3 {
  @apply mb-3 mt-7 text-xl font-extrabold;
}
h4 {
  @apply mb-2 mt-4 text-lg font-bold;
}
</style>
