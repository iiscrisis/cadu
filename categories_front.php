<?php include_once 'admin/menu.php' ?>


  <div class="container-fluid" id="front_projects_container">



        <?php

        $root = 'data/';
        $path = $root.'menu/front_projects.txt';
        $workMenu = new Menu($path);

    $counter = 0;
  					foreach($workMenu->menu_array as $menu_item)
  				  {
  				    //echo $menu_item->title;
  				    //echo '<br/>';
              $counter++;
              if($counter >= 4)
              {
                break;
              }
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




                        <div class="col-xs-12 col-sm-6 col-md-3  item_thumb_container category_thumb <?php echo $filters_class;?>" data-work_item="<?php echo $item->link?>">


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
                                  <span class="single_filter hidden">
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
