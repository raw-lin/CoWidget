class Dom  {
		
	static byId(id, doc) {
			try{
	        	// dojo.byId(id, doc);
	        	
	        	return ((typeof id == "string") ? (doc || CoWidget.container.document).getElementById(id) : id) || null; // DOMNode
			}catch(exception) {
				console.error('');
			}
     }
        
	static query(selecter) {
     }
        
	static ready(priority, context, callback) {
		try {
		    dojo.ready(priority, context, callback);
		} catch (exception) {
		    console.error('[Dom.ready] exception: ', exception);
	    } finally {
	
	    }
	}
}