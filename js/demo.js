function initBlurtElements(){
	var b1a = document.querySelector("#blurt-1-arg");
	b1a.addEventListener('click',function(){
		blurt('This is a simple alert');
	});

	var b2a = document.querySelector('#blurt-2-arg');
	b2a.addEventListener('click',function(){
		blurt('A title','An alert with a title');
	});

	var b3as, b3ae, b3ai, b3aw;
	b3as = document.querySelector('#blurt-3-arg-s')
	b3as.addEventListener('click',function(){
		blurt('Success', 'Whatever you were doing is done.', 'success');
	});
	b3ae = document.querySelector('#blurt-3-arg-e')
	b3ae.addEventListener('click',function(){
		blurt('Oops!!', 'There was some error.', 'error');
	});
	b3ai = document.querySelector('#blurt-3-arg-i')
	b3ai.addEventListener('click',function(){
		blurt('Info', 'A huge sale is going on.', 'info');
	});
	b3aw = document.querySelector('#blurt-3-arg-w')
	b3aw.addEventListener('click',function(){
		blurt('Warning', 'You tried to do something prohibited.', 'warning');
	});

	var bobj = document.querySelector('#blurt-obj');
	bobj.addEventListener('click', function(){
		blurt({
			title: 'Success',
			text: 'You have been registered. Press escape.',
			type: 'success',
			okButtontext: 'Done',
			escapable: true
		});
	});

}

function loadListeners(){
	initBlurtElements();
}
window.onload = loadListeners;