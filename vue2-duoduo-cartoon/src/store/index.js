import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msg:'尝试修改数据',
    
        activeIndex: '1',
        activeIndex2: '1',
        state:'',
    
    detailid:"25717",
    allrecord:[],
    bigdata:[],
    likearr:[],
    init:0,
    user:[],
    readarr:[],
    readinit:0,
    eplist:[],
    readrecord:0,
    eprecord:0,
    sendarr:[],
  },
  getters: {
  },
  mutations: {
    changeSendarr(state, payload) {
      console.log('changeSendarr');
      console.log('state ==> ', state);
      console.log('payload ==> ', payload);
      console.log("state.sendarr.length==0",state.sendarr.length==0);
      console.log("state.sendarr",state.sendarr);
      // state.sendarr.push(payload);
      if (state.sendarr.length==0) {
        payload.curindex=1;
        state.sendarr.push(payload);
        console.log("state.sendarr 可不可以",state.sendarr);
      }
      else{
        state.sendarr.forEach(function (item,index) {
          console.log("item,index");
          console.log(item,index);
          console.log("item.bookid,payload.bookid");
          console.log(item.bookid,payload.bookid);
          if (item.bookid!==payload.bookid) {
            payload.curindex=1;
            state.sendarr.push(payload);
          }else{
            console.log("item.bookid ==payload.bookid");
            item.readrecord=payload.readrecord;
            item.eprecord=payload.eprecord;
            item.epid=payload.epid;
            item.curindex=1;
          }
          
        });
      }
      
      
      console.log("state.sendarr ",state.sendarr );
    },
    changeAgainSendarr(state, payload) {
      console.log('changeAgainSendarr');
      console.log('state ==> ', state);
      console.log('payload ==> ', payload);
      state.sendarr = payload;
      console.log("state.sendarr ",state.sendarr );
    },
    changeActive(state, payload) {
      console.log('触发changeMsg的mutations');
      console.log('state ==> ', state);
      console.log('payload ==> ', payload);
      state.activeIndex = payload;
      // state.maindata.activeIndex = payload;
    },
    changeDetailId(state, payload) {
      console.log('触发changeMsg的mutations');
      console.log('state ==> ', state);//方法名
      console.log('payload ==> ', payload);//更改值
      state.detailid = payload;
      // state.maindata.activeIndex = payload;
    },
    // 改变record
    changeRecord(state, payload) {
      console.log('触发changeMsg的mutations');
      console.log('state ==> ', state);//方法名
      console.log('payload ==> ', payload);//更改值
      state.record = payload;
      // state.maindata.activeIndex = payload;
    },
    // 改变likearr
    changeLike(state, payload) {
      console.log('触发changeMsg的mutations');
      console.log('state ==> ', state);//方法名
      console.log('payload ==> ', payload);//更改值
      console.log("state.likearr",state.likearr);
      console.log("payload",payload);
    
        state.likearr.push(payload);
        console.log("state.likearr.length",state.likearr.length);
   
        
        
        console.log("state.likearr",state.likearr);
   
      
    },
    // 改变likearr
    changeAgainLike(state, payload) {
      console.log('触发changeMsg的mutations');
      console.log('state ==> ', state);//方法名
      console.log('payload ==> ', payload);//更改值
      console.log("state.likearr",state.likearr);
      console.log("payload",payload);
    
        state.likearr=payload;
        console.log("state.likearr.length",state.likearr.length);
   
        
        
        console.log("state.likearr",state.likearr);
   
      
    },
    // 改变likearr
    changeInit(state, payload) {
      console.log('触发changeMsg的mutations');
      console.log('state ==> ', state);//方法名
      console.log('payload ==> ', payload);//更改值
      
      state.init=payload;
      console.log("state.likearr",state.init);
    },
    // 改变likearr
    changeUser(state, payload) {
      console.log('触发changeMsg的mutations');
      console.log('state ==> ', state);//方法名
      console.log('payload ==> ', payload);//更改值
      
      state.user=payload;
      console.log(" state.user", state.user);
    },
      // 改变Read
      changeRead(state, payload) {
        console.log('触发changeMsg的mutations');
        console.log('state ==> ', state);//方法名
        console.log('payload ==> ', payload);//更改值
        console.log("state.likearr",state.likearr);
        console.log("payload",payload);
      
          state.readarr.push(payload);

          // if (state.readarr.length==0) {
          //   // payload.curindex=1;
          //   state.readarr.push(payload);
          //   console.log("state.readarr 可不可以",state.readarr);
          // } 
        
        
          // if (state.readarr.length==0) {
          //   state.readarr.push(payload);
          //   console.log("state.readarr 可不可以",state.readarr);
          // }
          // else {
          //   state.readarr.forEach(function (item,index) {
          //     console.log("item,index");
          //     console.log(item,item[0]);
          //     console.log("item.bookid,payload.bookid");
          //     console.log(item.bookid,payload.bookid);
          //     console.log("item[0].bookid==payload[0].bookid",item[0].bookid==payload[0].bookid);
          //     if (item[0].bookid==payload[0].bookid) {
                
          //       console.log("第一层判断 item[0].bookid==payload[0].bookid");
                
          //       console.log("第一层第二层判断 item[0].bookid==payload[0].bookid");
          //       return
          //     }else{
          //       console.log("第er层判断 item[0].bookid!==payload[0].bookid");
          //       state.readarr.push(payload);
          //     }
              
          //   });
          // }
         
          console.log("state.readarr",state.readarr);
     
        
      },
        // 改变Read
    changeReadinit(state, payload) {
      console.log('触发changeMsg的mutations');
      console.log('state ==> ', state);//方法名
      console.log('payload ==> ', payload);//更改值
      
      state.readinit=payload;
      console.log("state.likearr",state.init);
    },
        // 改变Readlist
    changeReadlist(state, payload) {
      console.log('触发changeMsg的mutations');
      console.log('state ==> ', state);//方法名
      console.log('payload ==> ', payload);//更改值
      
      state.readlist=payload;
      console.log("state.likearr",state.init);
    },
       
    changeReadrecord(state, payload) {
      console.log('触发changeMsg的mutations');
      console.log('state ==> ', state);//方法名
      console.log('payload ==> ', payload);//更改值
      
      state.readrecord=payload;
      console.log("state.likearr",state.init);
    },
        
    changeEprecord(state, payload) {
      console.log('触发changeMsg的mutations');
      console.log('state ==> ', state);//方法名
      console.log('payload ==> ', payload);//更改值
      
      state.eprecord=payload;
      console.log("state.likearr",state.init);
    },
  },
  actions: {
  },
  modules: {
  }
})
