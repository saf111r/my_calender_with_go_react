package main

import (
	"gopkg.in/mgo.v2/bson"
)

// 定义事件的时间存放格式, 同时导出为小写字母开头
type Date struct {
	Year  int `json:"year"`
	Month int `json:"month"`
	Day   int `json:"day"`
	Hours int `json:"hours"`
}

// 定义事件的存储格式
type Event struct {
	Id    bson.ObjectId `json:"id" bson:"_id"`
	Event string        `json:"event"`
	Begin Date          `json:"begin"`
	End   Date          `json:"end"`
}

// 定义查询出的多个事件的集合
type Events struct {
	All []Event `json:"all"`
}
