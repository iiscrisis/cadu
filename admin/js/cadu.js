

  $(document).ready(function(){



    $('.single_menu_item_link').on('click',function(event){

      event.preventDefault();
      var work_item = $(this).data("work_item");
      var src= $(this).attr('href');
      console.log(src+" " +work_item);
      $.ajax({
          method:'post',
          url: src,
          data: { link: work_item}
        }).done(function(data) {
          console.log("Return : "+data);
          alert("complete updating");

        });




    });

  });
