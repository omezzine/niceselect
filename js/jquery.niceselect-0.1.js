/****************************
*  jQuery Plugin 
*  Version 0.1 
*  Author Omezzine Mohamed
* 
*  Require jQuery 1.5+ 
****************************/

(function($){
 $.fn.niceSelect=function(opts)
    {

     // default configuration

     var config = $.extend({}, {
			mainClass: "nice-select-container",
            ulClass:"nice-select-options"
		           }, opts); 

     var EVENTS = [ "onmouseover", "onclick", "onchange", "ondblclick"]
	 
	 // the eq of inline event in jquery
	 
     var JQUERY_EVENTS = new Array();
	 JQUERY_EVENTS['onlick'] = 'click' ;
	 JQUERY_EVENTS['onchange'] = 'change' ;
	 JQUERY_EVENTS['onmouseover'] = 'mouseover' ;
	 JQUERY_EVENTS['ondblclick'] = 'dblclick' ;
	 
     this.each(function(){

          var $self = $(this);
          var attributes = {}; 
       // The Element iS not a Select

          if(!$self.is("select")){
             return this;
          }

       // Create the UL  Element

          var $customNewListContainer = $("<div class="+config.mainClass+" />");
          var $customNewList = [];
          var $newListHeader = $("<a class='nice-select-header' href='#'/>");
          var $newListElement = $("<ul class="+config.ulClass+" />");
          var $selectedElement;
          $self.after($customNewListContainer);    /* Add the new Element after the select tag */      
        
      // Get All options 
          var   $options = $self.find('option');
		  
		  for (var i = 0, j = $options.length; i< j; i++){
		     if(!$options.eq(i).is(":selected")){
			   $customNewList.push("<li data-value='"+$options.eq(i).val()+"' ><a href='#'>"+$options.eq(i).text()+"</a></li>");
		    }
            else{
			   $customNewList.push("<li data-value='"+$options.eq(i).val()+"' style='display: none;'><a href='#'>"+$options.eq(i).text()+"</a></li>"); 
               $selectedElement = $options.eq(i);
            }
          }
        
      // Append the basic Elements
          $customNewListContainer.append($newListHeader);
          $customNewListContainer.append($newListElement );
      // set the new Header
          $newListHeader.attr("data-value", $selectedElement .val());
          $newListHeader.html($selectedElement.text());
      // Add the new List
          $newListElement.append($customNewList.join(""));   
      // show/hide options
          $newListElement.hide();
          $newListHeader.click(function(){
           (!($newListElement).is(":visible"))?($newListElement.show()): ($newListElement.hide());
          }) 
		  
      /* Trigger inline Events onmouseover , onclick.....*/
          $.each( $self[0].attributes, function( index, attr ) {
                if ($.inArray(attr.name, EVENTS) > -1){
                    $customNewListContainer.bind(JQUERY_EVENTS[attr.name], function(){
					triggerInlineEvent($self[0], attr.name);
                   })
				}
	       })		
		   
     // Triger  jQuery events
 	       $.each($._data($self[0], "events" ), function(e) {
              $customNewListContainer.bind(e, function(){
			   alert(e);
       	       $self.trigger(e); 			   
              })
           }); 
      
	  
	 // on change event 
        $allList =  $newListElement.find('li') ; 	 
        $allList.each(function(){
		  var $li = $(this)
		   $li.click(function(){
		      $allList.show();
		      $self.find("option[value='"+$li.data('value')+"']").attr('selected', 'selected');
              $self.trigger('change');
			  $li.hide();
			  $newListHeader.html($li.text()); /*change the header text*/
			  $newListElement.hide();
           })		   
		})



      })

	  
// Private functions
 function debug($obj) {
    if (window.console && window.console.log)
      window.console.log('hilight selection count: ' + $obj.size());
  };
  
 function updateHeader(){
   
 }

function triggerInlineEvent(obj, e){	
       switch(e){
	     case "onclick": obj.onclick();break;
		 case "onmouseover": obj.onmouseover();break;
	     default: "donothing"	   
	   }
 };
	
	
    }

})(jQuery);
