<template>
    <div>
       
         <div id="app" v-for="(item, index) in datalist">
        <div class="wrapper">
            <div class="header-info clearfix">
                  <img :src="item.vertical_cover" alt="" >
                <div class="cartoon-info">
                    <div class="cartoon-title">{{item.title}}</div>
                    <div class="author" v-if="item.author_name.length>1">{{item.author_name[0]}},{{item.author_name[1]}}</div>
                    <div class="author" v-else-if="item.author_name.length=1">{{item.author_name[0]}}</div>
                    <div class="cartoon-style">
                        <span class="icon"><img src="../assets/tagicon.svg" alt=""></span>
                        <span>{{item.styles[0]}}</span>
                    </div>
                    <div class="last-update">
                        <span  class="icon"><img src="../assets/updateicon.svg" alt=""></span>
                        <span v-if="item.is_finish==1">[完结] 共 {{item.last_ord}} 话</span>
                        <span v-else-if="item.is_finish==0">更新至 {{item.last_ord}} 话</span>
                    </div>
                    <div class="text">
                        {{item.evaluate}}
                        
                    </div>
                    <div class="btn-box">
                        <div class="start-read" @click="keepcontent(item,User)" v-model="readrecord">开始阅读 第 {{eqindex+1}} 话</div>
                        <div class="like " v-model="likeindex" v-if="likeindex==0" ref="noon" @click="islike(item,User)" >
                            
                              <img src="../assets/like.svg" alt="">
                            <span>追漫</span>
                        </div>

                        <div  class="like " v-model="likeindex" v-if="likeindex==1" ref="on" @click="nolike" >
                            <!-- <div class="img"></div> -->
                              
                              <img  src="../assets/likeactive.svg" alt="">
                            
                            <span >已追</span>
                        </div>
                    
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-list">
                    <div class="section-title">章节列表</div>
                    <div class="eq-list">
                        <div class="list-header">
                             
                            <div :class="`header-item ${index === headerindex ? 'active' : ''}`"
                             v-for="(items, index) in headerarr" @click="clickheader(index)" >{{items.text}}</div>
                           
                        </div>
                        <!-- 具体章节题目列表 -->
                        <div class="databox" ref="databox">
                             <div class="list-data  clearfix"  ref="datalist">
                                <div :class="`list-item ${index === eqindex ? 'active' : ''}`"  v-for="(item, index) in eplist" @click="clickep(index,datalist)">
                                    <div class="short-title">{{index+1}}</div>
                                    <div class="title"> {{item.title}}</div>
                                    
                                </div>
                                <div class="nocontent" v-if="completeindex==1">已经没有章节了</div>
                             </div>
                        </div>
                       
                     
                        
                        <!-- 评论 -->
                        <div class="comment-section">评论</div>
                        <div class="comment-mounter">
                            <div class="comment-header">
                                <div :class="`hot-sort ${index === selectindex ? 'on' : ''}`" 
                                 v-for="(item, index) in selectarr" @click="clickselect(index)">
                                    {{item.text}}
                                </div>
                               
                            </div>
                            <!-- 发送评论 -->
                            <div class="send clearfix">
                                <div class="userimg"><img src="../assets/userimg.jpg" alt=""></div>
                                <div class="textarea-container">
                                    <textarea cols="80" name="msg" rows="5"  ref="textarea"
                                    placeholder="发一条友善的评论" class="ipt-txt" >

                                    </textarea>  
                                </div>
                                <button type="submit" class="comment-submit" @click="sendtext(User)">发表评论</button>
                            </div>

                            <!-- 评论列表 -->
                            <div class="comment-list">
                                <div class="list-item" v-for="(item, index) in commentlist">
                                    <div class="user-face">
                                        <a href="#">
                                            <img :src="item.member.avatar" alt="">
                                            
                                        </a>
                                    </div>
                                    <div class="con">
                                        <div class="user">
                                            <span class="name">{{item.member.uname}}</span>
                                        </div>
                                        <p v-html="item.content.message">
                                            
                                        </p>
                                        <div class="info">
                                            <span class="time-location">
                                                <span class="reply-time">2019-04-02 00:01</span>
                                            </span>
                                            <span class="like ">
                                                <i>赞 </i>
                                                <span>{{item.like}}</span>
                                            </span>
                                            <span class="hate ">
                                                <i>踩</i>
                                            </span>
                                            <span class="reply btn-hover btn-highlight">回复</span>
                                            <div class="operation more-operation">
                                                <div class="spot">...</div>
                                                <div class="opera-list">
                                                    <ul>
                                                        <li class="blacklist">加入黑名单</li>
                                                        <li class="report">举报</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="reply-box">
                                            <div class="reply-item" v-for="(item, index) in item.replies">
                                                <a href="#" class="reply-face">
                                                    <img :src="item.member.avatar" alt="">
                                                </a>
                                                <div class="reply-con">
                                                    <div class="user">
                                                        <a href="" class="name">{{item.member.uname}}</a>
                                                       
                                                    </div>
                                                    <span class="text-con">{{item.content.message}}</span>
                                                </div>
                                                 
                                                <div class="info">
                                                    <span class="time-location">
                                                        <span class="reply-time">2019-04-02 00:01</span>
                                                        
                                                    </span>
                                                    <span class="like ">
                                                        <i>赞 </i>
                                                        <span>{{item.like}}</span>
                                                    </span>
                                                    <span class="hate ">
                                                        <i>踩</i>
                                                    </span>
                                                    <span class="reply btn-hover btn-highlight">回复</span>
                                                    <div class="operation more-operation">
                                                        <div class="spot">...</div>
                                                        <div class="opera-list">
                                                            <ul>
                                                                <li class="blacklist">加入黑名单</li>
                                                                <li class="report">举报</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            

                                            <!-- total -->
                                            <div class="view-more">
                                                共
                                                <b>{{item.rcount}}</b>
                                                条回复, 
                                                <a class="btn-more" data-pid="1496426337" data-fold="false">
                                                    点击查看
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="right-side">
                    <div class="header-content">
                        <div  class="title">推荐漫画</div>
                        <a href="#" class="more">
                            <div >更多</div>
                            <div  class="img"> > </div>
                        </a>
                    </div>
                    <div class="content-list">
                        <a href="#" v-for="(item, index) in recommendlist" @click="keepdetail(index)">
                            <div class="list-item">
                                 <img :src="item.vertical_cover" alt="" >
                                <div class="comic-detail">
                                    <div class="title">{{item.title}}</div>
                                    <div class="comic-info">
                                        <div class="author" v-if="item.authors.length==3">{{item.authors[0].cname}} {{item.authors[1].cname}} {{item.authors[2].cname}}</div>
                                        <div class="author" v-if="item.authors.length==2">{{item.authors[0].cname}} {{item.authors[1].cname}}</div>
                                        <div class="author" v-if="item.authors.length==1">{{item.authors[0].cname}}</div>
                                        <div class="style">{{item.styles[0]? item.styles[0].name :'' }}</div>
                                        <div class="update" v-if="item.is_finish==1">[完结] 共 {{item.last_ord}} 话</div>
                                        <div class="update" v-if="item.is_finish==0">更新至 {{item.last_ord}} 话</div>
                                    </div>
                                </div>
                            </div>
                           
                        </a>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name:"Detail",

         data(){
            return{
                headerindex:0,
                headerarr:[
                    {
                        text:"1 - 50"
                    },
                    {
                        text:"51 - 100"
                    },
                    {
                        text:"101 - 150"
                    },
                    {
                        text:"151 - 200"
                    },
                    {
                        text:"201 - 250"
                    },
                ],
                datalist:[],
                likeindex:"0",
                eplist:[],
                n:0,
                selectarr:[
                    {
                        text:"按热度排序"
                    },
                    {
                        text:"按时间排序"
                    }
                ],
                selectindex:0,
                recommendlist:[],
                commentlist:[],
                completeindex:0,
                eqindex:0,
                readrecord:0,
                bookid:"25717",
                likebox:[],
                bookindex:-1,
                textvalue:'',
                readbook:[],
                curep:1,
                alllike:[],
                
            }
        },

        computed:{
            bookId(){
                return this.$store.state.detailid;
            },
            User(){
                return this.$store.state.user;
            },
            geteprecord(){
                return this.$store.state.eprecord;
            },
            getepreadcord(){
                return this.$store.state.readrecord;
            },
            getsendarr(){
                return this.$store.state.sendarr;
            }
        },

        created() {


             this.$nextTick(() => {
                 this.getvalue();
                //  this.listitem();
                this.getvalue1(this.User,this.bookId)
                 this.getdetaillist(this.bookId);
                 this.getrecommend(this.bookId);
                 this.getcomment(this.bookId);
                this.clickheader(0);
                this.clickselect(0);
                // this.geteqindex(this.geteprecord,this.getepreadcord);
                // this.geteqindex1(this.getsendarr,this.datalist)
                this.clickep(this.eqindex,this.datalist,this.User);
                this.cleareprecord();
            
             })
       },


         methods:{
               getvalue1(User,BookId){
                if (User&&User.code==200) {
                      let isthis=this;
                    this.bookid=BookId;
                    console.log("this.bookid",this.bookid);
                    console.log("getvalue---user",User);
              
                    isthis.alllike= User.alllike;
                  console.log("isthis.alllike",isthis.alllike);
               
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
            },	

             cleareprecord(){
                    this.$store.commit('changeEprecord',0)
             },
             geteqindex1(getsendarr1,datalist){
                 let isthis=this;
                 console.log("getsendarr1",getsendarr1.length);
                 console.log("getsendarr1",getsendarr1);
              if((getsendarr1.length==1)){
                   console.log("getsendarr1.length==1 ,运行了第一层的代码");
                       getsendarr1.forEach(function (item,index) {
                         console.log("item,index");
                         console.log(item,index);
                         
                             if (item.bookid==isthis.datalist[0].id) {
                             console.log("运行了最里面的代码");
                              isthis.eqindex=item.eprecord;
                            isthis.readrecord=item.readrecord;
                           
                         }
                           
                         
                     });
                 }
                 else if(getsendarr1.length>1){
                       console.log("getsendarr1.length>1 ,运行了第二层的代码");
                     getsendarr1.forEach(function (item,index) {
                         console.log("item,index");
                         console.log(item,index);
                         if (item.bookid==isthis.datalist[0].id) {
                             console.log("运行了最里面的代码");
                              isthis.eqindex=item.eprecord;
                            isthis.readrecord=item.readrecord;
                           
                         }
                     });
                 }
                  console.log("this.eqindex",isthis.eqindex);
                console.log("this.readrecord",isthis.readrecord);
               console.log("已经运行 geteqindex1 了");
             },
             geteqindex(eprecord1,readrecord1){
                //  if (eprecord1!==0) {
                // this.eqindex=eprecord1;
                //  this.readrecord=readrecord1;
                //  console.log("this.eqindex",this.eqindex);
                //  console.log("this.readrecord",this.readrecord);
                //  }
               
             },
             sendtext(User){
                 let isthis=this
                 if (User.code == 200) {
                     console.log("可以评论");
                      let textarea=this.$refs.textarea;
                        console.log("textarea.value",textarea);
                        console.log("textarea.value",textarea[0].value);
                    this.textvalue=textarea[0].value;
                    let curUser={
                        member:{
                            avatar:require('../assets/userimg.jpg'),
                            uname:User.name,
                        },
                        
                       
                        content:{
                            message:isthis.textvalue,
                        },
                        currentindex:1,
                        time:"2023-08-29 15:00",
                        like:0,
                        hate:0,
                        replies:[],
                    }
                    this.commentlist.unshift(curUser)
                    console.log("curUser",curUser);
                    console.log(" this.recommendlist", this.commentlist);
                 }else{
                      alert("请先登录")
                 }
                
                 console.log("user",User);

             },
              getvalue(){
                this.bookid=this.$route.query.bookid;
                
            },
            //  漫画详情
              getdetaillist(id){
                  let isthis=this;
                console.log("id",id);
                  this.axios({
                   method: 'get',
                   url: 'https://apic.netstart.cn/bcomic/ComicDetail?',
                    params: {
                       comicId:id,
                      }

                 }).then(res => {
                     console.log("res",res);
                       console.log("getdetaillist",res);
                   // this.caipuData = res.data.result.list;
                    this.datalist.push(res.data.data);
                   console.log("detail.datelist",this.datalist);
                  
                    this.eplist=res.data.data.ep_list;
                    console.log("this.eqlist",this.eplist);
                   
                    isthis.geteqindex1(isthis.getsendarr,isthis.datalist)
                    
                 }).catch(err => {
                     console.log("err",err);
                 })

            },  
            //  相关漫画推荐
              getrecommend(id){

                  this.axios({
                   method: 'get',
                   url: 'https://apic.netstart.cn/bcomic/MoreRecommend',
                    params: {
                       comicId:id,
                      }

                 }).then(res => {
                     console.log("res",res);
                       console.log("getrecommend",res);
                   this.recommendlist = res.data.data.recommend_comics;
                  
                   console.log(" this.recommendlist", this.recommendlist);
                  
                    //     this.eplist=res.data.data.ep_list;
                    //     console.log("this.eqlist",this.eplist);
                   
                 }).catch(err => {
                     console.log("err",err);
                 })

            },  
            // 评论
            getcomment(id){
                    
                  this.axios({
                   method: 'get',
                   url: 'https://apic.netstart.cn/bcomic/ReplyMain',
                    params: {
                       oid:id,
                      }

                 }).then(res => {
                     console.log("res",res);
                       console.log("getcomment评论",res);
                   this.commentlist = res.data.data.replies;
                   console.log("this.commentlist",this.commentlist);
                  
                
                   
                 }).catch(err => {
                     console.log("err",err);
                 })
            },
            islike(datalist,User){
                let isthis=this;
                if (User.code == 200) {
                    // let datalist=this.datalist;
                    if (this.likeindex==0) {
                        this.likeindex=1
                    }
                    let likemessage={
                        bookid:datalist.id,
                        img:datalist.vertical_cover,
                        title:datalist.title,
                        author:datalist.author_name,
                        last_ord:datalist.last_ord,
                        isfinish:datalist.is_finish,
                        readep:[],
                        likeindex:isthis.likeindex,
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
            // 漫画部分
            clickheader(index){
                  console.log('index ==> ', index);

              if (this.headerindex === index) {
                console.log('已经处于激活状态');
                return;
              }
              this.n=index;
              
              let listdata1=this.$refs.datalist[0];
              console.log("listdata1",listdata1);
              
              console.log("this.eplist.length",this.eplist.length);
              if (index==4&&this.eplist.length>156&&this.eplist.length<209) {
                  this.completeindex=1;
              }
              else if (index==3&&this.eplist.length>104&&this.eplist.length<157){
                	this.completeindex=1;
              }
              else if (index==2&&this.eplist.length>52&&this.eplist.length<105){
                	this.completeindex=1;
              }
              else if (index==1&&this.eplist.length>0&&this.eplist.length<53){
                	this.completeindex=1;
              }
              else{
                  this.completeindex=0;
              }
           
                  listdata1.style.marginTop = -this.n*740+"px"
              this.headerindex = index;
            },
            clickep(index,datalist,User){
               console.log("User",User);
                // if (User.code == 200) {
                 console.log('index ==> ', index);

              if (this.eqindex === index) {
                console.log('已经处于激活状态');
                return;
              }
                this.readrecord=index+1;
                console.log("this.readrecord",this.readrecord);
              console.log("this.eplist[index]",this.eplist[index].id);

                let routerName=this.$router.history.current.name;
        
               console.log("routerName",routerName);


              if (routerName=="Content") {
                  return;
              }
                 let readmessage={
                        bookid:datalist.id,
                        img:datalist.vertical_cover,
                        title:datalist.title,
                        author:datalist.author_name,
                        last_ord:datalist.last_ord,
                        isfinish:datalist.is_finish,
                        readep:[],
                        startep:1,

                }
                 
                 this.readbook.push(readmessage);

                 this.$store.commit('changeRead',this.readbook)

                console.log("readmessagee",readmessage);
                console.log("this.readbook",this.readbook);
                console.log("this.datalist1231231231",this.datalist[0].title);
                console.log("clickep==>bookid",this.bookid);
                 let sendlist1={
                     epid:this.eplist[index].id,
                     eplist:this.eplist,
                     bookid:this.datalist[0].id,
                     curindex:1,
                     readrecord:index+1,
                     eprecord:index,
                     title:this.datalist[0].title,
                     datalist:this.datalist,
                    
                 }
                 this.readrecord=index+1;
                 console.log("sendlist1",sendlist1);
                 this.$store.commit('changeSendarr',sendlist1)
                 this.$store.commit('changeRead',this.readbook)

                this.$store.commit('changeReadlist',this.eplist)
                this.$store.commit('changeReadrecord',this.readrecord)
                this.$store.commit('changeEprecord',index)
                console.log("this.eplist[0].id",this.eplist[index].id);
                 this.$router.push({name: 'Content',query:{sendlist:sendlist1}});
                // this.$router.push({name: 'Content',query:{epid:this.eplist[index].id}});
                
               this.eqindex = index;
                // }else{
                //      alert("请先登录")
                // }
            },

            // 评论部分
            clickselect(index){
                  console.log('index ==> ', index);

              if (this.selectindex === index) {
                console.log('已经处于激活状态');
                return;
              }
              
              
         
              this.selectindex = index;
            },
            keepcontent(datalist,User){
                // if (User.code == 200) {
                  let routerName=this.$router.history.current.name;
                let isthis=this;
               console.log("routerName",routerName);


              if (routerName=="Content") {
                  return;
              }

                     let readmessage={
                        bookid:datalist.id,
                        img:datalist.vertical_cover,
                        title:datalist.title,
                        author:datalist.author_name,
                        last_ord:datalist.last_ord,
                        isfinish:datalist.is_finish,
                        readep:[],
                        startep:isthis.readrecord,

                    }
                 
                    this.readbook.push(readmessage);

                    this.$store.commit('changeRead',this.readbook)

                   console.log("readmessagee",readmessage);
                   console.log("this.readbook",this.readbook);
                   console.log("clickstart==>bookid",isthis.bookid);
                    // let sendlist1={
                    //     epid:this.eplist[0].id,
                    //     eplist:this.eplist,
                    //     readindex:0,
                    // }
                let sendlist1={
                     epid:this.eplist[this.readrecord].id,
                     eplist:this.eplist,
                     bookid:this.datalist[0].id,
                     curindex:1,
                     readrecord:this.readrecord+1,
                     eprecord:this.readrecord,
                     title:this.datalist[0].title,
                     datalist:this.datalist,
                 }
                //  this.readrecord=index+1;
                 console.log("sendlist1",sendlist1);
                 this.$store.commit('changeSendarr',sendlist1)

                    console.log("this.eplist[0].id",this.eplist[0].id);
                 this.$router.push({name: 'Content',query:{sendlist:sendlist1}});
                 this.$store.commit('changeReadlist',this.eplist)
                //  this.$router.push({name: 'Content',query:{epid:this.eplist[this.readrecord].id}});
                // }else{
                //      alert("请先登录")
                // }
           },
               //跳转漫画详情
            keepdetail(index,datalist){
                console.log('index ==> ', index);
    
                  if (this.bookindex === index) {
                    console.log('已经处于激活状态');
                    return;
                  }
                  console.log("this.homerecommend[index]",this.recommendlist[index].id);
    
                //   this.getdetaillist(this.recommendlist[index].id);
    
                   let routerName=this.$router.history.current.name;
            
                   console.log("routerName",routerName);
    
    
                  if (routerName=="Detail") {
                      return;
                  }

                




                  // 向搜索页面传值
                  // this.$router.push({name: 'Detail',query:{bookid:this.resultarr[index].season_id}});
                  this.$store.commit('changeDetailId',this.recommendlist[index].id)
                  this.$router.push({name: 'Detail'});
    
                  this.bookindex = index;


                    
              
                    
            }
        
          
                    
               
            
        }
    }
</script>

<style lang="scss" scoped>
        .send{
            position:relative;
              width: 840px;
            height: 94px;
            // background-color: goldenrod;
            text-align: center;
            line-height: 94px;
            margin: 10px 0px;
            padding-top: 15px;
        }
        .send .userimg{
            position: absolute;
            top: 18px;
            left: 20px;
            margin: auto;
            width:48px;
            height:48px;
        }
        .send .userimg img{
            width:48px;
            height:48px;
            border-radius:50%;
        }
        .textarea-container{  
            width:675px;
            height:65px;
            margin-left: 85px;
            margin-right: 80px;
            position:relative;
                box-sizing: content-box;
        }
        textarea{
            font-size: 12px;
            display: inline-block;
            box-sizing: border-box;
            background-color: #f4f5f7;
            border: 1px solid #e5e9ef;
            overflow: auto;
            border-radius: 4px;
            color: #555;
            width: 100%;
            height: 65px;
            transition: 0s;
            padding: 5px 10px;
            line-height: normal;
            outline: none;
        }
        .send button{
            width: 70px;
            height: 64px;
            position: absolute;
             right: 4px;
            top: 15px;
            padding: 4px 15px;
            font-size: 14px;
            color: #fff;
            border-radius: 4px;
            text-align: center;
            min-width: 60px;
            vertical-align: top;
            cursor: pointer;
            background-color: #00a1d6;
            border: 1px solid #00a1d6;
            transition: 0.1s;
            user-select: none;
            outline: none;
            // float:left;
        }
       /* 利用伪元素来清除浮动  */
        .clearfix::after {
          content: "";
          display: block;
          clear: both;
        }
        #app{
            width: 100%;
            height: 10374px;
            // background-color: antiquewhite;
            margin-top: 50px;
        }
       
        .header-info{
            width: 1120px;
            margin: auto;
            height: 320px;
            padding: 20px;
            // background-color: aqua;
        }
        .header-info img{
            width: 240px;
            height: 320px;
            // background-color: blue;
            float: left;
        }
        .cartoon-info{
            width: 852px;
            height: 320px;
            padding-left: 28px;
            // background-color: cadetblue;
            float: left;
        }
        .cartoon-info>div{
            width: 852px;
            font-size: 14px;
        }
        .cartoon-title{
            height: 37px;
            // background-color: antiquewhite;
            margin-bottom: 11px;
            line-height: 37px;
            font-size: 28px !important;
        }
        .author{
            height: 21px;
            // background-color: gold;
            line-height: 21px;
            font-size: 16px !important;
        }
        .cartoon-style{
            height: 29px;
            // background-color: blueviolet;
            color: #a8a8a8;
        }
        .icon{
            width: 16px;
            height: 16px;
            padding-right: 8px;
            text-align: center;
            line-height: 16px;
            font-size:14px;

            display: block;
            float: left;
            
        }
        .icon img{
            width: 16px;
            height: 16px;
             background-color: transparent;
        }
        .cartoon-style >span:nth-child(1){
            margin-top: 6px;
        }
        .cartoon-style >span:nth-child(2){
            display: block;
            width: 780px;
            height: 28px;
            float: left;
            line-height: 28px;
        }
        .last-update{
            color: #a8a8a8;
            height: 29px;
        }
        .btn-box{
            width: 852px;
            height: 44px;
            display: flex;
            margin-top: 51px;
        }
        .start-read{
            width: 158px;
            height: 23px;
            padding: 10px 20px;
            margin-right: 16px;
            border: 1px solid #33aaff;
            border-radius: 4px;
            line-height: 23px;
            text-align: center;
            font-size: 16px;
            color: white;
            cursor: pointer;
            background-color: #33aaff;
        }
        .start-read:hover{
            background-color: #149dff;
        }
        .btn-box .like{
            width: 103px;
            height: 23px;
            padding: 10px 20px;
            border: 1px solid rgba(0,0,0,.12);
            border-radius: 4px;
            text-align: center;
            line-height: 23px;
            font-size: 16px;
            display: flex;
            color: #474b4c;
            cursor: pointer;
           
        }
         .btn-box .like.noon{
             display:block;
         }
         .btn-box .like.on{
             display:none;
         }
        .btn-box .like:hover{
            background-color: #edfaff;
        }
        .btn-box .like img{
            width: 16px;
            height: 16px;
            background-color: transparent;
            margin-top: 3px;
            margin-left: 20px;
            margin-right: 12px;
        }
        .section{
            width: 1160px;
            height: 9650px;
            // background-color: darksalmon;
            margin: auto;
            margin-top: 12px;
           display: flex;
        }
        .section-list{
            width: 840px;
            height: 9610px;
            padding: 20px;
            // background-color: chartreuse;
        }
        .right-side{
            width: 228px;
            height: 760px;
            padding: 20px;
            // background-color: gold;
            margin-left: 12px;
            overflow:hidden;
        }
        .section-title{
            width: 840px;
            height: 30px;
            color: rgba(0,0,0,.87);
            font-size: 24px;
            line-height: 30px;
        }
        .eq-list{
            width: 840px;
            height: 812px;
            margin-top: 20px;
            // background-color: #149dff   ;
        }
        .list-header{
            width: 840px;
            height: 46px;
            // background-color: red;
            display: flex;
            overflow: hidden;
        }
        .header-item{
            width: 80px;
            height: 32px;
            margin-left: 12px;
            margin-top: 7px;
            border-radius: 16px;
            text-align: center;
            line-height: 32px;
            background-color: #f5f7f8;
            color: #6c6c6d;
            font-size: 13px;
            cursor: pointer;
        }
        .header-item.active{
            background-color: #def1ff;
            color: #4eaaff;
        }
        .databox{
             width: 840px;
            height:  740px;
            margin-top: 12px;
            // background-color: orange;
            overflow:hidden;
        }
        .list-data{
            width: 840px;
            height:  740px;
            margin-top: 12px;
            // background-color: orange;
            // overflow:hidden;
            // margin-top:0px;
           
        }
        .list-data.none{
            display: none !important;
        }
        .list-item{
            width: 173px;
            height: 41px;
            padding: 0px 0px;
            border: 1px solid rgba(0,0,0,.12);
            margin-right: 16px;
            margin-bottom: 16px;
            border-radius: 3px;
             
            color: rgba(0,0,0,.87);
            font-size: 14px;
            
            position: relative;
            display: flex;
            box-sizing: border-box;
            float: left;
            overflow: hidden;
             white-space: nowrap; /* 防止文字换行 */
            text-overflow: ellipsis;/* 超出部分显示省略号*/
            cursor: pointer;
        }
        .list-data .list-item.active{
                border-color: #32aaff!important;
            color: #32aaff!important;
            opacity: 1;
        }
      
        .list-item:hover{
            background-color: #edfaff;
        }
        .short-title{
            padding-right: 8px;
            margin-top: 11px;
            margin-left:13px
        }
        .list-item .title{
            width: 157px;
            height: 21px;
            line-height: 21px;
            margin-top: 9px;
             overflow: hidden;
             white-space: nowrap; /* 防止文字换行 */
            text-overflow: ellipsis;/* 超出部分显示省略号*/
        }
        .nocontent{
           
            width:400px;
            height:400px;
            margin:auto;
             margin-top:-2960px;
             text-align:center;
             line-height:400px;
        }
        .comment-section{
            width: 840px;
            height: 32px;
            margin-bottom: 24px;
            color: rgba(0,0,0,.87);
            font-size: 24px;
            font-weight: 400;
            margin-top: 20px;
        }
        .comment-mounter{
            width: 840px;
            height: 8652px;
            // background-color: yellow;
        }
        .comment-header{
            width: 840px;
            height: 36px;
            margin-bottom: 24px;
            border-bottom: 1px solid white;
            // background-color: red;
        }
        .hot-sort{
            width: 70px;
            height: 20px;
            padding: 8px 0px;
            margin-left: 16px;
            border-bottom: 1px solid transparent;
            text-align: center;
            line-height: 20px;
            position: relative;
            float: left;
            font-size: 14px;
             font-weight: bold;
            color: #222;
             cursor: pointer;
        }
        .hot-sort.on{
            border-bottom: 1px solid #00a1d6;
            color: #00a1d6;
        }
       
        .comment-list{
            width: 840px;
            height: 8396px;
            // background-color: palevioletred;
        }
        .comment-list .list-item{
            width: 840px;
            height: 400px;
            // background-color: #33aaff;
            box-sizing:border-box ;
            position: relative;
        }
        .user-face{
            height: 48px;
            margin: 24px 0 0 0px;
            position: absolute;
            width: 82px;
            // background-color: greenyellow;
        }
        .user-face a{
            width: 40px;
            height: 40px;
            outline: none;
             color: #00a1d6;
            text-decoration: none;
            cursor: pointer;
            
        }
        a{
            outline: none;
            text-decoration: none;
        }
        .user-face a img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            // background-color: gray;
            margin-left: 20px;
            margin-top: 4px;
        }
        .con{
            width: 755px;
            // height: 364px;
            padding-top:22px;
            padding-bottom: 14px;
            margin-left:85px;
            // background-color: pink;
            position: relative;
             border-top: 1px solid #e5e9ef;
        }
        .con p{
            white-space:normal ;
            display:block;
            width:88%;
        }
        .user{
            width: 755px;
            height: 19px;
            /* padding: 4px; */
            // background-color: yellow;
        }
        .user .name{
            font-size: 12px;
            font-weight: bold;
             line-height: 18px;
             color: #6d757a;
        }
        .con .text{
            position: relative;
            z-index: 2;
            line-height: 20px;
            padding: 2px 0;
            font-size: 14px;
            text-shadow: none;
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-word;
            white-space: pre-wrap;
        }
        .info{
            color: #99a2aa;
            line-height: 14px;
            margin-top: 6px;
            font-size: 12px;
            width: 755px;
            height: 16px;
            margin-top: 6px;
            z-index:2000;
            
        }
        .info > span{
            margin-right: 20px;
        }
        .info .like{
            cursor: pointer;
            
        }
        .info .like:hover i{
            color: #41b9e1;
        }
        .hate{
            cursor: pointer;
             margin-right: 15px;
        }
        .hate:hover{
            color: #41b9e1;
        }
        .reply {
            padding: 0 5px;
            border-radius: 4px;
            margin-right: 15px;
            cursor: pointer;
            display: inline-block;
        }
        .reply:hover{
            color: #00b1e1;
            background: #e5e9ef;
        }
        .operation {
            position: relative;
            width: 18px;
            float: right;
            margin-top: 5px;
            margin-right: 21px;
            
            margin-top: 5px;
            /* background-color: red; */
        }
        .spot {
            width: 18px;
            height: 18px;
            cursor: pointer;
            /* background: url(//s1.hdslb.com/bfs/seed/jinkela/commentpc/static/img/icons-comment.2f36fc5.png) no-repeat; */
            background-position: -151px -280px;
            text-align: center !important;
            line-height: 18px;
            writing-mode: vertical-lr;
            padding-left: 7px;
            font-size: 20px;
            box-sizing: border-box;
        }
        .spot:hover{
            color: #08a4d7;
        }
         .opera-list {
         display: none;
         position: absolute;
         width: 120px;
         right: 0;
         top: 20px;
         z-index: 10;
         background: #fff;
         box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
         border-radius: 4px;
         color: #222;
         font-size: 14px;
         padding: 10px 0;
         z-index: 999;
        }
        ul,li{
            margin: 0;
            padding: 0;
             list-style: none;
        }
        .opera-list ul li{
            padding: 0px 15px;
            cursor: pointer;
            height: 36px;
            line-height: 36px;
            transition: all 0.3s;
            color: #222;
            font-size: 14px;
        }
        .opera-list ul li:hover{
            background: #e5e9ef;
            color: #00a1d6;
        }
        .reply-box{
            width: 755px;
            // height: 256px;
            
        }
        .reply-item{
            width: 755px;
            // height: 67px;
            padding: 10px 0px;
        }
        .reply-face{
            display: inline-block;
            position: relative;
            margin-right: 10px;
            vertical-align: top;
            top: 0px;
            margin-top: 5px;
            float: left;
           
        }
        .reply-face img{
            width: 24px;
            height: 24px;
            display: block;
            position: relative;
            /* background-image: url(data:image/gif;base64,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); */
            background-size: cover;
            border-radius: 50%;
            margin: 0;
            padding: 0;
            border-radius: 50%;
            background-color: gray;

        }
        .reply-con{
            width: 721px;
            // height: 45px;
            // background-color: orange;
            float: left;
        }
        .reply-con .user{
            font-size: 12px;
            font-weight: bold;
            line-height: 18px;
            padding-bottom: 4px;
            display: block;
            word-wrap: break-word;
            position: relative;
            width: 721px;
            // height: 41px;
            padding-bottom: 4px;
        }
        .reply-con .user a{
            color: #6d757a;
            position: relative;
            top: -1px;
        }
        .reply-con .user a:hover{
            color:#009fd3;
        }
        .text-con{
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            white-space: pre-wrap;
            margin-left: 16px;
            width:90%;
            display:block;
        }
        .reply-box .info{
            float: left;
            padding-left: 35px;
            margin-left: 0px;
            width: 708px;
        }
        .view-more{
            font-size: 12px;
            color: #6d757a;
            width: 755px;
            height: 16px;
            // background-color: red;
            position:absolute;
            bottom:0px;
            left:0px
        }
        .view-more .btn-more{
            padding: 2px 3px;
            border-radius: 4px;
            outline: none;
             color: #00a1d6;
            text-decoration: none;
            cursor: pointer;
        }
        .header-content{
            display: flex;
             flex-direction: row;
             height: 34px;
             justify-content: space-between;
             line-height: 34px;
        }
        .header-content .title{
            font-size: 24px;
        }
        .header-content .more{
            align-items: center;
            color: rgba(0,0,0,.54);
            display: flex;
            font-size: 14px;
        }
        .header-content .img {
            /* background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAAXNSR0IArs4c6QAAAM9JREFUOBGd1MENgyAUBmDB3trEcO8sHaAHj0zAWEzAAB2gk/TgnZi0t0bKb5RURXj4EgTy+JTEB1XlwxhzQcOYGhzAWvvyrdNa38hwWnjyfTMMw4OKuZTyXdd1yxj7OOfOVMzmreFLQMB4Cef8rpR6zvl1HyASJXgBS/AGUnEUUvAuzOEkTOEsXGM/74UQV47EkUCpJSPyb1tUW3KrERSqaRemELYYhTkUhRS0gVS0gCUowFI0wunO6fykoRxgIMRcOV8/7nOnfhT/jyPX4w+hsPDmp+5GbwAAAABJRU5ErkJggg==); */
            background-position: 50%;
            background-repeat: no-repeat;
            background-size: contain;
            /* height: 12px; */
            margin-left: 4px;
            /* width: 7px; */
        }
        .header-content .more:hover {
            color: #32aaff;
        }
        .content-list{
            width: 228px;
            height: 716px;
        }
        .content-list a .list-item{
            width: 232px;
            height: 106px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            min-height: 100px;
            min-width: 220px;
            margin-top: 16px;
            margin-bottom: 0px;
            margin-right:0px;
            
        }
        .content-list a .list-item img{
            width: 80px;
            height: 106px;
            // background-color: greenyellow;
        }
        .comic-detail{
            width: 140px;
            height: 98px;
            padding: 4px 0px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 12px;
        }
        .comic-detail .title{
            color: rgba(0,0,0,.87);
            font-size: 16px;
            height: 20px;
            text-align: left;
        }
        .comic-info{
            width: 140px;
            color: rgba(0,0,0,.34);
            display: flex;
            flex-direction: column;
            height: 60px;
            justify-content: space-between;
            
        }
        .comic-info > div{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: rgba(0,0,0,.34);
            font-size:12px !important;
        }
</style>