<template>
    <div>
         <div class="page-content">
        <div class="sidebar">
            <div class="topbox">
                <div class="sidebar-item" ref="one" @click="clickone">
                    <img src="../assets/my1.svg" alt="" v-if="useIndex!=-1">
                    <img src="../assets/my1active.svg" alt="" v-if="useIndex ==-1">
                    <span>账户信息</span>
                </div>
            </div>
            <div class="nav-line"></div>
            <div class="bottombox">
                <div :class="`sidebar-item ${index === useIndex ? 'active' : ''}`"  v-for="(item, index) in sidelist"
                  @click="clickuseinfo(index)">
                    <img :src="item.img1" alt="" v-if="index !== useIndex">
                    <img :src="item.img2" alt="" v-if="index === useIndex">
                    <span>{{item.title}}</span>
                </div>
            </div>
        </div>
        <div class="info-container">
            <div class="info-container-item " ref="info">
                <div class="" v-model="selectindex" v-if="selectindex==-1">
                    <h1 class="page-title">账户信息</h1>
                    <div class="left-part clearfix">
                        <div class="img"><img src="../assets/userimg.jpg" alt=""></div>
                        <div class="use-info">
                            <div class="nickname">{{use?use.name:"xdssjs"}}</div>
                            <div class="uid">UID: 241239817</div>
                        </div>
                    </div>
                    <div class="right-part">
                        <div class="coin-info">
                            <div class="info-item">
                                <img src="../assets/my5.png" alt="">
                                <span class="b-icon">漫币：</span>
                                <span class="count">0</span>
                            </div>
                        </div>
                    </div>

                    <div class="pivot-component">
                        <div class="pivot-headers">
                            <div class="item">充值记录</div>
                        </div>
                         <div class="empty-hinter">
                        <img src="../assets/nothing.png" alt="">
                            <div class="empty-hinter-text" >什么都没有 ＞︿＜</div>
                            
                        </div>
                    </div>
                </div>

                <div class="" v-model="selectindex" v-else-if="selectindex==0">
                    <h1 class="page-title">账户信息</h1>
                    <div class="empty-hinter">
                        <div class="img"></div>
                    </div>
                </div>

                <div class="" v-model="selectindex" v-else-if="selectindex==1">
                    <h1 class="page-title">账户信息</h1>
                   
                    <div class="list clearfix">
                        <div class="list-item">

                            <div class="img"></div>
                            <div class="manga-title">鬼灭之刃</div>
                            <div class="supporting-text">未看 / 共 208 话</div>
                        </div>
                    </div>
                </div>

            </div>
            <div :class="`info-container-item ${index === pageindex ? 'active' : ''}`" v-model="pageindex" v-for="(item, index) in sidelist">
                <div class="" v-model="selectindex" v-if="selectindex==-1">
                    <h1 class="page-title">{{item.title}}</h1>
                    <div class="left-part">
                         
                         <div class="img"><img src="../assets/userimg.jpg" alt=""></div>
                        <div class="use-info">
                            <div class="nickname">{{use?use.name:"xdssjs"}}</div>
                            <div class="uid">UID: 241239817</div>
                        </div>
                    </div>
                    <div class="right-part">
                        <div class="coin-info">
                            <div class="info-item">
                                <div class="img"></div>
                                <span class="b-icon">漫币：</span>
                                <span class="count">0</span>
                            </div>
                        </div>
                    </div>

                    <div class="pivot-component">
                        <div class="pivot-headers">
                            <div class="item">充值记录</div>
                        </div>
                        <div class="empty-hinter">
                            <div class="img"></div>
                        </div>
                    </div>
                </div>

                <div class="" v-model="selectindex" v-else-if="selectindex==0">
                    <h1 class="page-title">{{item.title}}</h1>
                    <div class="empty-hinter">
                        <img src="../assets/nothing.png" alt="">
                        <div class="empty-hinter-text" v-if="useIndex==0">还没有购买过漫画喔 _(:3」∠ ❀)_</div>
                        <div class="empty-hinter-text" v-if="useIndex==1">还没有收藏过漫画喔 _(:3」∠ ❀)_</div>
                        <div class="empty-hinter-text" v-if="useIndex==2">还没有阅读过漫画喔 _(:3」∠ ❀)_</div>
                    </div>
                </div>

                <div class="" v-model="selectindex" v-else-if="selectindex==1">
                    <h1 class="page-title">{{item.title}}</h1>
                   
                    <div class="list clearfix">
                        <div class="list-item" v-for="(item, index) in likelist" @click="keepdetail1(index)">

                            <img :src="item[0].img" alt="">
                            <div class="manga-title">{{item[0].title}}</div>
                            <div class="supporting-text">未看 / 共 {{item[0].last_ord}} 话</div>
                        </div>
                         <div class="list-text">木有更多惹 ◐▽◑</div>
                    </div>
                   
                </div>
                <div class="" v-model="selectindex" v-else-if="selectindex==2">
                    <h1 class="page-title">{{item.title}}</h1>
                   
                    <div class="list clearfix">
                        <div class="list-item" v-for="(item, index) in readlist" @click="keepdetail(index)">

                            <img :src="item[0].img" alt="">
                            <div class="manga-title">{{item[0].title}}</div>
                            <div class="supporting-text">看到 1 话 / 共 {{item[0].last_ord}} 话</div>
                        </div>
                         <div class="list-text">木有更多惹 ◐▽◑</div>
                    </div>
                   
                </div>

            </div>
         
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name:"My",

        data(){
            return{
                readlist:[],
                likelist:[],
                sidelist:[
                    {
                        img1:require('../assets/my2.svg'),
                        img2:require('../assets/my2active.svg'),
                        title:"已购漫画"
                    },
                    {
                        img1:require('../assets/my3.svg'),
                        img2:require('../assets/my3active.svg'),
                        title:"我的追慢"
                    },
                    {
                        img1:require('../assets/my4.svg'),
                        img2:require('../assets/my4active.svg'),
                        title:"阅读历史"
                    },
                ],
                useIndex:-1,
                selectindex:-1,
                pageindex:-1,
                use:[],
                bookindex:-1,
            }
        },

        computed:{
   
        getreadlist(){
          return this.$store.state.readarr;
         
        },

      },
            created() {


             this.$nextTick(() => {
                 this.getlike();
                 this.getread(this.getreadlist);
                 this.clickone();
                 
               
             })
       },

        methods:{
           getread(readlist1){
               
                this.readlist=readlist1;
                console.log(" this.readlist", this.readlist);
               
           },
           getlike(){
               console.log("this.$route.query.userlike",this.$route.query.userlike);
               this.use=this.$route.query.userlike;
                this.likelist=this.$route.query.userlike?this.$route.query.userlike.alllike:[];
                console.log("this.likelist",this.likelist);
                console.log("this.ues",this.use);
           },
           clickuseinfo(index){
               console.log('index ==> ', index);

              if (this.useIndex === index) {
                console.log('已经处于激活状态');
                return;
              }
            
                let one = this.$refs.one
                one.classList.remove("active");
                 let info = this.$refs.info;         
               info.classList.remove("active");
                console.log("one",one);
            

              this.useIndex = index;
              this.pageindex = index;
            
            console.log("this.likelist===undefined",this.likelist===undefined);
              if (index==1) {
                  if (this.likelist===undefined) {
                      this.selectindex=0;
                  }
                  else if(this.likelist != []){
                      this.selectindex=1;
                  }
              }
              else if(index==2){
                    if (this.readlist===undefined) {
                      this.selectindex=0;
                  }
                  else if(this.readlist != []){
                      this.selectindex=2;
                  }
              }
              else{
                  this.selectindex=0;
              }
              
               console.log("this.selectindex",this.selectindex);
           },
           clickone(){
               let one = this.$refs.one         
               one.classList.add("active");
               let info = this.$refs.info;         
               info.classList.add("active");
               console.log("one",one);
               console.log("info",info);
               this.useIndex=-1;
               this.selectindex=-1;
               this.pageindex =-1,
               console.log("this.selectindex",this.selectindex);
           },
            keepdetail(index){
                console.log('index ==> ', index);

              if (this.bookindex === index) {
                console.log('已经处于激活状态');
                return;
              }
              console.log("this.homerecommend[index]",this.likelist[0][0].bookid);

               let routerName=this.$router.history.current.name;
        
               console.log("routerName",routerName);


              if (routerName=="Detail") {
                  return;
              }
              // 向搜索页面传值
              // this.$router.push({name: 'Detail',query:{bookid:this.resultarr[index].season_id}});
              this.$store.commit('changeDetailId',this.likelist[0][0].bookid)
              this.$router.push({name: 'Detail'});

              this.bookindex = index;
            },
            keepdetail1(index){
                console.log('index ==> ', index);

              if (this.bookindex === index) {
                console.log('已经处于激活状态');
                return;
              }
              console.log("this.homerecommend[index]",this.readlist);
              console.log("this.homerecommend[index]",this.readlist[0][0].bookid);

               let routerName=this.$router.history.current.name;
        
               console.log("routerName",routerName);


              if (routerName=="Detail") {
                  return;
              }
              // 向搜索页面传值
              // this.$router.push({name: 'Detail',query:{bookid:this.resultarr[index].season_id}});
              this.$store.commit('changeDetailId',this.readlist[0][0].bookid)
              this.$router.push({name: 'Detail'});

              this.bookindex = index;
            }


        }
    }
