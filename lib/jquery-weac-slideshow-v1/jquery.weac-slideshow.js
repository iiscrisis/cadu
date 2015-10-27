/**
* Detect Element Resize Plugin for jQuery
*
* https://github.com/sdecima/javascript-detect-element-resize
* Sebastian Decima
*
* version: 0.5.3
**/

(function ( $ ) {
	var attachEvent = document.attachEvent,
		stylesCreated = false;

	var jQuery_resize = $.fn.resize;

	$.fn.resize = function(callback) {
		return this.each(function() {
			if(this == window)
				jQuery_resize.call(jQuery(this), callback);
			else
				addResizeListener(this, callback);
		});
	}

	$.fn.removeResize = function(callback) {
		return this.each(function() {
			removeResizeListener(this, callback);
		});
	}

	if (!attachEvent) {
		var requestFrame = (function(){
			var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
								function(fn){ return window.setTimeout(fn, 20); };
			return function(fn){ return raf(fn); };
		})();

		var cancelFrame = (function(){
			var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
								   window.clearTimeout;
		  return function(id){ return cancel(id); };
		})();

		function resetTriggers(element){
			var triggers = element.__resizeTriggers__,
				expand = triggers.firstElementChild,
				contract = triggers.lastElementChild,
				expandChild = expand.firstElementChild;
			contract.scrollLeft = contract.scrollWidth;
			contract.scrollTop = contract.scrollHeight;
			expandChild.style.width = expand.offsetWidth + 1 + 'px';
			expandChild.style.height = expand.offsetHeight + 1 + 'px';
			expand.scrollLeft = expand.scrollWidth;
			expand.scrollTop = expand.scrollHeight;
		};

		function checkTriggers(element){
			return element.offsetWidth != element.__resizeLast__.width ||
						 element.offsetHeight != element.__resizeLast__.height;
		}

		function scrollListener(e){
			var element = this;
			resetTriggers(this);
			if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
			this.__resizeRAF__ = requestFrame(function(){
				if (checkTriggers(element)) {
					element.__resizeLast__.width = element.offsetWidth;
					element.__resizeLast__.height = element.offsetHeight;
					element.__resizeListeners__.forEach(function(fn){
						fn.call(element, e);
					});
				}
			});
		};

		/* Detect CSS Animations support to detect element display/re-attach */
		var animation = false,
			animationstring = 'animation',
			keyframeprefix = '',
			animationstartevent = 'animationstart',
			domPrefixes = 'Webkit Moz O ms'.split(' '),
			startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
			pfx  = '';
		{
			var elm = document.createElement('fakeelement');
			if( elm.style.animationName !== undefined ) { animation = true; }

			if( animation === false ) {
				for( var i = 0; i < domPrefixes.length; i++ ) {
					if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
						pfx = domPrefixes[ i ];
						animationstring = pfx + 'Animation';
						keyframeprefix = '-' + pfx.toLowerCase() + '-';
						animationstartevent = startEvents[ i ];
						animation = true;
						break;
					}
				}
			}
		}

		var animationName = 'resizeanim';
		var animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
		var animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';
	}

	function createStyles() {
		if (!stylesCreated) {
			//opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
			var css = (animationKeyframes ? animationKeyframes : '') +
					'.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' +
					'.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
				head = document.head || document.getElementsByTagName('head')[0],
				style = document.createElement('style');

			style.type = 'text/css';
			if (style.styleSheet) {
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}

			head.appendChild(style);
			stylesCreated = true;
		}
	}

	window.addResizeListener = function(element, fn){
		if (attachEvent) element.attachEvent('onresize', fn);
		else {
			if (!element.__resizeTriggers__) {
				if (getComputedStyle(element).position == 'static') element.style.position = 'relative';
				createStyles();
				element.__resizeLast__ = {};
				element.__resizeListeners__ = [];
				(element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
				element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' +
																						'<div class="contract-trigger"></div>';
				element.appendChild(element.__resizeTriggers__);
				resetTriggers(element);
				element.addEventListener('scroll', scrollListener, true);

				/* Listen for a css animation to detect element display/re-attach */
				animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function(e) {
					if(e.animationName == animationName)
						resetTriggers(element);
				});
			}
			element.__resizeListeners__.push(fn);
		}
	};

	window.removeResizeListener = function(element, fn){
		if (attachEvent) element.detachEvent('onresize', fn);
		else {
			element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
			if (!element.__resizeListeners__.length) {
					element.removeEventListener('scroll', scrollListener);
					element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
			}
		}
	}
}( jQuery ));





