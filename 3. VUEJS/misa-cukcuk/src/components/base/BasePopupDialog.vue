<template lang="">
    <div class="popup-lib" :class="`popup--${type}-lib`" :style="{display: popupDialogState ? 'block' : 'none'}">
        <div class="popup-overlay-lib"></div>
        <div class="popup-container-lib">
        <div class="popup-header-lib">
            <span class="popup-title-lib">{{ title }}</span>
            <div class="popup-cancel-lib">
                <img src="../../assets/icon/x.svg" alt="">
            </div>
        </div>
        <div class="popup-body-lib">
            <div class="popup-icon-lib" v-if="type != 'info'">
                <i class="fas fa-exclamation-triangle"></i> 
            </div>
            <span class="popup-content-lib" v-html="content"></span>
        </div>
        <div class="popup-footer-lib">
            <button @click="continueBtnOnClick" id="popup-btn-continue-lib" class="popup-btn-lib" v-if="type != 'info'">
                {{ continueBtn }}
            </button>
            <button @click="cancelBtnOnClick" id="popup-btn-cancel-lib" :class="cancelBtnState" class="popup-btn-lib">Đóng</button>
        </div>
        </div>
  </div>  
</template>
<script>
import { EventBus } from '../../main'
export default {
	name: "BasePopupDialog",
	data() {
		return {
			popupDialogState: false,
			type: "",
			title: "",
			content: "",
			continueBtn: "",
            mode: ""
		};
	},
    mounted() {
        EventBus.$on('showPopupDialog', data => {
            this.popupDialogState = true;
            this.type = data['type'];
            this.title = data['title'];
            this.content = data['content'];
            this.continueBtn = data['continueBtn'];
            this.mode = data['mode'];
        });
    },
    methods: {
        continueBtnOnClick() {
            this.popupDialogState = false;
            EventBus.$emit('continueBtnOnClick', this.mode);
        },
        cancelBtnOnClick() {
            this.popupDialogState = false;
            EventBus.$emit('cancelBtnOnClick', this.mode);
        }
    },
    computed: {
        cancelBtnState() {
            switch(this.type) {
                case 'error':
                    return 'popup-btn--negative-lib';
                case 'info':
                case 'warn':
                    return 'popup-btn--positive-lib';
                default: 
                    return '';
            }
        }
    }
    
};
</script>
<style>
    @import url('../../css/common/popupDialog.css'); 
</style>