const title = document.getElementsByTagName('h1')[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const buttonPlus = document.querySelector('.screen-btn');
const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number');
const inputRange = document.querySelector('.rollback input[type=range]');
const inputRangeValue = document.querySelector('.rollback').querySelector('.range-value');

const total = document.getElementsByClassName('total-input')[0];
const totalCountInput = document.getElementsByClassName('total-input')[1];
const totalCountOtherInput = document.getElementsByClassName('total-input')[2];
const totalFullCountInput = document.getElementsByClassName('total-input')[3];
const totalCountRollbackInput = document.getElementsByClassName('total-input')[4];
const cmsItem = document.querySelector('#cms-open')
const cmsSelect = document.querySelector('.hidden-cms-variants');
const cmsSelectItems = document.querySelector('#cms-select');
const cmsInputItems = cmsSelect.querySelector('.main-controls__input')

let screens = document.querySelectorAll('.screen')

let order = {
    layoutcost : 0,
    screensnum : 1,
    otheritemscost : 0,
    finalcost : 0,
    rollbackcost : 0

};

let inputbtn = document.querySelector('.main-controls__input').querySelector('input');
inputbtn.type = 'number';
inputbtn.min = '1';
inputbtn.value = '1';
console.log(inputbtn)

function screenPrice() {
    // console.log(screens)
    screens.forEach(screen => {
        const select = screen.querySelector('select').value;
        const input = screen.querySelector('input').value;
        console.log(typeof(select))
        console.log(typeof(input))
        // console.log(select*input)
        order.layoutcost+=select*input
    })
    // if(isNaN(a)){
    //     // console.log('Введите корректное число мониторов')
    // }
    // else{
    // let c = a*b;
    // // console.log(c)
    // }
    
}

function moreItems(){
    // console.log(percentItems,numberItems)
    let percentPrice = 0;
    let numberPrice = 0;
    percentItems.forEach(item => {
        let a = item.querySelector('input');
        if(a.checked){
            percentPrice += Number(item.querySelector('.main-controls__input').querySelector('input').value)
        }
    })
    numberItems.forEach(item => {
        let a = item.querySelector('input');
        if(a.checked){
            numberPrice += Number(item.querySelector('.main-controls__input').querySelector('input').value)
        }
    })
    console.log(percentPrice + '%')
    console.log(numberPrice + 'руб')
    let layoutcost = order.layoutcost;
    let otheritemscost = Number(layoutcost)+(Number(layoutcost)*Number(percentPrice/100))+Number(numberPrice);
    layoutcost = otheritemscost-layoutcost;
    order.otheritemscost=layoutcost;
}
function BlockCheckbox(){
    let checkboxarr = document.querySelectorAll('input[type=checkbox]')
    checkboxarr.forEach(checkbox => {
        checkbox.disabled = true;
    })
}
function changerange(){
    inputRangeValue.textContent = inputRange.value + '%';
    order.rollbackcost = inputRange.value
    document.querySelectorAll('.main-total__item')[4].querySelector('input').value = Math.round((order.layoutcost+order.otheritemscost)*(1+(order.rollbackcost/100)))
}

function checkCMS(){
    
}

function start() {
    screenPrice();
    moreItems();
    BlockCheckbox();
    document.querySelectorAll('.main-total__item')[0].querySelector('input').value = order.layoutcost;
    document.querySelectorAll('.main-total__item')[1].querySelector('input').value = order.screensnum;
    document.querySelectorAll('.main-total__item')[2].querySelector('input').value = order.otheritemscost;
    document.querySelectorAll('.main-total__item')[3].querySelector('input').value = order.layoutcost+order.otheritemscost;
    document.getElementById('start').style.display = 'none';
    document.getElementById('reset').style.display = 'block';
    document.querySelector('.main-controls__input').querySelector('input').setAttribute("readonly", 1);
    document.querySelector('.main-controls__select').querySelector('select').setAttribute('disabled',1);


}
startBtn.addEventListener('click', start)
inputRange.addEventListener('input', changerange);

