<template lang="">
	<div>
		<div
			class="combobox"
			tabindex="10"
			:class="{
				'combobox--show': comboboxState,
				'combobox--error': comboboxInvalid,
			}"
			v-on="comboboxListeners"
		>
			<input
				@focus="inputSearchOnFocus($event)"
				@input="inputSeachOnInput($event)"
				@blur="inputSearchOnBlur($event)"
				v-model="inputValue"
				type="text"
				class="combobox__input"
			/>
			<div @click="cancelInputOnClick($event)" class="combobox__input-cancel">
				<i class="fas fa-times-circle"></i>
			</div>
			<div @click="comboboxDropdownOnClick($event)" class="combobox__dropdown">
				<i class="fas fa-chevron-down combobox__icon-down"></i>
			</div>
			<ul class="combobox__list">
				<li
					@click="itemOnClick(-1)"
					class="combobox__item"
					:class="{ 'combobox__item--active': currIdx == -1 }"
				>
					{{ defaultValue }}
				</li>
				<li
					@click="itemOnClick(index)"
					v-for="(item, index) in comboboxData"
					:key="index"
					:index="index"
					class="combobox__item"
					:class="{ 'combobox__item--active': index == currIdx }"
				>
					{{ item[comboboxField + "Name"] }}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		name: "BaseCombobox",
		props: {
			comboboxData: {
				type: Array,
				default: function() {
					return [];
				},
			},
			comboboxField: {
				type: String,
				default: "",
			},
			defaultValue: {
				type: String,
				default: "",
			},
		},
		data() {
			return {
				comboboxState: false,
				comboboxInvalid: false,
				currIdx: -1,
				inputValue: this.defaultValue
			};
		},
		methods: {
			/**
			 * Bắt sự kiện click vào từng option của combobox
			 * CreatedBy: NTDUNG (02/08/2021)
			 * @param {number} index
			 */
			itemOnClick(index) {
				this.currIdx = index;
				this.comboboxState = false;
				if (index >= 0) {
					this.$emit("changeComboboxValue", {
						Field: this.comboboxField,
						Value: this.comboboxData[index][this.comboboxField + "Id"],
					});
				}  
				if (index == -1) {
					this.$emit("changeComboboxValue", {
						Field: this.comboboxField,
						Value: ""
					});
				}
			},
			/**
			 * Bắt sự kiện click vào nút cancel trong ô input
			 * CreatedBy: NTDUNG (02/08/2021)
			 * @param {event} event
			 */
			cancelInputOnClick(event) {
				let input = event.target.parentElement.parentElement.querySelector(
					"input"
				);
				input.focus();
				this.inputValue = "";
				this.resetListItem(event);
			},
			/**
			 * Sự kiện nhập vào ô tìm kiếm ở combobox
			 * CreatedBy: NTDUNG (02/08/2021)
			 * @param {event} event
			 */
			inputSeachOnInput(event) {
				let inputValue = this.inputValue.toLowerCase().trim();
				let liElements = event.target.parentElement.querySelectorAll("ul li");
				liElements.forEach((liElement) => {
					let liVal = liElement.innerText.toLowerCase().trim();
					if (!liVal.includes(inputValue)) {
						liElement.style.display = "none";
					} else {
						liElement.style.display = "block";
					}
				});
			},
			/**
			 * Bắt sự kiện click vào nút dropdown ở combobox
			 * CreatedBy: NTDUNG (02/08/2021)
			 * @param {event} event
			 */
			comboboxDropdownOnClick(event) {
				this.comboboxState = !this.comboboxState;
				if (this.comboboxState) {
					this.comboboxInvalid = false;
					let input = event.target.parentElement.parentElement.querySelector(
						"input"
					);
					input.focus();
				} else {
					this.checkValueInput();
				}
			},
			/**
			 * Sự kiện focus vào ô input
			 * CreatedBy: NTDUNG (11/08/2021)
			 * @param {event} event
			 */
			inputSearchOnFocus(event) {
				this.comboboxState = true;
				this.comboboxInvalid = false;
				this.resetListItem(event);
			},
			/**
			 * Sự kiện blur ra ngoài ô input
			 * CreatedBy: NTDUNG (11/08/2021)
			 * @param {event} event
			 */
			inputSearchOnBlur(event) {
				if (event.relatedTarget !== null) {
					if (event.target.parentElement !== event.relatedTarget) {
						this.comboboxState = false;
					}
				} else {
					this.comboboxState = false;
					this.checkValueInput();
				}
			},
			/**
			 * Đưa danh sách lựa chọn về trạng thái đầy đủ
			 * CreatedBy: NTDUNG (11/08/2021)
			 * @param {event} event sự kiện khi tác động vào input
			 */
			resetListItem(event) {
				let liElements = event.target.parentElement.parentElement.querySelectorAll(
					"ul li"
				);
				liElements.forEach((liElement) => {
					liElement.style.display = "block";
				});
			},
			/**
			 * Kiểm tra giá trị của input có hợp lệ hay không
			 * CreatedBy: NTDUNG (11/08/2021)
			 * @returns {boolean} trả về true là đúng, false là sai
			 */
			checkValueInput() {
				// Nếu input value rỗng thì set về giá trị hiện tại
				if (this.inputValue == "") 
					this.itemOnClick(this.currIdx);
				else { 
					// Nếu input value không bằng giá trị mặc định thì mới bắt đầu tìm kiếm trong mảng
					if (this.inputValue != this.defaultValue) {
						var foundIdx = this.comboboxData.findIndex((item) => {
							return this.inputValue == item[this.comboboxField + "Name"];
						});
						if (foundIdx == -1) {	
							this.itemOnClick(-2);
							this.comboboxInvalid = true;
						} else {
							this.itemOnClick(foundIdx);
						}
					}
				}	
			}
		},
		computed: {
			/**
			 * Lắng nghe sự kiện trên combobox
			 * CreatedBy: NTDUNG (25/08/2021)
			 */
			comboboxListeners: function () {
				return Object.assign({}, this.$listeners, {
					keydown: (event) => {
						console.log(event);
						switch(event.key) {
							case "Enter":	
								if (event.target.tagName == "LI") {
									console.log(event.target.getAttribute("index"));
								}
								this.comboboxState = !this.comboboxState;
								if (!this.comboboxState) 
									this.checkValueInput();
								break;
							case "ArrowUp":
								if (this.currIdx == -1) {
									this.currIdx = this.comboboxData.length - 1;
								} else {
									this.currIdx--;
								}
								break;
							case "ArrowDown":
								if (this.currIdx == this.comboboxData.length - 1) {
									this.currIdx = -1;	
								} else {
									this.currIdx++;
								}
								break;
						}	
					}
				});
			}
		},
		watch: {
			currIdx: function(newValue) {
				if (newValue == -1) {
					this.inputValue = this.defaultValue;
				} else {
					this.inputValue = this.comboboxData[newValue][this.comboboxField + "Name"];
				}
			}
		}
	};
</script>
<style>
	@import url("../../css/base/combobox.css");
</style>
