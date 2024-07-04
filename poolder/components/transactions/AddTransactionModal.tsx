import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CurrencyInput from "react-currency-input-field";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Transaction } from "@/services/types";
import ErrorMessage from "@/components/error handling/ErrorMessage";
import { useError } from "@/components/error handling/UseErrorHook";

export default function FormDialog(props: any) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState<String>();
  const [description, setDescription] = React.useState<String>();
  const [date, setDate] = React.useState<Date | null>(null);
  const [amount, setAmount] = React.useState<number>();
  const { error, showError, triggerError } = useError();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTitle(undefined);
    setDescription(undefined);
    setDate(null);
    setAmount(undefined);
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!title) triggerError("Please fill the title in.", "Error");
    else if (!description)
      triggerError("Please fill the description in.", "Error");
    else if (date === null) triggerError("Please select a date.", "Error");
    else if (!amount || (amount && amount.toString() === "0"))
      triggerError(
        "Please fill in an amount of euros not equal to 0.",
        "Error"
      );
    else {
      let amountNumber = parseFloat(amount!.toString());
      const newTransaction: Transaction = {
        id: "",
        user_id: "",
        title: title!.toString(),
        description: description!.toString(),
        date: date ? date : new Date(0),
        total_amount: amountNumber ? amountNumber : 0,
      };
      
      props.onSubmit(newTransaction);
      handleClose();
      }
  };

  const onAmountChange = function (e: any) {
    setAmount(e.float);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorMessage
          title={error.title}
          message={error.message}
          show={showError}
        />
      )}
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new transaction
      </Button>
      <Dialog open={open} onClose={handleClose} style={{ zIndex: 1299 }}>
        <DialogTitle>Add new transaction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the title, description, date and amount corresponding
            to your transaction.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            type="title"
            fullWidth
            variant="standard"
            value={title || ""}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="text"
            name="description"
            label="Description"
            type="description"
            fullWidth
            variant="standard"
            value={description || ""}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <br />
          <br />
          {/* Since LocalizationProvider and DatePicker don't have styles, I added a double-break */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of transaction"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </LocalizationProvider>
          <CurrencyInput
            name="total_amount"
            placeholder="Please enter the total amount"
            prefix="€"
            required
            decimalsLimit={2}
            style={{
              marginTop: 16,
              width: "100%",
              padding: 8,
              boxSizing: "border-box",
            }}
            value={amount}
            onValueChange={(_value, _name, values) => onAmountChange(values)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="submit">
            Create new transaction
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
