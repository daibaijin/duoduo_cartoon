<template>
    <div class="home">
        <!-- 轮播图 -->
        <div class="block"  >
             
             <el-carousel :interval="2000" trigger="click"  height="380px" type="card">
               <el-carousel-item  v-for="(item,index) in bannermsg" >
                 <a href="#" @click="clickbar(index)">
                    <img :src="item.img + '@660w.jpg'" alt="" >
                   
                    
                </a>
               </el-carousel-item>
             </el-carousel>
         </div>
       
        <!-- 标签导航 -->
        <el-menu :default-active="activeIndex" class="el-menu-demo" 
            mode="horizontal" @select="handleSelect" background-color="#212121" 
            text-color="#ffffff" active-text-color="#ffffff">
             <!-- 删掉index就可以取消active边框 -->
            <el-menu-item  v-for="(item, index) in tabnav" @click="selecttype">{{item.title}}</el-menu-item>
        </el-menu >
        
        <!-- 列表 -->
        <div class="bigbox">
            <!-- 推荐 -->
            <div class="recommend">
                <div class="title">
                    <div class="text">为你推荐</div>
                    <div class="button" @click="enchange">
                        <div class="">
                            <img src="../assets/exchange.png" alt="">
                            
                        </div>
                        <div class="">换一批</div>
                    </div>
                </div>

                <div class="list" ref="list">
                    <div class="box" ref="listbox">
                         <div class="item" v-for="(item, index) in homerecommend" @click="keepdetail(index)">
                             <a href="#">
                             
                                 <!-- <img :src="item.img + '@660w.jpg'" alt=""> -->
                                  <img :src="item.vertical_cover " alt="" >

                                 <div class="text">{{item.title}}</div>
                                 <div class="tags">{{item.styles[0].name}}</div>
                             </a>
                         </div>
                    </div>
                  
                </div>
                
            </div>
            <!-- 热门 -->
            <div class="hotlist">
                <div class="title">
                    <div class="text">热门速递</div>
                    <div class="tab active">二次元养老院</div>
                    <div class="tab">9.0分以上佳作精选</div>
                    <div class="button" @click="hotlist">
                        <div class="">
                            <img src="../assets/exchange.png" alt="">
                        </div>
                        <div class="">换一批</div>
                    </div>
                </div>

                <div class="list" ref="hotlist">
                    <div class="box" ref="hotlistbox">
                         <div class="item" v-for="(item, index) in homerecommend" @click="keepdetail(index)">
                             <a href="#">
                             
                                 <img :src="item.img + '@660w.jpg'" alt="">

                                 <div class="text">{{item.title}}</div>
                                 <div class="tags">{{item.styles[0].name}}</div>
                             </a>
                         </div>
                    </div>
                  
                </div>
                
            </div>
            <!-- 都市生活 -->
            <div class="recommend category" >
                <div class="title">
                    <div class="text">都市生活</div>
                    <div class="button" @click="more">
                    <div class="">更多</div>
                        <div class="more">
                            <img src="../assets/more.png" alt="">
                        </div>
                        
                    </div>
                </div>

                <div class="list onelist" ref="onelist">
                    <div class="box" ref="onelistboxbox">
                         <div class="item" v-for="(item, index) in homerecommend" @click="keepdetail(index)">
                             <a href="#">
                             
                                 <img :src="item.img + '@660w.jpg'" alt="">

                                 <div class="text">{{item.title}}</div>
                                 <div class="tags">{{item.styles[0].name}}</div>
                             </a>
                         </div>
                    </div>
                  
                </div>
                
            </div>
            <!-- 奇幻异界 -->
            <div class="recommend category">
                <div class="title">
                    <div class="text">奇幻异界</div>
                    <div class="button" @click="more">
                    <div class="">更多</div>
                        <div class="more">
                            <img src="../assets/more.png" alt="">
                        </div>
                        
                    </div>
                </div>

                <div class="list onelist" ref="onelist">
                    <div class="box" ref="onelistboxbox">
                         <div class="item" v-for="(item, index) in homerecommend" @click="keepdetail(index)">
                             <a href="#">
                             
                                 <img :src="item.img + '@660w.jpg'" alt="">

                                 <div class="text">{{item.title}}</div>
                                 <div class="tags">{{item.styles[0].name}}</div>
                             </a>
                         </div>
                    </div>
                  
                </div>
                
            </div>
            <!-- 古风恋爱 -->
            <div class="recommend category">
                <div class="title">
                    <div class="text">古风恋爱</div>
                    <div class="button" @click="more">
                    <div class="">更多</div>
                        <div class="more">
                            <img src="../assets/more.png" alt="">
                        </div>
                        
                    </div>
                </div>

                <div class="list onelist" ref="onelist">
                    <div class="box" ref="onelistboxbox">
                         <div class="item" v-for="(item, index) in homerecommend" @click="keepdetail(index)">
                             <a href="#">
                             
                                 <img :src="item.img + '@660w.jpg'" alt="">

                                 <div class="text">{{item.title}}</div>
                                 <div class="tags">{{item.styles[0].name}}</div>
                             </a>
                         </div>
                    </div>
                  
                </div>
                
            </div>
        </div>
    </div>
