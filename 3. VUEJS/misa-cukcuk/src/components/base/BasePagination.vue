<template lang="">
	<div class="pagination">
		<p class="pagination__text">Hiển thị 1-10/1000 nhân viên</p>
		<ul class="pagination__list">
			<li @click="firstPageOnClick()" class="pagination__item">
				<img
					class="pagination__item-img"
					src="../../assets/icon/btn-firstpage.svg"
					alt=""
				/>
			</li>
			<li @click="prevPageOnClick()" class="pagination__item">
				<img
					class="pagination__item-img"
					src="../../assets/icon/btn-prev-page.svg"
					alt=""
				/>
			</li>
			<li
				@click="pageItemOnClick(index)"
				v-for="index in pageNum"
				:class="{ active: currIdx == index }"
				:key="index"
				class="pagination__item"
                v-show="displayItemOnClick(index)"
			>
				{{ index }}
			</li>
			<li @click="nextPageOnClick()" class="pagination__item">
				<img
					class="pagination__item-img"
					src="../../assets/icon/btn-next-page.svg"
					alt=""
				/>
			</li>
			<li @click="lastPageOnClick()" class="pagination__item">
				<img
					class="pagination__item-img"
					src="../../assets/icon/btn-lastpage.svg"
					alt=""
				/>
			</li>
		</ul>
		<div class="input__number-wrapper">
			<label for="input__number">Số nhân viên/trang: </label>
			<input
				type="number"
				name=""
				id="input__number"
				value="10"
				class="input__number"
			/>
		</div>
	</div>
</template>
<script>
	export default {
		name: "BasePagination",
		data() {
			return {
				pageNum: 18,
				currIdx: 1,
                pageNumDisplay: 4
			};
		},
        methods: {
            /**
             * Sự kiện click vào item của pagination
             * CreatedBy: NTDUNG (09/08/2021)
             * @param {number} index
             */
            pageItemOnClick(index) {
                this.currIdx = index;
            },
            /**
             * Sự kiện click vào first page
             * CreatedBy: NTDUNG (09/08/2021)
             */
            firstPageOnClick() {
                this.currIdx = 1;
            },
            /**
             * Sự kiện click vào previous page
             * CreatedBy: NTDUNG (09/08/2021)
             */
            prevPageOnClick() {
                if (this.currIdx != 1) {
                    this.currIdx -= 1;
                }
            },/**
             * Sự kiện click vào next page
             * CreatedBy: NTDUNG (09/08/2021)
             */
            nextPageOnClick() {
                if (this.currIdx != this.pageNum) { 
                    this.currIdx += 1;
                }
            },/**
             * Sự kiện click vào last page
             * CreatedBy: NTDUNG (09/08/2021)
             */
            lastPageOnClick() {
                this.currIdx = this.pageNum;
            },
            /**
             * Cho phép hiển thị hoặc không các page item
             * CreatedBy: NTDUNG (09/08/2021)
             * @param {number} index
             */
            displayItemOnClick(index) {
                var idxDisplay = Math.ceil(this.currIdx / this.pageNumDisplay);
                return index <= idxDisplay * this.pageNumDisplay && index >= (idxDisplay - 1) * this.pageNumDisplay + 1;
            }
        }
	};
</script>
<style lang=""></style>
