
<section id="footer" class="yellow white_bg">
	<div class="container text-center">
	<!--	cadu architects 2015 - www.cadu.gr -->
	</div>
</section>

<div id="repository">

</div>


<script id="about_tmpl" type="text/x-handlebars-template">
	<div class="about_box">





		<div class="about_box_container">

			<div class="about_title">
				<h1 class="bold black text-right">{{title}}</h1>
			</div>

			<div class="subtitle">
				{{subtitle}}
			</div>
			<div class="menu_underline yellow_bg">

			</div>
			<div class="clearer">

			</div>
			<div class="about_description general_text">
				{{description}}
			</div>


		{{#if cv}}
		<div class="menu_underline yellow_bg">

		</div>
		<div class="clearer">

		</div>
						<div class="about_cv">
							<h2>{{cv_title}}</h2>

							{{cv}}
</div>
	{{/if}}

	<img class="logo_center" src="images/logo_small_black.svg" />
		</div>

		<div  class="about_slide fixed">

			<div class="slide_item">
				<img src="images/{{background}}" alt="cadu - {{title}}" />
			</div>
		</div>

		<div class="clearer">

		</div>


	</div>

</script>



</body>
</html>
