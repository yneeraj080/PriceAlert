const selectors = {
    flipkart: "._30jeq3._16Jk6d",
    amazon: ".a-price-whole"
}

function getSelector(url){
    for(key in selectors){
        if(url.includes(key)){
            return selectors[key];
        }
    }
    return null;
}

module.exports= getSelector;