---
layout: page
title: blurt() | A JS replacement of default alert, confirm and prompt
sitemap:
priority: 1.0
changefreq: weekly
lastmod: 2014-07-07T16:57:30+05:30
---

<!--hello world

<button class="success">Hello</button>
<button class="error">Hello</button>
<button class="warning">Hello</button>
<button class="info">Hello</button>-->

<h1>Still in development</h1>

<div class="grid">
	<div class="unit half banner">
		<p>Download the minified CSS and JS files.</p>
		<div><a href="http://goo.gl/nWQoCQ" target="_blank" class="btn big info">Download</a></div>
	</div>
	<div class="unit half banner">
		<p>Visit Project Page to contribute or report issues.</p>
		<div><a href="https://github.com/{{ site.links.github }}" class="btn big info">Github</a></div>
	</div>
</div>

<div class="grid">
	<div class="unit whole">
		<p><b>blurt</b> is a javascript replacement for default <code>alert(), prompt(), and confirm()</code> functions in javascript.</p>
		<p>The equivalents in blurt are:</p>
		<p>
			<ul>
				<li><code>alert()</code> -> <code>blurt()</code></li>
				<li><code>prompt()</code> -> <code>brompt()</code></li>
				<li><code>confirm()</code> -> <code>bonfirm()</code> (Not a good name. I know.)</li>
			</ul>
		</p>
		<p> To install:
			<ul>
				<li><a href="http://goo.gl/nWQoCQ" target="_blank">Download Blurt files</a></li>
				<li>Attach the js and css files to your webpage:
				<ul>
					<li><code>link rel="stylesheet" href="blurt.min.css"</code></li>
					<li><code>script src="blurt.min.js"</code></li>
				</ul>
				</li>
			</ul>
		</p>
	</div>
</div>

<div class="grid">
	<div class="unit one-third" style="text-align: center;padding-top: 0px">
		<p>Simple alert</p>
		<button id="blurt-1-arg">Try me</button>
	</div>
	<div class="unit two-thirds">
{% highlight javascript %}
blurt('This is a simple alert');
{% endhighlight %}
	</div>
</div>

<div class="grid">
	<div class="unit one-third" style="text-align: center;padding-top: 0px">
		<p>An alert with a title and a text.</p>
		<button id="blurt-2-arg">Try me</button>
	</div>
	<div class="unit two-thirds">
{% highlight javascript %}
blurt('A title','An alert with a title');
{% endhighlight %}
	</div>
</div>

<div class="grid">
	<div class="unit one-third" style="text-align: center;padding-top: 0px">
		<p>An alert with a title, a text and a type.</p>
		<button id="blurt-3-arg-s" class="success">Try me</button>
		<button id="blurt-3-arg-i" class="info">Try me</button>
		<button id="blurt-3-arg-e" class="error">Try me</button>
		<button id="blurt-3-arg-w" class="warning">Try me</button>
	</div>
<div class="unit two-thirds">
{% highlight javascript %}
blurt(
	'Success title',
	'A success message',
	'success'
);
/*{
	'type' : 'success', 'error', 'info' or 'warning'
}*/
{% endhighlight %}
</div>
</div>


<div class="grid">
	<div class="unit one-third" style="text-align: center;padding-top: 0px">
		<p>Complete <code>blurt()</code> configuration.</p>
		<button id="blurt-obj" class="success">Try me</button>
	</div>
	<div class="unit two-thirds">
{% highlight javascript %}
blurt({
	/* alert title */
	title: 'Success',

	/* alert text */
	text: 'File has been deleted',

	/*
	* alert type
	* success, error, warning, info
	* default is 'default'
	*/
	type: 'success',

	/* custom text for OK button */
	okButtonText: 'Done',

	/*
	* escapable, if true, then
	* alert closes when escape key is pressesed
	* or when clicked outside the alert box
	* default is false
	*/
	escapable: true
});
{% endhighlight %}
	</div>
</div>

<h2>Todo - Documentation for <code>prompt()</code> equivalent <code>brompt()</code></h2>