# LT構成
## LTの内容
自分の来歴ざっくり
ShadowDOMとAMPの組み合わせについて
mdで書いてからアップロードするまでのフロー
その他の自分のプロダクト


## 全体像
ブログに書いてあること言えば良い
https://ryota-mizumaki.com/products/Blazing-Fast-Blog/about_blog

## 状態管理
Re-ducks (not typo)

https://github.com/Mizumaki/re-ducks_example
https://qiita.com/Statham/items/13a07cf43a5151c8f0c2

## CSS
css in js (emotion)
もしCSS in JSしたいなら、一番おすすめ
今スクラッチから作るなら、CSS modulesを選ぶけどね。

## 記事ページ
src/components/AMPDocument.tsx
ShadowDOMの概念の説明、普及率など

https://ryota-mizumaki.com/products/Blazing-Fast-Blog/introduce-AMP-in-PWA-approach-in-blog-articles

## バックエンド
Firebase Cloud Functions

## 記事を書くフロー
https://ryota-mizumaki.com/products/Blazing-Fast-Blog/write-articles-by-markdown

ローカルでmdで書く
Firebase Cloud Functionsが食う
Cloud Storageに吐く

なんでtsじゃないの？
=> もともとjsで書いてあったプロダクトで、12月にtsに移管したのだけど、functionまで移管する前に力尽きた。

今はかなりts大好きマンなので、おそらくこれから開発するプロダクトは全部tsにすると思う。

## これから〜リファクタ
ちょっとアウトプットのフローは、きちんと見直したいと思っている
そのために、ブログの改造に着手するという愚かさは見ないことに
  デザインの改修（今の奴は、ヘッダー作ったとこで飽きたorz。
    コメント欄を作りたい（記事の内容は往往にしてミスがあるため、それを指摘できる場が必要
  ページを増築する（イカした自己紹介ページ、自分のプロダクト一覧ページなど
  現状そんなに早くない（AMPとか使ったのに、全然。なんとかする。
  Cloud Functionsの代替案を考える
    個人開発者の味方ではある。
    Cloud Functionの動きに速度が縛られる && デバッグとかが大変（一応ローカルで動くものもなくはないが、イマイチ）
      書くのに癖がいる（バックエンドいらないを標語にしているmBaasであるからしょうがないが、正直コスト高いしすぐ忘れる。それなら、ブログなんだしVPSでやったりしてもいいかも
    サーバー書くのも結構好き（特にGo書きたい、けどJavaもありかも。Java書けてから他に移るのもありな気がしてるし、LINEで使ってるし。Rubyは今更感（昔書いたけど、書きやすかった覚えはある。
  記事を書く（これ大事