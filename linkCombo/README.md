## linkCombo.js

#### 1、介绍


将html中的css和js引用combo成一个或几个引用。

例子：

未combo的JavaScript链接：

	<script type="text/javascript" src="js/widget/gallery.js"></script>
    <script type="text/javascript" src="widgets/widget_marquee.js"></script>
    <script type="text/javascript" src="widgets/blitz/blitz.js"></script>
    <script type="text/javascript" src="widgets/blitz/system/base.js"></script>
    <script type="text/javascript" src="widgets/blitz/system/http.js"></script>
    <script type="text/javascript" src="js/bridge.js"></script>
    <script type="text/javascript" src="js/clickHandler.js"></script>
    <script type="text/javascript" src="js/corner_mark.js"></script>
    <script type="text/javascript" src="js/topic.js"></script>

combo后的JavaScript链接：

	<script type="text/javascript" src="http://g-assets.daily.taobao.net/??yuntv/yingshi/1.0.0/js/bridge.js,yuntv/
	yingshi/1.0.0/js//clickHandler.js,yuntv/yingshi/1.0.0/js//corner_mark.js,yuntv/yingshi/1.0.0/js//
	topic.js,yuntv/yingshi/1.0.0/js//widget_marquee.js,yuntv/yingshi/1.0.0/js//blitz.js,yuntv/yingshi/1.0.0/js//
	base.js,yuntv/yingshi/1.0.0/js//http.js,yuntv/yingshi/1.0.0/js//gallery.js"></script>
	

#### 2、用法

* 首先在命令行输入： `node combo.js D:\\study\\WebFrontEnd\\nodejs`
* 然后在命令行输入： `js/ widgets/ widgets/blitz/ widgets/blitz/system/ js/widget/,http://g-assets.daily.taobao.net/??yuntv/yingshi/1.0.0/js/ ? ? ? ?`

	上面输入的分别是js引用的原路径（用空格隔开）+','+js引用的新的对应路径（用空格隔开）。
	'？'表示对应的新路径为与上一个不是'？'的路径相同。

	