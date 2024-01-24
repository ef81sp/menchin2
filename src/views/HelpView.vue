<script setup lang="ts">
import Card from 'primevue/card'
import ScrollPanel from 'primevue/scrollpanel'
</script>

<template>
  <Card class="mx-auto my-3 h-[80svh] w-5/6 bg-slate-50">
    <template #title>
      <h2 class="text-2xl">ヘルプ (このアプリについて)</h2>
    </template>
    <template #content>
      <ScrollPanel class="h-[60svh] w-full p-2 md:h-[70svh]">
        <h3 class="mb-3 mt-7 text-xl font-extrabold">概要</h3>
        <p>自分のペースでチンイツ・牌理を練習するためのツールです。</p>
        <p>無料でご使用いただけます。</p>

        <h3 class="mb-3 mt-7 text-xl font-extrabold">特徴</h3>
        <h4 class="mb-2 mt-4 text-lg font-bold">ふたつのモード</h4>
        <ul class="mx-5 list-outside list-disc space-y-2">
          <li><span class="font-semibold">何待ち</span>: 待ち牌を当てます。</li>
          <li>
            <span class="font-semibold">何切る</span>:
            1枚ツモった状態から、最も有効牌の多い打牌を当てます。
          </li>
        </ul>

        <h4 class="mb-2 mt-4 text-lg font-bold">時間制限なし</h4>
        <p>あせらされず、わかるまで考えることができます。</p>

        <h4 class="mb-2 mt-4 text-lg font-bold">解説付き</h4>
        <p>問題の回答後に解説を見ることができます。</p>

        <ul class="mx-5 mt-2 list-outside list-disc space-y-2">
          <li>
            「何待ち」では、その手牌のブロック分けの全パターンと、パターンごとの待ちを一覧できます。
          </li>
          <li>
            「何切る」では、各打牌ごとの待ちの種類と、その残り枚数（いわゆる「何種何枚」）を一覧できます。
          </li>
        </ul>

        <h4 class="mb-2 mt-4 text-lg font-bold">自分にあったカスタマイズ</h4>
        <ul class="mx-5 list-outside list-disc space-y-2">
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

        <h3 class="mb-3 mt-7 text-xl font-extrabold">動画・配信での使用</h3>
        <p>
          ご自由に使ってください。許可は不要ですので、許可を得る目的での連絡はしないでください。
        </p>
        <p>リンクを貼っていただけると喜びます。</p>

        <h3 class="mb-3 mt-7 text-xl font-extrabold">牌の画像</h3>
        <a
          href="https://mj-king.net/sozai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          麻雀王国
        </a>

        <h3 class="mb-3 mt-7 text-xl font-extrabold">作った人</h3>
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

        <h3 class="mb-3 mt-7 text-xl font-extrabold">更新履歴</h3>
        <h4 class="mb-2 mt-4 font-semibold">2024/01/24</h4>
        <ul class="mx-5 list-outside list-disc space-y-1">
          <li>不具合修正: 4枚使いの手牌の判定が誤っていた問題を修正</li>
        </ul>
         <h4 class="mb-2 mt-4 font-semibold">2024/01/23</h4>
        <ul class="mx-5 list-outside list-disc space-y-1">
          <li>改善: ノーテン問題の生成速度を改善</li>
          <li>改善: 設定の一部を変更</li>
          <li>不具合修正: 範囲「3-7」に8の牌が入ってくる不具合を修正</li>
        </ul>
        <h4 class="mb-2 mt-4 font-semibold">2024/01/20</h4>
        <ul class="mx-5 list-outside list-disc space-y-1">
          <li>公開</li>
        </ul>
      </ScrollPanel>
    </template>
  </Card>
</template>
