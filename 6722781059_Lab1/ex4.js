let price = 25;

try{
    console.log(price.toUpperCase());
} catch(err){
    console.log(`Type error: ${err.message}`);
}