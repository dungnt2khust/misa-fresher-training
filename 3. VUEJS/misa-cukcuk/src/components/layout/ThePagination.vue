<template lang="">
    <div class="pagination">
        <p class="pagination__text">Hiển thị 1-10/1000 nhân viên</p>
        <ul class="pagination__list">
            <li class="pagination__item">
                <img class="pagination__item-img" src="../../assets/icon/btn-firstpage.svg" alt="" />
            </li>
            <li class="pagination__item">
                <img class="pagination__item-img" src="../../assets/icon/btn-prev-page.svg" alt="" />
            </li>
            <li class="pagination__item active">1</li>
            <li class="pagination__item">2</li>
            <li class="pagination__item">3</li>
            <li class="pagination__item">4</li>
            <li class="pagination__item">
                <img class="pagination__item-img" src="../../assets/icon/btn-next-page.svg" alt="" />
            </li>
            <li class="pagination__item">
                <img class="pagination__item-img" src="../../assets/icon/btn-lastpage.svg" alt="" />
            </li>
        </ul>
        <div class="input__number-wrapper">
            <label for="input__number">Số nhân viên/trang: </label>
            <input type="number" name="" id="input__number" value="10" class="input__number">
        </div>
    </div> 
</template>
<script>
export default {
    name: 'ThePagination' 
}
</script>
<style lang="">
    
</style>