</template>

<script src="../js/tool.js"></script>
<script>
// import axios from 'axios';
// import {getBanner} from '../api/api.js';
 import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex';
    export default {
        name:'Home',

        data(){
            return{
                bannerIndex:"1",
                circleIndex:"0",
                bannerWidth:"760",
                bannerImgUl:"",
                bannerimg:[
                    
                ],
                tabnav:[
                    {   index:3,
                        title:"热血"
                    },
                    {   index:3,
                        title:"古风"
                    },
                    {   index:3,
                        title:"玄幻"
                    },
                    {   index:3,
                        title:"奇幻"
                    },
                    {   index:3,
                        title:"悬疑"
                    },
                    {   index:3,
                        title:"都市"
                    },
                    {   index:3,
                        title:"历史"
                    },
                    {   index:3,
                        title:"武侠"
                    },
                    {   index:3,
                        title:"仙侠"
                    },
                    {   index:3,
                        title:"游戏竞技"
                    },
                    {   index:3,
                        title:"悬疑灵异"
                    },
                    {   index:3,
                        title:"架空"
                    },
                    {   index:3,
                        title:"青春"
                    },
                    {   index:3,
                        title:"西幻"
                    },
                    {   index:3,
                        title:"现代"
                    },
                    {   index:3,
                        title:"全部 >"
                    },
                ],
                bannermsg:[],
                homerecommend:[],
                   activeIndex: '1',
                 activeIndex2: '1',
                n:0,
                hot:0,
                bookid:"25717",
                bookindex:-1,
                barindex:-1,
            }
        },
   
        created() {

           let self = this;

       

            //  this.active = this.model;

             this.$nextTick(() => {

                 this.banner();
                this.recommendlist();
             
                

             })
       },

       methods:{
           clickbar(index){
               console.log("barbarbarbar");
                  console.log('index ==> ', index);

              if (this.barindex === index) {
                console.log('已经处于激活状态');
                return;
              }

               console.log("this.bannermsg",this.bannermsg[index].id);

                let routerName=this.$router.history.current.name;
        
               console.log("routerName",routerName);
                // this.$router.push({name: 'Content',query:{epid:this.bannermsg[index].id}});
                this.barindex = index;
           },
        handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      selecttype(){
          this.$router.push({name: 'Categories'});
      },
        //   修改数据
    //  ...mapMutations({
    //     updateMsg: 'changeMsg'
    //   }),

    //   换一批
    enchange(){
        let listbox=this.$refs.listbox;//小
        let list=this.$refs.list;//大
        this.n++;
        if (this.n>3) {
            this.n=0;
        }
        if (this.n==3) {
            listbox.style.marginTop=-this.n*list.clientHeight+(list.clientHeight/2)+"px";
            return;
        }
            console.log("thi.n",this.n);
            listbox.style.marginTop=-this.n*list.clientHeight+"px";
        
        
        console.log("list",list.clientHeight);
        console.log("listbox",listbox);
        
    },
    // 热门
    hotlist(){
        let hotlistbox=this.$refs.hotlistbox;
        let hotlist=this.$refs.hotlist;
        this.hot++;
        if (this.hot>3) {
            this.hot=0;
        }
        console.log("hotlistbox",hotlistbox.clientHeight);
        console.log("hotlistbox",hotlistbox);
        hotlistbox.style.marginTop=-this.hot*hotlist.clientHeight+"px";
    },

      //轮播图
    banner(){

      this.axios({
        method: 'get',
        url: 'https://apic.netstart.cn/mbcomic/Banner',
        
      }).then(res => {
          console.log("res",res);
            console.log("imgarr",res.data.data);
        // this.caipuData = res.data.result.list;
        this.bannerimg=res.data.data;
        this.bannermsg=res.data.data;
        console.log("this.bannermsg",this.bannermsg);

        // 遍历对象/数组将img添加到this.bannerimg中
      }).catch(err => {
          console.log("err",err);
      })
    //   //获取轮播图
    //   getBanner().then(res => {
    //     console.log('res ==> ', res);
    //      console.log("res",res);
    //         console.log("imgarr",res.data.data);
    //     // this.caipuData = res.data.result.list;
    //     this.bannerimg=res.data.data;
    //     this.bannermsg=res.data.data;
    //     console.log("this.bannermsg",this.bannermsg);

    //     // 遍历对象/数组将img添加到this.bannerimg中

    //   }).catch(err => {
    //     console.log('err ==> ', err);
    //   })

    },

    // 推荐列表
    recommendlist(){

      this.axios({
        method: 'get',
        url: 'https://apic.netstart.cn/mbcomic/HomeRecommend',
        
        
      }).then(res => {
          console.log("res",res);
            console.log("recommendlist",res);
        // this.caipuData = res.data.result.list;
        
        this.homerecommend=res.data.data.list;
        console.log("this.homerecommend",this.homerecommend);

        // 遍历对象/数组将img添加到this.bannerimg中
      }).catch(err => {
          console.log("err",err);
      })

    },
    // 分类列表 更多
    more(){
        this.$router.push({name: 'Categories'});
    },
    keepdetail(index){
          console.log('index ==> ', index);

              if (this.bookindex === index) {
                console.log('已经处于激活状态');
                return;
              }
              console.log("this.homerecommend[index]",this.homerecommend[index].comic_id);

               let routerName=this.$router.history.current.name;
        
               console.log("routerName",routerName);


              if (routerName=="Detail") {
                  return;
              }
              // 向搜索页面传值
            //   this.$router.push({name: 'Detail',query:{bookid:this.homerecommend[index].comic_id}});
             this.$store.commit('changeDetailId',this.homerecommend[index].comic_id)
              this.$router.push({name: 'Detail'});
                

              this.bookindex = index;
        
    }
      
    }
    }
