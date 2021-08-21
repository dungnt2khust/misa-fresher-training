<template lang="">
    <div class="dialog" :class="dialogClass">
        <div class="dialog__overlay"></div>
        <div class="dialog__container">
        <div class="dialog__header">
            <span class="dialog__title">{{ title }}</span>
            <div @click="cancelBtnOnClick" class="dialog__cancel">
                <img src="../../assets/icon/x.svg" alt="">
            </div>
        </div>
        <div class="dialog__body">
            <div class="dialog__icon" v-if="type != 'info'">
                <i class="fas fa-exclamation-triangle"></i> 
            </div>
            <span class="dialog__content" v-html="content"></span>
        </div>
        <div class="dialog__footer">
            <button @click="continueBtnOnClick" class="dialog__btn" v-if="type != 'info'">
                {{ continueBtn }}
            </button>
            <button @click="cancelBtnOnClick" :class="cancelBtnState" class="dialog__btn">Đóng</button>
        </div>
        </div>
  </div>  
</template>
<script>
import { EventBus } from '../../main'
export default {
	name: "BaseDialog",
	data() {
		return {
			dialogState: false,
			type: "",
			title: "",
			content: "",
			continueBtn: "",
            mode: ""
		};
	},
    mounted() {
        /**
         * Lắng nghe sự kiện hiển thị dialog
         * CreatedBy: NTDUNG (05/08/2021)
         * @param {object} data chứa các thông tin hiển thị của dialog
         */
        EventBus.$on('showDialog', data => {
            this.dialogState = true;
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
            this.dialogState = false;
            EventBus.$emit('continueBtnOnClick' + this.mode);
        },

        /**
         * Bắt sự kiện click vào nút continue
         * CreatedBy: NTDUNG (05/08/2021)
         */
        cancelBtnOnClick() {
            this.dialogState = false;
            EventBus.$emit('cancelBtnOnClick' + this.mode);
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
                    return 'dialog__btn--negative';
                case 'info':
                case 'warn':
                    return 'dialog__btn--positive';
                default: 
                    return '';
            }
        },
        /**
         * Gán class cho dialog
         * CreatedBy: NTDUNG (21/08/2021)
         */
        dialogClass() {
            var dialogClass = {};
            var dialogType = `dialog--${this.type}`;
            dialogClass[dialogType] = true;
            dialogClass["dialog--show"] = this.dialogState;
            return dialogClass;
        }
    }
    
};
</script>
<style>
    @import url('../../css/base/dialog.css'); 
</style>