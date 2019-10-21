class Composite {
	constructor(options) {
		options = options ? options:{name:'Composite'};
		this.name = options.name;
	}
	
	placeAt() {
		let that = this;

		if(Array.isArray(that.composites)) {
			that.composites.forEach(function(element) {
				console.debug('[cowidget._base._Composite.placeAt] element: ', element);
			});
		}else {
			console.debug('[cowidget._base._Composite.placeAt] this: ', this);
		}
	}
	
	add(/* Composite */ child) {
		let that = this;
		if('undefined' == typeof that.composites) {
			that.composites = [];
			
			that.composites.push(that);
		}
		that.composites.push(child);
	}
}