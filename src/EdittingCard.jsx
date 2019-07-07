import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import React from "react";

export const EdittingCard = ({todo, edittingText, edittingTextIsValid, onClickEditOkButton, onClickEditCancelButton, onChangeEdittingTodoText}) =>
  <Card style={{marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px", width: "600px"}}>
    <Typography color="textPrimary" style={{
      width: "390px",
      margin: "15px",
      display: "inline-block"
    }}>
      <input autoFocus={true}
             value={edittingText}
             style={{
               fontSize: "0.875rem",
               fontFamily: ["Roboto", "Helvetica", "Arial", "sansSerif"],
               fontWeight: 400,
               lineHeight: 1.43,
               letterSpacing: "0.01071em",
               outline: 0,
               border: 0,
               width: "390px",
               borderBottom: "1px solid #d1d5db",
             }} onChange={e => onChangeEdittingTodoText(e)}
      />
    </Typography>
    <CardActions style={{width: "50px", margin: "5px", display: "inline-block"}}>
      <Button disabled={!edittingTextIsValid} onClick={() => onClickEditOkButton(todo)} size="small"
              variant="contained">OK</Button>
    </CardActions>
    <CardActions style={{width: "50px", margin: "5px", display: "inline-block"}}>
      <Button onClick={() => onClickEditCancelButton()} size="small" variant="contained">CANCEL</Button>
    </CardActions>
  </Card>;