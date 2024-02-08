(function(){
    'use strict';
    console.log('reading js');

    const myForm = document.getElementById("myform");
    const madlib = document.getElementById("madlib")
    const cupWritten = document.getElementById("cupWritten")
    myForm.addEventListener('submit', function(event){
        event.preventDefault();
        const place = document.querySelector("#place").value;
        const number = document.querySelector("#number").value;
        const flavor = document.querySelector("#flavor").value;
        const liquid = document.querySelector("#liquid").value;
        const adj = document.querySelector("#adj").value;
        const time = document.querySelector("#time").value;
        const time2 = document.querySelector("#time2").value;
        const name = document.querySelector("#name").value;
        const money = document.querySelector("#money").value;
        const food = document.querySelector("#food").value;
        let myText;
        let writing;
        if (place == '') {
            myText = "Please provide a place";
            document.querySelector('#place').focus();
        } else if (number == '') {
            myText = "Please provide a number";
            document.querySelector('#number').focus();
        } else if (flavor == '') {
            myText = "Please provide a flavor";
            document.querySelector('#flavor').focus();
        } else if (liquid == '') {
            myText = "Please provide a liquid";
            document.querySelector('#liquid').focus();
        } else if (adj == '') {
            myText = "Please provide an adjective";
            document.querySelector('#adj').focus();
        } else if (time == ''){
            myText = "Please provide a periods of time";
            document.querySelector('#time').focus();
        } else if (time2 == ''){
            myText = "Please provide a periods of time";
            document.querySelector('#time').focus();
        } else if (name == '') {
            myText = "Please provide a name";
            document.querySelector('#name').focus();
        } else if (money == '') {
            myText = "Please provide an amount of money";
            document.querySelector('#money').focus();
        } else if (food == '') {
            myText = "Please provide a food";
            document.querySelector('#food').focus();
        } else {
            myText = 

            `<p>Barista: Hi, welcome to ${place}, what can I get started for you?</p> <p>Customer: Can I get a ${number}-shot ${flavor} latte with ${liquid} milk?</p>
            <p>Barista: Yeah, did you want that ${adj} or iced?</p>
            <p>Customer: I'll do it ${adj}, and can I get a/an ${food} as well, and that will be all!</p>
            <p>Barista: Alright, can I get a name for the order?</p>
            <p>Customer: Yeah, it's for ${name}</p>  
            <p>Barista: Alright, your total is $${money} and that will be out in ${time}.</p>
            <p>Customer: Thanks</p> <p>Barista: Have a nice ${time2}!</p>`;
            writing = 
                  
            `<img src="images/CoffeeCup.png" alt="CoffeeCup">
            <p id="shotsPos">${number}</p>
            <p id="MilkPos">${liquid}</p>
            <p id="SyrupPos">${flavor}</p>
            <p id="namePos"> ${changeName(document.querySelector('#name').value)}</p>
            <p id=closeMessage>Enjoy your coffee! Press Esc to order again!</p>`;

        }
       
        //NEEDS ADDING TO Overlay
        madlib.innerHTML = myText;
        cupWritten.innerHTML = writing;
        document.querySelector('#overlay').appendChild(cupWritten);
        document.querySelector('#overlay').className = "showing";
        //document.

    });
    function changeName(userName) {
        userName = userName.toLowerCase();
        let modifiedName = '';

        for (var i = 0; i < userName.length; i++) {
            let char = userName.charAt(i);
            switch (char) {
                case 'a':
                    modifiedName += 'ae';
                    break;
                case 'e':
                    modifiedName += 'i';
                    break;
                case 'u':
                    
                    modifiedName += 'oo';
                    break;
                case 'o':
                    modifiedName += 'u';
                    break;
                case 'y':
                    modifiedName += 'eigh';
                    break;
                case 'f':
                    modifiedName += 'ph';
                    break;
                case 'ph':
                    modifiedName += 'f';
                    break;
                default:
                    modifiedName += char;
                    break;
            }
        }
        return modifiedName;
    };
    document.addEventListener('keydown', function(event){
        if (event.key==='Escape'){
            document.querySelector('#overlay').className = "hidden";
            myForm.reset(); 
            madlib.innerHTML = ''; 
            cupWritten.innerHTML = '';
        }

    });
    document.querySelector('.close').addEventListener('click',function(event){
        event.preventDefault();
        document.querySelector('#overlay').className = "hidden";
        myForm.reset(); 
        madlib.innerHTML = ''; 
        cupWritten.innerHTML = '';
    });
})();
