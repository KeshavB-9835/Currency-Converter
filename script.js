const base_url="https://api.currencyapi.com/v3/latest?apikey=cur_live_tYINSufJBxHB5bNQiohwBDHlzYIs0j9eVp89YRWP"

const conversion = document.querySelectorAll(".conversion select")
const btn=document.querySelector("form button")
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")


const updateFlag=(element)=>{
    let currCode=element.value
    let countryCode=countryList[currCode]
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector("img")
    img.src=newSrc
}

for(let select of conversion){
    for(let currCode in countryList){
        let newOption=document.createElement("option")
        newOption.innerText=currCode
        newOption.value=currCode
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected"
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected"
        }
        select.append(newOption)
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault()
    let amount=document.querySelector("form input")
    let amtVal=amount.value
    if(amtVal===""|| amtVal<=0){
        amtVal=1
        amount.value="1"
    }
    const response= await fetch(base_url)
    let Data= await response.json()
    console.log(Data)
    console.log(fromCurr.value, toCurr.value)
    let fromCurrency=fromCurr.value
    let toCurrency=toCurr.value
    console.log(fromCurrency,toCurrency)
    // let rate = Data.data[fromCurrency].value;
    let fromRate = Data.data[fromCurrency].value;
    let toRate = Data.data[toCurrency].value;
    console.log(fromRate,toRate)
    let finalRate=toRate/fromRate
    console.log(finalRate)
    const result=document.querySelector(".msg")
    result.innerText=`1 ${fromCurrency} = ${finalRate} ${toCurrency}`
    const finalValue=document.querySelector(".result")
    finalValue.innerText=`Result Amount: ${amtVal*finalRate}`
})




