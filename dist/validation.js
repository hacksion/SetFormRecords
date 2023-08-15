"use strict";
//bootstrap addon
const removeMsg = (e) => {
    e.classList.remove('error');
    if (e.parentNode.lastElementChild.nodeName == 'SPAN') {
        e.parentNode.lastElementChild.remove();
    }
};
const createMsg = (e, msg) => {
    e.classList.add('error');
    let span = document.createElement('span');
    span.setAttribute('class', 'd-block text-danger');
    span.textContent = msg;
    e.parentNode.appendChild(span);
};
const emailValid = (e) => {
    removeMsg(e);
    if (!e.value.match(/^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
        createMsg(e, 'メールアドレス形式で入力してください');
    }
};
const emptyValid = (e) => {
    removeMsg(e);
    if (!e.value) {
        createMsg(e, '必須項目です');
    }
};
const htmlTagsRep = (e) => {
    e.value = e.value.replace(/(<([^>]+)>)/gi, '');
};
const valToFunc = {
    emailValid: (e) => {
        emailValid(e);
    },
    emptyValid: (e) => {
        emptyValid(e);
    },
    htmlTagsRep: (e) => {
        htmlTagsRep(e);
    },
};
const validationExec = () => {
    [].slice.call(document.querySelectorAll('.needs-validation')).forEach((form) => {
        form.forEach((elm) => {
            if (elm.hasAttribute('required')) {
                let event = elm.dataset.event ? elm.dataset.event : '';
                if (event) {
                    let obj = (new Function('return ' + event))();
                    Object.keys(obj).forEach(evt => {
                        elm.addEventListener(evt, (e) => {
                            obj[evt].forEach((func) => {
                                if (valToFunc[func])
                                    valToFunc[func](e.target);
                            });
                        });
                    });
                }
            }
        });
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            for (const elm of form) {
                if (elm.hasAttribute('required')) {
                    elm.focus();
                    elm.blur();
                }
            }
            form.classList.add('was-validated');
        }, false);
    });
};
document.addEventListener('DOMContentLoaded', () => {
    validationExec();
});
/*
  data-event="{blur:['emailValid']}"
  data-event="{blur:['emptyValid', 'htmlTagsRep']}"
*/
