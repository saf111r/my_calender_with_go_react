package main

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"io/ioutil"
	"net/http"
	"strconv"
)

var host = "http://localhost:3000"
var db_host = "127.0.0.1:27017"

// 处理CORS 跨域请求,非简单请求之前都会发一个options 类型的请求来探测 服务器是否支持该 跨域请求服务,需要返回一些特定的
// http头给客服端
func optionsHandle(w http.ResponseWriter, r *http.Request) {
	// 允许跨域的域名
	w.Header().Set("Access-Control-Allow-Origin", host)
	// 允许的请求类型
	w.Header().Set("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS,PUT")
	// 允许的头
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type,Origin, X-Requested-With")
	// 允许验证(cookie)等
	w.Header().Add("Access-Control-Allow-Credentials", "true")
	// 返回成功200
	w.WriteHeader(http.StatusOK)
}

// 查询内容
func getEvents(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "OPTIONS" {
			optionsHandle(w, r)
			return
		}
		// 采用连接copy的方式
		session := s.Copy()
		defer session.Close()
		// 选着数据库,集合
		collection := session.DB("calender").C("muqiu")

		//获取url参数
		vars := mux.Vars(r)
		// 参数转化为数字型
		year, _ := strconv.Atoi(vars["year"])
		month, _ := strconv.Atoi(vars["month"])
		day, _ := strconv.Atoi(vars["day"])
		// 接收查询数据的接口
		all := Events{}

		if vars["viewType"] == "dayView" {
			collection.Find(bson.M{"begin.year": year, "begin.month": month, "begin.day": day}).All(&all.All)
		} else if vars["viewType"] == "monthView" {
			collection.Find(bson.M{"begin.year": year, "begin.month": month}).All(&all.All)
		} else {
			w.WriteHeader(http.StatusOK)
			return
		}
		allEventJson, _ := json.Marshal(all)

		w.Header().Set("Access-Control-Allow-Origin", host)
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		w.WriteHeader(http.StatusOK)
		w.Write(allEventJson)

	}

}

// 增加内容
func postEvents(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {

		if r.Method == "OPTIONS" {
			optionsHandle(w, r)
			return
		}

		session := s.Copy()
		defer session.Close()
		collection := session.DB("calender").C("muqiu")

		var event map[string]interface{}
		defer r.Body.Close()
		// 获取post的数据
		body, _ := ioutil.ReadAll(r.Body)
		// 进行json数据解析
		json.Unmarshal(body, &event)
		err := collection.Insert(&event)
		if err != nil {
			panic(err)
		}
		// 201 StatusCreated
		w.Header().Set("Access-Control-Allow-Origin", host)
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		w.WriteHeader(http.StatusCreated)

	}

}

// 修改内容
func putEvents(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "OPTIONS" {
			optionsHandle(w, r)
			return
		}
		session := s.Copy()
		defer session.Close()
		collection := session.DB("calender").C("muqiu")

		defer r.Body.Close()
		body, _ := ioutil.ReadAll(r.Body)

		var event map[string]interface{}
		json.Unmarshal(body, &event)

		vars := mux.Vars(r)
		ObjectId := bson.ObjectIdHex(vars["id"])
		err := collection.Update(bson.M{"_id": (ObjectId)}, bson.M{"$set": &event})
		if err != nil {
			panic(err)
			w.WriteHeader(http.StatusInternalServerError)
		}
		// StatusNoContent 204
		w.Header().Set("Access-Control-Allow-Origin", host)
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		w.WriteHeader(http.StatusNoContent)
	}

}

// 删除内容
func deleteEvents(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "OPTIONS" {
			optionsHandle(w, r)
			return
		}
		session := s.Copy()
		defer session.Close()
		collection := session.DB("calender").C("muqiu")

		vars := mux.Vars(r)
		ObjectId := bson.ObjectIdHex(vars["id"])
		err := collection.Remove(bson.M{"_id": ObjectId})
		if err != nil {
			panic(err)
			// 500 StatusInternalServerError
			w.WriteHeader(http.StatusInternalServerError)
		}
		w.Header().Set("Access-Control-Allow-Origin", host)
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		w.WriteHeader(http.StatusNoContent)
	}

}
