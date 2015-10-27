
  function Item(id,src,parent_container)
  {
    this.id = id;
    this.src = src;
    this.$container;
    this.itemThumbsTl;
    this.slideshow_tl ;
    this.parent_container= parent_container;
    this.tl_item_hover_array;

          this.initialize = function()
          {
            var self = this;


            $.ajax({
                method:'post',
                url: this.src,
                data: { link: this.id, raw:true}
              }).done(function(data) {

              //  var $source = jQuery(data).find(".item_wrapper");
          //      alert(data);
              //  var $wrapper = $source.*/
                self.create_container();
                console.log("test");
                self.$container.append(data);
                console.log("appending "+  self.$container.attr('id')+" to :"+self.parent_container);
                self.$container.appendTo($(self.parent_container));
                console.log("got data");
                self.init_item();

                self.$container.imagesLoaded().then(function(){
            // do stuff after images are loaded here
                  self.display_item();
                });


                var current_page = $('html').html();

                // add an item to the history log
                history.pushState(current_page,self.id+' CADU' ,self.id);


                var current_page = $('html').html();

                // Store the initial content so we can revisit it later
                history.replaceState(current_page, document.title, document.location.href);

              }).error(function(){

                console.log("error");

              });;

            }

            this.create_container = function()
            {
              var self = this;

              this.tl_item_hover_array = new   Array();
              self.$container = $('<div/>');
              self.$container.addClass("cadu_page_container");
              self.$container.attr("id",this.id);
              console.log(this.id+" - - "+  self.$container.attr("id"));

            }

            this.assign_container = function()
            {

                var self = this;
                  this.tl_item_hover_array = new   Array();
                self.$container = $('#'+self.id);
            }

            this.display_item = function()
            {

                console.log("display");

                if(  this.parent_container.length > 0)
                {

                      this.itemThumbsTl.play();
                      //TweenMax.staggerFrom( this.$container.find(".item_thumb_container"),0.35,{opacity:0},0.15);

                }

            }

            this.revoke_item = function()
            {

                console.log("display");
                this.itemThumbsTl.reverse();
                      //TweenMax.staggerFrom( this.$container.find(".item_thumb_container"),0.35,{opacity:0},0.15);


            }



            this.init_item = function()
            {

              //set item thumb height to be 1.44 the width
              console.log("INIT ITEM");
              //create initial menu animation

              var self =this;

               this.itemThumbsTl = new TimelineMax({paused:true});
               this.itemThumbsTl.staggerFrom(this.$container.find(".item_menu").find(".single_menu_item"),0.3,{opacity:0, top:"+=20"},0.15);
               this.itemThumbsTl.from(this.$container.find(".large_logo "),0.7,{scale:0,ease:Power2.easeOut},0);
               this.itemThumbsTl.staggerFrom( this.$container.find(".item_thumb_container"),0.35,{opacity:0},0.25);
               this.itemThumbsTl.from(this.$container.find(".item_menu").find(".single_menu_item"),0.6,{"background-color":"#fff",color:"#232323"},0.5);
               this.itemThumbsTl.from(this.$container.find(".title"),1,{top:"-50px",ease:Power2.easeIn});
               this.itemThumbsTl.staggerFrom(this.$container.find(".details"),0.8,{left:"-=900px",ease:Power2.easeIn},0.5);
               this.itemThumbsTl.from(  this.$container.find(".description_container").find(".general_text"),0.5,{opacity:0, top:"+=40"});
               this.itemThumbsTl.staggerFrom(this.$container.find(".single_plan"),0.8,{top:"+=20px",ease:Power2.easeIn},0.5);
              // itemTL.play();




              var slideshow_w =  this.$container.find(".item_slideshow").width()-160;
              var slideshow_h = slideshow_w*0.5625 ;

             this.$container.find(".item_slideshow_container").width(slideshow_w);
             this.$container.find(".item_slideshow_container").height(slideshow_h);

              this.$container.find(".item_slideshow_container").weacSlideshow({slide_items:".item_slideshow_slide",slide_html:".item_slideshow_slide_html",show_buttons:false,show_arrows:true,image_offset_y:60,slide_interval:10000000,arrows_right:'images/buttons/slide_right.svg',arrows_left:'images/buttons/slide_left.svg'});



              //create thumbs
              this.$container.find(".item_thumb_container").map(function(){

                console.log("INIT THM");

               var new_h = $(this).width() * 1.44;
               $(this).height(new_h);
               $(this).find(".thumb_bg").weacSlideshow({slide_items:".slide_item",slide_html:".home_data",show_buttons:false,slide_animation:'FIN',slide_animation_reverse:'FOUT'});

               var index = $(this).index();
            //   console.log(index);

               var offset_y = ($(this).find(".item_thumb_details").height()+20)*-1;


                self.tl_item_hover_array[index] =  new TimelineMax({paused:true});

                self.tl_item_hover_array[index].to($(this).find(".item_thumb_details"),0.5,{top:offset_y+"px"});
                self.tl_item_hover_array[index].to($(this).find(".slide_bg").find("img"),0.5,{opacity:0.23,top:'-=20px'},0.1);
                self.tl_item_hover_array[index].from($(this).find(".item_thumb_details").find("h4"),0.15,{opacity:0, top:"+=20"},0.2);
                self.tl_item_hover_array[index].from($(this).find(".item_thumb_details").find(".general_text"),0.15,{opacity:0, top:"+=20"},0.3);

             });


             //  TweenMax.staggerFrom( $(".item_thumb_container"),0.35,{opacity:0},0.15);

               this.$container.find(".item_thumb_container").hover(function(){



                 var index = $(this).index();
              //   console.log("hover :"+index);


                 self.tl_item_hover_array[index].play();
              // $(this).find(".item_thumb_details").css("top",offset_y);

              /* var new_h = ($(this).width() * 1.44) + offset_y;
               $(this).find(".thumb_bg").height(new_h);*/

             },function(){

               var index = $(this).index();
              // console.log("hover :"+index);


               self.tl_item_hover_array[index].reverse();


            });

/*
             this.$container.find(".single_plan").hover(function(){

              var tl_single_plan = new TimelineMax({paused:true});
              tl_single_plan.to($(this).find(".plans_description"),0.3,{opacity:0.95});
              tl_single_plan.from($(this).find(".general_text"),0.15,{bottom:"-=20"},0);
              tl_single_plan.play();

            },function(){

              var tl_single_plan = new TimelineMax({paused:true});
              tl_single_plan.to($(this).find(".plans_description"),0.3,{opacity:0});
              tl_single_plan.to($(this).find(".general_text"),0.15,{bottom:"20px"},0);
              tl_single_plan.play();

            });

             this.$container.find(".single_plan").on('click', function (arguments){

              if(!$(this).hasClass("bring_forward"))
              {

                $("#plans_viewer_container").empty();

                $(this).find("img").clone().appendTo($("#plans_viewer_container"));

                var tl_single_plan = new TimelineMax({paused:true});
                var target_w =$(window).width();

                if( $(window).width() > 900)
                {
                    target_w = 900;
                }

                var scale_ratio = target_w/$("#plans_viewer_container").find("img")>0?target_w/$("#plans_viewer_container").find("img"):1;

                //scale_ratio = 4;
                tl_single_plan.to($("#plans_viewer_container").find("img"),0.4,{scale:scale_ratio});
                tl_single_plan.play();


              }



            });*/

              this.$container.find(".item_thumb_container").on('click', function (event) {



              if(self.slideshow_tl == null)
              {
                self.slideshow_tl = new TimelineMax({paused:true});
                self.slideshow_tl.to(  self.$container.find(".item_wrapper"),0.7,{right:"100%",ease:Power2.easeInOut});
                self.slideshow_tl.to(  self.$container.find(".item_slideshow"),0.7,{right:"0%",ease:Power2.easeInOut},0);
                self.slideshow_tl.from(  self.$container.find(".item_slideshow").find(".slideshow_close"),0.3,{opacity:0,top:"-20px"});
                self.slideshow_tl.from(  self.$container.find(".item_slideshow").find(".slideshow_info"),0.3,{opacity:0,top:"-40px"});
              }

                  self.slideshow_tl.play();


          /*
              $("#item_wrapper").css("right","100%");
              $("#item_slideshow").css("right","0%");*/

            });

            this.$container.find(".slideshow_info").on('click', function (arguments) {

              if(!$(this).hasClass("yellow_bg"))
              {
                var $info_box = $(this).siblings(".-weac-slideshow_container").find(".show_slide_item").find(".slide_text_container");//.show();

                $info_box.show();

                var timeline_info = new TimelineMax({paused:true});
                $info_box.height(1);
                timeline_info.from($info_box,0.3,{width:"0px"});
                timeline_info.to($info_box,0.4,{height:"auto"},0.25);
                timeline_info.from($info_box.find("h4"),0.35,{opacity:0, top:"+=20"});
                timeline_info.from($info_box.find(".slide_text "),0.35,{opacity:0, top:"+=20"},0.8);
                timeline_info.to($(this),2,{"background-color":"#E9AA00"},0);
                timeline_info.play();

              //  $(this).addClass("yellow_bg");
              }else {

              }


            });

            $(".slideshow_close").on('click', function (arguments) {


              self.slideshow_tl.reverse();
            /*  $("#item_wrapper").css("right","0%");
              $("#item_slideshow").css("right","-100%");*/

            });


              this.$container.find(".-weac-slideshow_arrows_arrow").on('mouseenter',function(){
                console.log("in "+$(this).find("img").attr('src'));
                TweenMax.to($(this).find("img"),0.5,{scale:2});

            });

              this.$container.find(".-weac-slideshow_arrows_arrow").on('mouseleave',function(){
              console.log("out");
              TweenMax.to($(this).find("img"),0.5,{scale:1});

            });

            //Plans

              this.$container.find('.plans').find(".container-fluid").masonry({
                columnWidth: 50,
                itemSelector: '.single_plan',
                gutter:20,
                percentPosition: true
              });


            var dif = $(window).height() -   this.$container.find(".plans").height();
            var margin_bot =dif > 0?dif:20;

            this.$container.find(".plans").css("margin-bottom",margin_bot+"px");



          }// init item
    }//End class item
