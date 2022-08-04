package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"net/http"
	"uttc-hackathon/driver"
	"uttc-hackathon/models"

	"github.com/rs/cors"

	"github.com/gorilla/mux"
	"github.com/subosito/gotenv"
)

var posts []models.Posts
var users []models.Users
var mychannels []models.Channels
var notmychannels []models.Channels
var db *sql.DB

func init(){
	gotenv.Load()
}

func logFatal(err error){
	if err !=nil{
		log.Fatal(err)
	}
}

func main() {
	db = driver.ConnectDB()
	router := mux.NewRouter()

	// posts
	router.HandleFunc("/posts/channel/{channel_id}", getPosts).Methods("GET")
	router.HandleFunc("/posts/{id}", getPost).Methods("GET")
	router.HandleFunc("/posts", addPost).Methods("POST")
	router.HandleFunc("/posts", updatePost).Methods("PUT")
	router.HandleFunc("/posts/{id}", deletePost).Methods("DELETE")
	router.HandleFunc("/posts/reply/{id}", getReply).Methods("GET")

	// users
	router.HandleFunc("/users", getUsers).Methods("GET")
	router.HandleFunc("/users", addUser).Methods("POST")

	// channels
	router.HandleFunc("/channels", addChannel).Methods("POST")
	router.HandleFunc("/channelUsers", addChannelUsers).Methods("POST")
	router.HandleFunc("/mychannel/space/{space_id}/user_id/{user_id}", getMyChannels).Methods("GET")
	router.HandleFunc("/notmychannel/space/{space_id}/user_id/{user_id}", getNotMyChannels).Methods("GET")

	// エラー回避
	c := cors.New(cors.Options{
        AllowedOrigins:[]string{"https://hackathon-chiba.vercel.app","http://localhost:3000"},
		AllowedMethods:[]string{http.MethodHead,
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodDelete},
        AllowCredentials: true,
    })
    handler := c.Handler(router)

	fmt.Println("server run")
	port := os.Getenv("PORT")
	if port == "" {
			port = "8080"
	}
	log.Fatal(http.ListenAndServe(":"+port,handler))
}

func getPosts(w http.ResponseWriter,r *http.Request){
	var post models.Posts
	params :=mux.Vars(r)
	posts = []models.Posts{}

	rows, err := db.Query("select posts.id,channel_id,user_id,text,image,to_reply,users.name as user_name,posts.created_at,posts.updated_at from posts join users on (posts.user_id = users.id) where channel_id=$1 and to_reply =0 ORDER BY posts.created_at",params["channel_id"])
	logFatal(err)

	defer rows.Close()

	for rows.Next(){
		err := rows.Scan(&post.ID,&post.Channel_id,&post.User_id,&post.Text,&post.Image,&post.To_reply,&post.User_name,&post.Created_at,&post.Updated_at)
		logFatal(err)

		posts =append(posts, post)
	}
	json.NewEncoder(w).Encode(posts)
}


func getPost(w http.ResponseWriter,r *http.Request){
	var post models.Posts
	params :=mux.Vars(r)

	rows := db.QueryRow("select * from posts where id=$1",params["id"])
	err := rows.Scan(&post.ID,&post.Channel_id,&post.User_id,&post.Text,&post.Image,&post.To_reply,&post.Created_at,&post.Updated_at)
	if err != nil {
		if err == sql.ErrNoRows {
			logFatal(err)
			return
		} else {
			logFatal(err)
			return
		}
	}
	json.NewEncoder(w).Encode(post)
}

func addPost(w http.ResponseWriter,r *http.Request){
	var post models.Posts
	var postID int
	
	json.NewDecoder(r.Body).Decode(&post)
	// idは自動で追加
	err :=db.QueryRow("insert into posts (channel_id,user_id,text,image,to_reply,created_at,updated_at) values($1,$2,$3,$4,$5,transaction_timestamp(),transaction_timestamp()) RETURNING id;",
	&post.Channel_id,&post.User_id,&post.Text,&post.Image,&post.To_reply).Scan(&postID)
	logFatal(err)

	json.NewEncoder(w).Encode(postID)
}

func updatePost(w http.ResponseWriter,r *http.Request){
	var post models.Posts
	json.NewDecoder(r.Body).Decode(&post)

	result,err := db.Exec("update posts set channel_id=$1,user_id=$2,text=$3,image=$4,to_reply=$5,updated_at=transaction_timestamp() where id=$6 RETURNING id;",
	&post.Channel_id,&post.User_id,&post.Text,&post.Image,&post.To_reply,&post.ID)
	logFatal(err)

	rowsUpdated,err:= result.RowsAffected()
	logFatal(err)
	json.NewEncoder(w).Encode(rowsUpdated)
}

