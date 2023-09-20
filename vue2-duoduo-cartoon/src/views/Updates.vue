<template>
    <div>
        <div class="wrapper">
         <div class="listheader">
            <h2>更新推荐</h2>
            <div class="date-selector ">
                <div :class="`date ${index === dateIndex ? 'active' : ''}`" v-for="(item, index) in datearr"
                 @click="clickdate(index)" ref="date">{{item.title}}</div>
                
            </div>
         </div>
         <div class="listbody" ref="list" @mouseenter="rightshow" @mouseleave="rightnone">
             <div class="box"  ref="listbox">
                    <div class="item" v-for="(item, index) in listarr" @click="keepdetail(index)">
                     <!-- <img :src="item.vertical_cover" alt="" > -->
                     <img :src="item.horizontal_cover" alt="" >
                     <!-- <img :src="item.operate_cover" alt="" > -->
                      
                        <div class="title">{{item.title}}</div>
                        <div class="text">更新到 {{item.last_ord}} 话</div>
                    </div>
                   
             </div>
             <div class="button">
                 <div class="left" ref="left" @click="left">
                 <img src="../assets/updata1.svg" alt="">
                 </div>
                 <div class="right" ref="right" @click="right">
                 <img src="../assets/updata.svg" alt="">
                 </div>
             </div>
         </div>
    </div>
    </div>
</template>

