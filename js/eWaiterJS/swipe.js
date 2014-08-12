var startX = 0;
var Direction = 0;

function autoSlideCarousel(left,main)
{
  $('#leftPanelContainer').parent().transition({ 'transform': 'translate3d(' + left + 'px, 0px, 0px) scale(1)' });
  $('#mainContainer').parent().transition({ 'transform': 'translate3d(' + main + 'px, 0px, 0px) scale(1)' });
  Ext.getCmp('MyCarousel').offset = main;
  if ( main == 244 )
  {
    createBlackout();
    $('#blackout').transition({ opacity: 0.8,scale: 1 });
    $('#titleLeftButton').css({x: '-4px', scale: 1});
    $('#sliderRightButton').attr('id','sliderLeftButton');
    analizSlideLeftPanel(main);
  }
  else
  {
    analizSlideLeftPanel(main);
    $('#blackout').transition({ opacity: 0,scale: 1 },function()
                                                      {
                                                        $('#blackout').css('display','none');
                                                        $('#sliderLeftButton').attr('id','sliderRightButton');
                                                      });
    $('#titleLeftButton').css({x: '0px', scale: 1});
  }
}

function createBlackout()
{
  if ( Ext.get('blackout') == undefined )
  {
    tempBlackout = '<div style="position: absolute;z-index: 9000;width: ' + $('#mainContainer').width() + 'px;height: ' + $('#mainContainer').height() + 'px;\
    background-color: grey;opacity: 0.2;top: 0px;left: 0px;" id="blackout"></div>';
    $('#mainContainer :first').append(tempBlackout);
  }
  else
  {
    $('#blackout').css('display','block');
  }
}

function setBlackout(position)
{
  var tempOpacity = (9 - position/30)/10;
  createBlackout();
  $('#blackout').css('opacity',tempOpacity);

  var tempMargin = (4 - position/60)*-1;
  $('#titleLeftButton').css({ x: tempMargin + 'px' });
}

