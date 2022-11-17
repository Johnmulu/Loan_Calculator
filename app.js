/* Select form*/
const form = document.querySelector('#loan-form');



form.addEventListener('submit',function(e){
    //Hide results
    document.getElementById('results').style.display = 'none'
    //Show loader
    document.getElementById('loading').style.display = 'block'
    setTimeout(clearLoading, 2000);
    e.preventDefault();
});

function calculateResults(){
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    //calculate monthly interest
    const x = Math.pow(1+calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest)/ (x-1); 
    
    if(isFinite(monthly)){
        monthPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment)-principal).toFixed(2);
        document.getElementById('results').style.display = 'block';
    } else {
        showError('Please check your numbers');
        document.getElementById('results').style.display = 'none';
    } 
};
//SHOW Error
function showError(error){
    const errorDiv = document.createElement('div');
    // Get element 
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading')
    //Add Class
    errorDiv.className = "badge alert alert-danger";
    //create text node
    errorDiv.appendChild(document.createTextNode(error)); 
    //insert error above heading 
    card.insertBefore(errorDiv, heading); 
    //Clear error after 3 seconds
    setTimeout(clearError, 3000);
}
//Clear error
function clearError(){
    document.querySelector('.alert').remove();
};
//Clear loading 
function clearLoading(){
    document.getElementById('loading').style.display = 'none';
    calculateResults();  
};