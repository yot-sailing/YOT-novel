# メモ

## 使用技術

Golang, React.js, Firebase

## 要件定義

### どのようなサービスを提供するのかを決める。

[小説家になろう](https://syosetu.com)的なやつ  
[なろうデベロッパー](https://dev.syosetu.com/man/man/)

### ユーザーが最終的にどのようなアクションをすればいいのかを決める。（商品やサービスの購入、広告のクリック、資料請求など）

- 小説を投稿する
- 小説を検索できるようにする
- 小説を読む
- 小説をブックマークする
- フォローできるようにする
- お題箱？を設置する
- お題箱になんかいれる
- 評価する(数値)
- レビューする(コメント)
- (ランキングを閲覧できるようにする)

追加で実装？  
ランキング、閲覧履歴

### どのようなページが必要なのかを決める。 それぞれのページをどのように移動させるのかを決める。

サイトマップ作った

### 管理画面は用意するのかを決める。どのような権限を用意し、それぞれにどこまで管理させるのかを決める。

admin  
神のアカウントを作る  
そのアカウントでログインしたら管理画面にいく的な  
アカウント、レビュー、小説削除とか

### どのようにページや管理画面を移動するのかを決める。

### どのような機能を実装する必要があるのかを決める。

- ログインする
- ログアウトする
- 小説検索(カテゴリ検索、概要とワード一致したやつだけ検索、タイトル検索、作家名検索、タグ検索)
- 小説を投稿する、削除する
- 小説の表示
- 小説をお気に入りに登録する、外す
- 小説を評価する機能
- 小説に対してレビューを投稿する機能
- ユーザーの評価(小説の評価の平均)
- ユーザのフォロー機能、アンフォロー
- ユーザーがテーマリクエストを設置する機能、取り除く機能(userテーブルでいじる)
- ユーザーがテーマリクエストに意見をいれる機能
- ランキング閲覧機能
- 閲覧履歴を何件かだけ見れるようにする

ブロック機能？

## 設計

### データベースのテーブルとデータ型を決める

users  
- user_id INT UNSIGNED, PRIMARY KEY, AUTO INCREMENT
- user_name VARCHAR(255) NOT NULL
- user_image VARCHAR(255)
- email VARCHAR(255) NOT NULL, UNIQUE KEY
- password VARCHAR(255) NOT NULL
- user_rating FLOAT(2,1) UNSIGNED
- asktheme BIT(1) NOT NULL
- created_at DATESTAMP NOT NULL
- deleted_at DATESTAMP
- CONSTRAINT rating_check CHECK(user_rating <= 5.0)

novels  
- novel_id INT UNSIGNED, PRIMARY KEY, AUTO INCREMENT
- novel_title VARCHAR(255) NOT NULL
- writer_id INT UNSIGNED
- category_id INT UNSIGNED
- overview TEXT NOT NULL
- content VARCHAR(255) NOT NULL
- rating_average FLOAT(2,1) UNSIGNED
- created_at DATESTAMP NOT NULL
- updated_at DATESTAMP
- deleted_at DATESTAMP
- FOREIGN KEY (writer_id) REFERENCES users(user_id) ON DELETE CASCADE
- FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
- CONSTRAINT rating_check CHECK(rating_average <= 5.0)

novel_tags  
- novel_id INT UNSIGNED, PRIMARY KEY
- novel_tag_id INT UNSIGNED
- tag_id INT UNSIGNED
- PRIMARY KEY (novel_id, novel_tag_id)
- FOREIGN KEY (novel_id) REFERENCES novels(novel_id) ON DELETE CASCADE
- FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE

favorites  
- favorite_id INT UNSIGNED, PRIMARY KEY, AUTO INCREMENT
- reader_id INT NOT NULL
- novel_id INT NOT NULL
- FOREIGN KEY (reader_id) REFERENCES users(user_id) ON DELETE CASCADE
- FOREIGN KEY (novel_id) REFERENCES novels(novel_id) ON DELETE CASCADE

reviews  
- review_id INT UNSIGNED, PRIMARY KEY, AUTO INCREMENT
- reader_id INT UNSIGNED NOT NULL
- novel_id INT UNSIGNED NOT NULL
- rating_score FLOAT(2,1) UNSIGNED NOT NULL
- comment TEXT
- FOREIGN KEY (reader_id) REFERENCES users(user_id) ON DELETE CASCADE
- FOREIGN KEY (novel_id) REFERENCES novels(novel_id) ON DELETE CASCADE
- CONSTRAINT rating_check CHECK(rating_score <= 5.0)

follows  
- follow_id INT UNSIGNED, PRIMARY KEY, AUTO INCREMENT
- user_id INT UNSIGNED NOT NULL
- target_user_id INT UNSIGNED NOT NULL
- FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
- FOREIGN KEY (target_user_id) REFERENCES users(user_id) ON DELETE CASCADE

themerequests  
- themerequest_id INT UNSIGNED, PRIMARY KEY, AUTO INCREMENT
- writer_id INT UNSIGNED NOT NULL
- reader_id INT UNSIGNED NOT NULL
- reqest_content TEXT NOT NULL
- FOREIGN KEY (writer_id) REFERENCES users(user_id) ON DELETE CASCADE
- FOREIGN KEY (reader_id) REFERENCES users(user_id) ON DELETE CASCADE

categories(オンメモリ処理)  
- category_id INT UNSIGNED, PRIMARY KEY, AUTO INCREMENT
- category_name VARCHAR(255) NOT NULL, UNIQUE

tags  
- tag_id INT UNSIGNED, PRIMARY KEY, AUTO INCREMENT
- tag_name VARCHAR(255) NOT NULL, UNIQUE

histories(閲覧履歴)  
- history_id INT UNSIGNED, PRIMARY KEY, AUTO INCREMENT
- reader_id INT NOT NULL
- novel_id INT NOT NULL
- read_at DATESTAMP NOT NULL
- FOREIGN KEY (reader_id) REFERENCES users(user_id) ON DELETE CASCADE
- FOREIGN KEY (novel_id) REFERENCES novels(novel_id) ON DELETE CASCADE

### 実現したい機能を盛り込む方法を決める

- ログインする
- ログアウトする  
[Go言語で認証機能を作ろう!](https://qiita.com/__init__/items/21b2604db54867f8c543)
- 小説検索(カテゴリ検索、概要とワード一致したやつだけ検索、タイトル検索、作家名検索、タグ検索)
novelsとcategories絡めて検索  
novelsのoverviewで検索  
novelsのnovel_titleで検索  
usersとnovelsのwriter_idで検索  
novelsとtags絡めて検索
- 小説を投稿する、削除する
novelsに挿入  
os.create()  
ファイル名はnovel_idにこちらで変更する  
novelsから削除
- 小説の表示
os.openFile()で頑張る  
historiesを更新
- 小説をお気に入りに登録する、外す
favoritesテーブルに挿入、削除
- 小説を評価する機能
reviewsに挿入、削除  
この時にnovelsの評価のところに追加  
novelsのwriter_idからその人が書いた小説の点数を出してきて平均する
- 小説に対してレビューを投稿する機能
reviewsに挿入、削除
- ユーザーの評価(小説の評価の平均)  
usersからみる
- ユーザのフォロー機能、アンフォロー  
followsに挿入、削除
- ユーザーがテーマリクエストを設置する機能、取り除く機能(userテーブルでいじる)  
userテーブルでなんとかする
- ユーザーがテーマリクエストに意見をいれる機能  
themerequestsテーブルでなんとかする
- 小説、作家のランキング閲覧機能  
各々のテーブルで該当の点数見て並び替えて10件表示
- 閲覧履歴を何件かだけ見れるようにする  
そのログインしてるユーザーのidでhistories検索して近い順に5件表示
- タグを追加する機能  
tagsテーブルに挿入