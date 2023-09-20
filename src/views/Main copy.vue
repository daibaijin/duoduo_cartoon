<template>
  <div class="main" @click="noneoptionbox">

    <div>
      <!-- Main的二级路由 -->
      <router-view></router-view>
    </div>

    <!-- 头部 -->
    <el-row class="box">
      <el-col :span="4">
             <!-- 网站名称 -->
            <div class="webnamebox" >
                 <a href="#" @click="test">
                <div class="imgbox">
                  <img src="../assets/logo.png" alt="">
                </div>
                <div class="webname">
                   哔哩哔哩漫画
                </div>
                </a>
             </div>
      </el-col>
      <el-col :span="8">

        <!-- 导航栏 -->
        <el-menu :default-active="m1" class="el-menu-demo"  
               mode="horizontal" @select="handleSelect" text-color="#333333" active-text-color="#32aaff">
         <el-menu-item index="5" @click="keepmstation">
            <!-- <a href="https://www.bilibili.com/?from=manga_index"></a> -->
                 <div class="nav">
                
                <img src="../assets/zhuzhan.png" alt="">
                 
                 <span>主站</span>
                 
             </div>
             
         </el-menu-item>
         <el-menu-item index="1" @click="keephome">
                <div class="nav">
                  <span>首页</span>
                </div> 
         </el-menu-item>
         <el-menu-item index="2" @click="keepcategories">
              <div class="nav">
                 <span>分类</span>
             </div>
         </el-menu-item>
         <el-menu-item index="3" @click="keepupdates">
               
             <div class="nav">
                <span>更新</span>
            </div>
         </el-menu-item>
         <el-menu-item index="4"  @click="keepleaderboard">
            <div class="nav">
                 <span>排行榜</span>
             </div>
         </el-menu-item>
      </el-menu>   
            
      </el-col>
      <el-col :span="12">
           
       <el-autocomplete popper-class="my-autocomplete" v-model="state" class="searchbox"
         :fetch-suggestions="querySearch" placeholder="请输入内容"
        @select="handleSelect1" @change="getsearchadvise(state)" @keydown.enter="getsearchadvise(state)"
         @keydown.space="getsearchadvise" @click="getsearchadvise">

        <!-- 搜索图标 -->
        <!-- <span class="icon iconfont"></span> -->
    
        <i  class="el-icon-search el-input__icon"  slot="suffix"  @click="handleIconClick"></i>
        <span class="icon iconfont"></span>
        
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
          <span class="addr">{{ item.address }}</span>
        </template>
       
        
       </el-autocomplete>
       <div class="search-option" ref="optionbox">
        <div class="option-item" v-for="(item, index) in  optionlist" ref="optionitem" @click="clickadvise(index)">
        <span v-html="item" ></span>
        </div>
        </div>
 

        <!-- 下载APP -->
        <el-button class="Downloadapp" type="text">
           下载 APP
        <div class="free" ref="free">领卷免费看</div>
        </el-button>
            <!-- <div class="Downloadapp">
                <span>下载APP</span>
                
            </div> -->
            <!-- 登录/注册 -->
            <div class="LoginAndRegister" ref="LoginAndRegister">
             <el-button class="login" type="text" @click="clicklogin">登录</el-button>
             <span class="line"></span>
             <el-button class="register" type="text"@click="clickRegister">注册</el-button>
            </div>

            <div class="userbox" ref="userbox">
              <div class="history" ref="history" @mouseenter="showhistory" @mouseleave="nonehistory">
                历史
                  <div class="historylist"  ref="historylist"  @mouseenter="showhistory" @mouseleave="nonehistory">
                     
                     <div class="historybox">
                       <span v-if="userlike.allread===[]">你还没有看过漫画哦~</span>
                       <div class="historyitem" v-for="(item, index) in  userlike.allread">
                        <!-- <img src="../assets/noloadimg.png" alt=""> -->
                         <img :src="item[0].img" alt="">
                      <div class="text">
                        <div class="title">{{item[0].title}}</div>
                       <div class="last_ord" v-if="item[0].isfinish==1">[完结] 共 {{item[0].last_ord}}话</div>
                        <div class="last_ord" v-else-if="item[0].isfinish==0">更新至  {{item[0].last_ord}}话</div>
                        <div class="read_ord">阅读 至 1 话</div>
                      </div>
                      
                     </div>
                     </div>
                     <div class="historymore" @click="keepmy">更多 ></div>
                  </div>
              </div>
              <div class="likebox" ref="mainlike" @mouseenter="showlike" @mouseleave="nonelike">
                追漫
                <div class="likeboxlist" ref="mainlikelist" @mouseenter="showlike" @mouseleave="nonelike">
                     
                     <div class="likebookbox">
                       <span v-if="userlike.alllike===[]">你还没有追漫哦~</span>
                       <div class="likeitem" v-for="(item, index) in  userlike.alllike">
                         <img :src="item[0].img" alt="">
                      <div class="text">
                        <div class="title">{{item[0].title}}</div>
                        <div class="last_ord" v-if="item[0].isfinish==1">[完结] 共 {{item[0].last_ord}}话</div>
                        <div class="last_ord" v-else-if="item[0].isfinish==0">更新至  {{item[0].last_ord}}话</div>
                        <div class="read_ord">阅读 至 1 话</div>
                      </div>
                     </div>
                     </div>
                     
                     <div class="likeboxmore" @click="keepmy">更多 ></div>
                  </div>
                </div>
              <div class="user-panel" ref="user" @mouseenter="showuser" @mouseleave="noneuser"> 
                <img src="../assets/userimg.jpg" alt="" ref="userimg" @click="keepmy">
                <div class="usermessagebox" ref="userlist" @mouseenter="showuser" @mouseleave="noneuser">
                  <!-- <div class="urename">{{currentuser?currentuser[currentuser.length-1].name :'' }}</div> -->
                  <!-- <div class="urename">{{currentuser?currentuser.name :'' }}</div> -->
                  <div class="urename">{{userlike?userlike.name :'' }}</div>
                  <div class="text">漫币：0</div>
                  <div class="quit" @click="clickquit">退出登录</div>
                </div>
                </div>
            </div>
            
       </el-col>
    </el-row>
      

         <!-- 底部 -->
  <div class="footer">
    <div class="size-rule">
        <div class="row row-one">
            <div class="left">
                <img src="../assets/logo.png" alt="">
                <div class="title">哔哩哔哩漫画</div>
            </div>
            <div class="middle"></div>
            <div class="right">
                <div class="right-item">
                    <img src="../assets/footer1.svg" alt="">
                    <div class="item-text">B 站官号</div>
                    <div class="hover-panel">关注即送券</div>
                </div>
                <div class="right-item">
                     <img src="../assets/footer2.png" alt="">
                    <div class="item-text">新浪微博</div>
                </div>
                <div class="right-item">
                    <img src="../assets/footer3.png" alt="">
                    <div class="item-text">下载 bilibili 漫画客户端</div>
                </div>
                
            </div>
        </div>
        <div class="row row-two">
            <div class="logo-list">
                <img src="../assets/footer4.png" alt="">
                <img src="../assets/footer5.png" alt="">
               
            </div>
            <div class="text-info">
                <p>
                    <a href="#">互联网 ICP 备案：沪 ICP备13002172 号 - 3</a>
                    <span> | 网络文化经营许可证：沪网文 [2019]3804-274 号</span>
                </p>
                <p>
                    <a href="#">沪公网安备：31011002002436</a>
                    <span>| 增值电信业务经营许可证 沪 B2-20100043 |</span>
                    <a href="#">资质证照</a>
                </p>
                <p>
                    <a href="#">12345 政务服务便民热线</a>
                    <span>|</span>
                    <a href="#">上海市互联网违法和不良信息举报中心</a>
               
                </p>
                <p>上海宽娱数码科技有限公司 | 地址：上海市杨浦区政立路489号 | 电话：021-25099888</p>
            </div>
        </div>
    </div>
  </div>
  
    <!-- 遮罩层、登录注册 -->
  
   <div class="mask" ref="mask"  >
        <!-- 登录 -->
          <div class="bigbox"  >
            <div class="close" @click="close"><img src="../assets/close.svg" alt=""></div>
            <h2 v-model="loginindex" v-if="loginindex==0">登录</h2>
            <h2 v-model="loginindex" v-else-if="loginindex==1">注册</h2>

            <!-- 登录 -->
            <div class="LoginAndRegisterbox" v-model="loginindex" v-if="loginindex==0">
              <div class="inputbox" >
                    <div class="zhanghao">
                        <span>手机号</span>
                        <input type="tel"  @change="logintelfn" ref="logintel"  placeholder="请输入11位手机号">
                    </div>
                    <div class="mima">
                        <span>密码</span>
                        <input type="password"  @change="loginpwdfn" ref="loginpassword"  placeholder="请输入密码(6-16位)">
                    </div>

                    <div class="btnbox">
                        <div class="registerbtn" @click="clickRegister">注册</div>
                        <div class="loginbtn" @click="login">登录</div>
                    </div>
                </div>
                


               
              <div class="tips">

                <div>提示：</div>
                <div class="tips-text">1.密码支持字母数字下划线组合，且必须以字母开头。</div>
                <div class="tips-text">2.昵称支持中英文组合。</div>

              </div>
            </div>

            <!-- 注册 -->
            <div class="LoginAndRegisterbox" v-model="loginindex"  v-else-if="loginindex==1">
              <div class="inputbox" >
                    <div class="nicheng">
                        <span>昵称</span>
                        <input type="text" @change="registername" ref="name" placeholder="请输入昵称">
                    </div>
                    <div class="zhanghao">
                        <span>手机号</span>
                        <input type="tel"  @change="registertel" ref="tel"  placeholder="请输入11位手机号">
                    </div>
                    <div class="mima">
                        <span>密码</span>
                        <input type="password"  @change="registerpwd" ref="password"  placeholder="请输入密码(6-16位)">
                    </div>

                    <div class="btnbox">
                        <div class="registerbtn" @click="register">注册/登录</div>
                       
                    </div>
              </div>
                


               
              <div class="tips">

                <div>提示：</div>
                <div class="tips-text">1.密码支持字母数字下划线组合，且必须以字母开头。</div>
                <div class="tips-text">2.昵称支持中英文组合。</div>

              </div>
            </div>
        

            
        </div>
    </div>
    
      
  </div>
  
  

 

  </div>
  
