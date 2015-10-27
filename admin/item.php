<?php

  //Create xml for item
  //echo 0;
  $link = escapeshellcmd($_POST['link']);

  $root = '../data/projects/';
  $path = $root.$link.'/';


  echo $path;

  $xml_str ="<?xml version='1.0' encoding='UTF-8'?><project>";
//  $xml_str = '';

  //echo 2;
  //title

  $myfile = fopen($path."title.html", "r") or die("Unable to open file!");
  $title = fread($myfile,filesize($path."title.html"));

  /*while(!feof($myfile)) {

        $title = fgets($myfile);

  }*/

  $xml_str .= '  <title><![CDATA['.$title.']]></title>';

  fclose($myfile);
  //echo 3;
//description

  $myfile = fopen($path."description.html", "r") or die("Unable to open file!");
  $description = fread($myfile,filesize($path."description.html"));
/*  while(!feof($myfile)) {

        $description = fgets($myfile);
  }*/


  $xml_str .= '  <description><![CDATA['.$description.']]></description>';

  fclose($myfile);
  //echo 4;
//credits
  $myfile = fopen($path ."credits.txt", "r") or die("Unable to open file!");

  $credits='<credits>';
  while(!feof($myfile)) {
      $line = fgets($myfile);
    $line = trim(preg_replace('/\s\s+/', '', $line));
    if($line =="")
    {
      continue;
    }
    $credit_array = explode("$",$line);
    $credit = '<credit><title>'.  $credit_array[0].'</title><data>'.  $credit_array[1].'</data></credit>';
    $credits .= $credit;
  }

    $credits .='</credits>';

  fclose($myfile);
  //echo 5;
  //images
  $myfile = fopen($path."images.txt", "r") or die("Unable to open file!");

  $images='<images>';
  while(!feof($myfile)) {

    $line = fgets($myfile);
    $line = trim(preg_replace('/\s\s+/', '', $line));
    if($line =="")
    {
      continue;
    }
    $image_array = explode("$",$line);
    $image = '<image><src>'.$image_array[0].'</src><title>'.  $image_array[1].'</title><data>'.$image_array[2].'</data></image>';
    $images .= $image;
  }

  $images .='</images>';

  fclose($myfile);
  //echo 6;
  //images
  $myfile = fopen($path ."plans.txt", "r") or die("Unable to open file!");

  $plans='<plans>';
  while(!feof($myfile)) {

    $line = fgets($myfile);
    $line = trim(preg_replace('/\s\s+/', '', $line));
    if($line =="")
    {
      continue;
    }
    $plans_array = explode("$",$line);
    $plan = '<plan><src>'.$plans_array[0].'</src>><data>'.$plans_array[1].'</data></plan>';
    $plans .= $plan;
  }

  $plans .='</plans>';

  fclose($myfile);
    $filters= "";
  //echo 7;
  //echo 6;
  //filter
  $myfile = fopen($path ."filters.txt", "r") or die("Unable to open file!");

  $filters='<filters>';
  while(!feof($myfile)) {

    $line = fgets($myfile);
    $line = trim(preg_replace('/\s\s+/', '', $line));
    if($line =="")
    {
      continue;
    }

    $filter = '<filter>'.$line.' </filter>';
    $filters .= $filter;
  }

  $filters .='</filters>';

  fclose($myfile);
  //echo 7;
    $xml_str .=  $credits.$images.$plans.$filters.'</project>';

  //echo   $xml_str;

  $myfile = fopen($path ."details.xml", "w")  or die("Unable to open file!");
  fwrite($myfile , $xml_str);
  fclose($myfile);

?>
