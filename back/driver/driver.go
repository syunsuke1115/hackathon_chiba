package driver

import (
	"database/sql"
	"log"
	"os"
	"github.com/lib/pq"
)

var db *sql.DB

func logFatal(err error){
	if err !=nil{
		log.Fatal(err)
	}
}

func ConnectDB() *sql.DB{
	pqUrl,err :=pq.ParseURL(os.Getenv("ELEPHANTSQL_URL"))
	logFatal(err)
	
	db, err = sql.Open("postgres",pqUrl)
	logFatal(err)
	
	err = db.Ping()
	logFatal(err)

	return db
}
