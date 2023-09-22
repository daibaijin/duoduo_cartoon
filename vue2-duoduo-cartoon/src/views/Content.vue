<template>
   <div class="container " ref="container" @scroll="handleScroll($event,allsendarr)" >
        <!-- 上面 -->
        <div class="manga-nav" ref="top" @click="showtoolbox" @mouseenter="showtoolbox">
            <div class="manga-logo">
                <!-- <img src="../assets/logo.png" alt=""> -->
                <div class="logo-title">多多漫画</div>
            </div>
            <div class="wrapper">
                <!-- 13>1234123>123 123 -->
                <span @click="keephome">首页 ></span>
                <span @click="keepdetail">{{title}} > </span>
                <span>第 {{eprecord+1}} 话  </span>
            </div>
            <div class="right-part"></div>
        </div>
        <!-- 内容 -->
        <div class="images-list"  @click="nonetoolbox" ref="imagesList" >
            <div class="list-item" v-for="(item, index) in imgarr" ref="listItem">
                <img :src='item' alt="加载不出来" ref="img">
            </div>
            
            <!-- <img src="../assets/noloadimg.png" alt=""> -->
        </div>
        <!-- 下面 -->
        <div class="action-bar clearfix" ref="bottom">
            <div class="zoomer">
                <span class="zoom-btn btn-minus" @click="subtract">-</span>
                <span class="zoom-display t-center" ref="center">{{initsize}}%</span>
                <span class="zoom-btn btn-plus" @click="add">+</span>
            </div>
            <div class="page-silder">
                <div class="slider-component">
                    <div class="progress-indicator">{{curpage}}/ {{imgarr.length}}</div>
                    <div class="slider-body" ref="sliderbox" @mousedown="getsliderdata1($event)"  @mousemove="getsliderdata2($event)" @mouseup="getsliderdata3($event)">
                        <div class="slider-line">
                            <div class="block" ref="block"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="action-buttons">
                <button class="app-button none">
                    <span class="v-middle pageup">上一话</span>
                </button>
                <button class="app-button">
                    <span class="v-middle pagedown">下一话</span>
                </button>
                <!-- <button class="episode-list-button">
                    <span>目录</span>
                </button> -->
            </div>
            <div class="divider"></div>
            <div class=" settings">
                <div class="likebutton " v-model="likeindex" v-if="likeindex==0" ref="noon" @click="islike(datalist,User)" >
                            
                   <img src="../assets/contentlike.svg" alt="">
                    <span>追漫</span>
                </div>

                <div  class="likebutton " v-model="likeindex" v-else-if="likeindex==1" ref="on" @click="nolike" >
                            <!-- <div class="img"></div> -->
                              
                      <img  src="../assets/likeactive.svg" alt="">
                    
                    <span >已追</span>
                </div>
                <!-- <div class="likebutton" @click="islike(datalist,User)">
                    <img src="../assets/contentlike.svg" alt="">
                  
                    <span>追慢</span>
                </div> -->
            </div> 
        </div>
        <div class="toolbox" ref="toolbook">
            <div class="info-hud">
                <div class="single">
                    <img src="../assets/contenttool1.png" alt="">
                    <span>1</span>
                </div>
                <div class="info-text"  @click="showtoolbox" @mouseenter="showtoolbox">
                    <div class="">66p</div>
                    <div class="">第 {{eprecord+1}} 话</div>
                </div>
            </div>
            
            <div class="floating-button" @click="showtoolbox" @mouseenter="showtoolbox" >
                 <img src="../assets/toolshow.svg" alt="">
                <span>显示工具栏</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"Content",

        data(){
            return{
                imglist:[
                    
                ],
                pathlist:[],
                imgpath:"",
                imgarr:[
                  
                ],
                epid:"442944",
                pagesize:0,
                eplist:[],
                getlist:[],
                readrecord:0,
                eprecord:0,
                sendarr:[],
                allsendarr:[],
                bookid:"25717",
                datalist:[],
                likeindex:0,
                initsize:100,
                slider:false,
                sliderbox:null,
                block:null,
                curpage:1,
                scrollE:null,
                likebox:[],
                scrollmove:0,
                imagesList:null,
                title:"",
                
                
            }
        },

        computed:{
        geteplist(){
            return this.$store.state.readlist;
        },
        getreadrecord(){
            return this.$store.state.readrecord;
        },
        geteprecord(){
            return this.$store.state.eprecord;
        },
        getsendarr(){
            return this.$store.state.sendarr;
        },
        User(){
                return this.$store.state.user;
        },
        
      },

        created() {


             this.$nextTick(() => {
                 this.imgarr=[];
                 this.getvalue(this.getsendarr);
                //   this.getvalue1(this.User,this.bookId);
                 this.getvalue1(this.geteplist,this.getreadrecord,this.geteprecord,this.getsendarr)
                 this.getcontent(this.epid);
               console.log("this.pathlist",this.pathlist);
               this.view();
                 this.sliderbox=this.$refs.sliderbox;
                 this.block=this.$refs.block;
                 this.imagesList=this.$refs.imagesList;
               console.log("this.datalist",this.datalist);
                
             })
               
       },

        methods:{
             getvalue2(User,BookId){
                  let isthis=this;
                this.bookid=BookId;
                console.log("this.bookid",this.bookid);
                console.log("getvalue---user",User);
               if (!(User===undefined)) {
                    isthis.alllike= User.alllike;
                  console.log("isthis.alllike",isthis.alllike);
               if (condition) {
                     User.alllike.forEach(function (item,index) {
                    console.log("item,index");
                    console.log(item,index);
                    console.log("item[index]",item[index]);
                    console.log("item[index].bookid",item[index].bookid);
                    console.log("item[index].bookid==this.bookid",item[index].bookid==isthis.bookid);
                    if (item[index].bookid==isthis.bookid) {
                        isthis.likeindex=1;
                    }else{
                        isthis.likeindex=0;
                    }
                });
               }
               }
            },	
            set(getsendarr1){
                let isthis=this;
                console.log("getsendarr1",getsendarr1);
                getsendarr1.forEach(function (item,index) {
                    console.log("item,index");
                    console.log(item,index);
                    // console.log("item.curindex",item.curindex);
                    console.log("item.curindex",item.curindex);
                    console.log("item.eprecord",item.eprecord);
                    console.log("item.readrecord",item.readrecord);
                    console.log("item.eplis",item.eplis);
                    console.log("item.bookid",item.bookid);
                    console.log("item.bookid",item.bookid);
                    console.log("item.title",item.title);
                    if (item.curindex==1) {
                         isthis.sendarr=item;
                         isthis.eprecord=item.eprecord;
                         isthis.readrecord=item.readrecord;
                         isthis.eplist=item.eplist;
                         isthis.bookid=item.bookid;
                         isthis.datalist=item.datalist;
                         isthis.title=item.title;
                        // item.curindex=0;
                }
                
                });
                console.log("this.readrecord",isthis.readrecord);//阅读记录 用于开始阅读的 数字
                console.log("this.eprecordt",isthis.eprecord);//章节记录 用于章节高亮
                console.log("this.sendarr",isthis.sendarr);//包含（阅读记录、章节记录）
                console.log("getsendarr1",getsendarr1); 
                console.log("isthis.datalist",isthis.datalist); 
                this.$store.commit('changeAgainSendarr',getsendarr1)
            },
            getvalue1(list,readrecord1,eprecord1,sendarr1){
                this.eplist=list;
               
                this.eprecord=eprecord1;
                 this.readrecord=this.eprecord;
                 this.sendarr=sendarr1
                console.log("this.eplist",this.eplist);
                console.log("this.readrecord",this.readrecord);//阅读记录 用于开始阅读的 数字
                console.log("this.eprecordt",this.eprecord);//章节记录 用于章节高亮
                console.log("this.sendarr",this.sendarr);//包含（阅读记录、章节记录） 
            },
            //  漫画内容
            getcontent(id){

                  this.axios({
                   method: 'get',
                   url: 'https://apic.netstart.cn/bcomic/GetImageIndex',//  664941  501969
                    params: {
                        epId:id,//25717
                      }

                 }).then(res => {
                     console.log("res",res);
                           console.log("getcontent",res);
                       this.imglist=res.data.data.images;

                       console.log("this.imglistt",this.imglist);

                    let newarr=[];
                    this.imglist.forEach(function (item,index) {
                        console.log("item,index");
                        console.log(item,index);
                         let joinpath=`["https://manga.hdslb.com/`+item.path+`@660w.jpg"]`;
                        //  let joinpath=`"https://manga.hdslb.com`+item.path+`@660w.jpg"`;
                         console.log("joinpath",joinpath);
                           newarr.push(joinpath)
                    });
                    let str=newarr.join(",");
                    console.log("str",str);
                    let url = `[`+str+`]`;
                    console.log("url",url);
                    console.log("newarr",newarr);
                    // this.pathlist=url;
                     this.pathlist = [...newarr];
                         console.log("this.pathlist[0]",this.pathlist);

                   
                   this.getpath(this.pathlist);
                 }).catch(err => {
                     console.log("err",err);
                 })

                    // 循环遍历pathlist
                    // 创捷新数组和obj存储url和token;
                    // 拼接所有url和token，放到数组imgpathlist中
                    // 页面拿到imgpathlistz中的数据进行渲染
            }, 
            getpath(path){
                console.log("this222",this);
                let isthis=this;
                    console.log("this.pathlist111",this.pathlist);
                    console.log("path",path);
                    this.pathlist.forEach(function (item,index) {
                        console.log("item,index");
                        console.log(item,index);

                    isthis.axios({
                     method: 'get',
                     url: 'https://apic.netstart.cn/bcomic/ImageToken',
                      params: {
                        urls:isthis.pathlist[index],
                      }

                    }).then(res => {
                         console.log("res",res);
                           console.log("images",res.data.data[0]);
                           let newstr=res.data.data[0].url.slice(0,res.data.data[0].url.length-11)+"@660w.jpg";
                           console.log("newstr",newstr);
                       isthis.imgpath=res.data.data[0].url+"?"+"token="+res.data.data[0].token;

                        console.log("this.imgpath",isthis.imgpath);
                        isthis.imgarr.push(isthis.imgpath);
                       // 遍历对象/数组将img添加到this.bannerimg中
                       console.log("this.imgarr",isthis.imgarr);
                       
                    }).catch(err => {
                         console.log("err",err);
                    })
                 
                    });
                     console.log("this.imgarr",isthis.imgarr);
                    
            },
             getvalue(getsendarr){
                console.log("this.$route",this.$route);
                this.getlist=this.$route.query.sendlist;
                console.log("this.getlist",this.getlist);
                this.epid=this.getlist.epid;
                this.eplist=this.getlist.eplist;

                console.log("this.getlist",this.getlist);
                this.allsendarr=this.getsendarr;
                console.log("this.allsendarr",this.allsendarr);
                // this.epid=this.$route.query.epid;
                console.log("this.epid",this.epid);
                console.log("this.eplist",this.eplist);
                this.set(getsendarr)
            },
            view(event){
                
                // let contentview=this.$refs.content;
                // let wrapper=this.$refs.wrapper;
                // let contentbox=this.$refs.contentbox;
                // console.log("contentview",contentview[0]);
                // console.log("wrapper",wrapper.clientHeight);
                // console.log("contentbox",contentbox.clientHeight);
                // console.log("event",event);
            },
            // 获取页面滚动距离
             handleScroll (e,getsendarr) {
                 let el = e.target;
                 this.scrollE= e.target;
                 let container=this.$refs.container;
                  let isthis=this;
                console.log("e",e);
                console.log("el",el);
                console.log("container",container);
                console.log("scrollE",this.scrollE);
                console.log("el.scrollTop",el.scrollTop);
                console.log("el.clientHeight",el.clientHeight);
                console.log("el.scrollHeight",el.scrollHeight);
                this.scrollmove=el.scrollTop+el.clientHeight;
                 let scrollratio=this.scrollmove/el.scrollHeight;
                  let detail=scrollratio.toFixed(2)
                  let aaa=detail*this.imgarr.length;
                  let bbb=Math.floor(aaa);
                  this.curpage=bbb;
                
                 //判断是否到达div容器底部
                if(el.scrollTop+el.clientHeight>=el.scrollHeight){
                	//控制页数
                   this.pagesize=1
                   //调用后台接口
                //    this.getAuditRecipeList()
                console.log("isthis.eprecord",isthis.eprecord);
                console.log("this.eplist",this.eplist);
                console.log("isthis.eprecord+this.pagesize",isthis.eprecord+this.pagesize);
                
                console.log("this.eplist[this.pagesize].id",this.eplist[isthis.eprecord+this.pagesize].id);
                this.getcontent(this.eplist[this.pagesize].id);
               
                    console.log("this.imgarr",this.imgarr);
                console.log("this.pagesize",this.pagesize);
                 this.eprecord= this.eprecord+this.pagesize;
                 this.readrecord= this.eprecord+this.pagesize;
                
                 
                getsendarr.forEach(function (item,index) {
                    console.log("item,index");
                    console.log(item,index);
                    if (item.bookid==isthis.sendarr.bookid) {
                        //  isthis.sendarr=item;
                         item.eprecord=isthis.eprecord;
                         item.readrecord=isthis.readrecord;
                         item.readrecord=item.readrecord;
                         item.eprecord=item.eprecord;
                        item.curindex==0;
                    }

                })

                console.log("getsendarr",getsendarr);
                console.log("this.eprecord",this.eprecord);
                console.log("this.readrecord",this.readrecord);
                this.$store.commit('changeAgainSendarr',getsendarr)
                this.$store.commit('changeEprecord',this.eprecord)
                this.$store.commit('changeReadrecord',this.readrecord)
                 }

             },

            //  控件操作
            showtoolbox(){
                console.log("显示工具盒");
                let toolbook=this.$refs.toolbook;
                let top=this.$refs.top;
                let bottom=this.$refs.bottom;
                toolbook.style.display="none";
                top.style.display="block";
                bottom.style.display="block";

            },
            nonetoolbox(){
                let isthis=this;
                
                     console.log("隐藏工具盒");
                let toolbook=isthis.$refs.toolbook;
                let top=isthis.$refs.top;
                let bottom=isthis.$refs.bottom;
                toolbook.style.display="block";
                top.style.display="none";
                bottom.style.display="none";
               
                
            },
            timenone(){
                 let isthis=this;
                
                setTimeout(function () {
                     console.log("隐藏工具盒");
                let toolbook=isthis.$refs.toolbook;
                let top=isthis.$refs.top;
                let bottom=isthis.$refs.bottom;
                toolbook.style.display="block";
                top.style.display="none";
                bottom.style.display="none";
                }, 2000);
            },

            // 控制图片大小
            add(){
                this.initsize+=10;
                if (this.initsize>200) {
                    this.initsize=200;
                }
                let imagesList=this.$refs.imagesList;
                // let listItem=this.$refs.listItem;
                // let img=this.$refs.img;
                let center=this.$refs.center;

                let widthsize=640*(this.initsize/100);
                let heightsize=1356*(this.initsize/100);

                 
                console.log("this.initsize",this.initsize);
                console.log("widthsize",widthsize);
                console.log("heightsize",heightsize);

                imagesList.style.width=widthsize+"px";
                // listItem.style.width=widthsize+"px";
                // img.style.width=widthsize+"px";

                imagesList.style.height=heightsize+"px";
                // listItem.style.height=heightsize+"px";
                // img.style.height=heightsize+"px";
                
            },
            subtract(){
                this.initsize-=10;
                if (this.initsize<100) {
                    this.initsize=100;
                }
                let imagesList=this.$refs.imagesList;
                // let listItem=this.$refs.listItem;
                // let img=this.$refs.img;
                let center=this.$refs.center;

                let widthsize=640*(this.initsize/100);
                let heightsize=1356*(this.initsize/100);

                console.log("this.initsize",this.initsize);
                console.log("widthsize",widthsize);
                console.log("heightsize",heightsize);

                
                imagesList.style.width=widthsize+"px";
                // listItem.style.width=widthsize+"px";
                // img.style.width=widthsize+"px";

                imagesList.style.height=heightsize+"px";
                // listItem.style.height=heightsize+"px";
                // img.style.height=heightsize+"px";
                
            },

            // 滑动条
            // 按下
            getsliderdata1(e){
                this.slider=true;
                console.log("按下e",e);
                console.log("e.offsetX",e.offsetX);
                console.log("this.sliderbox",this.sliderbox);
                console.log("this.block",this.block);
                console.log("this.sliderbox.offsetLeft",this.sliderbox.offsetLeft);
                let block=this.$refs.block;
                block.style.left=e.pageX-this.sliderbox.offsetLeft-this.block.clientWidth/2+"px"
                 
            },
            // 移动
            getsliderdata2(e){
                if(!this.slider)
                return
                console.log("移动e",e);
                console.log("e.offsetX",e.offsetX);
                let block=this.$refs.block;
                 block.style.left=e.pageX-this.sliderbox.offsetLeft-this.block.clientWidth/2+"px"
            },
            // 松开
            getsliderdata3(e){
                let isthis=this;
                console.log("松开e",e);
                console.log("e.offsetX",e.offsetX);
                let block=this.$refs.block;
                  block.style.left=e.pageX-this.sliderbox.offsetLeft-this.block.clientWidth/2+"px"

                  let movedistance=e.pageX-this.sliderbox.offsetLeft-this.block.clientWidth/2;
                  console.log("movedistance",movedistance);
                  let ratio=movedistance/471;
                  let detail=ratio.toFixed(2)
                  let aaa=detail*this.imgarr.length;
                  let bbb=Math.floor(aaa);
                  console.log("ratio",ratio);
                  console.log("detail",detail);
                  console.log("aaa",aaa);
                  console.log("bbb",bbb);
                  this.curpage=bbb+1;

                console.log("this.imagesList.clientHeight",this.imagesList.clientHeight);
                console.log("(isthis.curpage-1)*(this.imagesList.clientHeight)",(isthis.curpage-1)*(this.imagesList.clientHeight*2+(this.imagesList.clientHeight)));
                  window.scrollTo({
                      top:(isthis.curpage-1)*(this.imagesList.clientHeight*2+(this.imagesList.clientHeight)),
                      behavior:'smooth',
                  })
                 this.slider=false;
            },

            //  页面跳转
            keephome(){

                let routerName=this.$router.history.current.name;
                if (routerName=="Home") {
                    return;
                }
                 this.$router.push({name: 'Home'});
            },

            keepdetail(){
              
             

               let routerName=this.$router.history.current.name;
        
               console.log("routerName",routerName);


              if (routerName=="Detail") {
                  return;
              }
              // 向搜索页面传值
                //   this.$router.push({name: 'Detail',query:{bookid:this.homerecommend[index].comic_id}});
                 this.$store.commit('changeDetailId',this.bookid)
              this.$router.push({name: 'Detail'});
                

              
        
            },
            islike(datalist,User){
                console.log("datalist",datalist);
                if (User.code == 200) {
                    // let datalist=this.datalist;
                    if (this.likeindex==0) {
                        this.likeindex=1
                    }
                    let likemessage={
                        bookid:datalist[0].id,
                        img:datalist[0].vertical_cover,
                        title:datalist[0].title,
                        author:datalist[0].author_name,
                        last_ord:datalist[0].last_ord,
                        isfinish:datalist[0].is_finish,
                        readep:[],

                    }
                 
                    this.likebox.push(likemessage);

                    this.$store.commit('changeLike',this.likebox)

                   console.log("islike-likemessage",likemessage);
                   console.log("this.likebox",this.likebox);
                    // this.$router.push({name: 'Home',query:{likebox:this.likebox}});
                     }else{
                      alert("请先登录")
                 }
                  
                  
            },
            nolike(){
                  
                      let isthis=this;
                    if (this.likeindex==1) {
                        this.likeindex=0
                    }
                   

                     this.alllike.forEach(function (item,index) {
                         if (item[index].bookid===isthis.bookid) {
                             isthis.alllike.splice(index,1);
                             isthis.alllike=isthis.alllike.splice(index,1);
                         }
                     });
                   console.log("isthis.alllike",isthis.alllike);
                   this.$store.commit('changeAgainLike',isthis.alllike)
                   
                    
            },

           



        }
    }
