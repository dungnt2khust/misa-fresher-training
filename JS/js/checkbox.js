var checkboxs = document.querySelectorAll('.checkbox');

checkboxs.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        checkbox.classList.toggle('checkbox--checked');
        console.log('check')
    });
    checkbox.querySelector('.checkbox__icon').addEventListener('click', () => {
        checkbox.classList.toggle('checkbox--checked');
        console.log('check')
    });
});
