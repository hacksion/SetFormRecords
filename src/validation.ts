//bootstrap addon
const removeMsg = (e : any) => {
    e.classList.remove('error');
    if (e.parentNode.lastElementChild.nodeName == 'SPAN') {
        e.parentNode.lastElementChild.remove();
    }
}

const createMsg = (e : any, msg : string) => {
    e.classList.add('error');
    let span = document.createElement('span');
    span.setAttribute('class', 'd-block text-danger');
    span.textContent = msg;
    e.parentNode.appendChild(span);
}

const emailValid = (e : any) => {
    removeMsg(e);
    if (!e.value.match(/^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
        createMsg(e, 'メールアドレス形式で入力してください');
    }
}

const emptyValid = (e : any) => {
    removeMsg(e);
    if (!e.value) {
        createMsg(e, '必須項目です');
    }
}

const htmlTagsRep = (e : any) => {
    e.value = e.value.replace(/(<([^>]+)>)/gi, '');
}

const valToFunc : any = {
    emailValid: (e : any) => {
        emailValid(e);
    },
    emptyValid: (e : any) => {
        emptyValid(e);
    },
    htmlTagsRep: (e : any) => {
        htmlTagsRep(e);
    },
}

const validationExec = () => {
    [].slice.call(document.querySelectorAll('.needs-validation')).forEach((form: any) => {
        form.forEach((elm : any) => {
            if (elm.hasAttribute('required')) {
                let event = elm.dataset.event ? elm.dataset.event : '';
                if (event) {
                    let obj = (new Function('return ' + event))();
                    Object.keys(obj).forEach(evt => {
                        elm.addEventListener(evt, (e : any) => {
                            obj[evt].forEach((func: any) => {
                                if (valToFunc[func]) valToFunc[func](e.target);
                            });
                        });
                    });
                }
            }
        });

        form.addEventListener('submit', (e : any) => {
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
        }, false)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    validationExec();

});
/*
  data-event="{blur:['emailValid']}"
  data-event="{blur:['emptyValid', 'htmlTagsRep']}"
*/
