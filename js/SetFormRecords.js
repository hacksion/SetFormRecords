class SetFormRecords {
	
	constructor(form_name) {
		this.form_name = form_name;
	}

	setData(records) {

		this.resetForm();

		if (!Object.keys(records).length || records instanceof Object === false) {
			console.log('Empty Records');
			return;
		}
		/*
		records = object
		'name(HTML要素名)' : value(データ値),
		'name(HTML要素名)' : value(データ値),
		'name(HTML要素名)' : value(データ値),
		*/
		let form_elm = `form[name=${this.form_name}]`;
		Object.keys(records).forEach(name => {
			let elm = document.querySelector(`${form_elm} [name="${name}"],${form_elm} [name="${name}[]"]`);
			let type = elm.type ?? elm.nodeName;
			let elm_name = elm.name;
			let value = records[name];
			if (type == 'radio') {
				[].slice.call(document.querySelectorAll(`${form_elm} [name="${name}"]`)).forEach(v => {
					v.removeAttribute('checked');
					v.checked = v.value == value ? true : false;
				});
			} else if (type == 'checkbox') {
				let vals = value != null ? value.split(',') : [];
				[].slice.call(document.querySelectorAll(`${form_elm} [name="${name}[]"]`)).forEach(v => {
					vals.forEach(val => {
						if (v.value == val) {
							v.checked = true;
						}
					});
				});
			} else if (type == 'id') {
				let elm = document.querySelector(`${form_elm} [name=${name}]`);
				if (elm) {
					elm.value = value;
				}
			} else if (type == 'select-one') {
				let elm = document.querySelector(`${form_elm} [name=${name}]`);
				if (elm) {
					let op = elm.options;
					Object.keys(op).forEach(o => {
						if (op[o].value == value) {
							op[o].selected = true;
						}
					});
				}
			} else if (type == 'select-multiple') {
				let elm = document.querySelector(`${form_elm} [name=${name}]`);
				if (elm) {
					let vals = value != null ? value.split(',') : [];
					let op = elm.options;
					Object.keys(op).forEach(o => {
						vals.forEach(val => {
							if (op[o].value == val) {
								op[o].selected = true;
							}
						});
					});
				}
			} else if (type == 'IMG') {
				let elm = document.querySelector(`${form_elm} [name=${name}]`);
				if (elm) {
					elm.src = value;
				}
			} else {
				if (elm_name != name) {
					let vals = value != null ? value.split(',') : [];
					[].slice.call(document.querySelectorAll(`${form_elm} [name="${name}[]"]`)).forEach( (v,i) => {
						v.value = vals[i] ?? '';
					});
				} else {
					let elm = document.querySelector(`${form_elm} [name=${name}]`);
					if (elm) {
						elm.value = value;
					}
				}
			}
		});
	}

	resetForm(){
		document.forms[this.form_name].reset();
		//bootstrapの場合でValidation機能を利用している場合
		//document.forms[this.form_name].classList.remove('was-validated');

		//以下、個別でリセットしたい場合はここに書く
	}
}