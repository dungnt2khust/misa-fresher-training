<template lang="">
	<div class="pagination">
		<p class="pagination__desc" v-html="paginationDesc">
        </p>
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
				v-for="index in totalPage" 
				:class="{'pagination__item--active': currPage == index }"
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
		<div class="pagination__option">
			<DropUpEmployeeNum
                :currIdxTranfer="currOption"
                :dropupData="optionPaging"
                @changeOptionDropup="changeOptionPaging($event)"
            />
		</div>
	</div>
</template>
<script>
    import BaseDropUp from './BaseDropUp.vue'
	export default {
		name: "BasePagination",
        props: {
            totalPage: {
                type: Number,
                default: -1
            },
            currPage: {
                type: Number,
                default: -1
            },
            pageNumDisplay: {
                type: Number,
                default: -1
            },
            currOption: {
                type: Number,
                default: -1
            },
            optionPaging: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            totalRecord: {
                type: Number,
                default: -1
            }
        },
        methods: {
            /** 
             * Sự kiện click vào item của pagination
             * CreatedBy: NTDUNG (09/08/2021)
             * @param {number} index
             */
            pageItemOnClick(index) {
                this.$emit('changeCurrPage', index);
            },
            /**
             * Sự kiện click vào first page
             * CreatedBy: NTDUNG (09/08/2021)
             */
            firstPageOnClick() {
                this.$emit('changeCurrPage', 1);
            },
            /**
             * Sự kiện click vào previous page
             * CreatedBy: NTDUNG (09/08/2021)
             */
            prevPageOnClick() {
                if (this.currPage != 1) {
                    this.$emit('changeCurrPage', this.currPage - 1);
                }
            },/**
             * Sự kiện click vào next page
             * CreatedBy: NTDUNG (09/08/2021)
             */
            nextPageOnClick() {
                if (this.currPage != this.totalPage) { 
                    this.$emit('changeCurrPage', this.currPage + 1);
                }
            },/**
             * Sự kiện click vào last page
             * CreatedBy: NTDUNG (09/08/2021)
             */
            lastPageOnClick() {
                this.$emit('changeCurrPage', this.totalPage);
            },
            /**
             * Cho phép hiển thị hoặc không các page item
             * CreatedBy: NTDUNG (09/08/2021)
             * @param {number} index
             */
            displayItemOnClick(index) {
                var idxDisplay = Math.ceil(this.currPage / this.pageNumDisplay);
                return index <= idxDisplay * this.pageNumDisplay && index >= (idxDisplay - 1) * this.pageNumDisplay + 1;
            },
            /**
             * Xử lý sự kiện thay đổi option paging
             * CreatedBy: NTDUNG (09/08/2021)
             */
            changeOptionPaging(newIndex) {
                this.$emit('changeCurrOption', newIndex);
            }
        }, 
        computed: {
            paginationDesc() {
                var beginIndex = ((this.currPage - 1) * this.optionPaging[this.currOption]['value'] + 1).toString();
                var endIndex = ((this.currPage) * this.optionPaging[this.currOption]['value'] <= this.totalRecord ? ((this.currPage) * this.optionPaging[this.currOption]['value']) : this.totalRecord).toString();
                var desc = beginIndex + ' - '
                            + endIndex + '/' + this.totalRecord;
                return `Hiển thị <b>${desc}</b> nhân viên`;
            },
            pageNumCeil() {
                return Math.ceil(this.totalPage / this.pageNumDisplay) * this.pageNumDisplay;
            }
        },
        components: {
            DropUpEmployeeNum: BaseDropUp
        }
	};
</script>
<style lang=""></style>
