//bootstrap addon
const emailValid = e => {
    e.classList.remove('error');
    if (e.parentNode.lastElementChild.nodeName == 'SPAN') {
        e.parentNode.lastElementChild.remove();
    }
    if (!e.value.match(/^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
        e.classList.add('error');
        let span = document.createElement('span');
        span.setAttribute('class', 'd-block text-danger');
        span.textContent = 'メールアドレス形式で入力してください';
        e.parentNode.appendChild(span);
    }
}

const emptyValid = e => {
    e.classList.remove('error');
    if (e.parentNode.lastElementChild.nodeName == 'SPAN') {
        e.parentNode.lastElementChild.remove();
    }
    if (!e.value) {
        e.classList.add('error');
        let span = document.createElement('span');
        span.setAttribute('class', 'd-block text-danger');
        span.textContent = '必須項目です';
        e.parentNode.appendChild(span);
    }
}

const htmlTagsRep = e => {
    e.value = e.value.replace(/(<([^>]+)>)/gi, '');
}

document.addEventListener('DOMContentLoaded', () => {

    (() => {
        [].slice.call(document.querySelectorAll('.needs-validation')).forEach(form => {
            form.addEventListener('submit', e => {
                if (!form.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false)
        })
    })();

});

/*

 onblur="emptyValid(this); htmlTagsRep(this)"
*/
