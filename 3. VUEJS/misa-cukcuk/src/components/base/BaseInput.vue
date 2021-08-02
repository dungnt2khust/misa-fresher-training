<template lang="">
    <div>
        <span 
            style="display: block" 
            class="popup-infor__label"
            v-html="requiredAssign"
            ></span>
        <input
            :type="inputType"
            class="popup-infor__input"
            :style="{width: widthCalc}"
        />
    </div>
</template>
<script>
export default {
    name: 'BaseInput',
    props: {
        inputName: {
            type: String,
            default: ''
        },
        alone: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        inputType: {
            type: String,
            default: 'text'
        }
    },
    computed: {
        widthCalc() {
            return this.alone ? 'calc(50% - 5px)' : '100%';
        },
        requiredAssign() {
            if (this.required) {
                return `${this.inputName} (<span class="text-red">*</span>)`;
            } else {
                return `${this.inputName}`;
            }
        }
    }
}
</script>
<style lang="">
    
</style>