</template>

<script>
 import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex';

    export default {
        name:'Main',
      

  
     data() {
       
      return {
        //   activeIndex: '1',
        // activeIndex2: '1','天'
          restaurants: [],
        state: '天',
        loginindex:1,
        usermessage:{
          phone:'',
          password:'',
          name:'',
          code:0,
          alllike:[],
        },
        loginmessage:{
          loginphone:'',
          loginpassword:'',
          loginname:'',
          alllike:[],
        },
        truephone:false,
        truepassword:false,
        trueregname:false,
        trueregphone:false,
        trueregpwd:false,
        record:[],
        bigdata:[],
        currentcode:0,
        currentuser:[],
        readylogin:[],
        mainrecommendlist:[],
        optionlist:[],
        msg:'',
        isopen:false,
        optionselect:-1,
        likelist:[],
        userlike:[],
        init:0,
        readlist:[],
        test1:[],
      };
    },

      computed:{
        m1(){
          // console.log("this.$store.state.msg",this.$store.state.msg);
          return this.$store.state.activeIndex;
        },
        getlike(){
          return this.$store.state.likearr;
        },
        getinit(){
          return this.$store.state.init;
         
        },
        getread(){
          return this.$store.state.readarr;
        },
        getreadinit(){
          return this.$store.state.readinit;
         
        },

      },

       created() {


        this.$nextTick(() => {
                
                  this.setactiveafter(this.m1);
                  // localStorage.clear();
                  let isthis=this;
                  let record = localStorage.getItem('record');
                  this.bigdata=JSON.parse(record);
                      if (this.bigdata==null) {
                        this.bigdata=[];
                        this.bigdata.push(isthis.usermessage);
                      }
                    let verify=[];
                    let verfyobj={};
                    console.log("this.bigdata",this.bigdata);
                    this.bigdata.forEach(function (item,index) {
                      console.log(item,index);
                      if (item.code==200) {
                        verfyobj={
                          name:item.name,
                          phone:item.phone,
                          password:item.password,
                          code:item.code,
                        }
                            verify.push(verfyobj)
                             console.log("verify",verify);
                             isthis.currentuser=verify[verify.length-1];
                             console.log("verify.currentuser",isthis.currentuser);
                      }else{
                         verfyobj={
                          name:item.name,
                          phone:item.phone,
                          password:item.password,
                          code:item.code,
                        }
                            verify.push(verfyobj)
                             console.log("verify",verify);
                      }
                    });
                  console.log("this.currentuser",this.currentuser);
                  console.log("verify",verify);
                  
                  if (verify[verify.length-1].code==200) {
                    console.log("准备登录");
                    this.currentuser=verify[verify.length-1];
                    console.log("this.currentuser",this.currentuser);
                    this.login(this.getreadinit);

                  }
                  
                  this.keyType(this.currentuser)
                  this.loadAll();
                  this.getsearchadvise(this.state);
                  this.getlikevalue(this.getread,this.getlike,this.getinit,this.getreadinit);
                  this.getreadvalue(this.getread,this.getlike,this.getinit,this.getreadinit);
                  this.takeliek();
                  this.takeread();
                   
        })
       },
      methods: {
        // 判断数据类型
        keyType(data) {

            let type = Object.prototype.toString.call(data);

            if (type === "[object String]") {
            
              type = "String";

            } else if (type === "[object Number]") {
            
              type = "Number";

            } else if (type === "[object Null]") {
            
              type = "Null";

            } else if (type === "[object Boolean]") {
            
              type = "Boolean";

            } else if (type === "[object Array]") {
            
              type = "Array";

            } else if (type === "[object Object]") {
            
              type = "Object";

            } else {
            
              type = "未进行判断的类型:" + type;

            }

            console.log("type",type);

          },

        // 我的
        keepmy(){
          let routerName=this.$router.history.current.name;
          if (routerName=="My") {
              return;
          }
          this.$router.push({name: 'My',query:{userlike:this.userlike}});
          //  this.$router.push({name: 'My'});
        },
        // 获取 阅读
        getreadvalue(readmessage,likemessage,init1,init2){
          // this.readlist.push(this.$route.query.likebox);
          // console.log("this.likelist",this.$route.query.likebox);
          let isthis=this;
           if (Object.prototype.toString.call(isthis.currentuser) == "[object Array]") {
                let instand=isthis.currentuser[isthis.currentuser.length-1]
              }else{
                let instand=isthis.currentuser
              }
          
          console.log("this.bigdata",this.bigdata);
          this.bigdata.forEach(function (item,index) {
            console.log("item,index");
            console.log(item,index);
            // isthis.currentuser[isthis.currentuser.length-1].phone
            // isthis.keyType(isthis.currentuser)
            // // let type=isthis.keyType(isthis.currentuser);
            // // console.log("type123123213",type); 
            // console.log(Object.prototype.toString.call(isthis.currentuser));
            // console.log(Object.prototype.toString.call(isthis.currentuser) == "[object Object]");
            // console.log(Object.prototype.toString.call(isthis.currentuser) == "[object Array]");
              if (Object.prototype.toString.call(isthis.currentuser) == "[object Array]") {
                let instand=isthis.currentuser[isthis.currentuser.length-1]
              }else{
                let instand=isthis.currentuser
              }
            


            console.log("isthis.currentuser[isthis.currentuser.lenght-1]",isthis.currentuser[isthis.currentuser.length-1]);
            if (item.code==200&&item.phone==isthis.currentuser.phone) {
              console.log(item,index);
              console.log("item.allread",item.allread);
              console.log("readmessage",readmessage);
              console.log("item.allread[index]==readmessage",item.allread==readmessage);
              // if (item.read[index]==readmessage) {
              //   return;
              // }
              //   isthis.recordlike.push(isthis.$route.query.likebox);
              // console.log("isthis.recordlike",isthis.recordlike);
              console.log("init2",init2);
            if (init2==1) {
                if (Object.prototype.toString.call(isthis.currentuser) == "[object Array]") {
                let instand=isthis.currentuser[isthis.currentuser.length-1];
                isthis.test1=instand;
              }else{
                let instand=isthis.currentuser;
                isthis.test1=instand;
              }
                console.log("isthis.currentuser[isthis.currentuser.length-1].allread",isthis.test1.allread);
             
              let newobj={
                phone:isthis.test1.phone,
                name:isthis.test1.name,
                password:isthis.test1.password,
                code:isthis.test1.code,
                alllike:likemessage,
                allread:readmessage,
              }
              isthis.currentuser=newobj;
              console.log("isthis.currentuser",isthis.currentuser)
              console.log("newobj",newobj);
              item=isthis.currentuser
              console.log("item",item);
              isthis.bigdata[index]=item;
            }
            
            }
          });
          console.log("this.bigdata",this.bigdata);

           let record= localStorage.getItem('record');
            
            console.log("存储收藏 ",this.bigdata);
            localStorage.setItem('record', JSON.stringify(this.bigdata));
            console.log("this.record",this.record);
            //  let data=JSON.parse(localStorage.getItem('record'));
            //  console.log("data",data);
            //   this.bigdata.push(data);
            // localStorage.setItem('record', JSON.stringify(this.bigdata));
            // console.log("this.bigdata",this.bigdata);

            // console.log("newoldecord",this.record);
             
            isthis.$store.commit('changeReadinit',1)
        },
        // 获取 存储收藏
        getlikevalue(readmessage,likemessage,init1,init2){
          this.likelist.push(this.$route.query.likebox);
          console.log("this.likelist",this.$route.query.likebox);

          let isthis=this;
          console.log("this.bigdata",this.bigdata);
          this.bigdata.forEach(function (item,index) {
            console.log("item,index");
            console.log(item,index);
            // isthis.currentuser[isthis.currentuser.length-1].phone
            console.log("判断数据类型",isthis.currentuser === "[object Object]");
            console.log("判断数据类型",isthis.currentuser === "[object Array]");
             isthis.keyType(isthis.currentuser);

              if (Object.prototype.toString.call(isthis.currentuser) == "[object Array]") {
                let instand=isthis.currentuser[isthis.currentuser.length-1];
                isthis.test1=instand;
              }else{
                let instand=isthis.currentuser;
                isthis.test1=instand;
              }
            console.log("isthis.currentuser[isthis.currentuser.lenght-1]",isthis.test1);
            if (item.code==200&&item.phone==isthis.test1.phone) {
              console.log(item,index);
              console.log("item.alllike",item.alllike);
              console.log("likemessage",likemessage);
              console.log("item.alllike[index]==likemessage",item.alllike==likemessage);
              if (item.alllike[index]==likemessage) {
                return;
              }
              //   isthis.recordlike.push(isthis.$route.query.likebox);
              // console.log("isthis.recordlike",isthis.recordlike);
              console.log("init1",init1);
            if (init1==1) {
              if (Object.prototype.toString.call(isthis.currentuser) == "[object Array]") {
                let instand=isthis.currentuser[isthis.currentuser.length-1];
                isthis.test1=instand;
              }else{
                let instand=isthis.currentuser;
                isthis.test1=instand;
              }
                console.log("isthis.currentuser[isthis.currentuser.length-1].alllike",isthis.test1.alllike);
             
              let newobj={
                phone:isthis.test1.phone,
                name:isthis.test1.name,
                password:isthis.test1.password,
                code:isthis.test1.code,
                alllike:likemessage,
                allread:readmessage,
              }
              isthis.currentuser=newobj;
              console.log("isthis.currentuser",isthis.currentuser)
              console.log("newobj",newobj);
              item=isthis.currentuser
              console.log("item",item);
              isthis.bigdata[index]=item;
            }
            
            }
          });
          console.log("this.bigdata",this.bigdata);

           let record= localStorage.getItem('record');
            
            console.log("存储收藏 ",this.bigdata);
            localStorage.setItem('record', JSON.stringify(this.bigdata));
            console.log("this.record",this.record);
            //  let data=JSON.parse(localStorage.getItem('record'));
            //  console.log("data",data);
            //   this.bigdata.push(data);
            // localStorage.setItem('record', JSON.stringify(this.bigdata));
            // console.log("this.bigdata",this.bigdata);

            // console.log("newoldecord",this.record);
             
            isthis.$store.commit('changeInit',1)
        },
        // 利用阅读
        takeread(){
            let record= localStorage.getItem('record');
            let isthis=this;
             this.bigdata=JSON.parse(record);
              if (this.bigdata==null) {
                this.bigdata=[];
                this.bigdata=isthis.usermessage;
              }
              console.log("takeliek",this.bigdata);
              
              // isthis.currentuser[isthis.currentuser.length-1].phone
              // isthis.currentuser.phone
              console.log("isthis.currentuser",isthis.currentuser);
              // console.log("isthis.currentuser",isthis.currentuser[isthis.currentuser.length-1].phone===undefined);
              this.bigdata.forEach(function (item,index) {
                console.log(item.phone,index);
                if (item.code==200&&item.phone==isthis.currentuser.phone) {
                  console.log("可不可以");
                  isthis.userlike=item;
                }
              });
              console.log("isthis.userlike",isthis.userlike);
        },
        // 利用收藏
        takeliek(){
            let record= localStorage.getItem('record');
            let isthis=this;
             this.bigdata=JSON.parse(record);
              if (this.bigdata==null) {
                this.bigdata=[];
                this.bigdata=isthis.usermessage;
              }
              console.log("takeliek",this.bigdata);
              
              // isthis.currentuser[isthis.currentuser.length-1].phone
              // isthis.currentuser.phone
              console.log("isthis.currentuser",isthis.currentuser);
              // console.log("isthis.currentuser",isthis.currentuser[isthis.currentuser.length-1].phone===undefined);
              this.bigdata.forEach(function (item,index) {
                console.log(item.phone,index);
                if (item.code==200&&item.phone==isthis.currentuser.phone) {
                  console.log("可不可以");
                  isthis.userlike=item;
                }
              });
              console.log("isthis.userlike",isthis.userlike);
        },
        // 改变更改后的activeindex
        setactiveafter(active){
            // this.activeIndex=active;
            // console.log("setactiveafter",this.activeIndex);
        },
        test(){
            let routerName=this.$router.history.current.name;
            if (routerName=="Test") {
              return;
          }
          this.$router.push({name: 'Test'});
        },
        noneoptionbox(){
          let optionbox=this.$refs.optionbox;
          optionbox.style.display="none"
        },
        // 获取共享数据
        getdateMsg(){

          // console.log("this.m1",this.m1());
        },
        // 修改共享数据
        // updateMsg(){
        //   this.$store.commint('changeMsg','Vue开发')
        // },
        getsearchtext(){
          console.log("this.state",this.state);
        },
        // 搜索建议
        getsearchadvise(advise){
          console.log("advise",advise);
          if (this.isopen==true) {
               console.log("点击搜索框");
            let optionbox=this.$refs.optionbox;
            optionbox.style.display="block"
          }
          
          this.axios({
                   method: 'get',
                   url: 'https://apic.netstart.cn/bcomic/SearchSug',
                    params: {
                        
                        term:advise,
                        // term:"天",
                     
                     }

          }).then(res => {
                     console.log("res",res);
                       console.log("getsearchadvise",res.data.data);
                   this.optionlist = res.data.data;
                  
          }).catch(err => {
                     console.log("err",err);
          })
                 this.isopen=true;
        },
        // 点击建议
        clickadvise(index){
          // let optionitem=this.$refs.optionitem;
          // console.log("optionitem",optionitem);

              console.log('index ==> ', index);

              if (this.optionselect === index) {
                console.log('已经处于激活状态');
                return;
              }
              console.log("this.optionlist[index]",this.optionlist[index]);
              

              var patt=new RegExp(/[^<em class="keyword">]/ig);
              var result1=this.optionlist[index].match(patt);
              var newarr=[];
              result1.forEach(function (item,index) {
                console.log("item,index");
                console.log(item,index);
                if (!(item=="/")) {
                  newarr.push(item)
                }
              });
              console.log("newarr",newarr);
              let str = newarr.join("");
              console.log("str",str);
              console.log("result1",result1);
              this.state=str;

              let routerName=this.$router.history.current.name;
        
               console.log("routerName",routerName);


              if (routerName=="Search") {
                  return;
              }
              // 向搜索页面传值
              this.$router.push({name: 'Search',query:{searchtext:this.state}});


              this.optionselect = index;
        },
        // 点击搜索框
        clickinput(){
          console.log("点击搜索框");
          let optionbox=this.$refs.optionbox;
          optionbox.style.display="block"
          
        },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
       this.$store.commit('changeActive',key)

      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
       handleSelect1(item) {
        console.log(item);
        
         let routerName=this.$router.history.current.name;
          if (routerName=="Search") {
              return;
          }
          this.$router.push({name: 'Search'});
          console.log("点击搜索框");
          let optionbox=this.$refs.optionbox;
          optionbox.style.display="block"
      },
      // 向搜索页面传值
      handleIconClick(ev) {
        console.log(ev);
         let routerName=this.$router.history.current.name;
        
         console.log("routerName",routerName);
        
       
        if (routerName=="Search") {
              return;
          }
          // 向搜索页面传值
          this.$router.push({name: 'Search',query:{searchtext:this.state}});
           let optionbox=this.$refs.optionbox;
            optionbox.style.display="none"

      },
      loadAll() {
        let remarr=[];
              this.axios({
                   method: 'get',
                   url: 'https://apic.netstart.cn/bcomic/SearchRecommend',
                    params: {
                        
                        num:10,
                        
                     
                     }

                 }).then(res => {
                     console.log("res",res);
                       console.log("recommendlist",res.data.data);
                      remarr.push(res.data.data);
            
                 }).catch(err => {
                     console.log("err",err);
                 })
                 this.mainrecommendlist=remarr;
        console.log("新this.mainrecommendlist",this.mainrecommendlist);
        return  this.mainrecommendlist;
      },
      mounted() {
        this.restaurants = this.loadAll();
      },

    //  页面跳转
      keephome(){
          
          let routerName=this.$router.history.current.name;
          if (routerName=="Home") {
              return;
          }
           this.$router.push({name: 'Home'});
      },
      keepcategories(){
            let routerName=this.$router.history.current.name;
          if (routerName=="Categories") {
              return;
          }
           this.$router.push({name: 'Categories'});
      },
      keepleaderboard(){
            let routerName=this.$router.history.current.name;
          if (routerName=="Leaderboard") {
              return;
          }
           this.$router.push({name: 'Leaderboard'});
      },
      keepupdates(){
            let routerName=this.$router.history.current.name;
          if (routerName=="Updates") {
              return;
          }
           this.$router.push({name: 'Updates'});
      },
      keepmstation(){
            let routerName=this.$router.history.current.name;
          if (routerName=="Mstation") {
              return;
          }
           this.$router.push({name: 'Mstation'});
      },
      clicklogin(){
        let mask=this.$refs.mask;
        // console.log("mask",mask);
        mask.style.display="block";
        this.loginindex=0;
      },
      clickRegister(){
        let mask=this.$refs.mask;
        // console.log("mask",mask);
        mask.style.display="block";
        this.loginindex=1;
      },
      close(){
          
        let mask=this.$refs.mask;
        mask.style.display="none";
      },
    // 注册
      register(){
          console.log("this.trueregname",this.trueregname);
          console.log("this.trueregphone",this.trueregphone);
          console.log("this.trueregpwd",this.trueregpwd);
        if ( this.trueregname==true&&this.trueregphone==true&&this.trueregpwd==true) {
          console.log("注册成功");

             let record= localStorage.getItem('record');
            let isthis=this;
             this.bigdata=JSON.parse(record);
              if (this.bigdata==null) {
                this.bigdata=[];
                this.bigdata=isthis.usermessage;
              }
              this.bigdata.forEach(function (item,index) {
                console.log(item,index);
                console.log("isthis.usermessage.password",isthis.usermessage.password);
                console.log("isthis.usermessage.phone",isthis.usermessage.phone);
                if (!(item.password==isthis.usermessage.password&&item.phone==isthis.usermessage.phone)) {
                  console.log("已经修改了code=200");
                 isthis.usermessage.code=200;
                }
              });
            // this.login();
           let mask=this.$refs.mask;
            mask.style.display="none";

            let free=this.$refs.free;
            let userbox=this.$refs.userbox;
            free.style.display="none";
             userbox.style.display="block";  


             let LoginAndRegister=this.$refs.LoginAndRegister;
             LoginAndRegister.style.display="none";


            // let record= localStorage.getItem('record');
            this.bigdata=JSON.parse(record);
            console.log("oldrecord",this.record);
            console.log("this.bigdata",this.bigdata);
             if (!record) {
                //如果搜索关键字不存在, 则初始化一个空数组
                record = [];
            } else {
                record = JSON.parse(record);
            }
            console.log("newrecord",this.record);
            this.record.push(this.usermessage)
            console.log("注册1  this.record",this.record);
            localStorage.setItem('record', JSON.stringify(this.record));
            console.log("this.record",this.record);
             let data=JSON.parse(localStorage.getItem('record'));
             console.log("data",data);
            this.bigdata.push(data[0]);
            console.log("注册2 ",this.bigdata);
            localStorage.setItem('record', JSON.stringify(this.bigdata));
            console.log("this.bigdata",this.bigdata);

            console.log("newoldecord",this.record);
            this.login();
             isthis.usermessage.code=0;
             
        }else{
          console.log("注册失败");
        }
      },
      registername(){
        let name=this.$refs.name;
        console.log("nameval",name.value);
        this.usermessage.name=name.value;
        console.log("this.usermessage.name",this.usermessage.name);
        if (this.usermessage.name=="" || this.usermessage.name==" ") {
          console.log("昵称不能为空");
        
        }else{
          this.trueregname=true;
        }
      },
      registertel(){
        let tel=this.$refs.tel;
        console.log("nameval",tel.value);
       
        let istel=new RegExp(/^1[3-9]\d{9}$/);
        let result=istel.test(tel.value);
        console.log("正则result",result);
        if (result==true) {
           this.usermessage.phone=tel.value;
          console.log("this.usermessage.phone",this.usermessage.phone);
           
          this.trueregphone=true;
     
        }else{
          console.log("手机号格式错误,请输入11位手机号");
        }
      },
      registerpwd(){
        let password=this.$refs.password;
        console.log("nameval",password.value);
       
        let ispassword=new RegExp(/^[A-Za-z]\w{5,15}$/);
        let result=ispassword.test(password.value);
        console.log("正则result",result);

        if (result==true) {
           this.usermessage.password=password.value;
         console.log("this.usermessage.password",this.usermessage.password);
      
            this.trueregpwd=true;
        }else{
          console.log("密码格式错误,密码支持字母数字下划线组合，且必须以字母开头,密码(6-16位)");
        }
     },
    //  登录
      login(getreadinit){
          let isthis=this;
          let record = localStorage.getItem('record');
          this.bigdata=JSON.parse(record);
            if (this.bigdata==null) {
                        this.bigdata=[];
                        this.bigdata.push(isthis.usermessage);
              }
            console.log("this.bigdata",this.bigdata);
          console.log("获取本地存储",record);

          console.log("login phone",this.loginmessage.loginphone);
          console.log("login password",this.loginmessage.loginpassword);

          let currentphone=this.loginmessage.loginphone;
          let currentpwd=this.loginmessage.loginpassword;
          let newarr=[];
          let datelist={};
          let againver=[];
          let againverobj=[];
          this.bigdata.forEach(function (item,index) {
            console.log("item,index");
            console.log(item,index);
            
          if (currentphone==item.phone&&currentpwd==item.password) {
            
            datelist={
              code:200,
              phone:item.phone,
              password:item.password,
              name:item.name,
              alllike:[],
              allread:[],
            }
            newarr.push(datelist)
            item.code=200;
           }
           if (item.code==200) {
             let likelist=isthis.$route.query.likebox;
             let readlist=getreadinit;
             console.log("stroe ==> readlist",readlist);
            datelist={
              code:200,
              phone:item.phone,
              password:item.password,
              name:item.name,
              alllike:likelist,
              allread:readlist,
            }
            newarr.push(datelist)

          



           }
           
          });
          console.log("newarr",newarr);

          console.log("登录",this.bigdata);
          localStorage.setItem('record', JSON.stringify(this.bigdata));
          
            console.log("this.bigdata",this.bigdata);
             let data=JSON.parse(localStorage.getItem('record'));
             console.log("data",data);


            // {{item.styles[0]? item.styles[0].name :'' }}
           this.currentcode=newarr[0]?newarr[0].code:this.currentuser.code;
          console.log("this.code",this.currentcode);
          console.log("newarr==[]",newarr!==[]);
          
            this.currentuser=newarr;
          
            this.$store.commit('changeUser',this.currentuser[this.currentuser.length-1])
          
          console.log("this.currentuser",this.currentuser);
          if (this.currentcode==200) {
            console.log("登录成功");
            
            let mask=this.$refs.mask;
              mask.style.display="none";

            let free=this.$refs.free;
            let userbox=this.$refs.userbox;
            console.log("userbox",userbox);
            free.style.display="none";
            userbox.style.display="block";

             let LoginAndRegister=this.$refs.LoginAndRegister;
               LoginAndRegister.style.display="none";

            // alert("登录成功");
           

          }else{
            console.log("登录失败");
          }
      
      },
      logintelfn(){
        let logintel=this.$refs.logintel;
        console.log("nameval",logintel.value);
        
        let istel=new RegExp(/^1[3-9]\d{9}$/);
        let result=istel.test(logintel.value);
        console.log("正则result",result);
        if (result==true) {
           this.loginmessage.loginphone=logintel.value;
          console.log("this.loginmessage.phone",this.loginmessage.loginphone);
          this.truephone=true;
          
        }else{
          console.log("手机号格式错误,请输入11位手机号");
        }
      },
      loginpwdfn(){
        
        let loginpassword=this.$refs.loginpassword;
        console.log("nameval",loginpassword.value);
       
        let ispassword=new RegExp(/^[A-Za-z]\w{5,15}$/);
        let result=ispassword.test(loginpassword.value);
        console.log("正则result",result);

        if (result==true) {
           this.loginmessage.loginpassword=loginpassword.value;
         console.log(" this.loginmessage.loginpassword", this.loginmessage.loginpassword);
         this.truepassword=true;
        }else{
          console.log("密码格式错误,密码支持字母数字下划线组合，且必须以字母开头,密码(6-16位)");
        }
     },
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        this.$refs[formName].resetFields();
        //  this.$refs.password.resetFields();
        console.log("this.$refs.password",this.$refs.password.value);
        this.ruleForm.pass="";
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
       
      },
      // 获取本地存储
      getItem(){
        let record = localStorage.getItem('record');
          console.log("获取本地存储",record);
      },
    // 退出登录
        clickquit(){
          let LoginAndRegister=this.$refs.LoginAndRegister;
              LoginAndRegister.style.display="block";

                let free=this.$refs.free;
           let userbox=this.$refs.userbox;
           console.log("userbox",userbox);
           free.style.display="block";
           userbox.style.display="none";

             let record = localStorage.getItem('record');
          this.bigdata=JSON.parse(record);
            console.log("this.bigdata",this.bigdata);
          console.log("获取本地存储",record);

            
            this.bigdata.forEach(function (item,index) {
              console.log("item,index");
              console.log(item,index);

            if (item.code==200) {

            
              item.code=0;
             }
          
          });
             console.log("退出",this.bigdata);
             localStorage.setItem('record', JSON.stringify(this.bigdata));
          
            console.log("this.bigdata",this.bigdata);
             let data=JSON.parse(localStorage.getItem('record'));
             console.log("data",data);

             console.log("退出登录");


        },
      // 页面操作
      // 历史
      showhistory(){
        let history=this.$refs.history;
        let historylist=this.$refs.historylist;
        historylist.style.display="block";
      },
     nonehistory(){
        let history=this.$refs.history;
        let historylist=this.$refs.historylist;
        historylist.style.display="none";
      },
      // 追漫
       showlike(){
        let mainlike=this.$refs.mainlike;
        let mainlikelist=this.$refs.mainlikelist;
        mainlikelist.style.display="block";
      },
     nonelike(){
        let mainlike=this.$refs.mainlike;
        let mainlikelist=this.$refs.mainlikelist;
        mainlikelist.style.display="none";
      },
      // 用户
        showuser(){
        let user=this.$refs.user;
        let userlist=this.$refs.userlist;
        let userimg=this.$refs.userimg;
        userlist.style.display="block";
        userimg.style.width=50+"px";
        userimg.style.height=50+"px";
        userimg.style.marginTop= -8+"px";
      },
     noneuser(){
        let user=this.$refs.user;
        let userlist=this.$refs.userlist;
        let userimg=this.$refs.userimg;
        userlist.style.display="none";
        userimg.style.width=34+"px";
        userimg.style.height=34+"px";
        userimg.style.marginTop= 0+"px";
      },
    
    },
   
    }
