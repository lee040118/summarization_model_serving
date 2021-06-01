from selenium import webdriver
from bs4 import BeautifulSoup
import os
import re


BASE_DIR = '/tmp/project'
web = os.path.join(BASE_DIR, 'chromedriver')


def replace_all(text, dic):
    for j in dic.values():
        text = re.sub(j, '', text)
    return text


def preprocessing_div_contents(x):
    find_re = {"find_tag" : r"<[a-zA-z0-9]+",
    "find_reporter" : r"[가-힣]{2,4} ([가-힣])*기자",
    "find_email" : r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+',
    "find_things" : r'\[.+?\]',
    "find_useless_bracket" : r"\( *\)",
     "find_spaces" : r"  +"}

    main_contents = ' '.join(str(x).split('\n')[8:-2])

    inner_tags = list(map(lambda x: x[1:], re.findall(find_re['find_tag'],
                                                      str(main_contents))))

    for tag in inner_tags:
        try:
            eval(f"x.{tag}.decompose()")
        except:
            pass

    final_contents = str(x).split('\n')[-3]
    result = replace_all(final_contents, find_re)
    result = '다.'.join(result.split('다.')[:-1]) + '다.'

    return result.strip()


def crawling(url):

    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('window-size=1920x1080')
    options.add_argument("--disable-gpu")
    driver = webdriver.Chrome(web, options=options)
    driver.get(url)
    req = driver.page_source
    soup = BeautifulSoup(req, 'html.parser')
    pre_contents = soup.select("#articleBodyContents")[0]
    pre_contents = preprocessing_div_contents(pre_contents)

    driver.Quit()

    return pre_contents
