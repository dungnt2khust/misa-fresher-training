<template lang="">
	<div id="menu">
		<ul class="menu__list">
			<li
				v-for="(item, index) in options"
        @click="menuItemOnClick(index)"
				:key="index"
				class="menu__item"
        :class="{ 'menu__item--active': index == currIdx}"
			>
				<div class="menu__item-icon"></div>
				{{ item }}
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: "TheMenu",
		data() {
			return {
				options: [
					"Tổng quan",
					"Báo cáo",
					"Mua hàng",
					"Danh mục nhân viên",
					"Danh mục khách hàng",
					"Thiết lập hệ thống",
				],
				currIdx: 3,
			};
		},
    methods: {
      /**
       * Bắt sự kiện click vào menu item
       * @param {number} index
       * CreatedBy: NTDUNG (21/08/2021)
       */
      menuItemOnClick(index) {
        this.currIdx = index;
      }
    }
	};
</script>
<style>
	@import url('../../css/common/menu.css');
</style>
