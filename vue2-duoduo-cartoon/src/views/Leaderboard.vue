<template>
    <div>
     <div class="wrapper">
        <div class="aside">
            <div  :class="`item ${index === listIndex ? 'active' : ''}`" v-for="(item, index) in listarr"
             @click="clickdate(index)">
                <div class="title ">{{item.name}}</div>
                <span :class="`icon ${index === listIndex ? 'active' : ''}`" ref="icon"> <img src="../assets/activeTriangle.svg" alt=""></span>
                 <div class="rank-title">
                     <h1>{{item.name}}</h1>
                     <span class="rank-hint">{{item.description}}</span>
                 </div>
            </div>
           
        </div>
        <div class="list-container">
          

           <div class="rank-itembox">
            
               <div class="rank-item" v-for="(item, index) in booktable" @click=" keepdetail(index)">
                   <!-- 具体排名 -->
                   <span class="digit" v-if="(index+1)==1">
                     {{index+1}}
                   </span>
                   <span class="digit" v-else-if="(index+1)==2">
                      {{index+1}}
                   </span>
                   <span class="digit"v-else-if="(index+1)==3">
                       {{index+1}}
                   </span>
                   <span class="digit small" v-else-if="(index+1)>3&&(index+1)<10">
                        0{{index+1}}
                   </span>
                   <span class="digit small"v-else-if="(index+1)>9&&(index+1)<20">
                        1{{(index+1)%10}}
                   </span>
                   <span class="digit small" v-else-if="(index+1)>19&&(index+1)<30">
                        2{{(index+1)%20}}
                   </span>
                   <span class="digit small" v-else-if="(index+1)>29&&(index+1)<40">
                         3{{(index+1)%30}}
                   </span>
                   <span class="digit small"  v-else-if="(index+1)>39&&(index+1)<50">
                        4{{(index+1)%40}}
                   </span>
                   <span class="digit small"  v-else-if="(index+1)>49">
                       5{{(index+1)%50}}
                   </span>

                   <!-- 排名上升、下降、不变 -->
                   <span class="movement" v-if="(index+1)<item.last_rank">
                        <img src="../assets/rise.png" alt="">
                       
                   </span>
                   <span class="movement" v-else-if="(index+1)>item.last_rank">
                        <img src="../assets/decline.png" alt="">
                       
                   </span>
                   <span class="movement" v-else-if="(index+1)==item.last_rank">
                        <img src="../assets/eq.png" alt="">
                       
                   </span>
                   <!-- <div class="img"></div> -->
                   <img :src="item.vertical_cover" alt="">
                   <div class="info">
                       <div class="bookname">{{item.title}}</div>
                       <div class="author">{{item.author[0]}}</div>
                       <div class="type">{{item.styles[0]? item.styles[0].name :'' }}</div>
                       <div class="status">更新至 {{item.last_ord}} 话</div>
                   </div>
               </div>
              
               <p  class="no-more">没有更多啦~</p>
           </div>

        </div>
    
     </div>
    </div>
</template>

