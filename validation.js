//bootstrap addon
const emailValid = e => {
    e.classList.remove('error');
    if (e.parentNode.lastElementChild.nodeName == 'SPAN') {
        e.parentNode.lastElementChild.remove();
    }
    if (!e.value.match(/^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
        e.classList.add('error');
        let span = document.createElement('span');
        span.setAttribute('class', 'warning_msg');
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
        span.setAttribute('class', 'warning_msg');
        span.textContent = '必須項目です';
        e.parentNode.appendChild(span);
    }
}

const htmlTagsRep = e => {
    e.value = e.value.replace(/(<([^>]+)>)/gi, '');
}
