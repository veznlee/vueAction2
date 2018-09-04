import Vue from 'vue'

Vue.directive('focus', {
    inserted: function (el) {
        el.focus();
    }
});

Vue.directive('clickoutside',{
    bind:function(el,binding,vnode){
        function documentHandler(e){
            if(el.contains(e.target)){
                return false;
            }
            if(binding.expression){
                binding.value(e);
            }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click',documentHandler);
    },
    unbind:function(el){
        document.removeEventListener('click',el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    }
})

Vue.directive('resize',{
    bind:function(el,binding,vnode){
        function documentHandler(e){
            if(binding.expression){
                binding.value(e);
            }
        }
        el.__resize__ = documentHandler;
        window.addEventListener('resize',documentHandler);
    },
    unbind:function(el,binding,vnode){
        window.removeEventListener('resize',el.__resize__);
        delete el.__resize__;
    }
});

Vue.directive('oncontextmenu',{
    bind:function(el,binding,vnode){
        function documentHandler(e){
            var event = event || window.event;
            event.preventDefault?(event.preventDefault()):(event.returnValue = false);
            var pageX = event.pageX?event.pageX:(event.clientX+(document.body.scrollLeft||document.documentElement.scrollLeft)),
                pageY = event.pageY?event.pageY:(event.clientY+(document.body.scrollTop||document.documentElement.scrollTop));
            // var menu =el.children[1];
            // menu.style.left = pageX+'px';
            // menu.style.top = pageY+'px';
            // menu.style.visibility = 'visible';
            // console.log(pageX,pageY);

            if(binding.expression){
                binding.value(e);
            }
        }
        el.__handEvent__ = documentHandler;
        el.addEventListener('contextmenu',documentHandler);

        // function documentHandler(e){
        //     if(el.contains(e.target)){
        //         return false;
        //     }
        //     if(binding.expression){
        //         binding.value('resize');
        //     }
        // }
        // el.__vueClickOutside__ = documentHandler;
        // document.addEventListener('click',documentHandler);
    },
    unbind:function(el,binding,vnode){
        el.removeEventListener('contextmenu',el.__handEvent__);
        delete el.__handEvent__;
        // document.removeEventListener('click',el.__vueClickOutside__);
        // delete el.__vueClickOutside__;
    }
});