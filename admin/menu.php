<?php

  class MenuItem
  {
    public $title;
    public $link;

    public function MenuItem($title,$link)
    {

      $this->title = $title;
      $this->link = $link;
    }

  }
//echo 0;
  class MenuCategories
  {
    public $title;
    public $id;
    public $items=Array();

    public function addItem($title,$link)
    {
      /*  $menu_item = new MenuItem();
        $menu_item->title = $title;
        $menu_item->$link = $link;*/
      //  echo 'adding item';
        $this->items[] = new MenuItem($title,$link);
      // echo 'item added';
    }

  }
//echo 1;

  class Menu
  {

    public $menu_array = Array();

    public function Menu($file)
    {

    // echo 'MENU '.$file;
      $path = $file;
      $menuFile = fopen($path,'r') or die("Unable to open file");
      //echo "1";
      $cat_counter = 0;
      while(!feof($menuFile)) {

          $line = fgets($menuFile);
        //  echo "Entry ".$line.'<br/>';
          $line = trim(preg_replace('/\s\s+/', '', $line));
          if($line =="")
          {
            continue;
          }
          $this->menu_array_line = explode("$",$line);

          $hash = explode("/",$this->menu_array_line[0]);

         if(!array_key_exists($hash[0],  $this->menu_array) )
          {
              $cat_counter++;
            //  echo $cat_counter.'<br/>';
              $this->menu_array[$hash[0]] = new MenuCategories();
              $this->menu_array[$hash[0]]->id =   'cat'.$cat_counter;
              $this->menu_array[$hash[0]]->title=$hash[0];
          }

        $item_title  =  trim(preg_replace('/\s\s+/', '', $this->menu_array_line[1]));
          $this->menu_array[$hash[0]]->addItem($hash[1],$item_title );
          //  echo "end";
        //  array_push(,);
      }

      fclose($menufile);


    }




  }




?>

<?php
/*
$root = '../data/';
$path = $root.'menu/active_projects.txt';
 $workMenu = new Menu($path);*/
?>