(function ($){
  $.fn.weacSlideshow = function(options)
  {
    //container_name = this ?
  //  this.$container;
    var settings = $.extend(
      {
       slide_items :null,
       slide_html:null,
       slide_interval :10000,
       slide_max_heigh:null,
       fullscreen : true,
			 slide_bg_height:-1,
			 on_click_function:null,
			 add_on_click_action:null,
       arrows_left:'images/arrows/arrow-left.svg',
       arrows_right:'images/arrows/arrow-right.svg',
       show_buttons:true,
       show_arrows:false,
			 image_offset_y:0,
			 slide_animation:'RL', //options are RL : right to left  LR: left to right FIN : fade in FOUT:fade out TB:top_bottom BT:bottom top
			 slide_animation_reverse:'LR'
      },options);


      if ( settings.slide_items ) {
          return this.each(function(){

              var $self = $(this);
              init_slideshow_actions($self);
              $(this).addClass("-weac-slideshow_container");

              var image_box_w = $(this).width();

              var image_box_h =   $(this).height()-settings.image_offset_y;

              var items_length = $(this).find(settings.slide_items).length;
              //alert(items_length);
              //create a slideshow item from each designated slide item
            $(this).find(settings.slide_items).map(function(){

                //hide the element so as not to interfere with the slideshow
                $(this).hide();
                var $slideshow_item = $('<div/>');
                $slideshow_item.addClass("slideshow_item");
                $slideshow_item.addClass("side");

								$slideshow_item.css("height",image_box_h+"px");

                if($(this).find("img").length>0)
                {
                    var $slide_bg = $('<div/>');
                    $slide_bg.addClass("slide_bg");
									//	$slide_bg.height()
                    var $bg_image = $('<img/>');
                    //get the image src of the first image
                    $bg_image.attr('src',$(this).find("img").eq(0).attr('src'));

										var image_box_height=0;
										if(settings.slide_bg_height < 0)
										{
											image_box_height =   $(this).height()-settings.image_offset_y;
										}else {
											image_box_height = settings.slide_bg_height;
										}
										//alert("H : "+image_box_height);

                    if(settings.fullscreen)
                    resize_img($bg_image,image_box_w,image_box_height); //resize image to fit in the box

										$slide_bg.height(image_box_height);
                    $bg_image.appendTo($slide_bg );
                    $slide_bg.prependTo($slideshow_item);
                }

                if($(this).find(settings.slide_html).length > 0)
                {
                    var $slide_html = $('<div/>');
                    $slide_html.addClass("slide_text_container");

                    $(this).find(settings.slide_html).clone().appendTo($slide_html);

                    $slide_html.appendTo($slideshow_item);

                }
                //Append slideshow_item to slideshow container
                $slideshow_item.appendTo( $self);

              });


              //show buttons

              var slideshow_show = "-weac-hidden";
              if(settings.show_buttons == true)
              {
                   slideshow_show = "";
              }

                var $slide_button;
                $slideshow_buttons_container = $('<div/>');
                $slideshow_buttons_container.addClass("slideshow_buttons_container");
                $slideshow_buttons_container.addClass(slideshow_show);

                $slideshow_buttons = $('<div/>');
                $slideshow_buttons.addClass("slideshow_buttons");

                  $slideshow_buttons.appendTo( $slideshow_buttons_container);
                for(i=0;i<items_length;i++)
                {

                  /*	<div class="slideshow_buttons_container">
                			<div class="slideshow_buttons">
                				<div class="clearer">

                				</div>
                			</div>
                		</div>*/



                  $slide_button = $('<div/>');
                  $slide_button.addClass("single_slideshow_button");
                  $slide_button.addClass("circle");

                  var $btn_interior = $('<div/>');
                  $btn_interior.addClass("interior_slideshow_button");
                  $btn_interior.addClass("circle");

                  $slide_button.append($btn_interior);

                  $slideshow_buttons.prepend($slide_button);



                }

                var $clearer = $('<div/>');
                $clearer.addClass("clearer");
                $slideshow_buttons.append( $clearer);

                $slideshow_buttons_container.appendTo($(this));

                var new_w =($slide_button.width()+10)*items_length + 20;
                $(this).find(".slideshow_buttons").width(new_w);




              //show arrows
              if(settings.show_arrows == true)
              {

                var $arrows = $('<div/>');
                $arrows.addClass("-weac-slideshow_arrows");
                var $arrows_container = $('<div/>');
                $arrows_container.addClass("-weac-slideshow_arrows_container");



                var $arrow_left = $('<div/>');
                $arrow_left.addClass("-weac-slideshow_arrows_arrow");
                $arrow_left.addClass("-weac-slideshow_arrow_left");

                var $arrow_img_l = $("<img/>");
                $arrow_img_l.attr('src',settings.arrows_left);

                var $arrow_right = $('<div/>');
                $arrow_right.addClass("-weac-slideshow_arrows_arrow");
                $arrow_right.addClass("-weac-slideshow_arrow_right");

                var $arrow_img_r = $("<img/>");
                $arrow_img_r.attr('src',settings.arrows_right);

                $arrow_img_r.appendTo($arrow_right);
                $arrow_img_l.appendTo($arrow_left);

                $arrow_left.appendTo($arrows_container);
                $arrow_right.appendTo($arrows_container);

                $arrows_container.appendTo($arrows);

                $arrows.prependTo($(this));

              }






              $(this).find(".slideshow_item").eq(0).addClass("show_slide_item");
              $(this).find(".slideshow_item").eq(0).addClass("show_slide_item_"+settings.slide_animation);
              $(this).find(".slideshow_item").eq(0).removeClass("hide_item_"+settings.slide_animation);
              $(this).find(".slideshow_item").eq(0).removeClass("side");

            $self.animate({opacity:1},1000,function(){});






              $(this).find(".slideshow_buttons").find(".single_slideshow_button").eq(0).addClass("active");

                if($(this).find(".single_slideshow_button").length>1 && settings.slide_interval !=  0)
                {
                //  alert("more");
                  settings.interval = setInterval(function () {
                   //  alert("trig");
                     var $next =$self.find(".active").next(".single_slideshow_button");

                     if( $next.length == 0 ) {
                       $next =  $self.find(".single_slideshow_button").first();
                     }

                     $next.trigger( "click" );

                   }, settings.slide_interval);

                }


              /*  $self.bind('resize', function(){
                          console.log('resized');
              });*/


               $(this).resize(function(){


                 var image_box_w = $self.width();
                 var image_box_h = $self.height()-settings.image_offset_y;
                  console.log("W = "+image_box_w+ " H ="+image_box_h);


                  if(settings.fullscreen)
                  {
                    $self.find(".slideshow_item").map(function(){

                  /*    var image_box_w = window.innerWidth;
                      var image_box_h =  window.innerHeight;*/
											var image_box_height;
											if(settings.slide_bg_height < 0)
											{
												//alert("lessss");
												image_box_height =   $(this).height()-settings.image_offset_y;
											}else {
												image_box_height = settings.slide_bg_height;
											}

                        resize_img_loaded($(this).find(".slide_bg").find("img"),image_box_w,image_box_height);
                    });

                  }


               });


              $(window).resize(function(){

                    //resize_slideshow_images($(this));





                });


            }); // End each




      }//end if  settings.slide_items



      //resize image to fit in the box declared by box_w, box_h
      function resize_img($img, box_w, box_h)
      {

				//alert("Resize"+box_h);
      	$img.load(function(){

        //  console.log("res s");
      		var natW = this.naturalWidth;
      		var natH = this.naturalHeight;

      		var w_x = box_w;// $(window).width();
      		var w_y = box_h; // $(window).height();

      		var p_x =0;
      		var p_y = 0;



      		var ratio_x_y;
      		if(p_y < w_y)
      		{
      			ratio_x_y	= w_x/w_y;
      		}else
      		{
      			ratio_x_y	= w_x/p_y;
      		}





      		var ratio_img_x_y = natH/natW ;
          console.log("RATION "+ratio_img_x_y);
					console.log("BOX W "+box_w);
      		var new_x = box_w;
      		var new_y = new_x * ratio_img_x_y;
					console.log("new_x "+new_x);
					console.log("new_y "+new_y);


      		if(new_y < box_h)
      		{
      			var new_h_ratio = box_h/new_y;
      			new_y = new_y*new_h_ratio;
      			new_x = new_x*new_h_ratio;
      		}

					new_x += new_x*0.15;
					new_y += new_y*0.15;

      		var offset_x = (new_x-box_w)/2;
      		if(offset_x < 0)
      		{
      			offset_x = 0;
      		}else
      		{
      			offset_x = offset_x*-1;
      		}

          var offset_y = (new_y-box_h)/2;
      		if(offset_y < 0)
      		{
      			offset_y = 0;
      		}else
      		{
      			offset_y = offset_y*-1;
      		}


      		$img.css("width",new_x);
      		$img.css("height",new_y);
      		$img.css("position","relative");
      		$img.css("left",offset_x);
          $img.css("top",offset_y);
      	});

      }


      function resize_img_loaded($img, box_w, box_h)
      {




          console.log($img.attr('src'));
          var natW =$img.width();
          var natH = $img.height();

          var w_x = box_w;// $(window).width();
          var w_y = box_h; // $(window).height();

          var p_x =0;
          var p_y = 0;



          var ratio_x_y;
          if(p_y < w_y)
          {
            ratio_x_y	= w_x/w_y;
          }else
          {
            ratio_x_y	= w_x/p_y;
          }





          var ratio_img_x_y = natH/natW ;
        //  console.log(ratio_img_x_y);
          var new_x = box_w;
          var new_y = new_x * ratio_img_x_y;



            if(new_y < box_h)
            {
              var new_h_ratio = box_h/new_y;
              new_y = new_y*new_h_ratio;
              new_x = new_x*new_h_ratio;
            }
          var offset_x = (new_x-box_w)/2;
          if(offset_x < 0)
          {
            offset_x = 0;
          }else
          {
            offset_x = offset_x*-1;
          }

          var offset_y = (new_y-box_h)/2;
          if(offset_y < 0)
          {
            offset_y = 0;
          }else
          {
            offset_y = offset_y*-1;
          }


          $img.css("width",new_x);
          $img.css("height",new_y);
          $img.css("position","relative");
          $img.css("left",offset_x);
          $img.css("top",offset_y);


      }


      function resize_slideshow_images($self)
      {
        console.log("resizing inside "+$self.attr('id'));
        if(settings.fullscreen)
        {
          $(settings.slide_items).map(function(){

            var image_box_w = $self.width();
            var image_box_h =   $self.height() -settings.image_offset_y;
              resize_img($(this).find(".slide_bg").find("img"),image_box_w,image_box_h);
          });

        }



      }


      function init_slideshow_actions($slide_container)
      {


      $slide_container.on('click',".single_slideshow_button",function(event){

					if(settings.on_click_function !=null)
					{
							settings.on_click_function($(this));
							return 0;

					}else if(settings.add_on_click_action !=null)
					{
							settings.add_on_click_action($(this));

					}

				//	alert(1);

	          var $container = $(this).closest(".-weac-slideshow_container");
	          var current_active_index= $(this).closest(".slideshow_buttons_container").find(".active").index();
	          var get_index = $(this).index();
	          var slide_length = $(this).closest(".slideshow_buttons").find(".single_slideshow_button").length;

	      //  console.log("l : "+slide_length);
	          var class_hide = "hide_item";
	          var class_show = "show_slide_item"
	      //  console.log("active : "+current_active_index+ " GET :"+get_index);
	          if(current_active_index == slide_length-1 && get_index==0)
	          {
	              //console.log("last to frist");
	                direction =  "_"+settings.slide_animation; //Right to left;

	          }else if(current_active_index == 0 && get_index==slide_length-1)
	            {
	              //  console.log("last to frist");
	                  direction =  "_"+settings.slide_animation_reverse; //Right to left;

	          }else if(current_active_index < get_index)
	          {
	            direction = "_"+settings.slide_animation;//Right to left;

	          }else {
	            direction =  "_"+settings.slide_animation_reverse; //left to right;
	          }
	        //  alert(get_index);

	          $(this).closest(".slideshow_buttons_container").find(".single_slideshow_button").removeClass("active");
	          $(this).addClass("active");

	          $container.find(".show_slide_item").addClass("hide_item"+direction);
	          $container.find(".show_slide_item").removeClass("show_slide_item_"+settings.slide_animation_reverse);
	          $container.find(".show_slide_item").removeClass("show_slide_item_"+settings.slide_animation);
	          $container.find(".show_slide_item").removeClass("show_slide_item");
	        /*  console.log(direction);
	          $container.find(".show_slide_item").animate({right:direction},1300,function(){

	            $(this).removeClass("show_slide_item");
	          });

	          var invert_direction = direction*-1;
	          $container.find(".slideshow_item ").eq(get_index).css("right",invert_direction+"px");
	            $container.find(".slideshow_item ").eq(get_index).animate({right:0},1300,function(){

	              $(this).addClass("show_slide_item");
	            });*/
	          $container.find(".slideshow_item ").eq(get_index).addClass("show_slide_item");
	          $container.find(".slideshow_item ").eq(get_index).addClass("show_slide_item"+direction);
	          $container.find(".slideshow_item ").eq(get_index).removeClass("hide_item_"+settings.slide_animation);
	          $container.find(".slideshow_item ").eq(get_index).removeClass("hide_item_"+settings.slide_animation_reverse);



        });


      $slide_container.on('click',".-weac-slideshow_arrows_arrow",function(event){

            var $container = $(this).closest(".-weac-slideshow_container");


            if($(this).hasClass("-weac-slideshow_arrow_right"))
            {

              var $next = $container.find(".active").next(".single_slideshow_button");

              if( $next.length == 0 ) {
                $next = $container.find(".single_slideshow_button").first();
              }

              $next.trigger( "click" );
            }

            if($(this).hasClass("-weac-slideshow_arrow_left"))
            {

              var $prev = $container.find(".active").prev(".single_slideshow_button");

              if( $prev.length == 0 ) {
                $prev = $container.find(".single_slideshow_button").last();
              }

              $prev.trigger( "click" );
            }


          });




      } //end slideshow actions



  }




}(jQuery));