</script>

<style lang="scss" scoped>
        .main{
          position: relative;
        }
        .line{
            width:1px;
            height:16px;
            background-color:#cccccc;
            margin:0px 18px;
            margin-top:17px;
        }
          a{
                    list-style: none;
                     text-decoration: none;
                     color:#212121;
                }
                .box{
                    width: 100%;
                    height: 50px;
                    background-color: white;
                    /* overflow: hidden; */
                    // border-bottom:1px solid #e6e6e6;
                   position: fixed;
                   top:0px;
                   left:0px;
                   right:0px;
                     z-index: 10000;
                     box-shadow: 0 0 5px 1px rgba(158,179,193,.5);
                }

                .webnamebox>a{
                    width: 127px;
                    height: 32px;
                    // background-color: aqua;
                    text-align: center;
                    line-height: 32px;
                    font-size: 15px;
                    float: left;
                    display: flex;
                    margin-top: 9px;
                    margin-left:45px
                }
                .webnamebox>a>.imgbox{
                    width: 32px;
                    height: 32px;
                    // background-color: red;
                    border-radius: 6px;
                    margin-right: 5px;
                }
                .webnamebox>a>.imgbox>img{
                      width: 32px;
                    height: 32px;

                    border-radius: 6px;

                }
                .el-menu.el-menu--horizontal {
                    border-bottom:1px  solid transparent;
                }
                .navbox{
                    width: 48%;
                    height: 100px;
                    background-color: burlywood;
                    float: left;
                    display:flex
                }
                .navbox .navlist{
                    width: 386px;
                    height: 50px;
                    border-bottom: 1px solid black;
                    display: flex;
                    line-height: 50px;
                }
            .el-menu >li{
                height:50px;
                line-height:50px;
                box-sizing: border-box;
            }
            .el-menu >li:nth-child(1){
                width:120px;
                line-height:50px;
                box-sizing: border-box;
            }


                .nav>img{
                    width:16px;
                    height: 16px;
                    margin-right:5px
                }
                .searchbox{
                    float: left;
                    height: 32px;
                    // margin-top: 9px;
                     border-radius: 24px !important;
                        background-color:#f4f4f4 !important;
                   margin-left:24px;
                   margin-top:5px;
                   position: relative;
                }
                .search-option{
                  width: 202px;
                  height: 150px;
                  padding: 0px 10px;
                  position: absolute;
                  top: 37px;
                  right: 385px;
                  border:1px solid #c0c4cc;
                  border-top:none;
                  background-color:white;
                  border-bottom-left-radius:8px;
                  border-bottom-right-radius:8px;
                  overflow:hidden;
                  display:none;
                }
                .option-item{
                  width:160px;
                  height:16px;
                  padding:7px 0px;
                  font-size:13px;
                  white-space:nowrap;
                  overflow:hidden;
                  text-overflow:ellipsis;
                  background-color:white;
                  margin:auto;
                  margin-left: 4px;
                  cursor:pointer;
                }
                .option-item:hover{
                  background-color:#e8e8e8;
                }
                .el-input__inner  {
                        border-radius: 24px !important;
                        background-color:#f4f4f4 !important;
                }
                .el-input--suffix .el-input__inner   {
                        border-radius: 24px !important;
                        background-color:#f4f4f4 !important;
                }
                .Downloadapp{
                    float: left;
                    position: relative;
                  color:#333333;
                  height:50px;

                  margin:0px 34px
                }
                .Downloadapp:hover{ 
                    color:#32bdff;
                }
                .Downloadapp .free{
                    display:block;
                    height:16px;
                    width: 58px;
                    line-height:16px;
                    padding:0 4px;
                    text-align:center;
                    position:absolute;
                        top: 0px;
                        left: 45px;
                    font-size:1px !important;

                    background-color:#ff5f8c;
                    color:white !important;
                }
                .LoginAndRegister{
                    float: left;
                    height: 50px;
                    line-height: 50px;
                    display: flex;
                    color:#333333;
                    // display:none;
                }
                .LoginAndRegister .inputbox{
                  width:402px;
                  height:152px;
                  background-color:orange;
                }
                .login{
                    color:#333333;
                }
                .register{
                    color:#333333;
                }
                .userbox{
                  width:200px;
                  height:50px;
                  // background-color:red;
                  float:left;
                  display:none;
                }
                .userbox .history,
                .userbox .likebox{
                  width:28px;
                  height:50px;
                  padding:0 15px;
                  float:left;
                     border: 0;
                  color: rgba(0,0,0,.87);
                  font-size: 14px;
                  position: relative;
                  text-align:center;
                  line-height:50px;
                  cursor: pointer;
                }
                .historylist,
                .likeboxlist{
                  width:270px;
                  height:182px;
                      transition: all .5s cubic-bezier(.22,.58,.12,.98);
                      font-size:12px;
                      position:absolute;
                         bottom: -222px;
                         left: -69px;
                        border:1px solid #f4f4f4;
                        background-color:white;
                        display:none;
                        
                        padding-bottom:42px;
                }
                .likeboxlist{
                  //  bottom: -180px;
                         left: -75px;
                         display:none;
                        //  border:1px solid #f4f4f4;
                }
                .historybox,
                .likebookbox{
                  width:270px;
                  height:187px;
                  overflow:hidden;
                }
                .historyitem,
                .likeitem{
                  margin:auto;
                  width:222px;
                  // height:91px;
                    //  background-color:yellow;
                    display:flex;
                    margin-bottom: 2px;
                }
                .historyitem img,
                .likeitem img{
                  // margin:auto;
                  width:68px;
                  height:91px;
                    //  background-color:gray;
                     float:left;
                }
                .historyitem .text,
                .likeitem .text{
                  // margin:auto;
                  width:138px;
                  height:91px;
                  margin-left:13px;
                    //  background-color:gray;
                     font-size:12px;
                     
                     text-align:left;
                }
                .historyitem .text .title,
                .likeitem .text .title{
                  font-size:14px;
                  overflow: hidden;
             white-space: nowrap; /* 防止文字换行 */
            text-overflow: ellipsis;/* 超出部分显示省略号*/
                }
                .historyitem .text >div,
                .likeitem .text >div{
                  // margin:auto;
                  width:124px;
                  height:32px;
                  // padding-left:16px;
                    //  background-color:gray;
                     font-size:12px
                }
                .historymore,
                .likeboxmore{
                  width:270px;
                  height:42px;
                    background-color: #f4f4f4;
                      font-size:12px;
                      border-bottom-left-radius: 8px;
                      border-bottom-right-radius: 8px;
                      float:none ;
                }
              .user-panel{
                width:34px;
                height:34px;
                margin:8px 20px;
                float:left;
                position:relative;
              }
              .user-panel img{
                width:34px;
                height:34px;
                border-radius:50%;
                cursor: pointer;
              }
              .urename{
                font-size:20px;
                width:100%;
                text-align:center;
              }
              .usermessagebox{
               width:180px;
              //  height:200px;
                background-color:white;
                    border:1px solid #f4f4f4;
                         border-bottom-left-radius: 8px;
                      border-bottom-right-radius: 8px;
                      position:absolute;
                      top: 42px;
                      left: -70px;
                      display:none;
              }
              .usermessagebox .text{
                 width:140px;
                height:20px;
                // padding:20px;
                // padding-top:35px;
                margin:20px;
                // background-color:gray;
              }
              .quit{
                 width:100%;
                  height:18px;
                    background-color: #f4f4f4;
                      font-size:12px;
                      border-bottom-left-radius: 8px;
                      border-bottom-right-radius: 8px;
                      text-align:center;
                      line-height:18px;
                      padding:5px 0px;
                      cursor: pointer;
              }
                // 登录注册
                  /* 利用伪元素来清除浮动  */
        .clearfix::after {
          content: "";
          display: block;
          clear: both;
        }
        .mask{
            width: 100%;
            height: 318px;
            display: flex;
            justify-content: center;
            width: 100%;
             height: 100%;
             position: fixed;
             top: 0;
             left: 0;
             font-size: 14px;
             background: rgba(0,0,0,.5);
             z-index: 10010;
             -webkit-box-align: center;
            display:none;
             align-items: center;
        }
        .LoginAndRegisterbox{
            width: 400px;
            height: 349px;
            // background-color: wheat;
            margin-left:110px;
        }
       
        .mask .bigbox{
            width: 663px;
               height: 400px;
            padding: 52px 65px 29px 92px;
            background-color: white;
            margin:auto;

        }
        .LoginAndRegisterbox .box{
            background-color: aquamarine;
        }
         .LoginAndRegisterbox .inputbox{
           width:400px;
           height:226px;
          //  background-color:yellow;
           font-size:14px
         }
         .LoginAndRegisterbox .inputbox >div{
           width:400px;
           height:40px;
           margin-bottom:22px;
         }
         .LoginAndRegisterbox .inputbox span{
             text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #606266;
            line-height: 40px;
            padding: 0 12px 0 0;
            box-sizing: border-box;
            width:88px;
            height:40px;

         }
         .LoginAndRegisterbox .inputbox input{
           -webkit-appearance: none;
            background-color: #FFF;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #DCDFE6;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            outline: 0;
            padding: 0 15px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            width: 269px;
         }
        .btnbox{
            width: 100%;
            // background-color: red;
            // display: flex;
            // justify-content: space-between;
            margin-top: 20px;
        }
        .btnbox > div{
           display: inline-block;
             line-height: 1;
             white-space: nowrap;
             cursor: pointer;
             background: #fff;
             border: 1px solid #dcdfe6;
             color: #606266;
             -webkit-appearance: none;
             text-align: center;
             box-sizing: border-box;
             outline: none;
             margin: 0;
             transition: .1s;
             font-weight: 500;
             -moz-user-select: none;
             -webkit-user-select: none;
             -ms-user-select: none;
             padding: 12px 20px;
             font-size: 14px;
             border-radius: 4px;
            cursor: pointer;
            float:left;
            margin-left:100px;
        }
        .loginbtn{
          color: #fff !important;
          background-color: #409eff !important;
          border-color: #409eff !important;
        }
        .loginbtn:hover{
          background-color: #40a0ffe8 !important;
        }
        .registerbtn:hover{
          color: #409eff;
          border-color: #c6e2ff;
          background-color: #ecf5ff;
        }
        .bigbox h2{
          text-align:center;
        }
        .close{
            width: 32px;
            height: 32px;
            // background-color: blue;
            text-align: center;
            line-height: 32px;
           margin-left: 574px;
            cursor: pointer;
        }
        .close img{
            width: 32px;
            height: 32px;
        }
        // 底部
               .footer{
            width: 102%;
            height: 226px;
            margin: auto;
            padding-top: 40px;
            padding-bottom: 26px;
            margin-top: 60px;
            background-color: #212121;
            position: absolute;
            bottom:-944px;
            left:-8px;
            // position: fixed;
            // bottom:0px;
            // left:0px;
            // display:none;
        }
        .size-rule{
            width: 1160px;
            height: 226px;
            margin: auto;
            // background-color: red;
            position:relative;
        }
        .row-one{
            width: 1160px;
            height: 88px;
            // background-color: aqua;
            display: flex;
            position:absolute;
            top:0px
        }
        .row-two{
            width: 1160px;
            height: 108px;
            margin-top: 30px;
            // background-color: greenyellow;
            display: flex;
            position:absolute;
            bottom:0px
        }
        .left{
            width: 660px;
            height: 68px;
            // background-color: bisque;
            display: flex;
            line-height: 68px;
        }
        .left img{
            width: 68px;
            height: 68px;
            margin-right: 24px;
            // background-color: blue;
            // border-radius:8px;
        }
        .left .title{
            /* color: hsla(0,0%,100%,.7); */
            color: #bdbdbd;
            font-size: 25px;
        }
        .middle{
            /* background-color: hsla(0,0%,100%,.2); */
            background-color: #bdbdbd;
            height: 88px;
             width: 1px;
        }
        .right{
            width: 420px;
            height: 76px;
            margin-left: 60px;
            // background-color: gray;
            display: flex;
        }
        .right-item{
            height: 76px;
            // background-color: pink;
            color: hsla(0,0%,100%,.5);
            display: inline-block;
            font-size: 12px;
            letter-spacing: 0;
            margin: 0 38px;
            position: relative;
            text-align: center;
            -webkit-user-select: none;
            user-select: none;
            vertical-align: middle;
            width: 64px;
        }
        .right-item img{
            width: 64px;
            height: 64px;
            margin-bottom: 8px;
            cursor: pointer;
            // background-color: gold;
        }
        .hover-panel{
            position: absolute;
            background-color: #fb7299;
            border-radius: 2px;
            color: #fff;
            left: 50%;
            cursor: pointer;
            padding: 2px 6px;
            top: 130%;
            transform: translate(-50%);
            width: 64px;
            
        }
        .hover-panel::before{
            border: 4px solid transparent;
            border-bottom-color: #fb7299;
            content: "";
            display: block;
            left: 50%;
            position: absolute;
            top: 0;
            transform: translate(-50%,-100%);
        }
        .item-text{
            left: 50%;
            position: absolute;
            transform: translate(-50%);
            white-space: nowrap;
            z-index: 10;
            bottom: -16px;
            font-size: 12px;
        }
        .logo-list{
            width: 208px;
            height: 40px;
            // background-color: blueviolet;
            display: flex;
        }
        .logo-list img{
            width: 96px;
            height: 36px;
            margin-right: 16px;
            background-color: yellow;
        }
        .logo-list .img:nth-child(2){
            margin-right: 0px;
        }
        .text-info{
            font-size: 12px;
            color: hsla(0,0%,100%,.4);
            font-size: 12px;
             line-height: 1;
             margin-left: 32px;
             width: 501px;
             height: 108px;
            //  background-color: pink;
        }
        p{
            color: #7a7a7a;
        }
        a{
            text-decoration: none;
            color: #7a7a7a;
        }
</style>