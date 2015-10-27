<section id="menu">

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
	<div id="menu_level_0" class="menu_stripe white_bg menu_level_1">
			<div class="menu_top hidden">
				<div class="close_menu black">
					<span class="menu_title_inside"><img src="images/buttons/close_white.svg" />
						MENU
					</span>
				</div>


			</div>

			<div class="menu_container">
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
	</div>

	<div id="menu_level_1" class="menu_stripe black_bg menu_level_1">
			<div class="menu_top hidden">
				<div class="close_menu white">
					<span class="menu_title_inside"><img src="images/buttons/close_white.svg" />
						MENU
					</span>
				</div>


			</div>

			<div class="menu_container">

				<div class="single_menu_item white bold accordeon"  data-menu_id="menu_level_2_about">
					ABOUT
				</div>

				<div class="single_menu_item white bold  accordeon" data-menu_id="menu_level_2_work">
					WORK
				</div>

				<div class="single_menu_item white bold">
					CONTACT
				</div>

			</div>
	</div>

	<div id="menu_level_2_work" class="yellow_bg menu_level_2 menu_stripe">


		<div class="menu_top">
			<div class="close_menu white">
				<span class="menu_title_inside"><img src="images/buttons/close_white.svg" />

				</span>
			</div>


		</div>

			<div class="menu_container">
				<?php
					foreach($workMenu->menu_array as $menu_item)
				  {
				    //echo $menu_item->title;
				    //echo '<br/>';
						?>
						<div class="single_menu_item white bold  accordeon hasChild" data-menu_child="<?php echo $menu_item->id; ?>" data-menu_id="menu_level_3_work">
						<?php echo  $menu_item->title;?>
						</div>
						<?php

				  }
				?>
				<div class="menu_underline white_bg">

				</div>


				<a href="categories.php" class="all_item_link grey_2_bg"  data-work_item="all_items"/>
					<div class="bold single_menu_item">
						View all work
					</div>
				</a>
			</div>


	</div>


	<div id="menu_level_2_about" class="yellow_bg menu_level_2 menu_stripe">

		<div class="menu_top">
			<div class="close_menu white">
				<span class="menu_title_inside"><img src="images/buttons/close_white.svg" />

				</span>
			</div>


		</div>

			<div class="menu_container">

        <a href="about.php?cadu=cadu" class="about_item ">
  					<div class="single_menu_item white  " data-about_data="cadu">
  					Cadu
  					</div>
        </a>
        <a href="about.php?cadu=kuvic" class="about_item ">
				<div class="single_menu_item white " data-about_data="kuvic">
					Kuvic
				</div>
      </a>
      <a href="about.php?cadu=papa" class="about_item ">

				<div class="single_menu_item white "  data-about_data="papa">
				 Papadis
				</div>
      </a>
      <a href="about.php?cadu=afentis" class="about_item ">
				<div class="single_menu_item white "  data-about_data="afentis">
				 Afentiko
				</div>
      </a>
      <a href="about.php?cadu=irene" class="about_item ">

				<div class="single_menu_item white  "  data-about_data="irene">
				 irene
				</div>
      </a>

				<div class="menu_underline">

				</div>


			</div>


	</div>


	<div id="menu_level_3_work" class="white_bg menu_level_3 menu_stripe">

		<div class="menu_top">
			<div class="close_menu white">
				<span class="menu_title_inside"><img src="images/buttons/close_black.svg" />

				</span>
			</div>


		</div>



		<?php
			foreach($workMenu->menu_array as $menu_item)
			{

				?>
				<div class="menu_container hidden menuChild" id="<?php echo $menu_item->id; ?>" >
					<?php

						foreach ($menu_item->items as $item)
						{
							?>
							<a href="item.php" class="single_menu_item_link"  data-work_item="<?php echo $item->link?>">
								<div class="single_menu_item">
									<?php
										echo	$item->title;
									?>
								</div>
							</a>

							<?php

						}

					?>
				</div>

				<?php

			}
		?>








	</div>






</section>
