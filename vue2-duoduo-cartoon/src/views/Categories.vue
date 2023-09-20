<template>
    <div>
    <div class="wrapper">
        <div class="style-section">
            <!-- 题材 -->
            <div class="tag-block clearfix">
                <div class="block-title">题材</div>
                <div class="tag-containers">
                   
                    <div :class="`style-tag ${index === tabIndex ? 'active' : ''}`" v-for="(item, index) in styleslist"
                 @click="clickstyle(index)" ref="date">{{item.name}}</div>
                  

                </div>
            </div>
            <!-- 地区 -->
            <div class="tag-block clearfix">
                <div class="block-title">地区</div>
                <div class="tag-containers">
                   
                    <div :class="`style-tag ${index === areasIndex ? 'active' : ''}`" v-for="(item, index) in areaslist"
                 @click="clickareas(index)" ref="date">{{item.name}}</div>


                </div>
            </div>
            <!-- 进度 -->
            <div class="tag-block clearfix">
                <div class="block-title">进度</div>
                <div class="tag-containers">
                   
                        <div :class="`style-tag ${index ===  statusIndex ? 'active' : ''}`" v-for="(item, index) in  statuslist"
                 @click="clickstatus(index)" ref="date">{{item.name}}</div>
                   
                </div>
            </div>
            <!-- 收费 -->
            <div class="tag-block clearfix">
                <div class="block-title">收费</div>
                <div class="tag-containers">
                
                        <div :class="`style-tag ${index === pricesIndex ? 'active' : ''}`" v-for="(item, index) in priceslist"
                 @click="clickprices(index)" ref="date">{{item.name}}</div>
                </div>
            </div>
            <!-- 排序 -->
            <div class="tag-block clearfix">
                <div class="block-title">排序</div>
                <div class="tag-containers">
                 
                <div :class="`style-tag ${index === ordersIndex ? 'active' : ''}`" v-for="(item, index) in orderslist"
                 @click="clickorders(index)" ref="date">{{item.name}}</div>
                </div>
            </div>
        </div>

        <div class="list-section">
            <div class="data-list">
                
                <div class="list-item" v-for="(item, index) in resultarr" @click=" keepdetail(index)">
                    <!-- <img src="" alt=""> -->
                    <img :src="item.vertical_cover" alt="" >
                    <div class="title">{{item.title}}</div>
                     <div class="text" v-if="item.is_finish==1">[完结] 共 {{item.last_ord}} 话</div>
                    <div class="text" v-else-if="item.is_finish==0">更新至 {{item.last_ord}} 话</div>
                </div>
               
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name:"Categories",

            data(){
            return{
              tagtitle:[],
              styleslist:[],//题材
             areaslist:[],//地区
              statuslist:[],//进度
              priceslist:[],//收费
             orderslist:[],//排序
             tabIndex:-1,
             areasIndex:-1,
              statusIndex:-1,
               pricesIndex:-1,
               ordersIndex:-1,
                resultarr:[],
                allbook:[],
            styleid:-1,
            areaid:-1,
            isfinish:-1,
            orders:0,
            isfree:-1,
            styleslist1:[],
            idarr:[],
            bookindex:-1,
            }
        },

         created() {

              
             this.$nextTick(() => {
                 
                 this.titlelist();
                   console.log("this.idarr",this.styleslist);
                this.clickstyle(0);
                this.clickareas(0);
                this.clickstatus(0);
                this.clickprices(0);
                this.clickorders(0);
               
                 this.listresult(this.styleid,this.areaid,this.isfinish,this.orders);
                //  this.getallbook();
                
             })
       },
       methods:{
       
        // 筛选结果
        listresult(sid,aid,isf,orid){

               this.axios({
                method: 'get',
                url: 'https://apic.netstart.cn/bcomic/ClassPage?',
                // url:'https://apis.netstart.cn/bcomic/ClassPage?styleId=-1&areaId=-1&isFinish=-1&order=0&pageNum=1&pageSize=39&isFree=-1'
                 params: {
                    styleId:sid,//18
                    areaId:aid,
                    isFinish:isf,//15
                    order:orid,//1
                    pageNum:1,//1
                    pageSize:39,//1
                    isFree:-1,//1
                 }
             

              }).then(res => {
                  console.log("res",res);
                    console.log("titlelist",res.data.data);
                  this.resultarr=res.data.data;
                console.log("this.resultarr",this.resultarr);
                // 遍历对象/数组将img添加到this.bannerimg中
              }).catch(err => {
                  console.log("err",err);
              })

        },
        // 筛选条件
        titlelist(){

               this.axios({
                method: 'get',
                url: 'https://apic.netstart.cn/bcomic/AllLabel',
             

              }).then(res => {
                  console.log("res",res);
                    console.log("titlelist",res.data.data);
                     this.areaslist=res.data.data.areas,
                     this.orderslist=res.data.data.orders,
                     this.priceslist=res.data.data.prices,
                     this.statuslist=res.data.data.status,
                     this.styleslist=res.data.data.styles,
                    
                    this.areaslist.unshift({id:-1,name:"全部"})
                    this.orderslist.unshift({id:-1,name:"全部"})
                    this.priceslist.unshift({id:-1,name:"全部"})
                    this.statuslist.unshift({id:-1,name:"全部"})
                    this.styleslist.unshift({id:-1,name:"全部"})
                    console.log("this.areaslist",this.areaslist);
                    console.log("this.orderslist",this.orderslist);
                    console.log("this.priceslist",this.priceslist);
                    console.log("this.statuslist",this.statuslist);
                    console.log("this.styleslist",this.styleslist);

                      this.styleslist1=res.data.data.styles;
                      let idlist=[];
                    console.log("getallbook.styleslist1",this.styleslist1);
                    this.styleslist1.forEach(function (item,index) {
                        console.log("item,index");
                        console.log(item.id,index);
                        idlist.push(item.id)
                    });
                    this.idarr=idlist;
                    console.log("this.idarr",this.idarr);

                // 遍历对象/数组将img添加到this.bannerimg中

                return this.idarr=idlist;
              }).catch(err => {
                  console.log("err",err);
              })

        },
        // 题型 style id
        clickstyle(index) {
             
              console.log('index ==> ', index);

              if (this.tabIndex === index) {
                console.log('已经处于激活状态');
                return;
              }
                // if (index==0) {
                //     this.styleid=-1;
                // }
                // if (index==1) {
                //     this.styleid=999
                // }
                // console.log("this.styleslist[index].id",this.styleslist[index].id);
                this.styleid=this.styleslist[index]? this.styleslist[index].id :-1;
                 console.log("this.styleid",this.styleid);

            this.axios({
                method: 'get',
                url: 'https://apic.netstart.cn/bcomic/ClassPage?',
                // url:'https://apis.netstart.cn/bcomic/ClassPage?styleId=-1&areaId=-1&isFinish=-1&order=0&pageNum=1&pageSize=39&isFree=-1'
                 params: {
                    styleId:this.styleid,//18
                    areaId:this.areaid,
                    isFinish:this.isfinish,//15
                    order:this.orders,//1
                    pageNum:1,//1
                    pageSize:39,//1
                    isFree:this.free,//1
                 }
             

            }).then(res => {
                  console.log("res",res);
                    console.log("titlelist",res.data.data);
                  this.resultarr=res.data.data;
                console.log("this.resultarr",this.resultarr);
                // 遍历对象/数组将img添加到this.bannerimg中
            }).catch(err => {
                  console.log("err",err);
            })
              this.tabIndex = index;
        },
        // 地区 area id
        clickareas(index) {
             
              console.log('index ==> ', index);

              if (this.areasIndex === index) {
                console.log('已经处于激活状态');
                return;
              }
             this.areaid=this.areaslist[index]? this.areaslist[index].id :-1;
            //    this.areaid=this.areaslist[index].id;
            console.log(" this.areaid", this.areaid);   

            this.axios({
                method: 'get',
                url: 'https://apic.netstart.cn/bcomic/ClassPage?',
                // url:'https://apis.netstart.cn/bcomic/ClassPage?styleId=-1&areaId=-1&isFinish=-1&order=0&pageNum=1&pageSize=39&isFree=-1'
                 params: {
                    styleId:this.styleid,//18
                    areaId:this.areaid,
                    isFinish:this.isfinish,//15
                    order:this.orders,//1
                    pageNum:1,//1
                    pageSize:39,//1
                    isFree:this.free,//1
                 }
             

            }).then(res => {
                  console.log("res",res);
                    console.log("titlelist",res.data.data);
                  this.resultarr=res.data.data;
                console.log("this.resultarr",this.resultarr);
                // 遍历对象/数组将img添加到this.bannerimg中
            }).catch(err => {
                  console.log("err",err);
            })
              this.areasIndex = index;
        },
        // 状态 是否完结 
        clickstatus(index) {
             
              console.log('index ==> ', index);

              if (this.statusIndex === index) {
                console.log('已经处于激活状态');
                return;
              }
            this.isfinish=this.statuslist[index]? this.statuslist[index].id :-1;
           console.log("this.isfinish",this.isfinish);

            this.axios({
                method: 'get',
                url: 'https://apic.netstart.cn/bcomic/ClassPage?',
                // url:'https://apis.netstart.cn/bcomic/ClassPage?styleId=-1&areaId=-1&isFinish=-1&order=0&pageNum=1&pageSize=39&isFree=-1'
                 params: {
                    styleId:this.styleid,//18
                    areaId:this.areaid,
                    isFinish:this.isfinish,//15
                    order:this.orders,//1
                    pageNum:1,//1
                    pageSize:39,//1
                    isFree:this.free,//1
                 }
             

            }).then(res => {
                  console.log("res",res);
                    console.log("titlelist",res.data.data);
                  this.resultarr=res.data.data;
                console.log("this.resultarr",this.resultarr);
                // 遍历对象/数组将img添加到this.bannerimg中
            }).catch(err => {
                  console.log("err",err);
            })

              this.statusIndex = index;
        },
        // 收费
        clickprices(index) {
             
              console.log('index ==> ', index);

              if (this.pricesIndex === index) {
                console.log('已经处于激活状态');
                return;
              }
            
            this.isfree=this.priceslist[index]? this.priceslist[index].id :-1;
            console.log("this.isfree",this.isfree);
            this.axios({
                method: 'get',
                url: 'https://apic.netstart.cn/bcomic/ClassPage?',
                // url:'https://apis.netstart.cn/bcomic/ClassPage?styleId=-1&areaId=-1&isFinish=-1&order=0&pageNum=1&pageSize=39&isFree=-1'
                 params: {
                    styleId:this.styleid,//18
                    areaId:this.areaid,
                    isFinish:this.isfinish,//15
                    order:this.orders,//1
                    pageNum:1,//1
                    pageSize:39,//1
                    isFree:this.free,//1
                 }
             

            }).then(res => {
                  console.log("res",res);
                    console.log("titlelist",res.data.data);
                  this.resultarr=res.data.data;
                console.log("this.resultarr",this.resultarr);
                // 遍历对象/数组将img添加到this.bannerimg中
            }).catch(err => {
                  console.log("err",err);
            })
              this.pricesIndex = index;
        },
        // 排序
        clickorders(index) {
             
              console.log('index ==> ', index);

              if (this.ordersIndex === index) {
                console.log('已经处于激活状态');
                return;
              }
            
                
                this.orders=this.orderslist[index]? this.orderslist[index].id : 0;
                if (this.orders==-1) {
                    this.orders=0
                }
               console.log("this.orders",this.orders);
                  this.axios({
                method: 'get',
                url: 'https://apic.netstart.cn/bcomic/ClassPage?',
                // url:'https://apis.netstart.cn/bcomic/ClassPage?styleId=-1&areaId=-1&isFinish=-1&order=0&pageNum=1&pageSize=39&isFree=-1'
                 params: {
                    styleId:this.styleid,//18
                    areaId:this.areaid,
                    isFinish:this.isfinish,//15
                    order:this.orders,//1
                    pageNum:1,//1
                    pageSize:39,//1
                    isFree:this.free,//1
                 }
             

            }).then(res => {
                  console.log("res",res);
                    console.log("titlelist",res.data.data);
                  this.resultarr=res.data.data;
                console.log("this.resultarr",this.resultarr);
                // 遍历对象/数组将img添加到this.bannerimg中
            }).catch(err => {
                  console.log("err",err);
            })

              this.ordersIndex = index;
        },
        // 全部的书
        getallbook(){
          

                console.log("again idarr" ,this.idarr);
               this.axios({
                method: 'get',
                url: 'https://apic.netstart.cn/bcomic/ClassPage?',
                // url:'https://apis.netstart.cn/bcomic/ClassPage?styleId=-1&areaId=-1&isFinish=-1&order=0&pageNum=1&pageSize=39&isFree=-1'
                 params: {
                    styleId:sid,//18
                    areaId:-1,
                    isFinish:-1,//15
                    order:0,//1
                    pageNum:1,//1
                    pageSize:39,//1
                    isFree:-1,//1
                 }
             

              }).then(res => {
                  console.log("res",res);
                    console.log("titlelist",res.data.data);
                  this.resultarr=res.data.data;
                console.log("this.resultarr",this.resultarr);
                // 遍历对象/数组将img添加到this.bannerimg中
              }).catch(err => {
                  console.log("err",err);
              })

        },
        //跳转漫画详情
        keepdetail(index){
           console.log('index ==> ', index);

              if (this.bookindex === index) {
                console.log('已经处于激活状态');
                return;
              }
              console.log("this.homerecommend[index]",this.resultarr[index].season_id);

               let routerName=this.$router.history.current.name;
        
               console.log("routerName",routerName);


              if (routerName=="Detail") {
                  return;
              }
              // 向搜索页面传值
              // this.$router.push({name: 'Detail',query:{bookid:this.resultarr[index].season_id}});
              this.$store.commit('changeDetailId',this.resultarr[index].season_id)
              this.$router.push({name: 'Detail'});

              this.bookindex = index;
        }


        },
         
        
    }
