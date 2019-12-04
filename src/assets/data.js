const introduce = `
# 罗威


## 工作经验： 三年

## 项目经历

### 中国银行香港分行系统： 软件开发工程师（cobol，cics，db2）
* 基于ZOS大型机，主要负责模块MTC（结构性存款），CIR（中央利率系统）

### 天威工单系统： 前端开发工程师（react全家桶，ant-design）
* 基于react全家桶，ant-design的后台工单管理系统

### 天威工单系统（手机版）： 前端开发工程师（react全家桶，ant-design-mobile）
* 基于webview，react全家桶，ant-design的移动端工单处理系统

### 车镇物流系统： 前端开发工程师（react全家桶，ant-design-pro）
* 基于react全家桶，ant-design-pro的物流管理系统

### 车镇新版金融平台： 前端开发工程师（react全家桶，ant-design-pro）
* 基于老版金融平台用react全家桶，ant-design-pro的重构

## 教育经历

**江汉大学 - 计算机科学与技术**        本科

## 联系方式

**blog：**  https://luowei95327.github.io/
**github：** https://github.com/luowei95327`;

const styles = [
`/*
* 
* Hello, 我是罗威
*
* 最近看到了别人做了一个动态的简历（http://strml.net/），感觉很有意思，所以我也用 React和Redux 做了一份简易的动态简历
* 希望大家能够喜欢 :)
*/

/* 首先给所有元素加上过渡效果 */
* {
  -webkit-transition: all .3s;
  transition: all .3s;
}
/* 白色背景太单调了，我们来点背景 */
html {
  color: rgb(222,222,222); background: #425261; 
}
/* 文字直接显示在页面上，没有任何装饰，真的太单调了！我们来给文字加点装饰吧~~ */
.styleEdit {
  background-color: #303030;
  padding: .5em;
  margin: 1vh 1vw;
  border: 1px solid;
  overflow: auto;
  width: calc(46vw - 2px); 
  height: calc(95vh - 2px);
}
/* 作为一个程序员，我们不可以太沉闷哦~~，给自己的代码加一点色彩吧 */
.token.comment{ color: #857F6B; font-style: italic; }
.token.selector{ color: #E86E75; }
.token.property{ color: #F78C6C; }
.token.punctuation{ color: #88DCFE; }
.token.function{ color: #82AAFF; }

/* 加一点 3D 效果，更加地酷炫 */
html{
  -webkit-perspective: 1000px;
          perspective: 1000px;
}
.styleEdit {
  position: fixed; left: 0; top: 0; 
  -webkit-transition: none; 
  transition: none;
  -webkit-transform: rotateY(8deg) translateZ(-100px) ;
          transform: rotateY(8deg) translateZ(-100px) ;
}
/* 不知道以上对代码框的修改你是否喜欢呢？ */
/* 如果不喜欢，在最后你可以自己修改成自己喜欢的样式哦！*/

/* 接下来我给自己准备一个编辑器，用来存放我的简历内容 */
.introduceEdit{
  position: fixed; right: 0; top: 0;
  padding: .5em;  
  margin: 1vh 1vw;
  width: calc(46vw - 2px); 
  height: calc(95vh - 2px); 
  border: 1px solid;
  color: #222;
  background: white;
  overflow: auto;
}

/* 好了，我要开始开始写简历了 */
`,
`
/* 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，让我们转换成好看的格式吧！
 * 简单，用开源工具 marked 翻译成 HTML 就行了
 *           3          
 *           2          
 *           1          
 *           0.99
 *           0.98
 *           ...
 *           骗你的啦，已经好了！
 */
`,
`
/* 我们来让页面的样式更丰富一些！ */

.introduceEdit{
  -webkit-transition: none; 
  transition: none;
  -webkit-transform: rotateY(-8deg) translateZ(-100px) ;
          transform: rotateY(-8deg) translateZ(-100px) ;
}
.introduceEdit h1{
  display: block;
  width: 80px;
  margin: 0 auto;
}
.introduceEdit h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.introduceEdit h3{
	display: inline-block;
	margin: .5em 0;
}
.introduceEdit ul{
  margin: 0;
}
.introduceEdit a{
	color: #000;
}
.introduceEdit ul{
	list-style: none;
}
.introduceEdit ul>li::before {
	content: "•";
	margin-left: 1em;
	margin-right: .5em;
}


/*
* 好了！简历到这里就基本写完了。
*
* 样式也只是简单的写了一些。
*
* 不过你可以自己修改左边的样式试试效果！（换行的时候要用 shift + enter ）
* 
* 如果你也想制作一份这样的动态建立可以 Fork (https://github.com/luowei95327/react-resume)，打造你自己的简历！
*/


/*
* 下面自己尝试改改样式吧！！！
*/
`
]

export {introduce, styles};