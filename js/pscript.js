const form = document.getElementById('form');
const nameoncard = document.getElementById('nameoncard');
const cardnumber = document.getElementById('cardnumber');
const expirydate = document.getElementById('expirydate');
const cvv = document.getElementById('cvv');
var check;




form.addEventListener('submit', e => {
	e.preventDefault();
	
    checkInputs();
    paymentdone();
});



function checkInputs() {
	// trim to remove the whitespaces
	const nameoncardValues = nameoncard.value.trim();
	const cardnumberValues = cardnumber.value.trim();
	const expirydateValues = expirydate.value.trim();
	const cvvValues = cvv.value.trim();
	
	if(nameoncardValues== "") {
        setErrorFor(nameoncard, 'Name cannot be blank');
        check = false;
    }
    else if (!isname(nameoncardValues)) {
        setErrorFor(nameoncard, 'please enter alphabet only');
        check = false;
    }
    else {
        setSuccessFor(nameoncard);
        if (check != false)
            check = true;
        
	}
	
	if(cardnumberValues== "") {
        setErrorFor(cardnumber, 'Card number cannot be blank');
        check = false;
	} else if (!isnumber(cardnumberValues)) {
        setErrorFor(cardnumber, 'Not a valid expiry');
        check = false;
	} else {
        setSuccessFor(cardnumber);
        if (check != false)
            check = true;
        
	}
	
	if(expirydateValues== "") {
        setErrorFor(expirydate, 'Password cannot be blank');
        check = false;
    }
    else if (!isexpiry(expirydateValues)) {
        setErrorFor(expirydate, 'Not a valid email');
        check = false;
    }
    else {
        setSuccessFor(expirydate);
        if (check != false)
            check = true;
        
        
	}
	
	if(cvvValues== "") {
        setErrorFor(cvv, 'cvv cannot be blank');
        check = false;
    }
    else if (!isnumberc(cvvValues)) {
        setErrorFor(cvv, 'Not a valid email');
        check = false;
    }
	else{
        setSuccessFor(cvv);
        if (check != false)
            check = true;
       
    }
    return check;
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

function isname(nameoncard)
{
    return /[a-zA-Z]/.test(nameoncard);
}
function isexpiry(expirydate)
{
    return /^(0[1-9]|1[0-2])\/?(([0-9]{4}|[0-9]{2})$)/.test(expirydate)
}
function isnumber(cardnumber) {
	return /^([0-9]{16})$/.test(cardnumber);
}

    function isnumberc(cvv) {
       return /^([0-9]{3})$/.test(cvv);
    }






///endofvalidation
    
    






function paymentdone() {
    if(!checkInputs()) {
        alert("Try Again");
    }
    else {
        alert("Payment done successfully");
    }
    document.submit();
    document.reset();
}
