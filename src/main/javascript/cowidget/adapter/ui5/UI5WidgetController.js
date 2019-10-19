sap.ui.define([ 'sap/ui/core/mvc/Controller', "sap/ui/model/json/JSONModel", 'sap/m/MessageToast', 'sap/m/MessageBox' ], function(
		Controller, JSONModel, MessageToast, MessageBox) {
	'use strict';
	
	return Controller.extend("cowidegit.UI5WidgetController", {
		onInit : function() {
			var that = this;
			console.debug('[UI5WidgetController.onInit] that: ', that);
			
			// set binding model
			var oModel = new JSONModel({
				field01: "Hi, my name is Harry Hawk"
			});
			
			// Assign the model object to the SAPUI5 core
			that.getView().setModel(oModel);

		},

		onTap : function(oEvent) {
			let that = this;
			console.debug('that', that);
		},

		onPress : function(oEvent) {
			// oEvent.preventDefault();

			let that = this;
			console.debug('that', that);
			console.debug('oEvent: ', oEvent);
			
			let xhrReq = function(oView) {
				var oReq = new XMLHttpRequest();
				oReq.addEventListener("load", function() {
					var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
					MessageBox.success(
						"Project 1234567 was created and assigned to team \"ABC\".", {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				});
				oReq.open("GET", "../data/usecase.json");
				oReq.send();
				
				var oModel = new JSONModel({
					field01: "ajax response"
				});
				
				// Assign the model object to the SAPUI5 core
				oView.setModel(oModel);
			}
			
			MessageBox.error(
					"Select a team in the \"Development\" area.\n\"Marketing\" isn't assigned to this area.", {
						//styleClass: bCompact ? "sapUiSizeCompact" : ""
						onClose: function() {
							xhrReq(that.getView());
					    },
					}
				);
			
//			sap.m.MessageBox.alert("This message should appear in the alert", {
//			    title: "Alert",                                      // default
//			    onClose: function() {
//			    	alert('alert');
//			    },
//			    styleClass: "",                                      // default
//			    initialFocus: null,                                  // default
//			    textDirection: sap.ui.core.TextDirection.Inherit     // default
//			});
			// MessageToast.show(oEvent.getSource().getId() + " Pressed");
			// var bCompact =
			// !!this.getView().$().closest(".sapUiSizeCompact").length;
			// MessageBox.error(
			// "Select a team in the \"Development\" area.\n\"Marketing\" isn't
			// assigned to this area.",
			// {
			// styleClass: bCompact ? "sapUiSizeCompact" : ""
			// }
			// );

			try {
				// console.debug('oEvent.getSource: ', oEvent.getSource());

				// oEvent.getSource().detachPress(oEvent.getSource());
				// detachEvent();
			} catch (exception) {
				console.error('exception: ', exception);
			}

			// try{
			// oEvent.reset();
			// }catch(exception) {
			// console.error('exception: ', exception);
			// }

			try {
				//oEvent.preventDefault();
			} catch (exception) {
				console.error('exception: ', exception);
			}

//			try {
//				oEvent.cancelBubble(); // onTap()??
//			} catch (exception) {
//				console.error('exception: ', exception);
//			}

			try {
				// oEvent.stopImmediatePropagation();
			} catch (exception) {
				console.error('exception: ', exception);
			}

			//oEvent.getSource().getParent().close();
			return false;

		}

	});
});