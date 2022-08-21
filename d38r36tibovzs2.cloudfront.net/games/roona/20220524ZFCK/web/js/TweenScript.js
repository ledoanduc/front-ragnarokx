$(function(){

    function particleStart() {
        waveValues = [];
        $('.particles img').each(function (idx, item) {
            waveValues.push(0);
            TweenMax.delayedCall(idx * 1, particleFirstPosition, [$(item), idx]);
        });
   
    }  

    function particleStart1() {
        waveValues = [];
        $('.particles1 img').each(function (idx, item) {
            waveValues.push(0);
            TweenMax.delayedCall(idx * 1, particleFirstPosition1, [$(item), idx]);
        });
       
    }  


    function particleFirstPosition(particle, idx) {
        var firstx = Math.random() * particle.parent().width();
        var firsty = particle.parent().height();
        var scalex = (Math.random() * 6 + 5) * .1;
        var scaley = (Math.random() * 6 + 5) * .1;
        var angle = Math.random() * 360;

        waveValues[idx] = 0;
        var wavearea = parseInt(Math.random() * 5 + 5);

        TweenMax.set(particle, { display: 'block', scaleX: scalex, scaleY: scaley, rotation: angle, alpha: 0, left: firstx, top: firsty });

        var delay = Math.random() * 6 * .1 + .2;
        var duration = Math.random() * 9 + 7;
        TweenMax.to(particle, duration, { delay: delay, top: 0, onComplete: particleFirstPosition, onCompleteParams: [particle, idx], onUpdate: particleWave, onUpdateParams: [particle, firstx, idx, wavearea], overwrite: 1 });
        TweenMax.to(particle, .5, { delay: delay, alpha: 1 });
        TweenMax.to(particle, .3, { delay: delay + duration - 4, alpha: 0 });
    }

    function particleFirstPosition1(particle, idx) {
        var firstx = Math.random() * particle.parent().width();
        var firsty = particle.parent().height();
        var scalex = (Math.random() * 6 + 5) * .1;
        var scaley = (Math.random() * 6 + 5) * .1;
        var angle = Math.random() * 360;

        waveValues[idx] = 0;
        var wavearea = parseInt(Math.random() * 5 + 5);

        TweenMax.set(particle, { display: 'block', scaleX: scalex, scaleY: scaley, rotation: angle, alpha: 0, left: firstx, top: firsty });

        var delay = Math.random() * 6 * .1 + .2;
        var duration = Math.random() * 9 + 7;
        TweenMax.to(particle, duration, { delay: delay, top: 0, onComplete: particleFirstPosition1, onCompleteParams: [particle, idx], onUpdate: particleWave1, onUpdateParams: [particle, firstx, idx, wavearea], overwrite: 1 });
        TweenMax.to(particle, .5, { delay: delay, alpha: 1 });
        TweenMax.to(particle, .3, { delay: delay + duration - 4, alpha: 0 });
    }

    
    function particleWave(particle, firstx, idx, wavearea) {
        waveValues[idx] += .03;
        var px = firstx + wavearea * Math.sin(waveValues[idx]);
        particle.css({ left: px });
    }        
    function particleWave1(particle, firstx, idx, wavearea) {
        waveValues[idx] += .03;
        var px = firstx + wavearea * Math.sin(waveValues[idx]);
        particle.css({ left: px });
    }        



    particleStart();
    particleStart1();
                    
})