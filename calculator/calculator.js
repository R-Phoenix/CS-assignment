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
function clearall()
{
    console.log("clear");
    isdecimal = false;
    decimalplace = 0;
    result = 0;
    prev = 0;
    updatedisplay();
}
function addnumber (n)
{
    if (result == "infinite" || result == "Error")
    {
        result = 0;
        prev = 0;
    }
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
        return;
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
    if (result == "infinite" || result == "Error")
    {
        result = 0;
        prev = 0;
        updatedisplay();
        return;
    }
    if (result%1 != 0)
    {
        var r = (10**(decimalplace+2));
        result -= result%r;
        decimalplace+=1;
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
    if (prev == 0 && result == 0)
        return;
    if (result == 0 && operator == '/')
        r = "infinite";
    else if (result == 0 && operator == '%')
        r="Error";
    else
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
    if (r == "infinite" || r == "Error")
        isdecimal = false;
    else if (r%1 == 0)
        isdecimal = false;
    else if (r%1 != 0)
    {
        var check = r%1;
        decimalplace = -1;
        while (check%1 != 0)
        {
            decimalplace-=1;
            check*= 10;
        }
    }
    return r;
}
function equals()
{
    if (prev == "Result :")
    {
        return;
    }
    else if (prev == 0 && operator.length == 0)
    {
        prev = "Result :";
        updatedisplay();
        return;
    }
    result = soln();
    operator = "";
    if (result == "Error")
        prev = "Wrong Input";
    else
        prev = "Result :";
    updatedisplay();
}