</script>

<style lang="scss" scoped>
    h2{
        margin-top:100px
    }
    .block{
        // background-color:red;
        margin-top:60px;
        // width:100%;
        // height:380px

    }
      a{
            list-style: none;
            text-decoration: none;

            // width:100%;
            // height:380px;
        }
     img{
        //  width:518px;
        //  height:380px;
     }

    .el-menu-demo{
            padding-left: 43px;
        width:100%;
        box-sizing: border-box;
    }

       .bigbox{
            width: 100%;
            height: 2480px;
            // background-color: antiquewhite;
         }
         .recommend{
            width: 1020px;
             height: 721px;
             margin: 0 auto;
            //  /* background-color: aqua; */
             padding-bottom: 32px;
         }
         .recommend .title{
             width: 100%;
             height: 45px;
             padding-top: 60px;
             padding-bottom: 16px;
             display: flex;
             /* background-color: red; */
         }
         .recommend .title .text{
            width: 921px;
            height: 45px;
            font-size: 32px;
         }
         .button{
             display: flex;
             width: 90px;
             height: 34px;
            //  border: 1px solid black;
             border-radius: 20px;
             text-align: center;
             line-height: 34px;
             font-size:14px;
             background-color:#def1ff;
             color:#32aaff;
             cursor: pointer;
         }
         .button>div:nth-child(1){
            margin-left: 13px;
         }
         .button>div:nth-child(2){
            margin-left: 5px;
         }
         .button>div:nth-child(1) img{
             width:12px;
             height:12px;
         }
         .category{
             height:416px !important;
         }
         .category .button{
             width:76px;
             height:34px;
             margin-left:5px
         }
         .category .button>div:nth-child(1){
            margin-left: 18px;
         }
        .category .button>div:nth-child(2){
            margin-top:2px;
            margin-left: 5px;
         }
         .more {
             width:8px;
             height:16px;
         }
         .more img{
             width:8px;
             height:14px;
         }
         .list{
            width: 100%;
            height:594px;
             /* background-color: cadetblue; */
            //  display: flex;
             margin-bottom: 24px;
               overflow: hidden;
         }
         .onelist{
             height:297px;
         }
         .list .box{
             width:100%;
            //  height:594px;
            //  overflow: hidden;
            margin-top:0px
         }
         .item{
             float:left;
             padding: 0px 5px;
             margin: 0px 4px;
             padding-bottom: 24px;
            overflow: hidden;
         }
         .item:nth-child(1n){
             padding: 0;

             padding-bottom: 24px;
         }
         .item:nth-last-child(1n){
             padding: 0;
             padding-bottom: 24px;
         }
         .item a{
             list-style: none;
             text-decoration: none;
         }
         .item a .imgbox{
             width: 160px;
             height: 214px;
             background-color: blue;
         }
           .item a  img{
                width: 160px;
             height: 214px;
             border-radius:2px;
           }
         .item a .text{
             width: 162px;
             height: 25px;
             font-size: 18px;
             color: black;
             margin: 4px 0px;
             overflow: hidden;
            white-space: nowrap;/* 防止文字换行 */
            text-overflow: ellipsis; /* 超出部分显示省略号 */
         }
         .item a .tags{
            //  width: 26px;
             height: 22px;
             font-size: 13px;
             color: #b39999;
         }
        .hotlist{
            width: 1020px;
             height: 721px;
             margin: 0 auto;
            //  /* background-color: aqua; */
             padding-bottom: 32px;
         }
         .hotlist .title{
             width: 100%;
             height: 45px;
             padding-top: 60px;
             padding-bottom: 16px;
             display: flex;
             /* background-color: red; */
         }
         .hotlist .title .text{
            width: 128px;
            height: 45px;
            font-size: 32px;
         }
         .hotlist .title .tab{
            // width: 128px;
            height: 20px;
            margin-top:10px;
            margin-left:28px;
            cursor: pointer;
         }
         .tab.active{
             color:#32aaff;
             position: relative;
         }
         .tab.active[data-v-fae5bece]::after {
            background-color: #32aaff;
            border-radius: 1px;
            bottom: -3px;
            content: "";
            height: 3px;
            left: 50%;
            bottom:-4px;
            position: absolute;
            transform: translate(-50%);
            width: 8px;
        }
        .hotlist .button{
            margin-left:506px
        }
</style>