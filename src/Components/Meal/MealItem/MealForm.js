import classes from "./MealForm.module.css"
import Input from "../../UI/Input"
import { useRef, useState } from "react"


const MealForm = (props) => {
    const[formIsValid,setFormIsValid] = useState(true)

    const inputRef = useRef('');

    
    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = inputRef.current.value;
        const enteredAmt = +enteredAmount;

       
        if (enteredAmount.trim().length === 0 || enteredAmt > 5 || enteredAmt < 1) {
            setFormIsValid(false);
            return
        }
        props.onAdd(enteredAmt);
    } 

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input label="Amount" input={{
            ref:inputRef,
            id: "amount",
            type: "number",
            min: "1",
            max: "5",
            defaultValue:"1",
        }} />
        <button>+Add</button>
        {!formIsValid && <p>Please Enter correct amount (1-5)</p>}
    </form>
}

export default MealForm;