Ext.define('Ext.MyCarousel', {
  extend: 'Ext.Carousel',
  startX: 0,
  onDragStart: function(e) {
      var direction = this.getDirection(),
          absDeltaX = e.absDeltaX,
          absDeltaY = e.absDeltaY,
          directionLock = this.getDirectionLock();
      startX = e.pageX;

      this.isDragging = true;

      if (directionLock) {
          if ((direction === 'horizontal' && absDeltaX > absDeltaY)
              || (direction === 'vertical' && absDeltaY > absDeltaX)) {
              e.stopPropagation();
          }
          else {
              this.isDragging = false;
              return;
          }
      }

      this.getTranslatable().stopAnimation();

      this.dragStartOffset = this.offset;
      this.dragDirection = 0;
  },
  onDragEnd: function(e) {
    if (!this.isDragging) {
      return;
    }

    this.onDrag(e);

    this.isDragging = false;

    var now = Ext.Date.now(),
        itemLength = this.itemLength,
        threshold = itemLength / 2,
        offset = this.offset,
        activeIndex = this.getActiveIndex(),
        maxIndex = this.getMaxItemIndex(),
        animationDirection = 0,
        flickDistance = offset - this.flickStartOffset,
        flickDuration = now - this.flickStartTime,
        indicator = this.getIndicator(),
        velocity;

    if (flickDuration > 0 && Math.abs(flickDistance) >= 10) {
      velocity = flickDistance / flickDuration;

      if (Math.abs(velocity) >= 1) {
        if (velocity < 0 && activeIndex < maxIndex) {
          animationDirection = -1;
        }
      else if (velocity > 0 && activeIndex > 0) {
        animationDirection = 1;
        }
      }
    }

    if (animationDirection === 0) {
	            if (activeIndex < maxIndex && offset < -threshold) {
	                animationDirection = -1;
	            }
	            else if (activeIndex > 0 && offset > threshold) {
	                animationDirection = 1;
	            }
	        }

	        if (indicator) {
	            indicator.setActiveIndex(activeIndex - animationDirection);
	        }

	        this.animationDirection = animationDirection;

	        if ( Direction == 1 )
	        {//
	          //Было движение вправо
	          if ( $('#leftPanelContainer').offset().left > -140 && $('#leftPanelContainer').offset().left <= 0 )
		      {
	        	  //this.setOffset(244);
	        	  autoSlideCarousel(244 - $(document).width(),244);
	        	  this.offset = 244;
		      }
		      else
		      {
		        //this.setOffset(0);
		    	  autoSlideCarousel($(document).width()*-1,0);
		    	  this.offset = 0;
		      }
	        }
	        else
	        {
	          //Было движение влево
		          if ( $('#leftPanelContainer').offset().left < -30 )
			      {
			      autoSlideCarousel($(document).width()*-1,0);
			      this.offset = 0;
		        	  //this.setOffset(0);
			      }
	        }
	        
	    },
	    onDrag: function(e) {
	        if (!this.isDragging) {
	            return;
	        }

	        var startOffset = this.dragStartOffset,
	            direction = this.getDirection(),
	            delta = direction === 'horizontal' ? e.deltaX : e.deltaY,
	            lastOffset = this.offset,
	            flickStartTime = this.flickStartTime,
	            dragDirection = this.dragDirection,
	            now = Ext.Date.now(),
	            currentActiveIndex = this.getActiveIndex(),
	            maxIndex = this.getMaxItemIndex(),
	            lastDragDirection = dragDirection,
	            offset;

	        if ((currentActiveIndex === 0 && delta > 0) || (currentActiveIndex === maxIndex && delta < 0)) {
	            delta *= 0.5;
	        }

	        offset = startOffset + delta;

	        if (offset > lastOffset) {
	            dragDirection = 1;
	        }
	        else if (offset < lastOffset) {
	            dragDirection = -1;
	        }

	        if (dragDirection !== lastDragDirection || (now - flickStartTime) > 300) {
	            this.flickStartOffset = lastOffset;
	            this.flickStartTime = now;
	        }

	        this.dragDirection = dragDirection;
	        Direction = dragDirection;
	        
	          var tempX = $(document).width()/10;
	          if ( e.absDeltaX > e.absDeltaY )
	          {//$('#title').html('offset: ' + offset + ' offsetLeft: ' + $('#leftPanelContainer').offset().left);
	            //Если горизонтальное дивижение
	            if ( dragDirection == 1 )
	            {
	              //Если слева на право
	              if ( $('#leftPanelContainer').offset().left > -244 && $('#leftPanelContainer').offset().left < 0 && offset < 244 )
	              {
	                //Если уже выдвинута панель, но не на максимум
	                this.setOffset(offset);
	                setBlackout( $('#leftPanel').offset().left*-1 );
	              }
	              else
	              {
	                //Если панель стоит в нуле
		            if ( startX < tempX && $('#leftPanelContainer').offset().left == -244)
		            {
		              //Смотрим, чтоб зацеп происходил у края экрана
		              this.setOffset(offset);
		              setBlackout( $('#leftPanel').offset().left*-1 );
		            }
		            else
		            {
		              //Возвращаем в крайне правое положение
		              //return false;
		            }
	              }
	            }
	            else
	            {
	              //Если справо на лево
	              if ( $('#leftPanelContainer').offset().left > -244 )
			      {
	                //Смотрим, чтоб не в начале стояла
			        this.setOffset(offset);
			        setBlackout( $('#leftPanel').offset().left*-1 );
			      }
	            }
	          }
	    }
	 });
var objC = '';
function createCarousel()
{
  objC = Ext.create('Ext.MyCarousel', {
    id: 'MyCarousel',
    activeItem: 1,
    width: $(document).width() + 'px',
    height: $(document).height() - Ext.get('title').getHeight() + 'px',
    defaults:{
      styleHtmlContent: true
    },
    items: [{
      style: 'position: absolute;right: -10px;padding: 0px;',
      width: '254px',
      id: 'leftPanelContainer'
    },
    {
      style: '',
      id: 'mainContainer'
    }]
  });

  Ext.getCmp('mainPanel').add( Ext.getCmp('MyCarousel') );
}