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

	router.HandleFunc("/posts", getPosts).Methods("GET")
	router.HandleFunc("/posts/{id}", getPost).Methods("GET")
	router.HandleFunc("/posts", addPost).Methods("POST")
	router.HandleFunc("/posts", updatePost).Methods("PUT")
	router.HandleFunc("/posts/{id}", removePost).Methods("DELETE")
	fmt.Println("server run")
	log.Fatal(http.ListenAndServe(":8000",router))
}

func getPosts(w http.ResponseWriter,r *http.Request){
	var post models.Posts
	posts = []models.Posts{}

	rows, err := db.Query("select * from posts")
	logFatal(err)

	defer rows.Close()

	for rows.Next(){
		err := rows.Scan(&post.ID,&post.Channel_id,&post.User_id,&post.Text,&post.Image,&post.To_reply,&post.Created_at,&post.Updated_at)
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

func removePost(w http.ResponseWriter,r *http.Request){
	params :=mux.Vars(r)
	result,err := db.Exec("delete from posts where id = $1",params["id"])
	logFatal(err)

	rowsDeleted,err:= result.RowsAffected()
	logFatal(err)
	json.NewEncoder(w).Encode(rowsDeleted)
}