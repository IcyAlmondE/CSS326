function countdown(n){
    const timer = setInterval(() => {
    console.log(n);
    n--;
    if(n<1){clearInterval(timer); console.log("Liftoff!");}
}, 1000);
}

countdown(5)