/** Рейтинг заметок в виде звезд jquery.rating.js
 *  http://biznesguide.ru/coding/156.html
 *  Copyright (c) 2011 Шамшур Иван (http://twitter.com/ivanshamshur)
 *  Dual licensed under the MIT and GPL licenses
 */
 
;(function($){
	
	
	$.rating = function(e, o){
		
		this.options = $.extend({
		    fx: 'float',
            image: '/images/stars.png',
			stars: 5,
            minimal: 0,
			titles: ['голос','голоса','голосов'],
			readOnly: false,
			url: '',
            type: 'post',
            loader: '/images/ajax-loader.gif',			
			click: function(){},
            callback: function(){}
		}, o || {});
		
		this.el = $(e);
        this.left = 0;
        this.width = 0;
        this.height = 0;
        this._data = {};
        
        var self = this;
        
        this.el.find(':hidden').each(function(){
            
            var $this = $(this);
            self._data[$this.attr('name')] = $this.val();
            
        });
        
        this._data.val = parseFloat(this._data.val) || 0;
        this._data.votes = parseFloat(this._data.votes) || '';

        
        if(this._data.val > this.options.stars) this._data.val = this.options.stars;
        if(this._data.val < 0) this._data.val = 0;
        
        this.old = this._data.val;

		this.vote_wrap = $('<div class="vote-wrap"></div>');
		this.vote_block = $('<div class="vote-block"></div>');
        this.vote_hover = $('<div class="vote-hover"></div>');
		this.vote_stars = $('<div class="vote-stars"></div>');
		this.vote_active = $('<div class="vote-active"></div>');
		this.vote_result = $('<div class="vote-result"></div>');
		this.vote_success = $('<div class="vote-success"></div>');
        this.loader = $('<img src="'+this.options.loader+'" alt="load...">');

        this.el.html(this.loader);

        //Загружаем изображение звезд и высчитываем ширину и высоту одной звезды
        var img = new Image();
        img.src = this.options.image;
        img.onload = function() {
            self.width = this.width; //Ширина одной звезды
            self.height = this.height/3; //Высота одной звезды
            self.init();
        };
		
	};
	
	
	var $r = $.rating;

	$r.fn = $r.prototype = {
		rating: '2.0'
    };
	
	$r.fn.extend = $r.extend = $.extend;

    $r.fn.extend({
        
    	init: function(){
    	
    		this.render();

    		if(this.options.readOnly) return;

    		var self = this, left = 0, width = 0;

    		//this.vote_hover.bind('mousemove mouseover',function(e){
    		this.vote_hover.attr('id','hoverId');
    		this.vote_hover.bind('touchmove',function(e){//console.log(e.currentTarget.className);
    		   			
    			if(self.options.readOnly) return;

    			var $this = $(this),
    		    	score = 0;
                    
                left = e.clientX>0 ? e.clientX: e.pageX;
                width = left - $this.offset().left - 2;
                 
                var max = self.width*self.options.stars,
                    min = self.options.minimal*self.width;

                if(width > max) width = max;
                if(width < min) width = min;   
           
                score = Math.round( width/self.width * 10 ) / 10; //округляем до 1 знака после запятой
           
                if(self.options.fx == 'half'){
                    width = Math.ceil(width/self.width*2)*self.width/2;          
                }
                else if(self.options.fx != 'float'){                    
                    width = Math.ceil(width/self.width) * self.width;  
                }
                
                score = Math.round( width/self.width * 10 ) / 10; 

                self.vote_active.css({
    				'width':width,
    				'background-position':'left center'
    			});
                
                self.vote_success.html('Ваша оценка: '+score);
    		    
    		 })
    		 /*.bind('mouseout',function(){
    			if(self.options.readOnly) return; 
    			self.reset();
                self.vote_success.empty();
    		 }).*/
    		 .bind('touchstart',function(e){
    			 $('.dx-slideout').dxSlideOut('instance').option({swipeEnabled: false});
    		 })
    		 .bind('touchend',function(e){
    			 $('.dx-slideout').dxSlideOut('instance').option({swipeEnabled: true});
    		 //})
    		 //.bind('click.rating',function(){
    		
    			 if(self.options.readOnly) return;
          
                 var score = Math.round( width/self.width * 10 ) / 10; 

                 if(score > self.options.stars) score = self.options.stars;
                 if(score < 0) score = 0;
                 
                 /*self.old = self._data.val;
    			 self._data.val = (self._data.val*self._data.votes +score)/(self._data.votes + 1);
                 self._data.val = Math.round( self._data.val * 100 ) / 100;*/
                 self._data.score = score;
                 self.vote_success.html('Ваша оценка: '+score);
    			 
                 if(self.options.url != ''){
    				 
    				 self.send();
    			 }
                 
                 self.options.readOnly = true;        
    			 //self.options.click.apply(this,[score]);
    		 });
    		
    	},
        set: function(){
    		this.vote_active.css({
    			'width':this._data.val*this.width,
    			'background-position':'left bottom'
    		});
    	},
    	reset: function(){
    		this.vote_active.css({
    			'width':this.old*this.width,
    			'background-position':'left bottom'
    		});
    	},
        setvoters: function(){
            this.vote_result.html(this.declOfNum(this._data.votes));  
        },
    	render: function(){
    		
    		this.el.html(this.vote_wrap.append(
				this.vote_hover.css({
				    padding:'0 4px',
                    height:this.height,
                    width:this.width*this.options.stars
                }),
				this.vote_result.text(this.declOfNum(this._data.votes)),
				this.vote_success
    		));

    		
            this.vote_block.append(
				this.vote_stars.css({
				    height:this.height,
                    width:this.width*this.options.stars,
                    background:"url('"+this.options.image+"') left top"
                }),
				this.vote_active.css({
				    height:this.height,
                    width:this._data.val*this.width,
                    background:"url('"+this.options.image+"') left bottom"
                })
            ).appendTo(this.vote_hover);
    		
    	},
    	send: function(score){
    		
    		var self = this;
            this.vote_result.html(this.loader);
            
            this._data.votes++;
            setDataForRatingSend( this._data )
            
    		$.ajax({
    			url: self.options.url,
    			type: self.options.type,
    			data: ( 'score=' + this._data['score'] + '&menuId=' + this._data['menuId'] ),
    			success: function(data){
		            //if(data.status == 'OK') {
		              var temp = JSON.parse(data);
		              //$('#stars').empty();
		              $('#stars').replaceWith('<div class="rating" id="stars" style="height: 36px;"><input type="hidden" name="val" value="' + temp.curentScore/temp.voiceCount + '">' +
	                    '<input type="hidden" name="votes" value="' + temp.voiceCount + '"></div>');
		              //setTimeout(function(){
		              modeMMTitems( temp.curentScore/temp.voiceCount,temp.voiceCount );
		                $('#stars').rating({fx: 'half',image: 'images/stars.png',loader: 'images/ajax-loader.gif',width: 20,url: 'http://admin.ewaiter.info/includes/insertVoise.php'});
		              //},400);
		              //$('div.vote-result').html( temp.voiceCount );
		              //alert( temp.voiceCount );
		              //self.set();
		            //}  
                    //else{
                   //     self._data.votes--;
                   //     self.reset();
                    //}      
		            /*
                    //self.setvoters();
                       
    				if(data.msg)self.vote_success.html(data.msg);
                    
                    if(typeof self.options.callback == 'function'){
                        
                        self.options.callback.apply(self,[data]);
                    }*/
    			}
    		});
    		
    	},
    	declOfNum: function(number){  
    	    if(number <= 0) return '';
    		number = Math.abs(Math.floor(number));
            cases = [2, 0, 1, 1, 1, 2];  
            return number+' '+ this.options.titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
        }  
    });
    
    
    $.fn.rating = function(o){
    	
    	if (typeof o == 'string') {
            var instance = $(this).data('rating'), args = Array.prototype.slice.call(arguments, 1);
            return instance[o].apply(instance, args);
        } else {
            return this.each(function() {
                var instance = $(this).data('rating');
                if (instance) {
                    if (o) {
                        $.extend(instance.options, o);
                    }
                    
                    instance.init();
                    
                } else {
                	
                    $(this).data('rating', new $r(this, o));
                }
            });
        }
    }; 
	
})(jQuery);

