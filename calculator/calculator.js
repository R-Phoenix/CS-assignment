var result = 0.0;
var operator = "";
var prev = 0.0;
var isdecimal = false;
var decimalplace = 0;
function updatedisplay()
{
    document.getElementById('display1').value = prev + operator;
    document.getElementById('display2').value = result;
}
function addnumber (n)
{
    if (isdecimal == true)
    {
        result += n*(10**decimalplace);
        decimalplace -= 1;
    }
    else
        result = result*10 + n;
    updatedisplay();
}
function adddecimal()
{
    if (isdecimal)
    {
        result = 0;
        prev = "Error";
        updatedisplay();
    }
    else
    {
        isdecimal = true;
        decimalplace = -1;
    }
}
function addoperator (opr)
{
    var r = 0.0;
    if (operator.length != 0)
        r = soln();
    else
        r = result;
    prev = r;
    operator = opr;
    isdecimal = false;
    result = 0;
    updatedisplay();
}
function del()
{ 
    console.log(result%1);
    if (result%1 != 0)
    {
        var r = (10**(decimalplace+2));
        result -= result%r;
    }
    else
    {
        result/= 10;
        result-= result%1;
    }
    updatedisplay();
}
function soln()
{
    var r=0.0;
    switch (operator)
    {
        case '+':
            r = prev + result;
            break;
        case '-':
            r = prev - result;
            break;
        case '*':
            r = prev * result;
            break;
        case '/':
            r = prev / result;
            break;
        case '%':
            r = prev % result;
            break;
        case '**':
            r = prev ** result;
            break;
        default:
            r = "Error";
    }
    if (r%1 == 0)
        isdecimal = false;
    return r;
}
function equals()
{
    if (prev == "Result :")
    {
        return;
    }
    else if (prev == 0)
    {
        prev = "Result :";
        updatedisplay();
        return;
    }
    result = soln();
    operator = "";
    if (result == "Error")
        prev = "No operator";
    else
        prev = "Result :";
    updatedisplay();
}