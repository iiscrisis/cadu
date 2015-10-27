/*Utilities
*/
$.fn.imagesLoaded = function () {

    // Edit: in strict mode, the var keyword is needed
    var $imgs = this.find('img[src!=""]');
    // if there's no images, just return an already resolved promise
    if (!$imgs.length) {return $.Deferred().resolve().promise();}

    // for each image, add a deferred object to the array which resolves when the image is loaded (or if loading fails)
    var dfds = [];
    $imgs.each(function(){

        var dfd = $.Deferred();
        dfds.push(dfd);
        var img = new Image();
        img.onload = function(){dfd.resolve();}
        img.onerror = function(){dfd.resolve();}
        img.src = this.src;

    });

    // return a master promise object which will resolve when all the deferred objects have resolved
    // IE - when all the images are loaded
    return $.when.apply($,dfds);

}

window.addEventListener('popstate', function(event) {
    console.log('popstate fired!');
//   $('html').html(event.state);
  // alert(event.state);
   var $wrapper = $('<div/>'); //event.state;//$(''+event.state+'');
   $wrapper.html(event.state);
   var display = $wrapper.find("#cadu_pages");
   var id=display.find(".cadu_page_container").attr('id');

   removeFromContainer();

   $("#"+id).appendTo("#cadu_pages");



   //$("#"+id).appendTo("#cadu_pages");
   //alert(id +" : "+ display.html());
  //updateContent(event.state);

});

function   removeFromContainer()
{
   $("#cadu_pages").find(".cadu_page_container").appendTo("#repository");

}

function onClickFrontSlide($self)
{

  if( $self.index()==0)
  {
    home_page_tl.play();
  }else {
    home_page_tl.reverse();
  //  TweenMax.to($(".large_logo").find("img"),0.5,{opacity:1});
  }

}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

  var itemTL ;
  var  slideshow_tl ;

  var currentItem;
  var front_categories;
   var home_page_tl ;
  $(document).ready(function(){


    setFullscreenHeight();


    //  init_item();

  });

  $(window).load(function(){

    home_page_tl.play();
  });

  function init_index()
  {


    home_page_tl = new TimelineMax({paused:true});

    home_page_tl.to($(".large_logo").find(".bg_right"),0.9,{right:"0%",ease:Power2.easeInOut},0);
    home_page_tl.to($(".large_logo").find(".bg_left"),0.9,{left:"0%",ease:Power2.easeInOut},0);
    home_page_tl.from($(".large_logo").find(".vertical_line"),0.1,{opacity:"0",ease:Power2.easeInOut},0.8);
    home_page_tl.from($(".large_logo").find("img"),0.8,{opacity:0,ease:Power2.easeInOut},0.85);



    //alert("index");

    $("#back_slide").weacSlideshow({
      add_on_click_action:onClickFrontSlide,
      slide_items:".slide_item",
      slide_html:".home_details",
      slide_interval:0,
      show_buttons:true,
      slide_animation:'FIN',
      slide_animation_reverse:'FOUT',
      slide_bg_height:$("#home_page").height()
    });
    //$("#home_bg").weacSlideshow({slide_items:".slide_item",show_buttons:false,slide_animation:'FIN',slide_animation_reverse:'FOUT'});

    front_categories = new Category("front_page_categories","categories_front.php","#front_projects","front_page_categories",0.5,false);
    front_categories.initialize();

    /*var new_h = $(".front_projects").width() * 0.777;
  $(".front_projects").height(new_h);
    $("#front_projects").find(".front_thumb_bg").weacSlideshow({slide_items:".slide_item",slide_html:".home_data",show_buttons:false,slide_animation:'FIN',slide_animation_reverse:'FOUT'});
*/

    init_menu();

    $(window).resize(setFullscreenHeight);

    var current_page = $('html').html();

    // add an item to the history log
    history.pushState(current_page,'CADU HOME' ,"index.php");


    var current_page = $('html').html();

    // Store the initial content so we can revisit it later
    history.replaceState(current_page, document.title, document.location.href);
  }

  function init_item(id)
  {
    setFullscreenHeight();
    $(window).resize(setFullscreenHeight);

    init_menu();




      currentItem = new Item(id,"item.php","#cadu_pages");
      currentItem.assign_container();
      currentItem.init_item();
      currentItem.display_item();


  }


  function   setFullscreenHeight()
  {

  /*  $("#back_slide").width($(window).width());
    var new_h = $(window).height() >450?450:$(window).height();
    $("#back_slide").height(new_h);*/

    $(".fullscreen").map(function(){

      var offset_y = 0;

      if($(this).data("offset_y") != null)
      {

        offset_y = $(this).data("offset_y") ;

      }

      var new_h = $(window).height() - offset_y;
      $(this).height(new_h);
      $(this).width($(window).width());
    });

  //  alert($("#home_page").height());
  /*  $("#back_slide").find(".slide_bg").height($("#home_page").height());*/


    if($(".about_slide").length > 0)
    {

          $(".about_slide").height($(window).height());
      //    var offset =

    }



  }

    var menu_level_0_TL ;