<script>
    export default {
        name:'Leaderboard',

         data(){
            return{
            listIndex:-1,
             listarr:[],
             rankHint:[],
             h1arr:[],
             hint:"",
             h11:"",
            booktable:[],
            id1:7,
            bookindex:-1,
            }
        },

         created() {


             this.$nextTick(() => {
                 
                //  this.listitem();
                 this.listtitle();
                 
                this.clickdate(0);
                
              
             })
       },
         methods:{
             
             // 更新作品列表1
            listtitle(){

                  this.axios({
                   method: 'get',
                   url: 'https://apic.netstart.cn/bcomic/ListRank',


                 }).then(res => {
                     console.log("res",res);
                       console.log("listarr",res.data.data.list);
                   // this.caipuData = res.data.result.list;
                    this.listarr=res.data.data.list;
                   console.log("this.listarr",this.listarr);

                   // hint
                   let arr=[];
                   this.listarr.forEach(function (item,index) {
                       // console.log("item,index");
                       // console.log(item,index);
                      arr.push(res.data.data.list[index].description);
                   });
                     this.rankHint=arr;
                    console.log("this.rankHint",this.rankHint);

                   // name
                   let arr1=[];
                   this.listarr.forEach(function (item,index) {
                       // console.log("item,index");
                       // console.log(item,index);
                      arr1.push(res.data.data.list[index].name);
                   });
                     this.h1arr=arr1;
                    console.log("this.h1arr",this.h1arr);

                   // console.log("img",this.listarr[0].horizontal_cover);

                   // 遍历对象/数组将img添加到this.bannerimg中
                 }).catch(err => {
                     console.log("err",err);
                 })

               },  
             // 具体排行
            listitem(){

               this.axios({
                method: 'get',
                url: 'https://apic.netstart.cn/bcomic/GetRankInfo?',
                 params: {
                    id: 1,//18
                    offset:0,
                    subId:0,
                    
                 }

              }).then(res => {
                  console.log("res",res);
                    console.log("listitem",res.data.data.list[0].styles[0].name);
                // this.caipuData = res.data.result.list;

                this.booktable=res.data.data.list;
               
                console.log("this.booktable",this.booktable);
                // console.log("img",this.listarr[0].horizontal_cover);

                // 遍历对象/数组将img添加到this.bannerimg中
              }).catch(err => {
                  console.log("err",err);
              })

            },
            clickdate(index) {
             
              console.log('index ==> ', index);

              if (this.listIndex === index) {
                console.log('已经处于激活状态');
                return;
              } 

                //    let icon=this.$refs.icon;
                //    console.log("icon",icon);
              

              if (index==0) {
                  let id=7;
              }
              if (index==1) {
                  this.id1=11;
              }
              if (index==2) {
                  this.id1=12;
              }
              if (index==3) {
                  this.id1=1;
              }
              if (index==4) {
                  this.id1=0;
              }
              if (index==5) {
                  this.id1=2;
              }
              if (index==6) {
                  this.id1=5;
              }
              if (index==7) {
                  this.id1=13;
              }
                console.log("this.id1",this.id1);
                this.axios({
                method: 'get',
                url: 'https://apic.netstart.cn/bcomic/GetRankInfo?',
                 params: {
                    id: this.id1,//18
                    offset:0,
                    subId:0,
                    
                 }

                }).then(res => {
                  console.log("res",res);
                    console.log("listitem",res.data.data.list[0].styles[0].name);
                // this.caipuData = res.data.result.list;

                this.booktable=res.data.data.list;
               
                console.log("this.booktable",this.booktable);
                // console.log("img",this.listarr[0].horizontal_cover);

                // 遍历对象/数组将img添加到this.bannerimg中
                }).catch(err => {
                  console.log("err",err);
                })


              this.listIndex = index;
            },
                 //跳转漫画详情
            keepdetail(index){
                console.log('index ==> ', index);

              if (this.bookindex === index) {
                console.log('已经处于激活状态');
                return;
              }
              console.log("this.homerecommend[index]",this.booktable[index].comic_id);

               let routerName=this.$router.history.current.name;
        
               console.log("routerName",routerName);


              if (routerName=="Detail") {
                  return;
              }
              // 向搜索页面传值
              // this.$router.push({name: 'Detail',query:{bookid:this.resultarr[index].season_id}});
              this.$store.commit('changeDetailId',this.booktable[index].comic_id)
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
     .wrapper{
            width: 1160px;
            height: 3293px;
            margin: auto;
            /* background-color: bisque; */
            padding-top: 16px;
            // background-color: antiquewhite;
            margin-top: 50px;
             position: relative;
        }
        .aside{
            width: 78px;
            /* height: 376px; */
            // background-color: aqua;
            float: left;
            border-right: 1px solid rgba(0,0,0,.12);;
            // position: fixed;
            // position: sticky; 
            // top:50px
        }
        .list-container{
            width: 1081px;
            height: 3196px;
            // background-color: cadetblue;
            float: left;
            margin-top: 9px;
            margin-bottom: 32px;
            padding-left: 35px;
            box-sizing: border-box;
            // position:relative;
            // margin-left:85px;
        }
        .aside .item{
            width: 78px;
            height: 40px;
            // background-color: red;
            margin-bottom: 8px;
            color: rgba(0,0,0,.56);
            
        }
        .aside .item .title{
            width: 45px;
            height: 40px;
            // background-color: skyblue;
            text-align: center;
            line-height: 40px;
            font-size: 15px;
            float: left;
        }
        .aside .item .icon{
            width: 16px;
            height: 16px;
            float: left;
            // background-color: greenyellow;
            line-height: 16px;
            text-align: center;
            margin-top: 12px;
            display:none;
        }
        .aside .item .icon.active{
            display:block;
        }
        .aside .item .icon img{
            width:16px;
            height:16px;
        }
        .aside .item.active .title{
            color: #32aaff;
        }
        .aside .item.active .icon{
            color: #32aaff;
        }
        .aside .item.active  .rank-title{
            display:block;
        }

        .rank-title{
            width: 1081px;
            height: 31px;
            // background-color: aquamarine;
            position:absolute;
            top: 25px;
            left: 114px;
            display:none;
        }
        .rank-title h1{
            font-size: 24px;
            width: 72px;
            /* height: 31px; */
            text-align: center;
            line-height: 31px;
            color: black;
            float: left;
            margin: 0px;
        }
        .rank-title span{
            height: 16px;
            font-size: 12px;
            color: #a8a8a8;
            text-align: center;
            line-height: 16px;
            display: block;
            float: left;
            margin-top: 7px;
            margin-left: 12px;
        }
        .rank-itembox{
            /* width:1046px; */
            width: 1081px;
            height: 3196px;
            box-sizing: border-box;
            // background-color:chartreuse;
            margin-top: 40px;
           
        }
        .rank-itembox .rank-item{
            width: 286px;
            height: 136px;
            padding-left: 46px;
            padding-top: 20px;
            margin-bottom: 32px;
            margin-right: 16px;
            // background-color: gold;
            position: relative;
            overflow: hidden;
            float: left;
            cursor: pointer;
        }
        .rank-itembox .rank-item img{
            width: 102px;
            height: 136px;
            border-radius: 6px;
            /* border: 1px solid black; */
            float: left;
            // background-color: blueviolet;
        }
        .rank-itembox .rank-item .info{
            width: 168px;
            height: 136px;
            /* padding-left: 16px; */
            // background-color: #32aaff;
            float: left;
        }
        .digit{
            position:absolute;
            top: 18px;
            left: 7px;
            width: 40px;
            height: 64px;
            // background-color: darkgray;
            text-align: center;
            line-height: 64px;
            font-size:60px;
            color:#cf9870;
            font-weight:600;
        }
        .digit img{
            width: 39px !important;
            height: 64px !important;
        }
        .small{
              text-align: center;
            line-height: 64px;
            font-size:40px;
            color:#cf9870;
            font-weight:600;
             left: 0px;
             top:0px
        }
        .small img{
            width:20px !important;
            height:32px !important;
            float:left;
            display:block;
        }
        .movement img{
            width: 24px !important;
            height: 24px !important;
        }
        .movement{
            position:absolute;
            bottom: 0px;
            left: 21px;
            width: 24px;
            height: 24px;
            // background-color: bisque;
            text-align: center;
        }
        .info >div{
            width: 184px;
            height: 24px;
            font-size: 12px;
            color:#a8a8a8;
            padding-left: 4px;
            overflow: hidden;
            line-height: 24px;
        }
        .info>div:nth-child(1){
            width: 168px;
            height: 48px;
            font-size: 18px;
            color: black;
            padding: 4px;
            line-height:normal;
        }   
        .author{
            margin: 0;
            width: 168px !important;
            /* overflow: hidden; */
            /* padding-left: 16px; */
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-top: 6px;
        }
        .no-more{
            width: 1081px;
            height: 80px;
            // background-color: #32aaff;
            text-align: center;
            line-height: 80px;
            font-size: 12px;
            color: #a8a8a8;
            float: left;
            position: relative;
        }
</style>