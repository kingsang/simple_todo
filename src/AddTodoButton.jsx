import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import React from "react";

const useStyles = makeStyles(theme => ({
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  sendButton: {
    margin: theme.spacing(1),
    marginTop: "20px"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "390px",
  }
}));

export const AddTodoButton = ({creatingText, creatingTextIsValid, onChangeCreatingTodoText, onClickAddTodoButton}) => {
  return (
    <div style={{margin: "30px"}}>
      <TextField
        id="newTodoInput"
        label="new todo"
        className={useStyles().textField}
        margin="normal"
        onChange={e => onChangeCreatingTodoText(e)}
        value={creatingText}
      />
      <Button disabled={!creatingTextIsValid}
              variant="contained"
              color="primary"
              className={useStyles().sendButton}
              onClick={() => onClickAddTodoButton()}>
        CREATE NEW
        <Icon className={useStyles().rightIcon}>send</Icon>
      </Button>
    </div>)
};