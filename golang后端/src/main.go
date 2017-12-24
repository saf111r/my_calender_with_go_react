/* 作者:木秋
 * 2017年11月30日正式开始项目的搭建,
 * 采用golang作为后端语言负责提供数据的resful API接口,react做前端交互及路由,用浏览器端渲染的方式
 */
package main

import (
	"github.com/gorilla/mux"
	"gopkg.in/mgo.v2"
	// "gopkg.in/mgo.v2/bson"
	// "io/ioutil"
	"log"
	"net/http"
	// "strconv"
	// "time"
	// "strings"
)

func main() {
	session, err := mgo.Dial("127.0.0.1:27017")
	if err != nil {
		panic(err)
	}
	defer session.Close()
	// Strong	Monotonic	Eventual 三种模式 SetMode函数用来变换session的一致性模式
	session.SetMode(mgo.Monotonic, true)
	// restful api 新路由,把所有路由交给router处理
	router := mux.NewRouter()

	router.HandleFunc("/api/events/{viewType}/{year}/{month}", getEvents(session)).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/events/{viewType}/{year}/{month}/{day}", getEvents(session)).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/events", postEvents(session)).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/events/{id}", putEvents(session)).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/events/{id}", deleteEvents(session)).Methods("DELETE", "OPTIONS")

	errs := http.ListenAndServe(":8080", router)
	if errs != nil {
		log.Fatal("开启服务出错:", errs)
	}
}
