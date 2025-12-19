document.addEventListener("DOMContentLoaded", function() {
    if (!getCookie('setDealerMethod')) {
        setCookie('setDealerMethod', 'autoAssign', 365);
    }
});

const setDealerBtns = document.querySelectorAll('.set-dealer')
for (let setDealerBtn of setDealerBtns) {
    setDealerBtn.addEventListener('click', function() {
        setCookie('setDealerMethod', 'userAssign', 365);
    })
}

const dealerSelectBtns = document.querySelectorAll('.dealerSelect');
for (let dealerSelectBtn of dealerSelectBtns) {
    dealerSelectBtn.addEventListener('click', function() {
        setCookie('setDealerMethod', 'userAssign', 365);
    })
}
