package models

// import (
//     "github.com/path/to/timestamp"
// )

type Posts struct{
	ID int `json:"id"`
	Channel_id string `json:"channel_id"`
	User_id string `json:"user_id"`
	Text string `json:"text"`
	Image string `json:"image"`
	To_reply string `json:"to_reply"`
	Created_at string `json:"created_at"`
	Updated_at string `json:"updated_at"`
}

type Users struct{
	ID int `json:"id"`
	Name string `json:"name"`
	User_id string `json:"user_id"`
	Email string `json:"email"`
	Pass string `json:"pass"`
	Avator_image string `json:"avator_image"`
	Created_at string `json:"created_at"`
	Updated_at string `json:"updated_at"`
}

type Channels struct{
	ID int `json:"id"`
	Name string `json:"name"`
	Space_id string `json:"space_id"`
	Created_at string `json:"created_at"`
	Updated_at string `json:"updated_at"`
}