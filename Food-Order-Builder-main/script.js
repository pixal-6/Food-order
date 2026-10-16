const form=document.getElementById("orderForm");
let grandtotal=0;
const foodPrices = {
    Burger: 100,
    Pizza: 150,
    Sandwich: 120
};
const sizePrices = {
    Small: 0,
    Medium: 30,
    Large: 50
};
const extraPrices = {
    Cheese: 20,
    Fries: 40,
    Coke: 30
};
let total=document.getElementById("total");
let orderList = document.getElementById("orderList");
let editingCard=null;
let editingPrice=0;

form.addEventListener("submit",(event)=>{
    event.preventDefault();

    let food=document.getElementById("food");
    let size=document.getElementById("size");
    let quantity=document.getElementById("quantity");
    let instructions=document.getElementById("instructions");
    let extras=document.getElementsByName("extras");

    let foodvalue=food.value;
    let sizevalue=size.value;
    let quantityvalue=quantity.value;
    let instructionsvalue=instructions.value;

    let extrasvalue=[];

    for(let extra of extras)
    {
        if(extra.checked)
        {
            extrasvalue.push(extra.value);
        }
    }

    alert("order registered");

    let price=foodPrices[foodvalue]+sizePrices[sizevalue];

    for(let extra of extrasvalue)
    {
        price=price+extraPrices[extra];
    }

    let Finalprice=price*quantityvalue;

    if(editingCard)
    {
        grandtotal=grandtotal-editingPrice+Finalprice;

        editingCard.innerHTML =
            "Item: " + foodvalue +
            "<br>Quantity: " + quantityvalue +
            "<br>Extras: " + extrasvalue +
            "<br>Price: ₹" + Finalprice +
            "<br>Instructions: " + instructionsvalue;

        editingCard.append(editingCard.delbtn);
        editingCard.append(editingCard.editBtn);

        editingCard.Finalprice=Finalprice;

        total.innerText=grandtotal;

        editingCard=null;
        editingPrice=0;

        return;
    }

    let ordercard=document.createElement("p");

    grandtotal=grandtotal+Finalprice;

    ordercard.Finalprice=Finalprice;

    ordercard.innerHTML =
        "Item: " + foodvalue +
        "<br>Quantity: " + quantityvalue +
        "<br>Extras: " + extrasvalue +
        "<br>Price: ₹" + Finalprice +
        "<br>Instructions: " + instructionsvalue;

    let delbtn=document.createElement("button");
    delbtn.innerText="Delete";

    let editBtn=document.createElement("button");
    editBtn.innerText="Edit";

    editBtn.addEventListener("click", function(){
        editingCard=ordercard;
        editingPrice=ordercard.Finalprice;

        food.value=foodvalue;
        size.value=sizevalue;
        quantity.value=quantityvalue;
        instructions.value=instructionsvalue;

        for(let extra of extras)
        {
            extra.checked=extrasvalue.includes(extra.value);
        }
    });

    ordercard.delbtn=delbtn;
    ordercard.editBtn=editBtn;

    ordercard.append(delbtn);
    ordercard.append(editBtn);

    const emptyMessage=orderList.querySelector(".empty-message");

    if(emptyMessage)
    {
        emptyMessage.remove();
    }

    orderList.append(ordercard);

    total.innerText=grandtotal;
});
orderList.addEventListener("click", function(event)
{
    if(event.target.innerText === "Delete")
    {
        let card=event.target.parentElement;

        grandtotal=grandtotal-card.Finalprice;
        card.remove();

        total.innerText=grandtotal;

        if(orderList.children.length === 0)
        {
            orderList.innerHTML='<p class="empty-message">Your order is empty.</p>';
        }
    }
});