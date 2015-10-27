function About(id,src){

  this.id = id;
  this.src = src;
  this.html_data;
  this.$container;

  this.create_container = function()
  {
    var self = this;


    self.$container = $('<div/>');
    self.$container.addClass("cadu_page_container");
    self.$container.attr("id",this.id);
    console.log(this.id+" - - "+  self.$container.attr("id"));

  }

  this.initialize = function()
  {
    //var link_data = $(this).data('about_data');
    var self = this;

    if(this.src=='')
    {
      return;

    }
    console.log("http://localhost/cadu-new/data/about"+  this.src );



    $.ajax({
      url: "http://localhost/cadu-new/data/about/"+  this.src ,
      method:"post"
    }).done(function(data) {

        var ret_t =  jQuery.parseJSON(data);




        var context ={

          title:ret_t['title'],
          description:ret_t['description'],
          background:ret_t['background'],
          subtitle:ret_t['subtitle']
        }

        var bg_image = ret_t['background'];

        var source   = $("#about_tmpl").html();
        var template = Handlebars.compile(source);

        var html    = template(context);

      /*  $about = $('<div/>');
        $about.addClass("about_page");
        $about.addClass("cadu_page_container");
        $about.html(html);
        $about.appendTo("#cadu_pages");*/

        self.html_data = html;

        self.create_container();
        self.$container.html(html);
        self.$container.appendTo("#cadu_pages")





        self.$container.find(".about_slide").height($(window).height);
        var new_width =   $(window).width() -(self.$container.find(".about_box_container").width()+ self.$container.find(".about_box_container").offset().left+60);

        new_width = new_width < 320?320:new_width;
        self.$container.find(".about_slide").width(new_width);
        self.$container.find(".about_slide").weacSlideshow({slide_items:".slide_item",slide_html:".home_data",show_buttons:false,slide_animation:'LR', slide_animation_reverse:'RL'});
      //  alert(html);

        var current_page = $('html').html();

      // add an item to the history log
        history.pushState(current_page,self.id+' CADU' ,self.id);
        var current_page = $('html').html();
        // Store the initial content so we can revisit it later
        history.replaceState(current_page, document.title, document.location.href);

    });

  }



}