function setDataForRatingSend(data)
{
  data['menuId'] = $('#menuId').html();
}

function setRatingImg( score )
{
  if ( score == 0 )
  {
    return 'images/star_5_off.png';
  }
  if ( score > 0  && score <= 0.5)
  {
    return 'images/star_4.5_off.png';
  }
  if ( score > 0.5  && score <= 1)
  {
    return 'images/star_4_off.png';
  }
  if ( score > 1 && score <= 1.5)
  {
    return 'images/star_3.5_off.png';
  }
  if ( score > 1.5 && score <= 2)
  {
    return 'images/star_3_off.png';
  }
  if ( score > 2 && score <= 2.5)
  {
    return 'images/star_2.5_off.png';
  }
  if ( score > 2.5 && score <= 3)
  {
    return 'images/star_2_off.png';
  }
  if ( score > 3 && score <= 3.5)
  {
    return 'images/star_1.5_off.png';
  }
  if ( score > 3.5 && score <= 4)
  {
    return 'images/star_1_off.png';
  }
  if ( score > 4 && score <= 4.5)
  {
    return 'images/star_0.5_off.png';
  }
  if ( score > 4.5 && score <= 5)
  {
    return 'images/star_0_off.png';
  }
}

function modeMMTitems(curentScore,voiceCount)
{
  var tempId = $('#menuId').html();
  var tempStatus = false;
  for ( var i = 0; i < MMT.menuMenuTypeStore.length; ++i )
  {
    if ( MMT.menuMenuTypeStore[i].menuId == tempId )
    {
      MMT.menuMenuTypeStore[i].rating = curentScore;
      MMT.menuMenuTypeStore[i].voiceCount = voiceCount;
      MMT.menuMenuTypeStore[i].ratingImage = setRatingImg( curentScore );
      MMT.status = true;
    }
  }
}