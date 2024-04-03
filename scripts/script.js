'use strict'

new WOW({
    animateClass: 'animate__animated'
}).init();

$(document).ready(function(){
    $('.reviews-items').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 586,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});


document.getElementById('burger').onclick = function () {
    document.getElementById('menu2').classList.add('open');
}

document.querySelectorAll('#menu2 *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu2').classList.remove('open');
    }
})


$('.rights span').text((new Date().getFullYear()));


$('#menu-watch').click(function () {
    $('.our-menu')[0].scrollIntoView({behavior: "smooth"});
});

$('#table').click(function () {
    $('.order')[0].scrollIntoView({behavior: "smooth"});
});


//const select = document.querySelector('.custom-select');
 const select = document.getElementById('timeSelect');
select.addEventListener('click', function () {
    this.classList.toggle('open');
    this.style.backgroundColor = 'white';
});

const options = document.querySelectorAll('.custom-option');
options.forEach(option => {
    option.addEventListener('click', function () {
        const selectedText = this.textContent;
        select.value = selectedText;
        select.classList.remove('open');
        select.style.backgroundColor = '';
    });
});

document.addEventListener('click', function (e) {
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
});

select.addEventListener('keydown', function(event) {
    event.preventDefault();
});

let phoneInput = $('#phone');
phoneInput.inputmask({"mask": "+7 (999) 999 - 99 - 99"});

$('#submit').click(function () {
    let name = $('#name');
    let phone = $('#phone');
    let timeSelect = $('#timeSelect');
    let hasError = false;

    $('.error-input').hide();


    if (!name.val()) {
        name.next().show();
        hasError = true;
    }
    if (!phone.val()) {
        phone.next().show();
        hasError = true;
    }
    if (!timeSelect.val()) {
       // timeSelect.next().show();
        $('#errorTimeSelect').show();
        hasError = true;
    }
    // if (!timeSelect.hasClass('selected')) {
    //      timeSelect.next().show();
    //     //$('#errorTimeSelect').show();
    //     hasError = true;
    // }

    if (!hasError) {
        $.ajax({
            method: "POST",
            url: " https://testologia.ru/checkout",
            data: {name: name.val(), phone: phone.val(), time: timeSelect.find('.selected').text()}
        })

            .done(function (msg) {

                if (msg.success) {
                    document.getElementById("orderForm").style.display = "none";
                    document.getElementById("orderH").style.display = "none";
                    document.getElementById("successMessage").style.display = "block";
                    console.log(msg);


                } else {
                    alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
                    console.log(msg);
                }


            });

    }
})