</script>

<style lang="scss" scoped>
       .webTherapyAuditList{
        	/* //要想scroll事件生效，必须给目标div编写下面两个样式。 */
           height: 102%;
           overflow-y: auto;
         }

        /* 利用伪元素来清除浮动  */
        .clearfix::after {
          content: "";
          display: block;
          clear: both;
        }
        .container{
            width: 100%;
            height: 102%;
            /* height: 224px; */
            background-color: #212121;
            overflow-y: auto;
            position: relative;
            color: #777;
        }
        .container::-webkit-scrollbar{
            // width: 0px;
        }
        .images-list{
            width: 640px;
            height: 1356px;
            background-color: white;
            margin: auto;
            /* overflow: hidden; */
            box-sizing: border-box;
            // overflow-y: auto;
        }
        .list-item{
            width:100%;
            height:1356px;
            // border-bottom:1px solid red;

        }
        .list-item img{
            width: 100%;
            height: 1356px;

            /* border-bottom: 1px solid red; */
        }
        .action-bar{
            /* position: absolute; */
            position: fixed;
            background-color: rgba(0,0,0,.9);
             bottom: 0;
            left: 0;
            align-items: center;
            /* display: flex; */
            margin: auto;
            /* max-width: 1200px; */
            padding: 10px 0;
            width: 100%;
            height: 66px;
            display: none;
        }
        .manga-nav{
            /* position: absolute; */
            position: fixed;
            background-color: rgba(0,0,0,.9);
             top: 0;
            left: 0;
            width: 100%;
            height: 55px;
            display: none;
        }
        .zoomer{
            border: 1px solid hsla(0,0%,100%,.4);
            border-radius: 18px;
            flex-shrink: 0;
            height: 36px;
            margin-left: 24px;
            margin-right: 30px;
           margin-top: 15px;
            /* user-select: none; */
            width: 120px;
            display: flex;
            justify-content: space-between;
            float: left;
            cursor: pointer;
        }
        .zoom-btn{
            background-size: 16px auto;
            display: inline-block;
            height: 36px;
            width: 36px;
            /* background-color: red; */
            text-align: center;
            line-height: 36px;
        }
        .zoom-display{
            color: hsla(0,0%,100%,.5);
            display: inline-block;
            font-size: 12px;
            line-height: 36px;
            width: 48px;
            /* background-color: orange; */
            text-align: center;
            
        }
        .page-silder{
            width: 528px;
            height: 16px;
            /* background-color: palevioletred; */
            float: left;
          
        }
        .slider-component{
            align-items: center;
            display: flex;
            flex-flow: row nowrap;
            width: 100%;
            height: 16px;
            margin-top: 25px;
        }
        .progress-indicator{
            font-size: 14px;
            margin-right: 16px;
            width: 40px;
            height: 16px;
            text-align: center;
            line-height: 16px;
            box-sizing: border-box;
        }
        .slider-body{
            -webkit-appearance: none;
            background-color: initial;
            cursor: pointer;
            outline: none;
            vertical-align: middle;
            
            width: 471px;
            height: 14px;
            /* background-color: antiquewhite; */
            margin-right: 2px;
        }
        .slider-line{
            width: 471px;
            height: 2px;
            margin: 2px;
            background-color: #4f4f4f;
            /* background-color: red; */
            margin-top: 6px;
            position: relative;
        }
        .slider-line .block{
            width: 6px;
            height: 12px;
            background-color: #32aaff;
            position: absolute;
            top: -5px;
            left: 0px;
        }
        .action-buttons{
            width: 250px;
            height: 16px;
            float: left;
            /* background-color: greenyellow; */
            display: flex;
            justify-content: space-evenly;
            margin-top: 25px;
            
        }
        .app-button{
            background-color: initial;
            border: 0;
            cursor: pointer;
            transform-origin: center center;
            width: 88px;
            height: 20px;
            /* background-color: peru; */
            color: hsla(0,0%,100%,.9);
        }
        .app-button span{
            width: 42px;
            height: 15px;
            text-align: center;
            line-height: 15px;

        }
        .app-button.none{
            color: #777;
        }
        .episode-list-button{
            width: 74px;
            height: 20px;
            background-color: aqua;
        }
        .episode-list-button span{
            width: 42px;
            height: 15px;
            text-align: center;
            line-height: 15px;
        }
        .divider{
            background-color: hsla(0,0%,100%,.2);
            height: 32px;    
            margin: 0 8px;
            width: 1px;
            float: left;
            margin-top: 17px;
        }
        .settings{
            width: 250px;
            height: 45px;
            float: left;
            /* background-color: aqua; */
            margin-top: 10.5px;
        }
        .manga-logo{
            width: 134px;
            height: 32px;
            /* background-color: red; */
            float: left;
            font-size: 15px;
            color: hsla(0,0%,100%,.8);
            margin-left: 54px;
            margin-top: 12px;
            display: flex;
            cursor: pointer;
        }
        .manga-logo img{
            height: 32px;
            margin-right: 12px;
            width: 32px;
            background-color: gray;
        }
        .logo-title{
            width: 90px;
            height: 20px;
            /* background-color: yellow; */
            margin-top: 6px;
            font-size: 15px;
        }
        .wrapper{
            width: 716px;
            height: 50px;
            /* background-color: aqua; */
            float: left;
            flex: 1;
  
             overflow: hidden;
             text-align: center;
             line-height: 50px;
             margin-left: 55px;
             cursor: pointer;
        }
        .wrapper span{
            color: #fff;
         opacity: .9;
        }
        .wrapper span:nth-child(3){
            /* max-width: 300px; */
         opacity: .5;
        }
        .right-part{
            width: 270px;
            height: 50px;
            /* background-color: blue; */
            float: left;
        }
        .likebutton{
            width: 55px;
            height: 43px;
            padding: 1px 6px;
            /* background-color: cornflowerblue; */
            margin: auto;
            cursor: pointer;
        }
        .likebutton img{
            width: 24px;
            height: 24px;
            // background-color: grey;
            margin: auto;
            margin-bottom: 4px;
            
        }
        .likebutton span{
            font-size: 12px;
            width: 24px;
            height: 13px;
            text-align: center;
            line-height: 13px;
            display: block;
            // margin: auto;
        }
        .toolbox{
            width: 98%;
            height: 66px;
            padding: 10px 0px;
            /* background-color: rgba(255, 0, 0, 0.425); */
            /* position: absolute; */
            position: fixed;
            /* background-color: rgba(0,0,0,.9); */
            bottom: 0;
            left: 11px;
            // display:none;
            z-index:10
        }
        .info-hud{
            width: 80px;
            height: 32px;
            background-color: rgba(48,48,48,.7);
            border-radius: 3px;
            color: hsla(0,0%,100%,.7);
            font-size: 12px;
            padding: 8px 12px;
            float: left;
        }
        .single{
            width: 32px;
            height: 32px;
            position: relative;
            color: hsla(0,0%,100%,.7);
            font-size: 12px;
            float: left;
        }
        .single img{
            width: 32px;
            height: 32px;
            // background-color: red;
            transform: rotate(90deg);
        }
        .single span{
            position:absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            animation-duration: .4s;
            color: hsla(0,0%,100%,.3);
        }
        .info-text{
            width: 40px;
            height: 30px;
            margin-left: 8px;
            /* background-color: #32aaff; */
            float: left;
            font-size: 12px;
        }
        .floating-button{
            width: 94px;
            height: 18px;
            padding: 14px 18px;
            margin: 5px 0px;
            background-color: rgba(48,48,48,.7);
            border-radius: 3px;
            color: hsla(0,0%,100%,.7);
            font-size: 12px;
            float: right;
             cursor: pointer;
        }
        .floating-button img{
            width: 16px;
            height: 16px;
            // background-color: red;
            margin:auto;
            float: left;
            
        }
        .floating-button span{
            width: 60px;
            height: 14px;
            /* background-color: #32aaff; */
            display: block;
            float: left;
            margin-left: 8px;
        }
</style>