</script>

<style lang="scss" scoped>
        /* 利用伪元素来清除浮动  */
        .clearfix::after {
          content: "";
          display: block;
          clear: both;
        }
       
        a{
            text-decoration: none;
            color: #7a7a7a;
            position: relative;
            position: sticky;
            position: fixed;
            cursor: pointer;
        }
        .page-content{
            background-color: #fff;
            left: 0;
            margin: auto;
            margin-top: 24px;
            min-height: 700px;
            top: 0;
            width: 1160px;
            // background-color: bisque;
            display: flex;
            font-size: 12px;
            overflow:hidden
        }
        .sidebar{
            background-color: #ecedf0;
            border-radius: 3px 0 0 3px;
            padding: 16px 0 0 8px;
            width: 212px;
            height: 684px;
            /* position: relative; */

        }
        .info-container{
            color: rgba(0,0,0,.87);
            padding: 32px 64px;
            width: 812px;
            // height: 598px;
            margin-left: 0px;
            // background-color: aqua;
            
        }
        .sidebar-item{
            width: 212px;
            height:56px;
            // background-color: greenyellow;
            border-bottom: 1px solid #e8e8e8;
            cursor: pointer;
            display: flex;
        }
        .sidebar-item img{
            width: 24px;
            height: 24px;
            margin-right: 12px;
            // background-color: red;
            margin-left: 43px;
            margin-top: 16px;
        }
        .sidebar-item span{
            height: 56px;
            text-align: center;
            line-height: 56px;
            font-size: 14px;
            display: block;
            color: rgba(0,0,0,.56);
        }
        .sidebar-item.active{
            
            background-color:white
        }
        .sidebar-item.active span{
            color: #32aaff !important;
        }
        .sidebar-item:hover span{
            color: rgba(0,0,0,.87);
        }
        .nav-line{
            background: rgba(0,0,0,.08);
            content: "";
            display: block;
            height: 1px;
            left: 12px;
            /* position: absolute; */
            top: 18.1px;
            width: 180px;
            margin-top: 19px;
            margin-bottom: 19px;
        }
        
        h1{
            margin: 0px;
        }
        .left-part{
            width: 788px;
            height: 56px;
            // background-color: gold;
        }
        .left-part .img{
            background-color: #eaeaea;
             border: 1px solid #eaeaea;
            float: left;
            height: 56px;
            width: 56px;
            border-radius: 50%;
        }
        .left-part .img img{
            height: 56px;
            width: 56px;
            border-radius: 50%;
        }
        .use-info{
            /* width: 88px; */
            height: 56px;
            margin-left: 16px;
            // background-color: antiquewhite;
            float: left;
            font-size: 16px;
        }
        .nickname{
            display: block;
            font-size: 18px;
            height: 24px;
            margin-right: 12px;
        }
        .uid{
            color: rgba(0,0,0,.34);
            display: block;
            font-size: 12px;
            height: 16px;
            margin-top: 10px;
        }
        .coin-info{
            align-items: center;
            color: #000;
            display: flex;
            flex-flow: row nowrap;
            line-height: 20px;
            margin-top: 24px; 
        }
        .right-part{
            width: 100%;
            height: 20px;
        }
        .info-item{
            align-items: center;
            display: flex;
            flex-flow: row nowrap;
            white-space: nowrap;
        }
        .icon-info{
            align-items: center;
            color: #000;
            display: flex;
            flex-flow: row nowrap;
            line-height: 20px;
            margin-top: 24px;
        }
        .info-item img{
            height: 20px;
            margin-right: 5px;
            width: 20px;
            // background-color: gray;
        }
        .b-icon{
            font-size: 14px;
        opacity: .56;
        }
        .count{
            font-size: 20px;
            margin-right: 8px;
            opacity: .87;
        }
        .pivot-component{
            width: 812px;
            height: 302px;
            padding-top: 40px;
            // background-color: pink;
        }
        .pivot-headers{
            width: 100%;
            height: 52px;
            // background-color: red;
            border-bottom: 1px solid #ddd;
        }
        .pivot-headers .item{
            width: 56px;
            height: 18px;
            padding: 16px 0px;
            padding-right: 20px;
            text-align: center;
            line-height: 18px;
            color: rgba(0,0,0,.56);
            font-size: 14px;
        }
        .pivot-headers .item.active{
            color: #3af;
        }
        .empty-hinter{
            width: 792px;
            height: 250px;
            // background-color: yellow;
            overflow: hidden;
        }
        .empty-hinter img{
            width: 240px;
            height: 200px;
            margin: auto;
            // background-color: gray;
            margin-top: 22px;
            margin-left:276px;
        }
        .empty-hinter-text{
            width:100%;
            text-align:center;
        }
        .info-container-item{
            width: 100%;
            // border:1px solid black;
            display:none;
        }
        .info-container-item.active{
            display:block;
        }
        .item1{
            display: none;
        }
        .item2{
            display:none;
        }
        .list{
            width:100%;
            height:600px;
            overflow-y:hidden;
        }
        .list-item{
            float:left;
            width:150px;
            height:242px;
            margin:16px 15px 24px 0px;
            // background-color:orange;
             cursor: pointer;

        }
        .list-item img{
            width:150px;
            height:200px;
            // background-color:gray
        }
        .list-text{
            width:100%;
            text-align:center;
            float:left;
        }
        .manga-title{
            color: rgba(0,0,0,.87);
            font-size: 14px;
            margin-bottom: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .supporting-text{
            color: rgba(0,0,0,.34);
            font-size: 12px;
        }
</style>