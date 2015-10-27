
  function Category(id,src,parent_container,addClass,height_ratio,addHistory)
  {
    this.id = id;
    this.src = src;
    this.$container;
    this.itemThumbsTl;
    this.categoryThumbsTl;
    this.addClass=addClass;
    this.history =addHistory;

    this.new_h;
    this.height_ratio = height_ratio;
    this.parent_container= parent_container;
    this.tl_item_hover_array;

          this.initialize = function()
          {
            var self = this;

            this.tl_item_hover_array = new   Array();
            self.$container = $('<div/>');
            self.$container.addClass(this.addClass);
            self.$container.attr("id",this.id);
            console.log(this.id+" - - "+  self.$container.attr("id"));

            $.ajax({
                method:'post',
                url: this.src,
                data: { link: this.id},
                context: document.body
              }).done(function(data) {

                self.$container.append(data);
                console.log("appending "+  self.$container.attr('id')+" to :"+self.parent_container);
                self.$container.appendTo($(self.parent_container));
                console.log("got data");
                self.init_item();
                self.display_item();

                if(this.history)
                {
                  var current_page = $('html').html();

                  // add an item to the history log
                  history.pushState(current_page,self.id+' CADU' ,self.id);


                  var current_page = $('html').html();

                  // Store the initial content so we can revisit it later
                  history.replaceState(current_page, document.title, document.location.href);

                }


              }).error(function(){console.log("error cat");});




            }

            this.display_item = function()
            {

                console.log("display Category");

                if(  this.parent_container.length > 0)
                {

                      this.itemThumbsTl.play();
                        this.categoryThumbsTl.play();


                }

            }



            this.init_item = function()
            {

              //set item thumb height to be 1.44 the width

              //create initial menu animation

              var self =this;
            //  alert(this.height_ratio);
              var new_h = $(".item_thumb_container").width()*this.height_ratio;
              self.new_h = new_h>300?new_h:300;


              self.$container.find(".single_filter_item").on('click', function (arguments) {


                if($(this).hasClass("all"))
                {
                      self.$container.find(".active_filter").removeClass("active_filter");
                }

                if(  $(this).hasClass("active_filter"))
                {

                  $(this).removeClass("active_filter");

                }else {
                  $(this).addClass("active_filter");
                }

                console.log("filtering");
                //alert(self.$container.find(".active_filter").length );
                if(self.$container.find(".active_filter").length < 1 || $(this).hasClass("all"))
                { // alert("a");
                      self.$container.find(".all").addClass("active_filter");
                      self.$container.find(".item_thumb_container").removeClass("hide_item");
                      self.$container.find(".item_thumb_container").show();

                }else {
                //  alert("b");
                  $(".all").removeClass("active_filter");
                  self.$container.find(".item_thumb_container").addClass("hide_item");

                  //self.categoryThumbsTl.reverse();

                  self.$container.find(".active_filter").map(function(){

                    var filter_class=$(this).data("filter");

                    self.$container.find("."+filter_class).removeClass("hide_item");
                    console.log(filter_class);
                    self.$container.find(".hide_item").hide();
                    self.$container.find("."+filter_class).show();

                  });
                    //currentItem
                  // self.categoryThumbsTl.play();



              }




              });

               this.itemThumbsTl = new TimelineMax({paused:true});
              this.categoryThumbsTl = new TimelineMax({paused:true});

               this.itemThumbsTl.staggerFrom(  this.$container.find(".item_menu").find(".single_filter_item "),0.3,{opacity:0, top:"+=100"},0.15);
              // this.itemThumbsTl.from(this.$container.find(".item_menu").find(".single_filter_item"),0.6,{"background-color":"#fff",color:"#232323"},0.5);
               this.categoryThumbsTl.staggerFrom( this.$container.find(".item_thumb_container").find(".thumb_bg"),1.5,{top:"+=500px",ease:Power2.easeInOut},0.25);
              // itemTL.play();

            /*  this.categoryThumbsTl = new Timeline({paused:true});
              this.categoryThumbsTl.staggerTo(this.$container.find(".hide_item"),{width:0})*/


              //create thumbs
              this.$container.find(".item_thumb_container").map(function(){
              console.log("running");

               $(this).height(self.new_h);
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



              this.$container.find(".item_thumb_container").on('click', function (event) {

                $("#cadu_pages").find(".cadu_page_container").appendTo("#repository");

                var id=$(this).data('work_item');
                if($("#"+id).length < 1)
                {

                  currentItem = new Item(id,"item.php","#cadu_pages");
                  currentItem.initialize();

                }else {

                  $("#"+id).appendTo("#cadu_pages");

                }


              });




          }// init item
    }//End class item
