<section id="menu" class="white_bg">

	<img class="logo hidden" src="images/logo_small.svg" />

	<div id="menu_closed" class=" white_bg menu_level_0">

		<div id="" class="front_menu_bars menu_bars">

            	<div class="menu_bar menu_bar_hor black_bg top_menu_bar"></div>
                <div class="menu_bar menu_bar_hor black_bg middle_menu_bar"></div>
                <div class="menu_bar menu_bar_hor black_bg bottom_menu_bar"></div>

    </div>
		<div class="menu_title black">
			MENU
		</div>


	</div>




		<?php

		$root = 'data/';
		$path = $root.'menu/active_projects.txt';
		$workMenu = new Menu($path);

		?>

<div id="menu_wrapper">

	<div class="menu_box_container">
		<div class="menu_entry">

		<a href="#" class="menu_header black">
			<div class="menu_item">
					About
			</div>
		</a>

			<div class="menu_container">
				<div>
					<span class="menu_info red_bg white">

							We are CADU a Lorem Ipsum Vertus Deus et Satana, a omnibus anithicus en papadaki Fonaklem

					</span>
				</div>



		        <a href="about.php?cadu=cadu" class="about_item ">
		  					<div class="single_menu_item red  " data-about_data="cadu">
		  					Cadu
		  					</div>
		        </a>
		        <a href="about.php?cadu=kuvic" class="about_item ">
						<div class="single_menu_item red " data-about_data="kuvic">
							Kuvic
						</div>
		      </a>
		      <a href="about.php?cadu=papa" class="about_item ">

						<div class="single_menu_item red "  data-about_data="papa">
						 Papadis
						</div>
		      </a>
		      <a href="about.php?cadu=afentis" class="about_item ">
						<div class="single_menu_item red "  data-about_data="afentis">
						 Afentiko
						</div>
		      </a>
		      <a href="about.php?cadu=irene" class="about_item ">

						<div class="single_menu_item red  "  data-about_data="irene">
						 irene
						</div>
		      </a>

						<div class="clearer">

						</div>


			</div>


			</div>
		<div class="menu_entry">
			<a href="#" class="menu_header black">
				<div class="menu_item">
						Work
				</div>
			</a>


				<div class="menu_container">
				<div><span class="menu_info yellow_bg white">

						Our work is Lipsum Dolerus, amanicus et anakenis emul Kuvic, sot en Afentikus Intifada

					</span>
				</div>
					<?php
						foreach($workMenu->menu_array as $menu_item)
						{
							//echo $menu_item->title;
							//echo '<br/>';
							?>
							<div class="single_menu_item yellow bold  accordeon hasChild" data-menu_child="<?php echo $menu_item->id; ?>" data-menu_id="menu_level_3_work">
							<?php echo  $menu_item->title;?>
							</div>
							<?php

						}
					?>
					<div class="menu_underline white_bg">

					</div>


					<a href="categories.php" class="all_item_link grey_2_bg"  data-work_item="all_items"/>
						<div class="bold single_menu_item black">
							View all work
						</div>
					</a>
					<div class="clearer">

					</div>

				</div>
		</div>


			<div class="menu_entry">
				<a href="#" class="menu_header black">
					<div class="menu_item">
							Contact
					</div>
				</a>
			</div>
	</div>

</div>








</section>
<div class="menu_social">
	<div class="logo_menu_item hidden">
		<img class="logo_center" src="images/logo_small_yellow.svg" />
	</div>
	<div class="single_menu_item" >
		<a href=""><img src="images/social/facebook.svg"/></a>
	</div>

	<div class="single_menu_item ">
		<a href=""><img src="images/social/pinterest.svg"/></a>
	</div>

	<div class="single_menu_item ">
		<a href=""><img src="images/social/google.svg"/></a>
	</div>

</div>
