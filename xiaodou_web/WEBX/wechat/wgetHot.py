import requests       #导入请求库
import re             #正则表达式的函数库
import json           #json库
from requests.exceptions import RequestException  #requests的异常处理
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8')

def get_one_page(url):                      #采用get请求获取页面信息
    try:
        respond = requests.get(url)
        if respond.status_code == 200:
            return respond.text
        return None
    except RequestException:
        return None
def parse_one_page(html):                   #解析获取得页面信息               
    pattern = re.compile('<tr.*?<a.*?href="(.*?)".*?_blank">(.*?)</a>',re.S)
    results = re.findall(pattern,html)
    for i in range(10):
        item = results[i][1].split(" ")
        print(item[0]+"\n")
        

def main():                              #主函数
    url = 'https://s.weibo.com/top/summary?cate=topicband&sudaref=www.baidu.com&display=0&retcode=6102'
    html = get_one_page(url)
    parse_one_page(html)
   

if __name__=='__main__':
    main()

