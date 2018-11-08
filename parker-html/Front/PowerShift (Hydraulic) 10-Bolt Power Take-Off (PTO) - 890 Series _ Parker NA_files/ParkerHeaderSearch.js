function subform(typeText,stringValue){
    if((typeText!="" && stringValue!="") && (typeText!=""&& (document.getElementById("searchKey").value != stringValue) )){
          if(validateAndSubmit(typeText,stringValue))
                document.forms[0].submit();
          }
          else
          {
          //alert('Invalid search criteria');
          $("#modelMessage").html(MessageHelper.messages["INVALID_SEARCH_CRITERIA"]);
          $("#modelTitle").show();
		  $("#searchMessageModal").modal("show");
          return false;
          }         
    }

      function validateAndSubmit(typeText,stringValue){
    	  //alert('In partNumber search if block----->'+stringValue);
    	  if(typeText=='keyword'){
        	  //alert('In keyword search if block----->'+stringValue);
        	  document.searchForm1.Keyword.value=trim(stringValue);
              var portalSearchUrl = document.getElementById("portalSearchUrl").value;
              document.searchForm1.action= portalSearchUrl;
              return true;                  
    	  }
    	  else if(typeText=='partNumber'){
        	  //alert('In partNumber search if block----->'+stringValue);
              document.searchForm1.PartNumber.value=trim(stringValue);
              var portalSearchUrl = document.getElementById("portalSearchUrl").value;
              document.searchForm1.action= portalSearchUrl;
              return true;            
    	  }
    	  else{
    		//alert('In redesigned search if block----->'+stringValue);
    	  document.searchForm1.Keyword.value=trim(stringValue);
          document.searchForm1.searchCategory.value=trim(typeText);
          var portalSearchUrl = document.getElementById("portalSearchUrl").value;
          document.searchForm1.action= portalSearchUrl;
          return true;  
    	  }
      }

      function changeKeyword(){
    	  document.getElementById("searchString").value = document.getElementById("searchKey").value;
    	  document.getElementById("keyword_new").checked = true;
    	  document.getElementById("part_number").checked = false;
      }

      function changePartNumber(){
    	  document.getElementById("searchString").value = document.getElementById("searchPart").value;
    	  document.getElementById("keyword_new").checked = false;
    	  document.getElementById("part_number").checked = true;
      }
      
      function changeEmpty(){
    	  document.getElementById("searchString").value = "";
      }
      
      function changeStyle(obj) {
            
            obj.className = " ";
            var vgnextfmt = "";
            
            if (document.getElementById("vgnextfmt").value != null) {
                  vgnextfmt= document.getElementById("vgnextfmt").value;
            }
            if(obj.value == null || obj.value.trim() == "") {
                  if (obj.id == "partNumber1") {
                        if (vgnextfmt.toLowerCase() == "DE".toLowerCase())
                              obj.value="Teilenummer eingeben";
                        else
                              obj.value="Enter part number";
                  }
                  else {
                        if (vgnextfmt.toLowerCase() == "DE".toLowerCase())
                              obj.value="Stichwort eingeben";
                        else
                              obj.value="Enter keyword";
                  }
            }     
      }

      function removeHTMLEntities(inputString){
            var div = document.createElement('div');
            div.innerHTML = inputString;
            return div.innerHTML;
      }

    function trim(argvalue) {
            var tmpstr = ltrim(argvalue);
            return rtrim(tmpstr);
      }

      function ltrim(argvalue) {
            while (1) {
            if (argvalue.substring(0, 1) != " ")
            break;
            argvalue = argvalue.substring(1, argvalue.length);
            }
            return argvalue;
      }

      function rtrim(argvalue) {
            while (1) {
            if (argvalue.substring(argvalue.length - 1, argvalue.length) != " ")
            break;
            argvalue = argvalue.substring(0, argvalue.length - 1);
            }
            return argvalue;
      }

      function showErrorMessageModel(message){
    	  
    	  $("#modelMessage").html(message);
    	  $("#modelTitle").hide();
		  $("#searchMessageModal").modal("show");
		  return false;
      }