var menu_show_tl;

function init_menu()
 {

   var menu_height_offset = $("#menu").height()*-1;
   var menu_width_offset = ($("#menu").width()- $("#menu_closed").width())*-1;


   TweenMax.to($("#menu"),0.75,{top:menu_height_offset+"px",left:menu_width_offset+"px",ease:Power2.easeOut});

   menu_show_tl = new TimelineMax({paused:true});
   menu_show_tl.to($("#menu"),0.75,{top:"0px",left:"0px",ease:Power2.easeOut});
   menu_show_tl.to($("#menu_closed").find(".top_menu_bar"),0.35,{top:"40%",ease:Power2.easeOut},0.2);
    menu_show_tl.to($("#menu_closed").find(".bottom_menu_bar"),0.35,{top:"40%",ease:Power2.easeOut},0.2);

  $("#menu_closed").on('click', function (arguments) {

    if($(this).hasClass("active"))
    {
      $(this).removeClass("active");
        menu_show_tl.reverse();
    }else {
      $(this).addClass("active");
        menu_show_tl.play();
    }


  });

  $(".menu_header").on('click',function(event){

        event.preventDefault();

        

  });



  $(".about_item").on('click',function(event){

    event.preventDefault();

  //  $("#cadu_pages").find(".cadu_page_container").appendTo("#repository");
    removeFromContainer();

  //  $("#menu_level_1").find(".close_menu").trigger('click');

    $(this).closest(".menu_stripe").addClass("top_layer");
    $(this).closest(".menu_stripe").css("left","0px");

      var id = $(this).find(".single_menu_item").data('about_data');
    //  alert(id);
    if($("#"+id).length < 1)
    {

      var about = new About(id,id);
      about.initialize();

    }else {

      $("#"+id).appendTo("#cadu_pages");

    }




  });


  $(".single_menu_item_link").on('click', function (event) {

    event.preventDefault();

      //insert animation here
       removeFromContainer();
    //   TweenMax.to($("#menu_level_0"),0.7,{top:"-80px"});
      //   menu_level_0_TL.play();

  /*    $("#menu").find(".menu_level_3").animate({left:-250},100,function(){
        $("#menu").find(".menu_level_2").animate({left:-250},100,function(){
          $("#menu").find(".menu_level_1").animate({left:-250},100,function(){});

          });
        });*/





        var id=$(this).data('work_item');
        if($("#"+id).length < 1)
        {

          currentItem = new Item(id,"item.php","#cadu_pages");
          currentItem.initialize();
        //  alert("#"+currentItem.id);
          $("#"+currentItem.id).promise(function (){
              // do something, e.g.
                alert("1");
                currentItem.display_item();



          });


        }else {

          $("#"+id).appendTo("#cadu_pages");

        }

      });






        $(".all_item_link").on('click', function (event) {

            event.preventDefault();

            //insert animation here
            $("#cadu_pages").find(".cadu_page_container").appendTo("#repository");

          /*  $("#menu").find(".menu_level_3").animate({left:-250},100,function(){
              $("#menu").find(".menu_level_2").animate({left:-250},100,function(){
              menu_level_0_TL.play();
                $("#menu_level_1").animate({left:-250},100,function(){});

              });
            });*/


                var id=$(this).data('work_item');
                if($("#"+id).length < 1)
                {
                  currentItem = new Category(id,"categories.php","#cadu_pages","cadu_page_container",1.2,true);
                  currentItem.initialize();
                }else {
                  $("#"+id).appendTo("#cadu_pages");
                }



              });



   }