<script>
    export default {
        name:'Updates',

         data(){
            return{
               page:0,
               dateIndex:-1,
               datearr:[
                   {
                       title:"周日"
                   },
                   {
                       title:"周一"
                   },
                   {
                       title:"周二"
                   },
                   {
                       title:"周三"
                   },
                   {
                       title:"周四"
                   },
                   {
                       title:"周五"
                   },
                   {
                       title:"周六"
                   },
               ],
               listarr:[],
               bookindex:-1,


            }
        },
         created() {


             this.$nextTick(() => {
                 
                 console.log("datearr.lenght",this.datearr.length);

                
                this.clickdate(0);
                // this.updatalist1();  
                // this.updatalist2();
             })
       },
        methods:{
            rightshow(){
                let right=this.$refs.right;
                right.style.display="block";
            },
            rightnone(){
                let right=this.$refs.right;
                right.style.display="none";
            },
            left(){
                   let left=this.$refs.left;
                let right=this.$refs.right;
                let list=this.$refs.list;
                let listbox=this.$refs.listbox;
                this.page--;
                console.log("left",left);
                console.log("right",right);
                if (this.page<0) {
                  this.page=0;
                }
       
                listbox.style.marginTop=-this.page*list.clientHeight+"px";
                if (this.page<1) {
                    left.style.display="none";
                }
            },
            right(){
                let left=this.$refs.left;
                let right=this.$refs.right;
                let list=this.$refs.list;
                let listbox=this.$refs.listbox;
                console.log("this.listarr.length",this.listarr.length);
                if (this.listarr.length>8) {
                    this.page++;
                }
                
                console.log("left",left);
                console.log("right",right);
                if (this.page>1) {
                  this.page=1;
                }
       
                listbox.style.marginTop=-this.page*list.clientHeight+"px";
                if (this.page>0) {
                    left.style.display="block";
                }
                
            },
            clickdate(index) {
             
              console.log('index ==> ', index);

              if (this.dateIndex === index) {
                console.log('已经处于激活状态');
                return;
              }
            
              if (index==0) {
                this.axios({
                    method: 'get',
                    url: 'https://apic.netstart.cn/bcomic/GetClassPageSixComics?id=189&pageNum=1&pageSize=15&isAll=1',
                    //  params: {
                    //     id: 18,//18
                    //     pageNum:1,
                    //     pageSize:15,//15
                    //     isAll:1,//1
                    //  }

                }).then(res => {
                       console.log("res",res);
                         console.log("index==0",res);
                     // this.caipuData = res.data.result.list;

                     this.listarr=res.data.data.roll_six_comics;
                     console.log("this.listarr",this.listarr);
                     console.log("img",this.listarr[0].horizontal_cover);

                     // 遍历对象/数组将img添加到this.bannerimg中
                }).catch(err => {
                  console.log("err",err);
                })
              }
              if (index==2||index==4||index==6) {
                 this.axios({
                    method: 'get',
                    url: 'https://apic.netstart.cn/bcomic/GetClassPageSixComics?',
                     params: {
                        id: 13,//18
                        pageNum:1,
                        pageSize:6,//15
                        isAll:0,//1
                     }

                }).then(res => {
                       console.log("res",res);
                         console.log("updatalist1",res);
                     // this.caipuData = res.data.result.list;
        
                     this.listarr=res.data.data.roll_six_comics;
                     console.log("this.listarr",this.listarr);
                     console.log("img",this.listarr[0].horizontal_cover);
        
                     // 遍历对象/数组将img添加到this.bannerimg中
                }).catch(err => {
                  console.log("err",err);
                })
              }
              if (index==1||index==3||index==5) {
                 this.axios({
                     method: 'get',
                     // url: 'https://apis.netstart.cn/bcomic/HomeRecommend',
                     url: 'https://apic.netstart.cn/bcomic/Recommend',
              

                 }).then(res => {
                    //   console.log("res",res);
                        console.log("updatalist2",res);
                    // this.listarr = res.data.data.list;

                    this.listarr=res.data.data;
                    console.log("index",res.data.data);
                    // console.log("img",this.listarr[0].horizontal_cover);

                    // 遍历对象/数组将img添加到this.bannerimg中
                 }).catch(err => {
                     console.log("err",err);
                 })
              }

              this.dateIndex = index;
            },
            // 更新作品列表1
             updatalist1(){

               this.axios({
                method: 'get',
                url: 'https://apic.netstart.cn/bcomic/GetClassPageSixComics?',
                 params: {
                    id: 13,//18
                    pageNum:1,
                    pageSize:6,//15
                    isAll:0,//1
                 }

              }).then(res => {
                  console.log("res",res);
                    console.log("updatalist1",res);
                // this.caipuData = res.data.result.list;

                this.listarr=res.data.data.roll_six_comics;
                console.log("this.listarr",this.listarr);
                console.log("img",this.listarr[0].horizontal_cover);

                // 遍历对象/数组将img添加到this.bannerimg中
              }).catch(err => {
                  console.log("err",err);
              })

            },
            // 更新作品列表2
             updatalist2(){

               this.axios({
                method: 'get',
                // url: 'https://apis.netstart.cn/bcomic/HomeRecommend',
                url: 'https://apic.netstart.cn/bcomic/Recommend',
              

              }).then(res => {
                //   console.log("res",res);
                    console.log("updatalist2",res);
                // this.listarr = res.data.data.list;

                // this.listarr=res.data.data.roll_six_comics;
                console.log("this.listarr",res.data.data.list);
                // console.log("img",this.listarr[0].horizontal_cover);

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
              console.log("this.homerecommend[index]",this.listarr[index].comic_id);

               let routerName=this.$router.history.current.name;
        
               console.log("routerName",routerName);


              if (routerName=="Detail") {
                  return;
              }
              // 向搜索页面传值
              // this.$router.push({name: 'Detail',query:{bookid:this.resultarr[index].season_id}});
              this.$store.commit('changeDetailId',this.listarr[index].comic_id)
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
         width: 1024px;
         margin: auto;
         /* background-color: bisque; */
         margin-top:75px;
     }
     .listheader{
        width: 1024px;
        height: 43px;
        /* background-color: antiquewhite; */
        margin: auto;
        margin-bottom: 24px;
     }
     .listheader h2{
        color: rgba(0,0,0,.87);
        font-size: 32px;
        font-weight: 400;
        margin: 0;
        float: left;
        margin-left:5px;
     }
     .date-selector {
         float: left;
        width: 504px;
        height: 23px;
        /* background-color: red; */
        display: flex;
        margin-top: 10px;
        margin-left: 28px;
     }
     .date-selector .date{
        width: 32px;
        height: 21px;
        padding: 1px 6px;
        /* background-color: greenyellow; */
        margin-right: 28px;
        color: #6e6e6e;
        cursor: pointer;
     }
     .date.active{
         color:#32aaff;
         position: relative;
     }
    .date.active::after {
        background-color: #32aaff;
        border-radius: 1px;
        bottom: -5px;
        content: "";
        height: 3px;
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
         width: 8px;
    }
    .listbody{
        width: 1024px;
        height: 478px;
        /* background-color: aquamarine; */
       overflow: hidden; 
        position: relative;
        margin-top:0px;
    }
    .listbody >.box{
        margin-top:0px
    }
    .item{
        width: 244px;
        height: 215px;
        padding: 0 6px;
        margin-bottom:24px ;
        /* background-color: red; */
        float: left;
        cursor: pointer;
    }
    .item img{
        width: 100%;
        height: 156px;
        border-radius: 4px;
        
    }
    .item .title{
        width: 244px;
        height: 25px;
        /* background-color: aqua; */
        margin: 8px 0px;
        font-size: 18px;
        color: black;
    }
    .item .text{
        width: 244px;
        height: 18px;
        /* background-color:burlywood; */
        font-size: 13px;
        color: #a5a5a5;
    }
    .listbody .button>div{
        width: 32px;
        height: 80px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 32px;
        z-index: 1;
        background-color: rgba(0,0,0,.5);
         background-size: 40%;
         color: #fff;
        font-size: 20px;
        text-align: center;
        line-height: 80px;
    }
    .listbody .button >div img{
        width:20px;
        height:78px;
    }
    .listbody .button .left{
      left: 6px;
      display:none;
    }
    .listbody .button .right{
      right: 6px;
      display:none;
    }
</style>