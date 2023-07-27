//bootstrap addon
const removeMsg = e => {
    e.classList.remove('error');
    if (e.parentNode.lastElementChild.nodeName == 'SPAN') {
        e.parentNode.lastElementChild.remove();
    }
}

const createMsg = (e, msg) => {
    e.classList.add('error');
    let span = document.createElement('span');
    span.setAttribute('class', 'd-block text-danger');
    span.textContent = msg;
    e.parentNode.appendChild(span);
}

const emailValid = e => {
    removeMsg(e);
    if (!e.value.match(/^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
        createMsg(e, 'メールアドレス形式で入力してください');
    }
}

const emptyValid = e => {
    removeMsg(e);
    if (!e.value) {
        createMsg(e, '必須項目です');
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
