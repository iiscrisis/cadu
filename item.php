<?php
if(!isset($_POST['link']) && !isset($_GET['link']))
{
  header("location:index.php");
}?>
<?php

$item_class="";
if(isset($_POST['link']))
{
  $link =  escapeshellcmd($_POST['link']);
}else if( isset($_GET['link'])){
  $link =  escapeshellcmd($_GET['link']);
  $item_class=$link;
}else {
  die("Cannot load project");
}

?>
<?php
  if(!isset($_POST['raw']))
  {

?><!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml">
  <?php include_once 'top.php' ?>
  <?php include_once 'admin/menu.php' ?>

  <body class="white_bg">

  	<!-- INCLUDE MENU -->
  <?php include_once 'modules/menu.php' ?>

  <script type="text/javascript">

  $(document).ready(function(){


    init_item("<?php echo escapeshellcmd($_GET['link']);?>");
    //  init_item();

  });
  </script>



<section id="cadu_pages">
<div class="cadu_page_container" id="<?php echo $item_class;?>">


<?php
  }
?>

<?php




$file_path = "data/projects/".$link."/details.xml";
$xml=simplexml_load_file($file_path) or die("Error: Cannot create object");

$title = $xml->title;
$description = $xml->description;

$images = $xml->images;
$plans = $xml->plans;
$credits= $xml->credits;
//print_r($images);




?>
<div class="large_logo text-center">

    <img class="logo_center" src="images/logo_small_black.svg" />

</div>
<div class='item_wrapper white_bg' >

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

				<div class="single_menu_item grey_1 bold accordeon yellow_bg">
					GALLERY
				</div>

				<div class="single_menu_item grey_1 bold  accordeon" >
					DESCRIPTION
				</div>

				<div class="single_menu_item grey_1 bold">
					PLANS
				</div>

			</div>
	</div> <!-- item menu -->


  <div class="item_container">

    <div class="container-fluid">

      <?php
        foreach($images->image as $image)
        {
          ?>



      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 item_thumb_container">


        <div class="thumb_bg">
          <div class="slide_item">
            <img src="data/projects/<?php echo $image->src;?>" alt="<?php echo $image->title;?>" />
          </div>
        </div>

        <div class="item_thumb_details">
          <h4 class="grey_1"><?php echo $image->title;?></h4>
          <span class="general_text grey_1">
            <?php echo $image->data;?>
          </span>
        </div>
      </div><!-- end item_thumb_container -->

      <?php

              }
            ?>






    </div>

  </div>


    <div class="item_description">

      <div class="container-fluid">
        <div class="col-xs-12 col-md-8 col-lg-6  item_description_container">
          <div class="description_container white_bg grey_1">

            <div class="bounding_box">
                <h1 class="title"><?php echo $title;?></h1>
            </div>


            <div class="details bounding_box">

              <?php

              foreach($credits->credit as $credit)
              {

              ?>

              <div class="details_box ">
                <span class="bold"><?php echo $credit->title;?></span>
                <br/>
              <?php echo $credit->data;?>

              </div>

              <?php
              }

              ?>




              <div class="clearer">

              </div>


            </div>
            <div class="bounding_box">
              <span class="general_text">

                <?php echo $description;?>

              </span>
            </div>


            <div class="menu_underline white_bg">				</div>


          </div>
        </div>



      </div>

    </div>


    <div class="plans">

     <div class="container-fluid">



             <?php
               foreach($plans->plan as $plan)
               {
                 ?>
                 <div class="single_plan">
                   <img src="data/projects/<?php echo $plan->src;?>" />
                   <div class="plans_description yellow_bg white">
                      <div class="inliner"></div>
                      <div class="general_text ">
                          <?php echo $plan->data;?>
                      </div>

                   </div>
                 </div>

              <?php
              }
              ?>



     </div>

     <div class="plans_viewer">

         <div class="plans_viewer_close white_bg text-center">
           <img src="images/buttons/close_black.svg"/>
         </div>

         <div class="plans_viewer_container" class="text-center">

         </div>

     </div>




    </div> <!-- End plans -->

</div>






<div class="item_slideshow" class=" white_bg fullscreen large_screen">
  <div class="slideshow_close white_bg text-center">
    <img src="images/buttons/close_black.svg"/>
  </div>

  <div class="slideshow_info white_bg text-center">
    <img src="images/buttons/info_black.svg"/>
  </div>

  <div class="item_slideshow_container">
    <?php
      foreach($images->image as $image)
      {
        ?>

    <div class="item_slideshow_slide">


        <img src="data/projects/<?php echo $image->src;?>" alt="cadu" />

        <div class="item_slideshow_slide_html">
          <h4 class=""><?php echo $image->title;?></h4>
          <div class="slide_text ">
          <?php echo $image->description;?>
          </div>
        </div>

    </div>
    <?php
    }
    ?>


  </div>
</div> <!-- end slideshow -->
<?php
if(!isset($_POST['raw']))
{
  ?>
</div>
  </section>

  <?php include_once 'modules/footer.php' ?>

<?php }?> ?>
