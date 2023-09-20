<template>
    <div>
        <div class="search-list">
        <div class="keyword-hinter">
            <span class="keyword" v-html="searchcontent"></span>
            <span>的搜索结果</span>
            <div class="data-list">
                <div class="list-item" v-for="(item, index) in cartoonlist" @click="keepdetail(index)">
                    
                     <img :src="item.vertical_cover" alt="" >
                    <div class="text-box">
                        <h2 class="title" v-html="item.title" :title="item.org_title">
                            <!-- <em class="keyword">鬼灭之刃</em> -->
                            
                            <!-- {{item.title}} -->
                        </h2>
                        <div class="footer-text">
                            <!-- <div class="text">{{item.author_name}}</div> -->
                            <!-- <div class="author" v-if="item.author_name.length==3">{{item.author_name[0]}} {{item.author_name[1]}} {{item.author_name[2]}}</div>
                            <div class="author" v-if="item.author_name.length==2">{{item.author_name[0]}} {{item.author_name[1]}}</div>
                            -->
                           <div class="author" >
                           <span v-html="item.author_name[0]"></span>
                           <span v-html="item.author_name[1]"></span>
                           <span v-html="item.author_name[2]"></span>
                           </div>
                            <div class="text">{{item.styles[0]}}</div>
                            <div class="text" v-if="item.is_finish==1">已完结</div>
                            <div class="text" v-if="item.is_finish==0">更新中</div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name:"Search",

             data(){
            return{
                cartoonlist:[],
                recommendlist:[],
                searchcontent:"",
                styleId:-1,
                bookindex:-1,
            }
        },

           created() {


             this.$nextTick(() => {
                 this.getvalue();
                this.getsearch(this.styleId,this.searchcontent);
                this.searchrecommend();
                
             })
       },

         methods:{
             // 更新作品列表1
            getsearch(id1,key){
                console.log("this.searchcontent",this.searchcontent);
                // let key=this.searchcontent;
                  this.axios({
                   method: 'get',
                   url: 'https://apic.netstart.cn/bcomic/Search',
                     params: {
                        
                        styleId:id1,//分类id
                        areaId:2,
                        isFinish:-1,
                        order:-1,
                        pageNum:1,
                        pageSize:20,
                        isFree:-1,
                        keyWord:key,//关键词
                     }

                 }).then(res => {
                     console.log("res",res);
                       console.log("getsearch",res.data.data.list);
                       this.cartoonlist=res.data.data.list;

                 }).catch(err => {
                     console.log("err",err);
                 })
                console.log("this.cartoonlist",this.cartoonlist);
            },  
            searchrecommend(){
                    this.axios({
                   method: 'get',
                   url: 'https://apic.netstart.cn/bcomic/SearchRecommend',
                    params: {
                        
                       num:10,
                     }

                 }).then(res => {
                     console.log("res",res);
                       console.log("searchrecommend",res.data.data);
                       this.recommendlist=res.data.data;
            
                 }).catch(err => {
                     console.log("err",err);
                 })
            },
            getvalue(){
                this.searchcontent=this.$route.query.searchtext;
            },
                 //跳转漫画详情
            keepdetail(index){
                console.log('index ==> ', index);

              if (this.bookindex === index) {
                console.log('已经处于激活状态');
                return;
              }
              console.log("this.homerecommend[index]",this.cartoonlist[index].id);

               let routerName=this.$router.history.current.name;
        
               console.log("routerName",routerName);


              if (routerName=="Detail") {
                  return;
              }
              // 向搜索页面传值
              // this.$router.push({name: 'Detail',query:{bookid:this.resultarr[index].season_id}});
              this.$store.commit('changeDetailId',this.cartoonlist[index].id)
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
        .search-list{
            width: 1160px;
            height: 688px;
            margin: auto;
            margin-top: 51px;
            // background-color: aqua;
            font-size: 12px;
            overflow: hidden;
        }
        .keyword-hinter{
            color: rgba(0,0,0,.87);
            font-size: 14px;
            margin: 32px 0;
            width: 100%;
            // height: 18px;
            // line-height: 18px;
            // background-color: chartreuse;
        }
        .keyword{
            color: #32aaff !important;
        }
        em{
            color: #32aaff !important;
            margin:0 10px;
            display:block !important;
        }
        .data-list{
            width: 1160px;
            height: 638px;
            // background-color: antiquewhite;
            margin-top: 32px;
        }
        .list-item{
            width: 386px;
            height: 181px;
            margin-bottom: 32px;
            background-color: blue;
            position: relative;
            float: left;
            cursor: pointer;
            display:block
        }
        .list-item img{
            width: 136px;
            height: 181px;
            background-color: gainsboro;
        }
        .list-item  .text-box{
            width: 220px;
            height: 181px;
            padding: 0 16px;
            background-color: white;
            position: absolute;
            top: 0px;
            left: 136px;
        }
        .list-item  .text-box h2{
            
            font-style: normal;
            overflow: hidden;
            text-overflow: ellipsis;
             white-space: nowrap;
        }
        .list-item  .text-box h2 em{
            color: #32aaff;
        }
        .footer-text{
            width: 220px;
            height: 63px;
            color: rgba(0,0,0,.3);
            font-size: 13px;
            line-height: 1.6;
            /* padding: 0 16px; */
            /* background-color: red; */
            margin-top: 78px;
        }
        .footer-text .author>span{
            margin-right:5px
        }
</style>