<template lang="">
	<div class="toast-message-list">	
		<transition-group name="toast">
		<div v-for="(item, index) in toastMessageList" :class="bindClass(item)" :key="index"  class="toast-message">
			<div class="toast-message__body">
				<div class="toast-message__icon">
					<i class="fas" :class="bindIcon(item)"></i>
				</div>
				<span class="toast-message__title"> {{item.content}}</span>
			</div>
			<div @click="removeToastMessage(item.id, 0)" class="toast-message__cancel">
				<i class="fas fa-times"></i>
			</div>
		</div>
		</transition-group>
	</div>
</template>
<script>
import { EventBus } from '../../main.js'

export default {
	name: "BaseToastMessage",
	data() {
		return {
			iconClasses: [
				"fa-check-circle",
				"fa-exclamation-triangle",
				"fa-exclamation-circle",
				"fa-info-circle",
			],
			toastMessageList: [],
			toastMessageId: 0
		};
	},
	created() {
		/**
		 * Bật lắng nghe sự kiện Toast Message từ các component khác
		 * Author: NTDUNG (03/08/2021)
		 * @param {object} data - Chứa thông tin chi tiết của một Toast Message (type, content, duration)
		 */
		EventBus.$on('ToastMessage', (data) => {
			this.addToastMessage(data);
		});
	},
	methods: {
		/**
		 * Thêm một toast message mới
		 * Author: NTDUNG (03/08/2021)
		 * @param {object} data
		 */
		addToastMessage(data) {
			this.toastMessageList.push({
				type: data['type'],
				content: data['content'],
				id: ++this.toastMessageId
			});
			this.removeToastMessage(this.toastMessageId, data['duration']);	
		},
		/**
		 * Với từng thông báo khác nhau thì các icon sẽ khác nhau
		 * Author: NTDUNG (03/08/2021)
		 * @param {string} item
		 */
		bindIcon(item) {
			var iconClasses = this.iconClasses;
			var iconClass;
			var returnClass = {};
			switch (item.type) {
				case "success":
					iconClass = iconClasses[0];
					break;
				case "error":
					iconClass = iconClasses[1];
					break;
				case "warn":
					iconClass = iconClasses[2];
					break;
				case "info":
					iconClass = iconClasses[3];
					break;
				default:
					return "";
			}
			returnClass[iconClass] = true;
			return returnClass;
		},
		/**
		 * Với những thông báo khác nhau thì màu hiển thị cũng khác nhau (css qua class)
		 * Author: NTDUNG (03/08/2021)
		 * @param {string} item
		 */
		bindClass(item) {
			var type;
			var returnClass = {};
			switch (item.type) {
				case "success":
					type = "toast-message--success";
					break;
				case "error":
					type = "toast-message--error";
					break;
				case "warn":
					type = "toast-message--warn";
					break;
				case "info":
					type = "toast-message--info";
					break;
				default:
					return "";
			}
			returnClass[type] = true;
			return returnClass;
		},
		/**
		 * Xoá toast message
		 * Author: NTDUNG (03/08/2021)
		 * @param {number} id - id của toast message
		 * @param {number} duration - khoảng thời gian chờ cho đến lúc xoá
		 */
		removeToastMessage(id, duration) {
			setTimeout(() => {
				var foundMatchId = this.toastMessageList.findIndex((item) => {
					return item.id == id;
				});
				this.toastMessageList.splice(foundMatchId, 1);
			}, duration);
		},
	}
};
</script>
<style scoped>
	@import url("../../css/common/toastMessage.css");
	.toast-leave {
		opacity: 1;
	}
	.toast-leave-active {
		transition: all 0.2s ease;
		opacity: 0;
	}
</style>
