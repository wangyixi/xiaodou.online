# -*- coding: utf-8 -*-
#需求：查询地区天气
#分析：第一步，抓取上面所有的天气信息

from html.parser import HTMLParser
from urllib import request
import pickle
import json
import sys
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8')
#解析中国天气网HTML
class WeatherHtmlParser(HTMLParser):
    def __init__(self):
        self.flag = False
        self.weather_data = None
        super(WeatherHtmlParser,self).__init__()
    
    def handle_starttag(self,tag,attr):
        if tag == "script":
            self.flag = True

    def handle_endtag(self,tag):
        if tag == "script":
            self.flag = False

    def handle_data(self,data):
        if self.flag:
            if "var hour3data=" in data:
                data = data.strip("\n")
                data = data.strip("var hour3data=")
                self.weather_data = json.loads(data)
                
def printWeatherInfo(func):
    def call():
        info = func()
        if info == None:
            return None
        #一天之内的天气
        one_day = info["1d"]
        for item in one_day: 
           # print(item);
            item = item.split(",")
            print("%s:%s,%s,%s,%s\n" % (item[0],item[2],item[3],item[4],item[5]))
    return call

#抓取天气信息
@printWeatherInfo
def getAllWeather():
    city = sys.argv[1];
    if city == None:
        return None
    url_address = "http://www.weather.com.cn/weather1d/%s.shtml" % city
    req = request.Request(url_address)
    req.add_header("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36")
    with request.urlopen(req) as html:
        data = html.read().decode("utf-8")
        html_parser = WeatherHtmlParser()
        html_parser.feed(data)
        html_parser.close()
        return html_parser.weather_data
        
getAllWeather()

