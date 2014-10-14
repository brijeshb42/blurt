function _get(slctr){
	return document.querySelector(slctr);
}

function initBlurtElements(){
	var b1a = _get("#blurt-1-arg");
	b1a.addEventListener('click',function(){
		blurt('This is a simple alert');
	});

	var b2a = _get('#blurt-2-arg');
	b2a.addEventListener('click',function(){
		blurt('A title','An alert with a title');
	});

	var b3as, b3ae, b3ai, b3aw;
	b3as = _get('#blurt-3-arg-s')
	b3as.addEventListener('click',function(){
		blurt('Success', 'Whatever you were doing is done.', 'success');
	});
	b3ae = _get('#blurt-3-arg-e')
	b3ae.addEventListener('click',function(){
		blurt('Oops!!', 'There was some error.', 'error');
	});
	b3ai = _get('#blurt-3-arg-i')
	b3ai.addEventListener('click',function(){
		blurt('Info', 'A huge sale is going on.', 'info');
	});
	b3aw = _get('#blurt-3-arg-w')
	b3aw.addEventListener('click',function(){
		blurt('Warning', 'You tried to do something prohibited.', 'warning');
	});

	var bobj = _get('#blurt-obj');
	bobj.addEventListener('click', function(){
		blurt({
			title: 'Success',
			text: 'You have been registered. Press escape.',
			type: 'success',
			okButtontext: 'Done',
			escapable: true
		});
	});

	var br2a =_get('#brompt-2-arg');
	br2a.addEventListener('click',function(){
		brompt('Enter your name',function(val){
			blurt('Hi '+val);
		});
	});

	var br3a =_get('#brompt-3-arg');
	br3a.addEventListener('click',function(){
		brompt('Enter your name',
			function(val){
				blurt('Hi '+val);
			},
			function(){
				blurt('Error','You did not enter anything.', 'error');
			}
		);
	});

	var brobj =_get('#brompt-obj');
	brobj.addEventListener('click',function(){
		brompt({
			title: 'Enter your name',
			type: 'info',
			okButtonText: 'Done',
			cancelButtonText: 'Back',
			escapable: false,
			onConfirm: function(val){
				if(val === ''){
					blurt('Waht?','You entered nothing', 'warning');
				}else{
					blurt('Done','Hi '+val, 'info');
				}
			},
			onCancel: function(){
				blurt('Error','You cancelled the operation', 'error');
			}
		});
	});

}

function loadListeners(){
	initBlurtElements();
}
window.onload = initBlurtElements;