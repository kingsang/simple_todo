import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import React from "react";

export const DisplayingCard = ({todo, onClickArchiveButton, onClickEditButton}) =>
  <Card style={{marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px", width: "600px"}}>
    <Typography color="textPrimary" style={{
      width: "390px",
      margin: "15px",
      display: "inline-block"
    }}>
      {todo.content}
    </Typography>
    <CardActions style={{width: "50px", margin: "5px", display: "inline-block"}}>
      <Button onClick={() => onClickEditButton(todo)}
              size="small"
              variant="contained"
              color="primary">EDIT</Button>
    </CardActions>
    <CardActions style={{width: "50px", margin: "5px", display: "inline-block"}}>
      <Button onClick={() => onClickArchiveButton(todo)}
              size="small"
              variant="contained"
              color="secondary">ARCHIVE</Button>
    </CardActions>
  </Card>;