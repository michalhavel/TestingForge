//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2008, 2012 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/**
 * @fileOverview This class contains declarations of AJAX services used by the Madisons store pages.
 */

dojo.require("wc.service.common");

/**
 * @class This class stores common parameters needed to make the service call.
 */
ServicesDeclarationJS = {
	langId: "-1", /* language of the  store */
	storeId: "", /*numeric unique identifier of the store */
	catalogId: "", /*catalog of the store that is currently in use */
	rememberMe: "", /* remember me is checked or not while login */

	/**
	 * Sets common parameters used by the services
	 * @param (int) langId The language of the store.
	 * @param (int) storeId The store currently in use.
	 * @param (int) catalogId The catalog of the store currently in use.
	 */
	setCommonParameters:function(langId,storeId,catalogId){
			this.langId = langId;
			this.storeId = storeId;
			this.catalogId = catalogId;
	},

	setCommonParametersForOptionalInfo:function(langId,storeId,catalogId,rememberMe){
			this.langId = langId;
			this.storeId = storeId;
			this.catalogId = catalogId;
			this.rememberMe = rememberMe;
	}
}

function nullCartTotalCookie(orderId){
	dojo.cookie("WC_CartTotal_"+orderId, null, {expires: -1, path:'/'});
	
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var index = cookies[i].indexOf("=");
		var name = cookies[i].substr(0,index);
		var value = cookies[i].substr(index+1)
		name = name.replace(/^\s+|\s+$/g,"");
		value = value.replace(/^\s+|\s+$/g,"");
		if (value == orderId) {
			dojo.cookie(name, null, {expires: -1, path:'/'});
			break;
		}
	}	
}

	/**
	* Adds an item to to the wishlist and remove the same item from the shopping
	* cart.
	* @constructor
	 */
	wc.service.declare({
		id: "AjaxInterestItemAddAndDeleteFromCart",
		actionId: "AjaxInterestItemAddAndDeleteFromCart",
		url: getAbsoluteURL() + "AjaxInterestItemAdd",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			//Now delete from cart..
			MessageHelper.hideAndClearMessage();
			requestSubmitted = false;
			CheckoutHelperJS.deleteFromCart(serviceResponse.orderItemId,true);
			MessageHelper.displayStatusMessage(MessageHelper.messages["WISHLIST_ADDED"]);
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * Add an item to a shopping cart in Ajax mode. A message is displayed after
	 * the service call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxAddOrderItem",
		actionId: "AjaxAddOrderItem",
		url: "AjaxOrderChangeServiceItemAdd",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
                                                
			var msgContent = "<a href='"+$('#GotoCartButton1').prop('href')+"' onclick='"+$('#GotoCartButton1').attr('onclick').replace(/'/g, '"')+"'><button id='doNotRemove-button' tabindex = '1' type='button' class='btn btn-primary btn-black btn-xs-block margin-10' data-dismiss='modal'>"+MessageHelper.messages["MSC_GO_TO_CART"]+"</button></a>";
			msgContent = msgContent + "<a onclick='JavaScript:MessageHelper.hideMessageArea();toggleMiniShopCartDropDownBefore();return false;'><button id='doNotRemove-button' tabindex = '1' type='button' class='btn btn-primary btn-black btn-xs-block' data-dismiss='modal'>"+MessageHelper.messages["CONTINUE_SHOPPING"]+"</button></a>";
			MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPCART_ADDED"],0,msgContent);
			cursor_clear();
			if(categoryDisplayJS){
				
				var attributes = document.getElementsByName("attrValue");
			
				var singleSKU = true;
				
				for(var i=0; i<attributes.length; i++){
					if (attributes[i].options.length > 1)
					{
						singleSKU = false;
					}
				}
				
				if (!singleSKU)
				{
					categoryDisplayJS.selectedAttributes = [];
					for(var i=0; i<attributes.length; i++){
						if(attributes[i] != null){
							attributes[i].value = "";
						}
					}
				}
			}
			if(typeof(ShipmodeSelectionExtJS)!= null && typeof(ShipmodeSelectionExtJS)!='undefined'){
				ShipmodeSelectionExtJS.setOrderItemId(serviceResponse.orderItemId[0]);
			}
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
			 	if(serviceResponse.errorMessageKey == "_ERR_NO_ELIGIBLE_TRADING"){
			 		MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_CONTRACT_EXPIRED_GOTO_ORDER"]);
 				} else if (serviceResponse.errorMessageKey == "_ERR_RETRIEVE_PRICE") {
 					MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_RETRIEVE_PRICE"]);
 				} else {
 					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
 				}
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 * Email the Product in Ajax mode. A message is displayed after
	 * the service call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxEmailProduct",
		actionId: "AjaxEmailProduct",
		url: getAbsoluteURL() + "AjaxEmailProductService",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["PRODUCT_EMAIL_SENT"]);
			cursor_clear();			
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(MessageHelper.messages["PRODUCT_EMAIL_SENT_ERROR"]);
 			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 *  This service validate a default shipping address of registered user. If address is not valid it will redirect the flow to edit address.
	 *  If address is valid then it will redirect to shipping method page.
	 *  @constructor
	 *  Nalini
	 */
	wc.service.declare({
		id: "UpdateXOrderItemsExt",
		actionId: "UpdateXOrderItemsExt",
		url: "AjaxRegisteredUserShipAddValidateService",
		formId: ""

	/**
	 *  redirects to the Shipping and Billing Method page.
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation.
	 */
		,successHandler: function(serviceResponse) {
		//alert("success UpdateXOrderItemsExt");
		
		if(serviceResponse.redirectPg == "cartPg"){
			//alert("success UpdateXOrderItemsExt  IF"+serviceResponse.cartURL);
			document.location.href=serviceResponse.cartURL;
		}
			
		
		}

		,failureHandler: function(serviceResponse) {
			//alert("fail UpdateXOrderItemsExt");
			
		}

	}),
   /**
   * Add an item to a shopping cart in non-Ajax mode. Upon a successful request,
   * the shopping cart page is loaded. An error message is displayed otherwise.
   * @constructor
   */
	wc.service.declare({
		id: "AjaxAddOrderItem_shopCart",
		actionId: "AjaxAddOrderItem",
		url: "AjaxOrderChangeServiceItemAdd",
		formId: ""

     /**
     * redirects to the shopping cart page
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			//Now delete from cart..
			document.location.href = "AjaxOrderItemDisplayView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId;
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
			 	if(serviceResponse.errorMessageKey == "_ERR_NO_ELIGIBLE_TRADING"){
			 		MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_CONTRACT_EXPIRED_GOTO_ORDER"]);
			 	} else if (serviceResponse.errorMessageKey == "_ERR_RETRIEVE_PRICE") {
 					MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_RETRIEVE_PRICE"]);
 				} else {				
 					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
 				}
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * Remove an item from shopping cart. A message is displayed after the service
	 * call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxDeleteOrderItem",
		actionId: "AjaxDeleteOrderItem",
		url: "webapp/wcs/stores/servlet/AjaxOrderChangeServiceItemDelete",
		formId: ""
    /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPCART_REMOVEITEM"]);
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	
	/**
	 * Removes an item from shopping cart on the shipping & billing page. A message is displayed after the service call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxDeleteOrderItemForShippingBillingPage",
		actionId: "AjaxDeleteOrderItemForShippingBillingPage",
		url: getAbsoluteURL() + "AjaxOrderChangeServiceItemDelete",
		formId: ""
		
		/**
		 * display a success message
		 * @param (object) serviceResponse The service response object, which is the
		 * JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPCART_REMOVEITEM"]);
		}
		
		/**
		 * display an error message
		 * @param (object) serviceResponse The service response object, which is the
		 * JSON object returned by the service invocation
		 */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}
	}),
	

	/**
	 * Remove an item from shopping cart. A message is only displayed if the service
	 * call returns an error Message. It is used to remove an item from the shopping
	 * cart and add the same item to the wish list.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxDeleteOrderItemFromCart",
		actionId: "AjaxDeleteOrderItem",
		url: "webapp/wcs/stores/servlet/AjaxOrderChangeServiceItemDelete",
		formId: ""
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	    
	}),
	/**
	 *  This service validate a default shipping address of registered user. If address is not valid it will redirect the flow to edit address.
	 *  If address is valid then it will redirect to shipping method page.
	 *  @constructor
	 *  Nalini
	 */
	wc.service.declare({
		id: "UpdateXOrderItemsExt",
		actionId: "UpdateXOrderItemsExt",
		url: "AjaxRegisteredUserShipAddValidateService",
		formId: ""

	/**
	 *  redirects to the Shipping and Billing Method page.
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation.
	 */
		,successHandler: function(serviceResponse) {
		//alert("success UpdateXOrderItemsExt");
		
		if(serviceResponse.redirectPg == "cartPg"){
		//	alert("success UpdateXOrderItemsExt  IF"+serviceResponse.cartURL);
			document.location.href=serviceResponse.cartURL;
		}
			
		
		}

		,failureHandler: function(serviceResponse) {
			//alert("fail UpdateXOrderItemsExt");
			
		}

	}),

	/**
	 * Remove an item from shopping cart. 
	 * Upon a successful request, this function will load the AjaxOrderItemDisplayView page or the OrderShippingBillingView page depending on what page the service was invoked from. 
	 * An error message will be displayed otherwise.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxDeleteOrderItem1",
		actionId: "AjaxDeleteOrderItem",
		url: "webapp/wcs/stores/servlet/AjaxOrderChangeServiceItemDelete",
		formId: ""

    /**
     *redirect to the Shopping Cart Page
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPCART_REMOVEITEM"]);
			if (!CheckoutHelperJS.pendingOrderDetailsPage)
			{
				setDeleteCartCookie();
				if(CheckoutHelperJS.shoppingCartPage){
					
					document.location.href = "AjaxOrderItemDisplayView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId;
				}else{
					document.location.href = "OrderShippingBillingView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId + "&orderId=" + serviceResponse.orderId;
				}
			}
			else
			{
				cursor_clear();
			}
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	wc.service.declare({
		id: "AjaxSendCartMail",
		actionId: "AjaxSendCartMail",
		url: getAbsoluteURL() + "AjaxSendCartMail",
		formId: ""

    /**
     *redirect to the Shopping Cart Page
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
       
        MessageHelper.displayStatusMessage(MessageHelper.messages["PRODUCT_EMAIL_SENT"]);
		//document.location.href = "AjaxOrderItemDisplayView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId;
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * This service updates an order item in the shopping cart.
	 * A message is displayed after the service call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxUpdateOrderItem",
		actionId: "AjaxUpdateOrderItem",
		url: "AjaxOrderChangeServiceItemUpdate",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			//MessageHelper.hideAndClearMessage();
			//MessageHelper.hideFormErrorHandle();
			//cursor_clear();
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				if (serviceResponse.errorMessageKey == "_ERR_RETRIEVE_PRICE") {
 					MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_RETRIEVE_PRICE_QTY_UPDATE"]);
				}
				else{
					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				}
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * Updates an order item in the shopping cart. 
	 * Upon a successful request, this function will load the AjaxOrderItemDisplayView page  
	 * An error message will be displayed otherwise.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxUpdateOrderItem1",
		actionId: "AjaxUpdateOrderItem",
		url: getAbsoluteURL() + "AjaxOrderChangeServiceItemUpdate",
		formId: ""
	/**
     *redirect to the Shopping Cart Page
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			if (!CheckoutHelperJS.pendingOrderDetailsPage)
			{
				if(CheckoutHelperJS.shoppingCartPage){	
					document.location.href = "AjaxOrderItemDisplayView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId;
				}
			}
			else
			{
				cursor_clear();
			}
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				if (serviceResponse.errorMessageKey == "_ERR_RETRIEVE_PRICE") {
 					MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_RETRIEVE_PRICE_QTY_UPDATE"]);
				}
				else{
					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				}
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * This service updates shipping information (shipping mode, shipping address)
	 * for a shopping cart. A message is displayed after the service call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxUpdateOrderShippingInfo",
		actionId: "AjaxUpdateOrderShippingInfo",
		url: getAbsoluteURL() + "AjaxOrderChangeServiceShipInfoUpdate",
		formId: ""
    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			cursor_clear();
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * This service prepares an order for submission. Upon success, it submits the order.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxPrepareOrderForSubmit",
		actionId: "AjaxPrepareOrderForSubmit",
		url: getAbsoluteURL() + "AjaxOrderProcessServiceOrderPrepare",
		formId: ""

    /**
     * On success, checkout the order by calling order submit.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			CheckoutHelperJS.setOrderPrepared("true");
			CheckoutHelperJS.checkoutOrder(CheckoutHelperJS.getSavedParameter('tempOrderId'),CheckoutHelperJS.getSavedParameter('tempUserType'),CheckoutHelperJS.getSavedParameter('tempEmailAddresses'),CheckoutHelperJS.getSavedParameter('tempIsQuote'));
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),


	/**
	 * This service submits the order. Upon success, the order billing confirmation
	 * page is shown. A error message is displayed otherwise.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxSubmitOrder",
		actionId: "AjaxSubmitOrder",
		url: "AjaxOrderProcessServiceOrderSubmit",
		formId: ""

    /**
     *redirect to the Order Confirmation page
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			nullCartTotalCookie(serviceResponse.orderId);
			var shipmentTypeId = CheckoutHelperJS.getShipmentTypeId();
			document.location.href = "OrderShippingBillingConfirmationView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId + "&orderId=" + serviceResponse.orderId + "&shipmentTypeId=" + shipmentTypeId;
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			//redirecting to Shipping adddress in case of Session Timeout
		    if (serviceResponse.errorMessageKey == "_ERR_DIDNT_SET_SESSION") {			
			   var order = serviceResponse.errorMessageParam[1]; 
			   document.location.href="OrderShippingBillingView?orderId="+order+"&langId="+ServicesDeclarationJS.langId+"&storeId="+ServicesDeclarationJS.storeId+"&catalogId="+ServicesDeclarationJS.catalogId+"&shipmentType=single&orderPrepare=true&sourcing=true&unregisteredCheckoutEdit=yes&error=true&_code="+serviceResponse.errorMessageParam[0];
		    }
		    else if(serviceResponse.errorMessageKey == "_ERR_ORDER_UNLOCKED"){
		    	document.location.href="OrderCalculate?calculationUsageId=-1&updatePrices=1&catalogId="+ServicesDeclarationJS.catalogId+"&errorViewName=AjaxOrderItemDisplayView&orderId=.&langId="+ServicesDeclarationJS.langId+"&storeId="+ServicesDeclarationJS.storeId+"&URL=AjaxCheckoutDisplayView&errorMessage="+MessageHelper.messages['CART_REVISIT_MSG'];
		    }else if(serviceResponse.errorMessageKey == "CYBERSOURCE_PLUGIN_BACKEND_PAYMENT_ERROR"){
		    	//MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
		    	document.location.href="PHBillingInformationViewCyberSource?orderId="+order+"&langId="+ServicesDeclarationJS.langId+"&storeId="+ServicesDeclarationJS.storeId+"&catalogId="+ServicesDeclarationJS.catalogId+"&error_code="+serviceResponse.errorMessageKey;
		    }
		    else{
				if (serviceResponse.errorMessage) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				} 
				else {
					 if (serviceResponse.errorMessageKey) {
						MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
					 }
				}
			}
			cursor_clear();
			$("#loader").fadeOut("slow");
		}

	}),

	/**
	 * This service submits the quote. Upon success, the quote  confirmation
	 * page is shown. A error message is displayed otherwise.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxSubmitQuote",
		actionId: "AjaxSubmitQuote",
		url: getAbsoluteURL() + "AjaxSubmitQuote",
		formId: ""

   /**
    *redirect to the Quote Confirmation page
    * @param (object) serviceResponse The service response object, which is the
    * JSON object returned by the service invocation
    */
		,successHandler: function(serviceResponse) {
			var redirectURL = "OrderShippingBillingConfirmationView?storeId=" + ServicesDeclarationJS.storeId 
			+ "&catalogId=" + ServicesDeclarationJS.catalogId 
			+ "&langId=" + ServicesDeclarationJS.langId 
			+ "&orderId=" + CheckoutHelperJS.getOrderId() 
			+ "&shipmentTypeId=" + CheckoutHelperJS.getShipmentTypeId()
			+ "&isQuote=true"
			+ "&quoteId=" + serviceResponse.outOrderId// outOrderId is the id of the new quote created.
			
			if(serviceResponse.outExternalQuoteId != undefined && serviceResponse.outExternalQuoteId != null){
				redirectURL += redirectURL + "&externalQuoteId=" + serviceResponse.outExternalQuoteId; 
			}
			document.location.href = redirectURL;
		}

   /**
    * display an error message
    * @param (object) serviceResponse The service response object, which is the
    * JSON object returned by the service invocation
    */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
		    		MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
		    }else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
		    	}
			cursor_clear();
		}

	}),

	/**
	 * This service adds an address for the person. An error message is displayed
	 * if the service failed.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxAddAddressForPerson",
		actionId: "AjaxAddAddressForPerson",
		url: getAbsoluteURL() + "AjaxPersonChangeServiceAddressAdd",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			AddressHelper.updateOrderAfterAddressUpdate();
			MessageHelper.hideAndClearMessage();
			cursor_clear();
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 *  This service validate a default shipping address of registered user. If address is not valid it will redirect the flow to edit address.
	 *  If address is valid then it will redirect to shipping method page.
	 *  @constructor
	 *  Nalini
	 */
	wc.service.declare({
		id: "UpdateXOrderItemsExt",
		actionId: "UpdateXOrderItemsExt",
		url: "AjaxRegisteredUserShipAddValidateService",
		formId: ""

	/**
	 *  redirects to the Shipping and Billing Method page.
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation.
	 */
		,successHandler: function(serviceResponse) {
		//alert("success UpdateXOrderItemsExt");
		
		if(serviceResponse.redirectPg == "cartPg"){
			//alert("success UpdateXOrderItemsExt  IF"+serviceResponse.cartURL);
			document.location.href=serviceResponse.cartURL;
		}
			
		
		}

		,failureHandler: function(serviceResponse) {
			//alert("fail UpdateXOrderItemsExt");
			
		}

	}),

	/**
	 * This service adds an address for the person. An error message is displayed
	 * if the service failed.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxUpdateAddressForPerson",
		actionId: "AjaxUpdateAddressForPerson",
		url: getAbsoluteURL() + "AjaxPersonChangeServiceAddressUpdate",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			AddressHelper.updateOrderAfterAddressUpdate();
			MessageHelper.hideAndClearMessage();
			cursor_clear();
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * This service calls AjaxOrderChangeServiceItemUpdate to update order total after shipping address is updated in the order.
	 */
	wc.service.declare({
		id: "AjaxUpdateOrderAfterAddressUpdate",
		actionId: "AjaxUpdateOrderAfterAddressUpdate",
		url: "AjaxOrderChangeServiceItemUpdate",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			cursor_clear();
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 * This service adds an item to the wishlist. This is different from
	 * AjaxInterestItemAddAndDeleteFromCart in that this function does not remove
	 * the item from the shopping cart. It is used mainly in catalog browsing.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxInterestItemAdd",
		actionId: "AjaxInterestItemAdd",
		url: getAbsoluteURL() + "AjaxInterestItemAdd",
		formId: ""
    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			cursor_clear();
			MessageHelper.displayStatusMessage(MessageHelper.messages["WISHLIST_ADDED"]);
			if(categoryDisplayJS)
			categoryDisplayJS.selectedAttributes = [];
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * This service adds an item to the wishlist in non-Ajax mode. Upon success,
	 * the shopping cart page is displayed. This is different from
	 * AjaxInterestItemAddAndDeleteFromCart in that this function does not remove
	 * the item from the shopping cart. It is used mainly in catalog browsing.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxInterestItemAdd_shopCart",
		actionId: "AjaxInterestItemAdd",
		url: getAbsoluteURL() + "AjaxInterestItemAdd",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			document.location.href = "AjaxOrderItemDisplayView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId;
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

  /**
   * This service deletes an item from the wish list. An error message will be
   * displayed if the service call failed. 
   */
	wc.service.declare({
		id: "AjaxInterestItemDelete",
		actionId: "AjaxInterestItemDelete",
		url: getAbsoluteURL() + "AjaxInterestItemDelete",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * This service sends the wish list to a specified email address.
	 */
	wc.service.declare({
		id: "AjaxInterestItemListMessage",
		actionId: "AjaxInterestItemListMessage",
		url: getAbsoluteURL() + "AjaxInterestItemListMessage",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * This service applies the promotion code to the order(s).
	 */
	wc.service.declare({
		id: "AjaxPromotionCodeManage",
		actionId: "AjaxPromotionCodeManage",
		url: getAbsoluteURL() + "AjaxPromotionCodeManage",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();

			var params = [];
			
			params.storeId		= this.storeId;
			params.catalogId	= this.catalogId;
			params.langId		= this.langId;
			
			params.orderId = ".";
			if(CheckoutHelperJS.shoppingCartPage){	
				params.calculationUsage = "-1,-2,-5,-6,-7";
			}else{
				params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
			}
			
			wc.service.invoke("AjaxUpdateOrderItem",params);
			
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

  /**
   * This services adds or removes a coupon from the order(s).
   */
	wc.service.declare({
		id: "AjaxCouponsAddRemove",
		actionId: "AjaxCouponsAddRemove",
		url: getAbsoluteURL() + "AjaxCouponsAddRemove",
		formId: ""

    /**
     * Hides all the messages and the progress bar. It will then called the
     * AjaxOrderChangeServiceItemUpdate service
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
      */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			
			var params = [];
			
			params.storeId		= this.storeId;
			params.catalogId	= this.catalogId;
			params.langId		= this.langId;
			
			params.orderId = serviceResponse.orderId;
			if(CheckoutHelperJS.shoppingCartPage){	
				params.calculationUsage = "-1,-2,-5,-6,-7";
			}else{
				params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
			}
			
			wc.service.invoke("AjaxUpdateOrderItem",params);

		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),

	/**
	 * This service adds a billing address to the order(s).
	 */
	wc.service.declare({
		id: "AddBillingAddress",
		actionId: "AddBillingAddress",
		url: getAbsoluteURL() + "AjaxPersonChangeServiceAddressAdd",
		formId: ""

    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
/**
 * This service schedules an order based on the input order date and order interval parameters. 
 */
wc.service.declare({
	id: "ScheduleOrder",
	actionId: "ScheduleOrder",
	url: getAbsoluteURL() + "AjaxOrderProcessServiceOrderSchedule",
	formId: ""

	/**
	 * Hides all the messages and the progress bar.
	 * Constructs a URL that deletes the current order and forward to the order confirmation page.
	 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
	 */
	,successHandler: function(serviceResponse) {
		MessageHelper.hideAndClearMessage();
		var originalOrderId = document.getElementById("orderIdToSchedule").value;
		var newOrderId = serviceResponse.orderId;
		nullCartTotalCookie(serviceResponse.orderId);
		var shipmentTypeId = CheckoutHelperJS.getShipmentTypeId();
		var purchaseOrderNumber = "";
		if(document.forms["purchaseOrderNumberInfo"].purchase_order_number.value != null){
			purchaseOrderNumber = document.forms["purchaseOrderNumberInfo"].purchase_order_number.value;
		}
		var url = "OrderProcessServiceOrderCancel?orderId=" + originalOrderId + "&storeId="  + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId + "&URL=OrderShippingBillingConfirmationView%3ForderId%3D" + newOrderId + "%26originalOrderId%3D" + originalOrderId + "%26shipmentTypeId%3D" + shipmentTypeId + "%26purchaseOrderNumber%3D" + purchaseOrderNumber;
		document.location.href = url;
	}
	
	/**
	 * Displays an error message if the the service call failed.
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation
	 */
	,failureHandler: function(serviceResponse) {
		if (serviceResponse.errorMessage) {
			MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
		} else {
			 if (serviceResponse.errorMessageKey) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
			 }
		}
		cursor_clear();
	}
}), 

/**
 * This service schedules an order based on the input order date and order interval parameters. 
 */
wc.service.declare({
	id: "SubmitRecurringOrder",
	actionId: "SubmitRecurringOrder",
	url: getAbsoluteURL() + "AjaxOrderProcessServiceRecurringOrderSubmit",
	formId: ""

	/**
	 * Hides all the messages and the progress bar.
	 * Constructs a URL that deletes the current order and forward to the order confirmation page.
	 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
	 */
	,successHandler: function(serviceResponse) {
		MessageHelper.hideAndClearMessage();
		nullCartTotalCookie(serviceResponse.orderId);
		var shipmentTypeId = CheckoutHelperJS.getShipmentTypeId();
		var url = "OrderShippingBillingConfirmationView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId + "&orderId=" + serviceResponse.orderId + "&shipmentTypeId=" + shipmentTypeId;
		document.location.href = url;
		cursor_clear();
	}
	
	/**
	 * Displays an error message if the the service call failed.
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation
	 */
	,failureHandler: function(serviceResponse) {
		if (serviceResponse.errorMessage) {
			MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
		} else {
			 if (serviceResponse.errorMessageKey) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
			 }
		}
		cursor_clear();
	}
}), 

/**
 * This service updates the free gift choices made by the shopper for the
 * promotion.
 */
wc.service.declare({
	id: "AjaxUpdateRewardOption",
	actionId: "AjaxUpdateRewardOption",
	url: getAbsoluteURL() + "AjaxOrderChangeServiceRewardOptionUpdate",
	formId: ""

/**
 * Hides all the messages and the progress bar.
 * @param (object) serviceResponse The service response object, which is the
 * JSON object returned by the service invocation
 */
	,successHandler: function(serviceResponse) {
		MessageHelper.hideAndClearMessage();
		cursor_clear();
		
	}
 /**
 * Display an error message.
 * @param (object) serviceResponse The service response object, which is the
 * JSON object returned by the service invocation
 */
	,failureHandler: function(serviceResponse) {

		if (serviceResponse.errorMessage) {
			MessageHelper.displayErrorMessage(serviceResponse.errorMessage);				
		} 
		else {
			 if (serviceResponse.errorMessageKey) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);					
			 }
		}
		cursor_clear();
	}

}),

	/**
	 * Create a new saved order.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxOrderCreate",
		actionId: "AjaxOrderCreate",
		url: getAbsoluteURL() + "AjaxOrderCreate",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["ORDER_CREATED"]);
			
			cursor_clear();
			
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
    	
			if (serviceResponse.errorMessage) {
			
				 if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_CREATED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}
	}),
	
	/**
	 * Cancel a single saved order.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxSingleOrderCancel",
		actionId: "AjaxSingleOrderCancel",
		url: getAbsoluteURL() + "AjaxOrderProcessServiceOrderCancel",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["ORDERS_CANCELLED"]);
			cursor_clear();
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				 if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_CANCELLED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}
	}),
	
	/**
	 * Cancel a saved order. This service is used to delete multiple saved orders one at a time.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxOrderCancel",
		actionId: "AjaxOrderCancel",
		url: getAbsoluteURL() + "AjaxOrderProcessServiceOrderCancel",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			// Call again to delete any other orders in the list.
			savedOrdersJS.cancelSavedOrder(false);
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				 if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_CANCELLED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}
	}),
	
	/**
	 * Update the description of a single saved order. This service is used to update the description of a saved order.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxSingleOrderSave",
		actionId: "AjaxSingleOrderSave",
		url: getAbsoluteURL() + "AjaxOrderCopy",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			if (savedOrdersJS.isOrderDetailsPageValue)
			{
				MessageHelper.displayStatusMessage(MessageHelper.messages["PENDING_ORDER_SAVED"]);
				
			}
			else
			{
				MessageHelper.displayStatusMessage(MessageHelper.messages["ORDERS_SAVED"]);
				
			}
			
			var inputElement = document.getElementById('OrderDescription_input');
        	if (inputElement != null && inputElement != 'undefined')
        	{
        		dojo.removeClass(inputElement, 'savedOrderDetailsInputBorderWarning'); 
        		dojo.addClass(inputElement, 'savedOrderDetailsInputBorder');
        		document.getElementById('OldOrderDescription').value = inputElement.value;
        	}
			cursor_clear();
			
			///If the rest of the non-ajax pending order details page needs to be updated to it here.
			if (savedOrdersJS.updateCartRequired)
			{
				savedOrdersJS.updateCartRequired = false;
				CheckoutHelperJS.updateShoppingCart(document.ShopCartForm);
			}
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				
				 if (serviceResponse.errorCode == "CMN0409E" || serviceResponse.errorCode == "CMN1024E")
				 {
					 if (serviceResponse.errorCode == "CMN1024E" && serviceResponse.systemMessage != "")
					 {
						 MessageHelper.displayErrorMessage(serviceResponse.systemMessage);
					 }
					 else
					 {
						 if (savedOrdersJS.isOrderDetailsPageValue)
						{
							MessageHelper.displayStatusMessage(MessageHelper.messages["PENDING_ORDER_NOT_SAVED"]);
							
						}
						else
						{
							MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_SAVED"]);
							
						}  
					 }
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}
	}),
	
	/**
	 * Update the description of a saved order. This service is used to update the description of multiple saved orders one at a time.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxOrderSave",
		actionId: "AjaxOrderSave",
		url: getAbsoluteURL() + "AjaxOrderCopy",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			// Call again to delete any other orders in the list.
			savedOrdersJS.saveOrder(false);
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				 if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_SAVED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}
	}),
	
	/**
	 * Set the current order to be that of a saved order.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxSetPendingOrder",
		actionId: "AjaxSetPendingOrder",
		url: getAbsoluteURL() + "AjaxSetPendingOrder",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
			
			MessageHelper.hideAndClearMessage();
			
			MessageHelper.displayStatusMessage(MessageHelper.messages["ORDER_SET_CURRENT"]);
			
			savedOrdersJS.determinePageForward("AjaxSetPendingOrder");
			
			cursor_clear();
			
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				 if (serviceResponse.errorCode == "CMN0409E" || serviceResponse.errorCode == "CMN1024E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_SET_CURRENT"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	
	/**
	 * Updates the current pending order setting it to the current shopping cart.
	 * This service does not cause a refresh of the ListOrdersDisplay_Controller registered widgets.
	 * The main function of this service is to keep the cpendorder database table in line with the current shopping cart.
	 * Perform the service or command call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxUpdatePendingOrder",
		actionId: "AjaxUpdatePendingOrder",
		url: getAbsoluteURL() + "AjaxSetPendingOrder",
		formId: ""

     /**
     * There is nothing to do in the event of a success of this service since it is executed in the background.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
			
			savedOrdersJS.determinePageForward("AjaxUpdatePendingOrder");
			cursor_clear();
			
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_SET_CURRENT"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 * Copy a saved order.
	 * Perform the service or command call. 
	 */
	wc.service.declare({
		id: "AjaxSingleOrderCopy",
		actionId: "AjaxSingleOrderCopy",
		url: getAbsoluteURL() + "AjaxOrderCopy",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {

		var params = [];
		
		params.storeId		= this.storeId;
		params.catalogId	= this.catalogId;
		params.langId		= this.langId;
		params.URL="";
		params.updatePrices = "1";
		
		params.orderId = serviceResponse.orderId;
		params.calculationUsageId = "-1";
		
		wc.service.invoke("AjaxSingleOrderCalculate", params);
			MessageHelper.hideAndClearMessage();
			
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				 if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_COPIED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 * Copy a saved order.
	 * Perform the service or command call. 
	 */
	wc.service.declare({
		id: "AjaxOrderCopy",
		actionId: "AjaxOrderCopy",
		url: getAbsoluteURL() + "AjaxOrderCopy",
		formId: ""

    /**
    * display a success message
    * @param (object) serviceResponse The service response object, which is the
    * JSON object returned by the service invocation
    */

		,successHandler: function(serviceResponse) {

		var params = [];
		
		params.storeId		= this.storeId;
		params.catalogId	= this.catalogId;
		params.langId		= this.langId;
		params.URL="";
		params.updatePrices = "1";
		
		params.orderId = serviceResponse.orderId;
		params.calculationUsageId = "-1";
		
		wc.service.invoke("AjaxOrderCalculate", params);
			MessageHelper.hideAndClearMessage();
			
		}
	
    /**
    * display an error message
    * @param (object) serviceResponse The service response object, which is the
    * JSON object returned by the service invocation
    */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				 if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_COPIED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 * Perform the order calculation operations to compute the contract prices for the order items in an order.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxSingleOrderCalculate",
		actionId: "AjaxSingleOrderCalculate",
		url: getAbsoluteURL() + "AjaxOrderCalculate",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
			
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["ORDER_COPIED"]);
			cursor_clear();
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_COPIED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 * Perform the order calculation operations to compute the contract prices for the order items in an order.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxCurrentOrderCalculate",
		actionId: "AjaxCurrentOrderCalculate",
		url: getAbsoluteURL() + "AjaxOrderCalculate",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
			
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["ORDER_SET_CURRENT"]);
			cursor_clear();
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_COPIED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 * On SearchAndDisplayDistributors.jspf after Country dropdown selection - Distributor Result display
	 * For Distributor Fulfillment By Hcl
	 */
	wc.service.declare({
		  id: "AjaxDisplaySelectedDistributor",
		  actionId: "AjaxDisplaySelectedDistributor",
		  url: getAbsoluteURL() + "AjaxDisplaySelectedDistributor",
		  formId: "",

		successHandler: function(serviceResponse) {
		 var distributorList = serviceResponse.distributorList;
		 var listSize = serviceResponse.distributorListSize;
		 var alphabetList = serviceResponse.alphabeticalList;
		 var langId = serviceResponse.langId;
		 var storeId = serviceResponse.storeId;
		 DistListSizestr="";
		
		 document.getElementById("backfullList").style.visibility = "hidden";		 	
		 $("#ShowMoreDiv").hide();
		 if(listSize > 40){
			 document.getElementById("sortedDistListMain").innerHTML = "";
			 $('#SearchBoxDiv').show();
			 $('#SearchBoxButton').show();
			 $('#btn-wrapper').show();
			 document.getElementById("backToTop").style.visibility = "visible";
			  
			 var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
			 for(var k = 0; k < alphabets.length; k++){				
				 $("#sortButton"+ alphabets[k]).addClass('disableLetter');
			 }
			
			 for(var j = 0; j < alphabetList.length; j++){
				 
				 var divBox = document.createElement('div');
				 var divBoxName = "sortDiv" + alphabetList[j];
				 divBox.id  =divBoxName;				 
				 divBox.className = 'view-more1 col-xs-12 col-sm-3 col-lg-2';
				 
				 document.getElementById("sortedDistListMain").appendChild(divBox);
				 
				 var spanBox = document.createElement('span');
				 var spanBoxName = "sort" + alphabetList[j];
				 spanBox.id  = spanBoxName; 
				 spanBox.className = 'letter-label-expanded';
				 document.getElementById(divBoxName).appendChild(spanBox);
				 
				 $("#"+spanBoxName).append(alphabetList[j]);
				 
				 var distList = document.createElement('ul');
				 var distListName = "sortedDistList" + alphabetList[j];				
				 distList.id = distListName;
				 distList.className = 'list-unstyled dist-list-color';
			
				 document.getElementById(divBoxName).appendChild(distList); 
				  var flag = false;
				  var k = 0;
				   for(var i = 0; i < listSize; i++)
				   {	
                      distributorList[i] = distributorList[i].replace('&amp;','&');					 
					  var distributorName = escape(distributorList[i]);					  
					  
					  var res = distributorList[i].charAt(0); 
					  if(res == alphabetList[j]){
					    var li = $('<li/>')		                 		        
			                    .appendTo(document.getElementById(distListName));
					
					    var anchor = $('<a/>')		        
			                   .text(distributorList[i])
			                   .appendTo(li)
			                   .attr("href","DivisionAndDistributorInfo?participant="+distributorName);
					    		
					    flag = true;
					    k++;
				      }				     
			       }
				   $("#sortButton"+alphabetList[j]).removeClass('disableLetter');
				   
				   if(flag == true && k > 5){

					   //This code is added  for viewmore functionality By HCL

					   DistListSizestr+=alphabetList[j]+"="+k+",";	
					   var viewmorediv = document.createElement('div'); 
					   var viewmoredivName = "viewmore" + alphabetList[j];
					   viewmorediv.id=viewmoredivName;
					   var showlessdiv = document.createElement('div');
					   var showlessdivName = "viewless" + alphabetList[j];
					   showlessdiv.id=showlessdivName;
					   document.getElementById(divBoxName).appendChild(viewmorediv); 
					   document.getElementById(divBoxName).appendChild(showlessdiv);
					   $("#"+viewmoredivName).text("+ View More").css('color', 'blue');
					   $("#"+showlessdivName).text("- View Less").css('color', 'blue');

					   var ulname="#"+distListName;
					   $(ulname+' li').not(':lt('+5+')').hide();
					   $("#"+showlessdivName).hide();

					   $("#"+viewmoredivName).click(function () {
						   
						   var id = $(this).attr('id');
						   var ulnamedyanamic ="#sortedDistList"+id.slice(-1);//last char of Id appended to the ulname
						   var showviewwmore ="viewmore"+id.slice(-1);
						   var showless ="viewless"+id.slice(-1);
						   var size = DistListSizestr.charAt(DistListSizestr.indexOf(id.slice(-1))+2);
						   if(DistListSizestr.charAt(DistListSizestr.indexOf(id.slice(-1))+3) != ','){
							   size += DistListSizestr.charAt(DistListSizestr.indexOf(id.slice(-1))+3);
						   }
						   if(size >1){	  
							   $(ulnamedyanamic+' li:lt('+size+')').show();
							   $("#"+showviewwmore).hide();
							   $("#"+showless).show();
							   
							   var viewMoreDiv = "sortDiv" +id.slice(-1);
						           $("#"+viewMoreDiv).removeClass('view-more1');
						   }

						   // Code to set dynamic height of distributor div.
						   if($("#"+id).parent().height() > $( ".view-more1" ).first().height()){
							   $(".view-more1").height($("#"+id).parent().height() -.5);
						   }
					   });
					   $('#'+showlessdivName).click(function () {
						   var id = $(this).attr('id');
						   var ulnamedyanamic="#sortedDistList"+id.slice(-1);

						   var showviewwmore="viewmore"+id.slice(-1);
						   var showless="viewless"+id.slice(-1);

						   $(ulnamedyanamic+' li').not(':lt('+5+')').hide();
						   $("#"+showless).hide();
						   $("#"+showviewwmore).show();	

						   var viewMoreDiv = "sortDiv" +id.slice(-1);
						   $("#"+viewMoreDiv).addClass('view-more1');
						   
						   // Code to remove manual style set in above onclick function.
						   $(".view-more1").removeAttr("style");
					   }); 

					   //End viewmore by HCL            	
				   }
			  }			
		 }else {			 
			 document.getElementById("sortedDistListMain").innerHTML = "";
			 $('#SearchBoxDiv').hide();
			 $('#SearchBoxButton').hide();
			 $('#btn-wrapper').hide();
			 document.getElementById("backToTop").style.visibility = "hidden";
			 
			 var singleListSize = Math.ceil(listSize/3);

			 for(var j = 0,k = 0; j < 7, k < listSize; j++){
				 
				 var divBox = document.createElement('div');
				 var divBoxName = "sortDiv" + j;
				 divBox.id  =divBoxName;				 
				 divBox.className = 'col-xs-14 col-sm-3 col-margin';
				 
				 document.getElementById("sortedDistListMain").appendChild(divBox);
				 var distList = document.createElement('ul');
				 var distListName = "sortedDistList"+j;				
				 distList.id = distListName;
				 distList.className = 'list-unstyled dist-list-color';
			
				 document.getElementById(divBoxName).appendChild(distList); 
				 for(var i = 0; i < singleListSize; i++)
				 {
				    if(k < listSize){
				       distributorList[k] = distributorList[k].replace('&amp;','&');					   
					   var distributorName = escape(distributorList[k]);
					   
					   var li = $('<li/>')		                 		        
			                    .appendTo(document.getElementById(distListName));						
					   var anchor = $('<a/>')		        
	                               .text(distributorList[k])
	                               .appendTo(li)
	                               .attr("href","DivisionAndDistributorInfo?participant="+distributorName);	
					   k++;
			        }
                 }				  
			 }			 
		 }		     	
		},
		failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			}
			else {
				if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				}
			}
		  } 
		}),
	
	/**
	 * On SearchAndDisplayDistributors.jspf for SearchBox Result display for Distributor Fulfillment
	 * BY HCL
	 */
		wc.service.declare({
			  id: "AjaxDisplaySearchBoxDistributor",
			  actionId: "AjaxDisplaySearchBoxDistributor",
			  url: getAbsoluteURL() + "AjaxDisplaySelectedDistributor",
			  formId: "",

			successHandler: function(serviceResponse) {
			 var distributorList = serviceResponse.distributorList;
			 var listSize = serviceResponse.distributorListSize;
			 var searchBoxString = serviceResponse.searchBoxString;

			 var langId = serviceResponse.langId;
		     var storeId = serviceResponse.storeId;
			 
			 document.getElementById("backfullList").style.visibility = "visible";	
			 if(listSize > 0){
				 document.getElementById("sortedDistListMain").innerHTML = "";
				 $('#btn-wrapper').hide();
				 document.getElementById("backToTop").style.visibility = "hidden";	
				 
					 var divBox = document.createElement('div');
					 var divBoxName = "sortedDiv";
					 divBox.id  = divBoxName;				 
					 divBox.className = 'show-more-height col-xs-12';
					 
					 document.getElementById("sortedDistListMain").appendChild(divBox);
					 	
					 var spanBox = document.createElement('span');
					 var spanBoxName="SpanBox";
					 spanBox.id  = spanBoxName; 
					 document.getElementById(divBoxName).appendChild(spanBox);
					 					 
					 var distList = document.createElement('ul');
					 var distListName = "sortedDistList";				
					 distList.id = distListName;
					 distList.className = 'list-unstyled dist-list-color';
				
					 document.getElementById(divBoxName).appendChild(distList); 
					   for(var i = 0; i < listSize; i++)
					   {	
                            distributorList[i]  = distributorList[i].replace('&amp;','&');								
							var distributorName = escape(distributorList[i]);
						    var li = $('<li/>')		                 		        
				                    .appendTo(document.getElementById(distListName));
						
						    var anchor = $('<a/>')		        
				                   .text(distributorList[i])
				                   .appendTo(li)
						           .attr("href","DivisionAndDistributorInfo?participant="+distributorName);
					      				     
				       }
                       if(listSize > 50){
                    	   divBox.className = 'show-more-height col-xs-12';
                    	   $("#ShowMoreDiv").show();
                    	   $("#"+spanBoxName).append("<b>Showing 1- 50 of "+ listSize  +" results for <em>"+searchBoxString +"</em> .</b>");
                    	   $("#ShowMoreDiv").show();
                       }
                       else{
                    	   divBox.className = 'col-xs-12';
                    	   $("#"+spanBoxName).append("<b>Showing "+ listSize  +" results for "+searchBoxString +" .</b>");
                    	   $("#ShowMoreDiv").hide();
                       }
                        
			 }	
			 else{
				 document.getElementById("sortedDistListMain").innerHTML = "";
				 var divBox = document.createElement('div');
				 var divBoxName = "errorDiv";
				 divBox.id  = divBoxName;				 
				 divBox.className = 'text error-distSearch';
				 
				 document.getElementById("sortedDistListMain").appendChild(divBox);
				 
				 var spanBox = document.createElement('span');
				 var spanBoxName="SpanBox";
				 spanBox.id  = spanBoxName; 
				 document.getElementById(divBoxName).appendChild(spanBox);
				 $("#"+spanBoxName).append("<b>Sorry, no results found for "+searchBoxString+". Please check your spelling and try again.</b>");				 			
			 }			 			      	
			},

			failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			}
			else {
				if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				}
			}
		  } 
		}),
	/**
	 * Perform the order calculation operations to compute the contract prices for the order items in an order.
	 * Perform the service or command call.
	 */
	wc.service.declare({
		id: "AjaxOrderCalculate",
		actionId: "AjaxOrderCalculate",
		url: getAbsoluteURL() + "AjaxOrderCalculate",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
			
			MessageHelper.hideAndClearMessage();
			// Call again to copy any other orders in the list.
			savedOrdersJS.copyOrder(false);
		}
	
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				if (serviceResponse.errorCode == "CMN0409E")
				 {
					 MessageHelper.displayErrorMessage(MessageHelper.messages["ORDER_NOT_COPIED"]);
				 }
				 else
				 {
					 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				 }
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	

	/**
	 * Processes a punchout payment request.
	 */
	wc.service.declare({
		id: "AjaxPunchoutPay",
		actionId: "AjaxPunchoutPay",
		url: "PunchoutPaymentRepay",
		formId: ""
		
		/**
		 * Calls PunchoutJS.handleResponse to render the punchout payment section on the page.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
			PunchoutJS.handleResponse(serviceResponse.orderId);
			MessageHelper.hideAndClearMessage();
			cursor_clear();
		}
		
		/**
		 * Displays an error message on the page if the request failed.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
		 */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} else {
				if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				}
			}
			cursor_clear();
		}
	}),
	
				
			wc.service.declare({
				id: "AjaxSendCartMail",
				actionId: "AjaxSendCartMail",
				url: getAbsoluteURL() + "AjaxSendCartMail",
				formId: ""

		    /**
		     *redirect to the Shopping Cart Page
		     * @param (object) serviceResponse The service response object, which is the
		     * JSON object returned by the service invocation
		     */
				,successHandler: function(serviceResponse) {
		        //alert("Ajax Success");
		        MessageHelper.displayStatusMessage(MessageHelper.messages["PRODUCT_EMAIL_SENT"]);
				//document.location.href = "AjaxOrderItemDisplayView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId;
				}

		    /**
		     * display an error message
		     * @param (object) serviceResponse The service response object, which is the
		     * JSON object returned by the service invocation
		     */
				,failureHandler: function(serviceResponse) {
					if (serviceResponse.errorMessage) {
						MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
					} 
					else {
						 if (serviceResponse.errorMessageKey) {
							MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
						 }
					}
					cursor_clear();
				}

			}),
			
			
			
			
				/**
	 * Subscribes to or unsubscribes from receiving information related to a particular category in the store.
	 */
	wc.service.declare({
		id: "AjaxCategorySubscribe",
		actionId: "AjaxCategorySubscribe",
		url: "AjaxMarketingTriggerProcessServiceEvaluate",
		formId: ""
		
		/**
		 * Clear messages on the page.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["SUBSCRIPTION_UPDATED"]);
		}
		
		/**
		 * Displays an error message on the page if the request failed.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
		 */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} else {
				if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				}
			}
			cursor_clear();
		}
	}),
	/**
     * CAD AJAX call
    */
	
	wc.service.declare({
		id: "AjaxCadDownload",
		actionId: "AjaxCadDownload",
		url: getAbsoluteURL() + "AjaxCadDownload",
		formId: ""
        
		,successHandler: function(serviceResponse) {
  	  
  	var a = document.createElement('a');
    a.innerHTML = serviceResponse.FilePath;
    a.setAttribute('href', serviceResponse.FilePath);
    document.getElementById('CADFILE').innerHTML = '';
    document.getElementById('CADFILE').appendChild(a);
    cursor_clear();
    if(serviceResponse.FilePath)
     {
        a.click();
      }
       
	}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	/**
	 * Email the Product in Ajax mode for Distributor Fullfillment. A message is displayed after
	 * the service call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxEmailProductForDistributorFullfillment",
		actionId: "AjaxEmailProductForDistributorFullfillment",
		url: getAbsoluteURL() + "AjaxProductEmailForDistributorFullfillmentServices",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["PRODUCT_EMAIL_SENT"]);
			cursor_clear();			
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(MessageHelper.messages["PRODUCT_EMAIL_SENT_ERROR"]);
 			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	wc.service.declare({
		id: "AjaxUpdateMyAccountMail",
		actionId: "AjaxUpdateMyAccountMail",
		url: getAbsoluteURL() + "AjaxUpdateMyAccountMail",
		formId: ""

    /**
     *redirect to the Shopping Cart Page
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
         //MessageHelper.displayStatusMessage(MessageHelper.messages["MA_UPDATE_PASSWORD"]);
         document.location.href = "UserRegistrationForm?editRegistration=Y" + "&catalogId=" + ServicesDeclarationJS.catalogId + "&editRegistrationEmail=Y" + "&langId=" + ServicesDeclarationJS.langId + "&storeId=" + ServicesDeclarationJS.storeId + "&isSuccess=email";
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				 document.getElementById('errorMsgToUpdateEmail').innerHTML = serviceResponse.errorMessage;
                 document.getElementById('errorMsgToUpdateEmail').style.display = "block";
                 //MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} else {
				 if (serviceResponse.errorMessageKey) {
					 document.getElementById('errorMsgToUpdateEmail').innerHTML = serviceResponse.errorMessageKey;
                     document.getElementById('errorMsgToUpdateEmail').style.display = "block";
                     //MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),	
	
	wc.service.declare({
		id: "AjaxUpdateMyAccountChallengeQuestion",
		actionId: "AjaxUpdateMyAccountChallengeQuestion",
		url: getAbsoluteURL() + "AjaxUpdateMyAccountChallengeQuestion",
		formId: ""

    /**
     *redirect to the Shopping Cart Page
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
		
        //MessageHelper.displayStatusMessage(MessageHelper.messages["MA_UPDATE_PASSWORD"]);
        document.location.href = "UserRegistrationForm?editRegistration=Y" + "&catalogId=" + ServicesDeclarationJS.catalogId + "&editRegistrationEmail=Y" + "&langId=" + ServicesDeclarationJS.langId + "&storeId=" + ServicesDeclarationJS.storeId + "&isSuccess=QnA";
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),	
	
	wc.service.declare({
		id: "AjaxUpdateMyAccountPassword",
		actionId: "AjaxUpdateMyAccountPassword",
		url: getAbsoluteURL() + "AjaxUpdateMyAccountPassword",
		formId: ""

    /**
     *redirect to the Shopping Cart Page
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
         //MessageHelper.displayStatusMessage(MessageHelper.messages["MA_UPDATE_PASSWORD"]);
         document.location.href = "UserRegistrationForm?editRegistration=Y" + "&catalogId=" + ServicesDeclarationJS.catalogId + "&editRegistrationEmail=Y" + "&langId=" + ServicesDeclarationJS.langId + "&storeId=" + ServicesDeclarationJS.storeId + "&isSuccess=password";
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				 document.getElementById('errorMsgToUpdatePassword').innerHTML = serviceResponse.errorMessage;
                document.getElementById('errorMsgToUpdatePassword').style.display = "block";
                //MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} else {
				 if (serviceResponse.errorMessageKey) {
					 document.getElementById('errorMsgToUpdatePassword').innerHTML = serviceResponse.errorMessageKey;
                    document.getElementById('errorMsgToUpdatePassword').style.display = "block";
                    //MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	/**
     * CAD AJAX call
    */
	
	wc.service.declare({
		id: "AjaxCadDownload",
		actionId: "AjaxCadDownload",
		url: getAbsoluteURL() + "AjaxCadDownload",
		formId: ""
        
		,successHandler: function(serviceResponse) {
  	  
  	var a = document.createElement('a');
    a.innerHTML = serviceResponse.FilePath;
    a.setAttribute('href', serviceResponse.FilePath);
    document.getElementById('CADFILE').innerHTML = '';
    document.getElementById('CADFILE').appendChild(a);
    cursor_clear();
    if(serviceResponse.FilePath)
    {
       a.click();
     }
      
	}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	wc.service.declare({
		id: "AjaxUpdateOptionalInfo",
		actionId: "AjaxUpdateOptionalInfo",
		url: getAbsoluteURL() + "AjaxUpdateOptionalInfo",
		formId: ""

    /**
     *redirect to the Shopping Cart Page
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
         //MessageHelper.displayStatusMessage(MessageHelper.messages["MA_UPDATE_PASSWORD"]);
         document.location.href = "AjaxLogonForm?catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId + "&storeId=" + ServicesDeclarationJS.storeId;
		}

    /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	/** 
	 * Add an item to a Quote cart in Ajax mode. A message is displayed after
	 * the service call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxAddQuoteItem",
		actionId: "AjaxAddQuoteItem",
		url: getAbsoluteURL() + "AjaxQuoteOrderChangeServiceItemAdd",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
                                                
			var msgContent = "<a href='"+$('#GotoQuoteButton1').prop('href')+"' onclick='"+$('#GotoQuoteButton1').attr('onclick').replace(/'/g, '"')+"'><button id='doNotRemove-button' tabindex = '1' type='button' class='btn btn-primary btn-black btn-xs-block margin-10' data-dismiss='modal'>"+MessageHelper.messages["MSC_GO_TO_QUOTECART"]+"</button></a>";
			msgContent = msgContent + "<a onclick='JavaScript:MessageHelper.hideMessageArea();toggleMiniShopCartDropDownBefore();return false;'><button id='doNotRemove-button' tabindex = '1' type='button' class='btn btn-primary btn-black btn-xs-block' data-dismiss='modal'>"+MessageHelper.messages["CONTINUE_SHOPPING"]+"</button></a>";
			MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPQUOTE_ADDED"],0,msgContent);
			cursor_clear();
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {			 	
 					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);				
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}
	}),
	/**
   * Add an item to a shopping cart in non-Ajax mode. Upon a successful request,
   * the shopping cart page is loaded. An error message is displayed otherwise.
   * @constructor
   */
	wc.service.declare({
		id: "AjaxAddQuoteItem_shopCart",
		actionId: "AjaxAddQuoteItem",
		url: getAbsoluteURL() + "AjaxQuoteOrderChangeServiceItemAdd",
		formId: ""

     /**
     * redirects to the shopping cart page
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {						
			document.location.href = "AjaxQuoteItemDisplayView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId;
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {			 					
 					MessageHelper.displayErrorMessage(serviceResponse.errorMessage); 			
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	/** 
	 * call Submit Request form. A message is displayed after
	 * the service call.
	 * @constructor
	 */	
	wc.service.declare( {
				id : "AjaxQuoteRequestForm",
				actionId : "AjaxQuoteRequestForm",
				url : getAbsoluteURL() + "AjaxQuoteRequestForm",
				formId : ""

				,successHandler : function(serviceResponse) {		
					document.location.href = "AjaxQuoteSubmitDisplayView?storeId="+ serviceResponse.storeId
							+ "&catalogId="+ serviceResponse.catalogId+ "&langId="+ serviceResponse.langId
							+ "&orderId="+ serviceResponse.orderId;
					cursor_clear();
				}				
				,failureHandler : function(serviceResponse) {
					if (serviceResponse.errorMessage) {
						MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
					} else {
						if (serviceResponse.errorMessageKey) {
							MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
						}
					}
					cursor_clear();
				}
	}),
	/** 
	 * Deletes Quote cart order item
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxDeleteQuoteCartOrderItem",
		actionId: "AjaxDeleteQuoteCartOrderItem",
		url: getAbsoluteURL() + "AjaxDeleteQuoteCartOrderItem",
		formId: ""

		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			MessageHelper.displayStatusMessage(MessageHelper.messages["SHOPQUOTE_REMOVEITEM"]);
			if (!CheckoutHelperJS.pendingOrderDetailsPage)
			{
				//Need to update this cookie with quote cart cookie
				//setDeleteCartCookie();							
				if(CheckoutHelperJS.quoteCartPage){									
					//document.location.href = "AjaxQuoteItemDisplayView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId;
				}
			}
			else
			{
				cursor_clear();
			}
		}				
		,failureHandler : function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} else {
				if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				}
			}
			cursor_clear();
		}
	}),
	/**
	 * This service updates an order item in the shopping cart.
	 * A message is displayed after the service call.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxUpdateQuoteCartOrderItem",
		actionId: "AjaxUpdateQuoteCartOrderItem",
		url: getAbsoluteURL() + "AjaxUpdateQuoteCartOrderItem",
		formId: ""
			
		,successHandler: function(serviceResponse) {			
			if (!CheckoutHelperJS.pendingOrderDetailsPage)
			{
				if(CheckoutHelperJS.quoteCartPage){						
					document.location.href = "AjaxQuoteItemDisplayView?storeId=" + ServicesDeclarationJS.storeId + "&catalogId=" + ServicesDeclarationJS.catalogId + "&langId=" + ServicesDeclarationJS.langId;
				}
			}
			else
			{
				cursor_clear();
			}
		}
		,failureHandler: function(serviceResponse) {			
			if (serviceResponse.errorMessage) {				
					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);			
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 *  This service validate a shipping address from 3rd party for Quote Functionality.
	 *  @constructor
	 *  Bipin
	 */
	wc.service.declare({
		id: "ValidateShippingAddressForQuote",
		actionId: "ValidateShippingAddressForQuote",
		url: "AjaxValidateShippingAddressForQuoteService",
		formId: ""
	
	/**
	 *  redirects to the Quote Confirmation Page.
	 * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
	 */
		,successHandler: function(serviceResponse) {
            $("#loader").fadeOut("slow");		
			var originalAddress = serviceResponse.originalAddress;
			var isValidAddress = serviceResponse.isValidAddress;
			if(isValidAddress != ''){
				if(isValidAddress == 'invalid'){
						AddressHelper.uploadOptionInformation('RequestQuote');
				}else {
						AddressHelper.showHideDivs(originalAddress,serviceResponse.addressArray);
				}
			}else{
				  AddressHelper.uploadOptionInformation('RequestQuote');
			}
		}
	
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
		    $("#loader").fadeOut("slow");
			AddressHelper.uploadOptionInformation('RequestQuote');
		}

	}),
	
	/**
	 * Generate Transaction UUID and Signature in Ajax mode. A message is displayed after
	 * the service call.
	 * @constructor
	 */
	wc.service.declare({
		id: "GenerateSignatureService",
		actionId: "GenerateSignatureService",
		url: getAbsoluteURL() + "AjaxGenerateSignatureService",
		formId: ""

     /**
     * display a success message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */

		,successHandler: function(serviceResponse) {
			//var form = document.forms['payment_confirmation'];
			//form.signed_date_time.value = serviceResponse.signed_date_time;
			document.getElementById('signed_date_time').value = serviceResponse.signed_date_time;
			document.getElementById('transaction_uuid').value = serviceResponse.transaction_uuid;
			document.getElementById('signature').value = serviceResponse.signature;
			//document.getElementById("startrunning").click(); // Simulates button click
			//document.getElementById('payment_confirmation').target = "myIframe";
			document.forms['payment_confirmation'].submit();
			//document.getElementById("startrunning").click();
		}
     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
				console.log(serviceResponse);
		}

	})
