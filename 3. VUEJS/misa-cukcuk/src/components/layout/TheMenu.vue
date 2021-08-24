<template lang="">
	<div id="menu">
		<div class="menu__list">
			<a
				v-for="(item, index) in options"
				:key="index"
				class="menu__item"
				:class="{'menu__item--select': item.href == $route.path}"
				:href="item.href"
			>
				<div class="menu__item-icon"></div>
				{{ item.name }}
			</a>
		</div>
	</div>
</template>
<script>
	export default {
		name: "TheMenu",
		data() {
			return {
				options: [
					{name: "Tổng quan", href: "#"},
					{name: "Báo cáo", href: "#"},
					{name: "Mua hàng", href: "#"},
					{name: "Danh mục nhân viên", href: "/employees"},
					{name: "Danh mục khách hàng", href: "/customers"},
					{name: "Thiết lập hệ thống", href: "#"},	
				],	
			};
		}	
	};
</script>
<style>
	@import url("../../css/common/menu.css");
</style>
