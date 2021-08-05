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
        /**
         * Lắng nghe sự kiện hiển thị popup dialog
         * CreatedBy: NTDUNG (05/08/2021)
         * @param {object} data chứa các thông tin hiển thị của popup dialog
         */
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
        /**
         * Bắt sự kiện click vào nút continue
         * CreatedBy: NTDUNG (05/08/2021)
         */
        continueBtnOnClick() {
            this.popupDialogState = false;
            EventBus.$emit('continueBtnOnClick', this.mode);
        },

        /**
         * Bắt sự kiện click vào nút continue
         * CreatedBy: NTDUNG (05/08/2021)
         */
        cancelBtnOnClick() {
            this.popupDialogState = false;
            EventBus.$emit('cancelBtnOnClick', this.mode);
        }
    },
    computed: {
        /**
         * Theo mỗi type khác nhau thì nút cancel được style theo các class khác nhau
         * CreatedBy: NTDUNG (05/08/2021)
         */
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