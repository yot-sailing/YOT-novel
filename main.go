package main

// import (
// 	"fmt"
// 	"net/http"
// )

// func handler(writer http.ResponseWriter, request *http.Request) {
// 	fmt.Fprintf(writer, "Hello World, %s!", request.URL.Path[1:])
// }

// func main() {
// 	http.HandleFunc("/", handler)
// 	http.ListenAndServe(":8080", nil)
// }

import (
	"context"
	"log"
	"net/http"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"
)

func main() {
	//ディレクトリを指定する
	fs := http.FileServer(http.Dir("public/react-routers/src"))
	//ルーティング設定。"/"というアクセスがきたらstaticディレクトリのコンテンツを表示させる
	http.Handle("/", fs)

	log.Println("Listening...")
	// 8080ポートでサーバーを立ち上げる
	http.ListenAndServe(":8080", nil)

	/*
		mux := http.NewServeMux() // デフォルトのマルチプレクサ生成
		// ディレクトリを指定する
		files := http.FileServer(http.Dir("/public"))
		// 静的なファイルの返送
		mux.Handle("/static/", http.StripPrefix("/static/", files))

		//ルーティング設定。"/"というアクセスがきたらstaticディレクトリのコンテンツを表示させる
		mux.HandleFunc("/", files)
		// mux.HandleFunc("/err", err)

		// mux.HandleFunc("/login", login)

		// mux.HandleFunc("/thread/new", newThread)

		log.Println("Listening...")
		server := &http.Server{
			Addr:    "0.0.0.0:8080",
			Handler: mux,
		}
		server.ListenAndServe()
	*/

	// Use a service account
	ctx := context.Background()
	opt := option.WithCredentialsFile("service_account.json")
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	// Authenticationの方に直接行く
	// client, err := app.Auth(context.Background())
	// if err != nil {
	// 	log.Fatalf("error getting Auth client: %v\n", err)
	// }

	// データ追加
	_, _, err = client.Collection("users").Add(ctx, map[string]interface{}{
		"first": "Ada",
		"last":  "Lovelace",
		"born":  1815,
	})
	if err != nil {
		log.Fatalf("Failed adding alovelace: %v", err)
	}

	defer client.Close()
}

func createUser(ctx context.Context, client *auth.Client) *auth.UserRecord {
	params := (&auth.UserToCreate{}).
		Email("user@example.com").
		EmailVerified(false).
		PhoneNumber("+15555550100").
		Password("secretPassword").
		DisplayName("John Doe").
		PhotoURL("http://www.example.com/12345678/photo.png").
		Disabled(false)
	u, err := client.CreateUser(ctx, params)
	if err != nil {
		log.Fatalf("error creating user: %v\n", err)
	}
	log.Printf("Successfully created user: %#v\n", u.UserInfo)

	return u
}