</script>

<style lang="scss" scoped>
       h2{
           margin-top:100px
       }
      .wrapper{
            width: 1164px;
            // height: 3293px;
            margin: auto;
            /* background-color: bisque; */
            padding-top: 16px;
            // background-color: antiquewhite;
            margin-top: 42px;
        }
        .style-section{
            width: 1150px;
            height: 186px;
            margin: 24px 0px;
            // background-color: aquamarine;
            font-size: 14px;
        }
        .tag-block{
            width: 100%;
            height: 29px;
            // background-color: red;
            margin-bottom: 12px;
        }
        .block-title{
            width: 28px;
            height: 28px;
            // background-color: greenyellow;
            float: left;
            margin-right: 14px;
            color: #a8a8a8;
            line-height: 28px;
            text-align: center;
        }
        .tag-containers{
            width: 1050px;
            height: 29px;
            // background-color: cadetblue;
            float: left;
            display: flex;
            color: black;
        }
        .tag-containers >div{
            // width: 28px;
            height: 28px;
            padding: 0px 10px;
            margin-right: 4px;
            text-align: center;
            line-height: 28px;
            // background-color: gold;
            margin-right:0px ;
            cursor: pointer;
        }
        .style-tag.active{
            color: #32aaff;
        }
         /* 利用伪元素来清除浮动  */
        .clearfix::after {
          content: "";
          display: block;
          clear: both;
        }
           .list-section{
            width: 1160px;
            height: 1836px;
            // background-color: blueviolet;
            margin-top:81px
        }
        .data-list{
            width: 100%;
            height: 1836px;
        }
        .list-item{
            width: 180px;
            height: 282px;
            // background-color: #32aaff;
            margin-bottom: 24px;
            margin-right: 13px;
            float: left;
            cursor: pointer;
        }
     
        .list-item img{
            width: 180px;
            height: 240px;
            // background-color:gold;
        }
        .list-item .title{
            width: 180px;
            height: 18px;
            margin-bottom: 2px;
            font-size: 14px;
            margin-top: 2px;
              overflow: hidden;
            white-space: nowrap;/* 防止文字换行 */
            text-overflow: ellipsis; /* 超出部分显示省略号 */
        }
        .list-item .text{
            width: 180px;
            height: 16px;
            font-size: 12px ;
            color:#a8a8a8;
        }
</style>