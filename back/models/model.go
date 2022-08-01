package models

type Posts struct{
	ID int `json:"id"`
	Channel_id string `json:"channel_id"`
	User_id string `json:"user_id"`
	Text string `json:"text"`
	Image string `json:"image"`
	To_reply string `json:"to_reply"`
	User_name string `json:"user_name"`
	Created_at string `json:"created_at"`
	Updated_at string `json:"updated_at"`
}

type Users struct{
	ID int `json:"id"`
	Name string `json:"name"`
	Email string `json:"email"`
	Pass string `json:"pass"`
	Avator_image string `json:"avator_image"`
	Created_at string `json:"created_at"`
	Updated_at string `json:"updated_at"`
}

type Channels struct{
	ID int `json:"id"`
	Name string `json:"name"`
	Space_id int `json:"space_id"`
	Created_at string `json:"created_at"`
	Updated_at string `json:"updated_at"`
}


type ChannelUsers struct{
	ID int `json:"id"`
	User_id int `json:"user_id"`
	Channel_id int `json:"channel_id"`
	Created_at string `json:"created_at"`
	Updated_at string `json:"updated_at"`
}