let t = 5;
const timer = setInterval(() => {
    console.log(t);
    t--;
    if(t<1){clearInterval(timer); console.log("Time's up!");}
}, 1000);