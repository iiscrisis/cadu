<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<?php include_once 'top.php' ?>
<?php include_once 'menu.php' ?>

<body class="black_bg">

  <div class="wrapper">

    <div class="container-fluid">

      <div class="row">


        		<?php

        		$root = '../data/';
        		$path = $root.'menu/active_projects.txt';
        		$workMenu = new Menu($path);



              foreach($workMenu->menu_array as $menu_item)
              {
                //echo $menu_item->title;
                //echo '<br/>';
                ?>
                <div class="menu category">


                <div class="single_menu_item white bold  accordeon hasChild" data-menu_child="<?php echo $menu_item->id; ?>" data-menu_id="menu_level_3_work">
                  <?php echo  $menu_item->title;?>
                </div>

                <?php

                  foreach ($menu_item->items as $item)
                  {
                    ?>
                    <a href="item.php" class="single_menu_item_link grey_2_bg"  data-work_item="<?php echo $item->link?>">
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

    </div>

  </div>
</body>

</html>
