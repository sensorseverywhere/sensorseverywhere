angular.module('app').directive('draggability', ['$document', function($document) {
		return function(scope, element, attr) {
			var startX = 0, startY = 0, x = 0, y = 0;

			element.css({
				position: 'relative',
				cursor: 'pointer',
				zindex: '8888'
			});

			element.on('mousedown', function(event) {
				//console.log('mousedown');
				//event.preventDefault();
				startX = event.pageX - x;
				startY = event.pageY - y;
				$document.on('mousemove', mousemove);
				$document.on('mouseup', mouseup);
			});

			function mousemove(event) {
				y = event.pageY - startY;
				x = event.pageX - startX;
				element.css({
					top: y + 'px',
					left: x + 'px'
				});
			}

			function mouseup() {
				$document.unbind('mousemove', mousemove);
				$document.unbind('mouseup', mouseup);
			}
		};
	}]);