/*  function init_menu()
  {

    //init Timelines

    menu_level_0_TL =   new TimelineMax({paused:true});
    //menu_level_0_TL.to($("#menu").find("#menu_level_1"),0.8,{left:0,ease:Power2.easeInOut});
     menu_level_0_TL.to($("#menu_level_0"),0.7,{top:"-80px"});

    $("#menu_level_3_work").find(".menu_container").css("padding-top",$("#menu_level_2_work").height());

    $(".accordeon").on('click',function(){

      var link = $(this).data('menu_id');
      var child = "";
      if($(this).hasClass("hasChild"))
      {

          child = $(this).data("menu_child");

      }

      var $parent = $(this).closest(".menu_stripe");

      var offset_x = $(this).offset().left ;//+$parent.width() ;
      console.log("menu position x = "+offset_x);

      $parent.find(".active").removeClass("active");


      if($parent.hasClass("menu_level_2") > 0)
      {
        console.log("menu 2");

          $("#menu").find(".menu_level_3").animate({left:-250},100,function(){

            $("#"+link).find(".menuChild").addClass("hidden");
            console.log(child);
          if(child !='')
            {
              $("#"+child).removeClass("hidden");
            }
            $("#"+link).animate({left:offset_x},200);

        });
      }


      if($parent.hasClass("menu_level_1"))
      {
        console.log("menu 1");

          $("#menu").find(".menu_level_3").animate({left:-250},100,function(){

            $("#menu").find(".menu_level_2").animate({left:-250},100,function(){


              $("#"+link).animate({left:offset_x},200);

          });

        });
      }

      $(this).addClass("active");



    });


    $(document).on('click','.menu_top',function(){

          alert("click");

          menu_level_0_TL.reverse();
          //$("#menu").find("#menu_level_1").animate({left:0},200);

    });

    $(".close_menu").on('click',function(){

      var $parent = $(this).closest(".menu_stripe");
      if($parent.hasClass("menu_level_2") )
      {
        console.log("menu 2");
           $("#menu").find(".menu_level_3").animate({left:-250},100,function(){
            $("#menu").find(".menu_level_2").animate({left:-250},100,function(){});
        });
      }

      if($parent.hasClass("menu_level_3") )
      {
          $("#menu").find(".menu_level_3").animate({left:-250},100,function(){});

      }

      if($parent.hasClass("menu_level_1") )
      {

          $("#menu").find(".menu_level_3").animate({left:-250},100,function(){
          $("#menu").find(".menu_level_2").animate({left:-250},100,function(){

                //  $("#menu").find(".menu_level_1").animate({left:-250},100,function(){});
                    menu_level_0_TL.reverse();

          });
        });


      }



    }); //close menu






  } //end init menu*/


  function setAboutPhotoContainer(element)
  {

  /*  var new_width = (".about_box_container").width()+
    $(element).width*/

  }

  function   close_open_about()
  {

    if($("#cadu_pages").find(".about_page").length > 0)
    {

      $("#cadu_pages").find(".about_page").remove();

    }

  }
