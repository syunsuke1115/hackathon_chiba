package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"uttc-hackathon/driver"
	"uttc-hackathon/models"

	"github.com/gorilla/mux"
	"github.com/subosito/gotenv"
)

var posts []models.Posts
var users []models.Users
var channels []models.Channels
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
	router.HandleFunc("/channels/space/{space_id}", getChannels).Methods("GET")
	router.HandleFunc("/channels", addChannel).Methods("POST")
	router.HandleFunc("/channelUsers", addChannelUsers).Methods("POST")

	fmt.Println("server run")
	log.Fatal(http.ListenAndServe(":8000",router))
}

func getPosts(w http.ResponseWriter,r *http.Request){
	var post models.Posts
	params :=mux.Vars(r)
	posts = []models.Posts{}

	rows, err := db.Query("select * from posts where channel_id=$1 and to_reply =0",params["channel_id"])
	logFatal(err)

	defer rows.Close()

	for rows.Next(){
		err := rows.Scan(&post.ID,&post.Channel_id,&post.User_id,&post.Text,&post.Image,&post.To_reply,&post.Created_at,&post.Updated_at)
		logFatal(err)

		posts =append(posts, post)
	}
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	//プリフライトリクエストへの応答
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
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
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	//プリフライトリクエストへの応答
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
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

	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	//プリフライトリクエストへの応答
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
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
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	//プリフライトリクエストへの応答
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	json.NewEncoder(w).Encode(rowsUpdated)
}

func deletePost(w http.ResponseWriter,r *http.Request){
	params :=mux.Vars(r)
	result,err := db.Exec("delete from posts where id = $1",params["id"])
	logFatal(err)

	rowsDeleted,err:= result.RowsAffected()
	logFatal(err)
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	//プリフライトリクエストへの応答
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	json.NewEncoder(w).Encode(rowsDeleted)
}

func getReply(w http.ResponseWriter,r *http.Request){
	var post models.Posts

	params :=mux.Vars(r)
	posts = []models.Posts{}

	rows, err := db.Query("select * from posts where to_reply=$1",params["id"])
	logFatal(err)

	defer rows.Close()

	for rows.Next(){
		err := rows.Scan(&post.ID,&post.Channel_id,&post.User_id,&post.Text,&post.Image,&post.To_reply,&post.Created_at,&post.Updated_at)
		logFatal(err)

		posts =append(posts, post)
	}
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	//プリフライトリクエストへの応答
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
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
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	//プリフライトリクエストへの応答
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
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
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	//プリフライトリクエストへの応答
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	json.NewEncoder(w).Encode(userID)
}

func getChannels(w http.ResponseWriter,r *http.Request){
	var channel models.Channels
	channels = []models.Channels{}
	params :=mux.Vars(r)

	rows, err := db.Query("select * from channels where space_id=$1",params["space_id"])

	logFatal(err)

	defer rows.Close()

	for rows.Next(){
		err := rows.Scan(&channel.ID,&channel.Name,&channel.Space_id,&channel.Created_at,&channel.Updated_at)
		logFatal(err)

		channels =append(channels, channel)
	}
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	//プリフライトリクエストへの応答
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	json.NewEncoder(w).Encode(channels)
}

func addChannel(w http.ResponseWriter,r *http.Request){
	var channel models.Channels
	var channelID int
	
	json.NewDecoder(r.Body).Decode(&channel)
	// idは自動で追加
	err :=db.QueryRow("insert into channels (name,space_id,created_at,updated_at) values($1,$2,transaction_timestamp(),transaction_timestamp()) RETURNING id;",
	&channel.Name,&channel.Space_id).Scan(&channelID)
	logFatal(err)

	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	//プリフライトリクエストへの応答
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
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
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	//プリフライトリクエストへの応答
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	json.NewEncoder(w).Encode(channelUsersID)
}