func deletePost(w http.ResponseWriter,r *http.Request){

	//プリフライトリクエストへの応答
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	params :=mux.Vars(r)
	result,err := db.Exec("delete from posts where id = $1",params["id"])
	logFatal(err)

	rowsDeleted,err:= result.RowsAffected()
	logFatal(err)

	json.NewEncoder(w).Encode(rowsDeleted)
}

func getReply(w http.ResponseWriter,r *http.Request){
	var post models.Posts

	params :=mux.Vars(r)
	posts = []models.Posts{}

	rows, err := db.Query("select posts.id,channel_id,user_id,text,image,to_reply,users.name as user_name,posts.created_at,posts.updated_at from posts join users on (posts.user_id = users.id) where to_reply=$1 ORDER BY posts.created_at",params["id"])
	logFatal(err)

	defer rows.Close()

	for rows.Next(){
		err := rows.Scan(&post.ID,&post.Channel_id,&post.User_id,&post.Text,&post.Image,&post.To_reply,&post.User_name,&post.Created_at,&post.Updated_at)
		logFatal(err)

		posts =append(posts, post)
	}

	json.NewEncoder(w).Encode(posts)
}

func getUsers(w http.ResponseWriter,r *http.Request){
	var user models.Users
	users = []models.Users{}

	rows, err := db.Query("select * from users")
	logFatal(err)

	defer rows.Close()

	for rows.Next(){
		err := rows.Scan(&user.ID,&user.Name,&user.Email,&user.Pass,&user.Avator_image,&user.Created_at,&user.Updated_at)
		logFatal(err)

		users =append(users, user)
	}

	json.NewEncoder(w).Encode(users)
}

func addUser(w http.ResponseWriter,r *http.Request){
	var user models.Users
	var userID int
	users = []models.Users{}

	json.NewDecoder(r.Body).Decode(&user)

	err :=db.QueryRow("insert into users (name,email,pass,avator_image,created_at,updated_at) values($1,$2,$3,$4,transaction_timestamp(),transaction_timestamp()) RETURNING id;",
	&user.Name,&user.Email,&user.Pass,&user.Avator_image).Scan(&userID)
	logFatal(err)

	json.NewEncoder(w).Encode(userID)
}

func addChannel(w http.ResponseWriter,r *http.Request){
	var channel models.Channels
	var channelID int
	
	json.NewDecoder(r.Body).Decode(&channel)
	// idは自動で追加
	err :=db.QueryRow("insert into channels (name,space_id,created_at,updated_at) values($1,$2,transaction_timestamp(),transaction_timestamp()) RETURNING id;",
	&channel.Name,&channel.Space_id).Scan(&channelID)
	logFatal(err)

	json.NewEncoder(w).Encode(channelID)
}

func addChannelUsers(w http.ResponseWriter,r *http.Request){
	var channelUsers models.ChannelUsers
	var channelUsersID int

	json.NewDecoder(r.Body).Decode(&channelUsers)
	// idは自動で追加
	err :=db.QueryRow("insert into channel_users (user_id,channel_id,created_at,updated_at) values($1,$2,transaction_timestamp(),transaction_timestamp()) RETURNING id;",
	&channelUsers.User_id,&channelUsers.Channel_id).Scan(&channelUsersID)
	logFatal(err)

	json.NewEncoder(w).Encode(channelUsersID)
}

func getMyChannels(w http.ResponseWriter,r *http.Request){
	// 入っているチャンネルのみ取得
	var channel models.Channels
	mychannels = []models.Channels{}
	params :=mux.Vars(r)

	rows, err := db.Query("select distinct(channels.id),name,channels.space_id,channels.created_at,channels.updated_at from channels join channel_users on(channels.id = channel_users.channel_id) where space_id=$1 and user_id=$2;",params["space_id"],params["user_id"])

	logFatal(err)

	defer rows.Close()

	for rows.Next(){
		err := rows.Scan(&channel.ID,&channel.Name,&channel.Space_id,&channel.Created_at,&channel.Updated_at)
		logFatal(err)

		mychannels =append(mychannels, channel)
	}

	json.NewEncoder(w).Encode(mychannels)
}

func getNotMyChannels(w http.ResponseWriter,r *http.Request){
	// 入っていないチャンネルのみ取得
	var channel models.Channels
	notmychannels = []models.Channels{}
	params :=mux.Vars(r)

	rows, err := db.Query("select distinct(channels.id),name,channels.space_id,channels.created_at,channels.updated_at from channels join channel_users on(channels.id = channel_users.channel_id) where space_id=$1 and channels.id not in (select channels.id from channels join channel_users on(channels.id = channel_users.channel_id) where space_id=1 and channel_users.user_id =$2);",params["space_id"],params["user_id"])

	logFatal(err)

	defer rows.Close()

	for rows.Next(){
		err := rows.Scan(&channel.ID,&channel.Name,&channel.Space_id,&channel.Created_at,&channel.Updated_at)
		logFatal(err)

		notmychannels =append(notmychannels, channel)
	}

	json.NewEncoder(w).Encode(notmychannels)
}