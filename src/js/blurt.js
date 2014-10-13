(function(win, doc){

	var Blurt = Blurt || {};

	Blurt.cls = {
		box: 'box',
		overlay: 'overlay',
		dialog: 'dialog',
		header: 'header',
		content: 'content',
		footer: 'footer',
		btn: 'btn',
		default: 'default',
		error: 'error',
		success: 'success',
		warning: 'warning',
		info: 'info',
		hidden: 'hidden',
		prompt: 'prompt'
	};

	Blurt.constant = {
		hideInterval: 200
	};

	Blurt.key = {
		ESC: 27,
		ENTER: 13
	};

	Blurt.nsp = 'bl-';

	Blurt.ns = function(str){
		return Blurt.nsp+str;
	};

	Blurt.util = {
		hasClass: function(elem, cls){
			var classes = elem.getAttribute('class');
			if(classes === null){
				return false;
			}
			classes = classes.split(' ');
			for(var i=0;i<classes.length;i++){
				if(classes[i]===Blurt.nsp+cls){
					return true;
				}
			}
			return false;
		},
		setClass: function(elem, cls){
			elem.className = Blurt.nsp+cls;
		},
		addClass: function(elem, cls){
			if(Blurt.util.hasClass(elem,cls)){
				return;
			}
			var clas = elem.getAttribute('class');
			if(clas){
				elem.setAttribute('class',clas+' '+Blurt.ns(cls));
			}else{
				elem.className = Blurt.ns(cls);
			}
		},
		removeClass: function(elem, cls){
			if(!Blurt.util.hasClass(elem, cls)){
				return;
			}
			cls = Blurt.ns(cls);
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			elem.className = elem.className
				.replace(reg, '');
		},
		hide: function(elem){
			Blurt.util.addClass(elem, Blurt.cls.hidden);
		},
		show: function(elem){
			Blurt.util.removeClass(elem, Blurt.cls.hidden);
		},
		setText: function(elem, txt){
			elem.innerHTML = '';
			var txtNode = document.createTextNode(txt);
			elem.appendChild(txtNode);
			/*if(elem.textContent){
				elem.textContent = txt;
			}
			else if(elem.innerText){
				elem.innerText = txt;
			}*/
		}
	};


	var _initialized = false;
	var _addedListener = false;

	var box = doc.createElement('div'),
		overlay = doc.createElement('div'),
		dialog = doc.createElement('div'),
		header = doc.createElement('div'),
		title = doc.createElement('h2'),
		text = doc.createElement('p'),
		prmpt = doc.createElement('input'),
		content = doc.createElement('div'),
		footer = doc.createElement('div'),
		okBtn = doc.createElement('button'),
		cancelBtn = doc.createElement('button');

	Blurt.util.addClass(box, Blurt.cls.box);
	Blurt.util.addClass(box, Blurt.cls.info);
	Blurt.util.addClass(box, Blurt.cls.hidden);
	Blurt.util.addClass(overlay, Blurt.cls.overlay);
	Blurt.util.addClass(dialog, Blurt.cls.dialog);
	Blurt.util.addClass(header, Blurt.cls.header);
	Blurt.util.addClass(content, Blurt.cls.content);
	Blurt.util.addClass(footer, Blurt.cls.footer);
	Blurt.util.addClass(okBtn, Blurt.cls.btn);
	Blurt.util.addClass(cancelBtn, Blurt.cls.btn);
	Blurt.util.addClass(prmpt, Blurt.cls.prompt);

	header.appendChild(title);
	content.appendChild(text);
	content.appendChild(prmpt);
	footer.appendChild(okBtn);
	footer.appendChild(cancelBtn);

	dialog.appendChild(header);
	dialog.appendChild(content);
	dialog.appendChild(footer);

	box.appendChild(overlay);
	box.appendChild(dialog);

	function _docEscListener(e){
		if(e.keyCode == Blurt.key.ESC){
			_hide();
		}
	}

	function _makeEscapable(escapable){
		if(escapable){
			doc.addEventListener('keyup', _docEscListener);
			overlay.addEventListener('click', _hide);
			_addedListener = true;
		}else{
			if(_addedListener){
				doc.removeEventListener('keyup', _docEscListener);
				overlay.removeEventListener('click', _hide);
			}
		}
	}

	function _initializeBlurt(escapable){
		//_makeEscapable(escapable);
		doc.body.appendChild(box);
	}

	function _processParamsBlurt(args){
		var params = {
			title: 'Title',
			text: null,
			type: 'info',
			okButtonText: 'OK',
			escapable: false
		};

		switch(args.length){
			case 0:
				//blurt('At least one argument expected.');
				win.console.error('At least 1 argument expected.');
				return null;
			case 1:
				if(typeof args[0] === 'string'){
					params.title = args[0];
					params.text = null;
					params.type = null;
				}else if(typeof args[0]==='object'){
					var opts = args[0];
					params.title = opts.title || params.title;
					params.text = opts.text || params.text;
					params.type = opts.type || params.type;
					params.okButtonText = opts.okButtonText || params.okButtonText;
					params.escapable = opts.escapable || params.escapable;
				}
				break;
			case 2:
				if(typeof args[0] !== 'string' || typeof args[1]!=='string'){
					win.console.error('Invalid argument type.');
					return null;
				}
				params.title = args[0];
				params.text = args[1];
				params.type = 'default';
				break;
			case 3:
				if(typeof args[0] !== 'string' || typeof args[1]!=='string' || typeof args[2]!=='string'){
					win.console.error('Invalid argument type.');
					return null;
				}
				params.title = args[0];
				params.text = args[1];
				params.type = args[2];
				break;
		}
		if(params.text===''){
			params.text = null;
		}
		return params;
	}

	function _hide(){
		Blurt.util.removeClass(dialog, 'dialog-anim-show');
		Blurt.util.addClass(dialog, 'dialog-anim-hide');
		setTimeout(function(){
			Blurt.util.setClass(box, Blurt.cls.box);
			Blurt.util.hide(box);
			Blurt.util.setClass(dialog,Blurt.cls.dialog);
			okBtn.removeEventListener('click', _hide);
		},Blurt.constant.hideInterval);
	}

	win.blurt = function(){

		var params = _processParamsBlurt(arguments);
		if(params === null){
			win.console.error('Invalid arguments');
			return;
		}

		if(!_initialized){
			_initializeBlurt(params.escapable);
			_initialized = !_initialized;
		}
		_makeEscapable(params.escapable);
		Blurt.util.setText(title, params.title);
		Blurt.util.hide(prmpt);
		Blurt.util.hide(cancelBtn);
		//title.innerText = params.title;
		if(params.text === null || params.text === ''){
			Blurt.util.hide(content);
		}else if(typeof params.text === 'string'){
			Blurt.util.setText(text, params.text);
			Blurt.util.show(content);
			Blurt.util.show(text);
		}

		if(params.type !== null && (params.type === Blurt.cls.info || params.type === Blurt.cls.success || params.type === Blurt.cls.warning || params.type ===Blurt.cls.error)){
			Blurt.util.setClass(dialog, Blurt.cls.dialog);
			Blurt.util.addClass(dialog, params.type);
		}
		if(!params.escapable && _addedListener){
			doc.removeEventListener('keyup', _docEscListener);
		}
		Blurt.util.show(box);//, Blurt.cls.hidden);
		Blurt.util.addClass(dialog,'dialog-anim-show');
		if(okBtn.textContent){
			okBtn.textContent = params.okButtonText;
		}else{
			okBtn.innerText = params.okButtonText;
		}
		okBtn.focus();
		okBtn.addEventListener('click', _hide);
	};

	function _processParamsBrompt(args){
		var params = {
			title: 'Title',
			text: 'Enter value',
			type: 'info',
			okButtonText: 'OK',
			cancelButtonText: 'Cancel',
			escapable: false,
			onConfirm: null,
			onCancel: null
		};

		switch(args.length){
			case 0:
			case 1:
				if(typeof args[0] !== 'object'){
					win.console.error('At least 2 arguments or 1 object expected');
					return null;
				}
				var opts = args[0];
				params.title = opts.title || params.title;
				params.text = opts.text || params.text;
				params.type = opts.type || params.type;
				params.okButtonText = opts.okButtonText || params.okButtonText;
				params.cancelButtonText = opts.cancelButtonText || params.cancelButtonText;
				params.escapable = opts.escapable || params.escapable;
				if(opts.onConfirm && typeof opts.onConfirm === 'function'){
					params.onConfirm = opts.onConfirm;
				}
				if(opts.onCancel && typeof opts.onCancel === 'function'){
					params.onCancel = opts.onCancel;
				}
				break;
			case 2:
				if(typeof args[0] === 'string' && typeof args[1] === 'function'){
					params.title = args[0];
					params.onConfirm = args[1];
					return params;
				}else{
					win.console.error('Required: 1st string, 2nd function.');
					return null;
				}
				break;
			case 3:
				if(typeof args[0] !== 'string' || typeof args[1]!=='function' || typeof args[2]!=='function'){
					win.console.error('Required: 1st string, 2nd function and 3rd function.');
					return null;
				}
				params.title = args[0];
				params.onConfirm = args[1];
				params.onCancel = args[2];
				break;
		}
		return params;
	}

	var _bromptGlobal = {
		onConfirm : null,
		onCancel : null
	};

	function _commonFunction(){
		_hide();
		setTimeout(function(){
			if(_bromptGlobal.onConfirm !== null){
				_bromptGlobal.onConfirm(prmpt.value);
			}
		},Blurt.constant.hideInterval);
		okBtn.removeEventListener('click', _handleBrompt);
		prmpt.removeEventListener('keydown', _handleBrompt);
		cancelBtn.removeEventListener('click', _handleCancel);
	}

	function _handleBrompt(e){
		if(e.target === prmpt){
			if(e.keyCode == Blurt.key.ENTER){
				_commonFunction();
			}
			return;
		}
		_commonFunction();
	}

	function _handleCancel(e){
		_hide();
		setTimeout(function(){
			if(_bromptGlobal.onCancel !== null){
				_bromptGlobal.onCancel();
			}
		},Blurt.constant.hideInterval);
		cancelBtn.removeEventListener('click', _handleCancel);
	}

	function _initializeBrompt(params){
		_makeEscapable(params.escapable);
		doc.body.appendChild(box);
	}

	win.brompt = function(){
		_bromptGlobal = {
			onConfirm : null,
			onCancel : null
		};
		var params = _processParamsBrompt(arguments);
		_bromptGlobal.onConfirm = params.onConfirm;
		_bromptGlobal.onCancel = params.onCancel;
		if(!params){
			win.console.error('Invalid arguments');
			return;
		}
		if(!_initialized){
			_initializeBrompt(params);
			_initialized = !_initialized;
		}
		Blurt.util.show(prmpt);
		Blurt.util.setText(title, params.title);
		Blurt.util.hide(text);
		//prmpt.setAttribute('placeholder', params.text);

		Blurt.util.setText(okBtn, params.okButtonText);
		Blurt.util.setText(cancelBtn, params.cancelButtonText);
		Blurt.util.show(cancelBtn);

		if(params.type !== null && (params.type === Blurt.cls.info || params.type === Blurt.cls.success || params.type === Blurt.cls.warning || params.type ===Blurt.cls.error)){
			Blurt.util.setClass(dialog, Blurt.cls.dialog);
			Blurt.util.addClass(dialog, params.type);
		}
		Blurt.util.show(content);
		Blurt.util.show(box);
		Blurt.util.addClass(dialog,'dialog-anim-show');
		prmpt.value = '';
		prmpt.focus();
		okBtn.addEventListener('click', _handleBrompt);
		cancelBtn.addEventListener('click', _handleCancel);
		prmpt.addEventListener('keydown', _handleBrompt);
	};
})(window, document);