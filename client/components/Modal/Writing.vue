<template>
  <div v-if="modal.writing " class="modal-outside">
    <div id="writing-modal">
      <div class="head">
        <a @click.prevent="$store.commit('modal/SET_WRITING_MODAL_STATE',false)" class='close-btn'>
          <img src="/icon/close.png" alt="close">
        </a>
        <h5>글쓰기</h5>
        <a @click.prevent="confirmUploadModal">등록</a>
      </div>
      <!-- 드롭다운 부분 -->
      <div v-if="boardList.length > 0" class="dropdown">
        <a class="current-select" @click.prevent="isBoardSelected = !isBoardSelected">
          <span>{{ boardList[currentSelectedBoard].title }}</span>
          <ChevronDownIcon :class="[isBoardSelected && 'rotated', 'down-icon']"/>
        </a>
        <div v-if="isBoardSelected" class="board-container">
          <div v-for="(b,i) in boardList" :key="b._id" class="board-item" @click="clickBoard(i)">{{b.title}}</div>
        </div>
      </div>
      <!-- 제목 및 본문 입력  -->
      <div class="input-container">
        <!-- 제목 입렵  -->
        <input type="text" v-model="title" placeholder="제목을 입력해주세요.">
        <!-- 본문입력 -->
        <textarea v-model="content" placeholder="토픽에 맞지 않는 글로 판단되어 다른 유저로부터 일정 수 이상의 신고를 받는 경우 글이 자동으로 숨김처리 될 수 있습니다." ></textarea>
      </div>
      <!-- 버튼들이 있는 하단부 -->
      <div class="foot">
        <CameraIcon class="icon"/>
        <BarChart2Icon class="icon"  />
        <AtSignIcon class="icon"  />
        <HashIcon class="icon"  />
      </div>
    </div>

    <confirm-modal :show="showConfirmModal" :title="confirmTitle" @confirm="listenConfirm"/>
    
  </div>
</template>

<script>
import { ChevronDownIcon ,CameraIcon,BarChart2Icon,AtSignIcon ,HashIcon  } from 'vue-feather-icons'
import ConfirmModal from '@/components/Modal/Confirm'
import {mapState} from "vuex"


export default {
  data(){
    return{
      boardList:[],
      currentSelectedBoard:0, // 현재 선택된 것.
      isBoardSelected:false, // select를 선택 했는지 여부
      title:'',
      content:null,
      showConfirmModal:false,
      confirmTitle:'',
    }
  },
  created(){
    this.getBoardList()
  },
  computed:{
    ...mapState(['modal'])
  },
  methods:{
    async getBoardList(){
      if(process.browser){
        const data = await this.$api.$get('/board/list')
        
        if(!Array.isArray(data)){
          return 
        }
        this.boardList = data
      }
    },
    clickBoard(index){
      this.currentSelectedBoard = index
      this.isBoardSelected = false
    },
    closeConfirmModal(){
      this.showConfirmModal = false
      this.confirmTitle = ''
    },
    listenConfirm(confirm){
      
      !confirm ? this.closeConfirmModal() : this.uploadArticle()
    },
    confirmUploadModal(){
      this.showConfirmModal = true
      this.confirmTitle =`'${this.boardList[this.currentSelectedBoard].title}' 에 글을 등록하시겠습니까?`
    },
    async uploadArticle(){
      if(process.browser){

        const data = await this.$api.$post('/article/create',{
          title:this.title,
          content:this.content,
          board:this.boardList[this.currentSelectedBoard]._id
        })

        console.log('data',data)
        if(data.error){
          return
        }
        this.closeConfirmModal()
        this.$store.commit('modal/SET_WRITING_MODAL_STATE',false)

      }

    }
  },
  components:{
    ChevronDownIcon,
    CameraIcon,
    BarChart2Icon ,
    AtSignIcon ,
    ConfirmModal,
    HashIcon,
    
  }
}
</script>

<style lang="scss" scoped>
#writing-modal{
  width: 750px;

  height: 610px;
  background: white;
  .dropdown{
     width: inherit;
     user-select: none;
     
    .current-select{
      height: 68px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      align-items: center;
      border-bottom: 1px solid #d4d4d4;
      .down-icon{
        transition: .3s ease-in-out;
        &.rotated{
          transform: rotate(180deg);
        }
      }
    }
    .board-container{
      position: absolute;
      overflow-y: auto;
      width: inherit;
      border-bottom: 1px solid #d4d4d4;
      height:100%;   
      max-height: 252px;
      background-color: white;
    }
    .board-item{
      padding:12px 20px 11px;
      font-size: 12px;
      border-bottom: 1px solid #f6f7fa;
      cursor: pointer;
      &:hover{
        color: #fff;
        background: #da3238;
      }
    }
  }

  .input-container{
    padding: 0 52px 55px;
  }
  input[type=text]{
    padding: 26px 60px 24px 0;
    font-size: 20px;
    line-height: 1.25em;
    display: block;
    box-sizing: border-box;
    width: 100%;
    border:none;
    border-bottom: 1px solid #eee;
  }
  textarea{
    resize: none;
    display: block;
    border:none;
    margin-top: 30px;
    font-size: 16px;
    min-height: 240px;
    overflow: hidden;
    letter-spacing: -0.1px;
    line-height: 1.5em;
    width: 100%;
  }
  .foot{
    height: 67px;
    padding: 0 24px;
    background: #f6f7fa;
    border: 0;
    display: flex;
    align-items: center;
    & > .icon{
      padding: 0 10px;
    }
  }

}

</style>