
<?php include_once 'admin/menu.php' ?>



  <div class='item_wrapper white_bg ' >

    <div  class="item_menu  white_bg menu_level_1">

  			<div class="menu_top">

          <div class="menu_bars item_menu_bars menu_level_0">

                    <div class="menu_bar menu_bar_hor black_bg top_menu_bar"></div>
                      <div class="menu_bar menu_bar_hor black_bg  middle_menu_bar"></div>
                      <div class="menu_bar menu_bar_hor black_bg  bottom_menu_bar"></div>

          </div>
          <div class="menu_title black">
            MENU
          </div>

  			</div>

  			<div class="menu_container">

          <div class="single_filter_item grey_1 bold accordeon active_filter all">
            ALL
          </div>
          <?php
          $path = 'data/menu/filters.txt';
          $menuFile = fopen($path,'r') or die("Unable to open file");
          //echo "1";
          $cat_counter = 0;
          while(!feof($menuFile)) {

              $line = fgets($menuFile);
              $line = trim(preg_replace('/\s\s+/', '', $line));
              if($line =="")
              {
                continue;
              }
              ?>


  				<div class="single_filter_item grey_1 bold  accordeon " data-filter="<?php echo str_replace(' ','_',$line);?>" >
  					     <?php echo $line ;?>
  				</div>

          <?php
            }

            fclose($menuFile);
          ?>


          <img class="logo_categories" src="images/logo_small_black.svg" />
  			</div>
  	</div> <!-- item menu -->


    <div class="item_container">

      <div class="container-fluid">
        <?php

        $root = 'data/';
        $path = $root.'menu/active_projects.txt';
        $workMenu = new Menu($path);


  					foreach($workMenu->menu_array as $menu_item)
  				  {
  				    //echo $menu_item->title;
  				    //echo '<br/>';
  						?>

    						<?php
                foreach ($menu_item->items as $item)
                {



                        $link =   $item->link;
                        //echo $link;

                        $file_path = "data/projects/".$link."/details.xml";
                        $xml=simplexml_load_file($file_path) or die("Error: Cannot create object");

                        $title = $xml->title;
                        $description = $xml->description;

                        $images = $xml->images;
                        $plans = $xml->plans;
                        $filters= $xml->filters;
                        $credits= $xml->credits;
                        //print_r($images);


                        $filters_class="";
                        foreach($filters->filter as $filter)
                        {

                            $filters_class .= str_replace(' ','_',trim(preg_replace('/\s\s+/', '', $filter))).' ';


                          }

          ?>




                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 item_thumb_container category_thumb <?php echo $filters_class;?>" data-work_item="<?php echo $item->link?>">


                          <div class="thumb_bg">
                            <div class="slide_item">
                              <img src="data/projects/<?php echo $images->image[0]->src;?>" alt="<?php echo $images->image[0]->title;?>" />
                            </div>
                          </div>

                          <div class="item_thumb_details">
                            <h4 class="grey_1"><?php echo $title;?></h4>
                            <span class="general_text grey_1">
                              <?php
                                foreach($filters->filter as $filter)
                                {
                                  ?>
                                  <span class="single_filter">
                                  <?php


                                    echo   $filter.' ';
                                  ?>
                                  </span>
                              <?php
                                }


                                ?>
                                <div class="menu_underline grey_2_bg"></div>
                                <span class="details ">

                                  <?php

                                  foreach($credits->credit as $credit)
                                  {

                                  ?>

                                  <div class="details_box">
                                    <span class="bold"><?php echo $credit->title;?></span>
                                    <br/>
                                  <?php echo $credit->data;?>

                                  </div>

                                  <?php
                                  }

                                  ?>




                                  <div class="clearer">

                                  </div>


                                </span>
                                </span>


                            </span>
                          </div>
                        </div><!-- end item_thumb_container -->

                <?php
                  }
                }
              ?>






      </div>

    </div>


</div> <!-- Item wrapper -->
