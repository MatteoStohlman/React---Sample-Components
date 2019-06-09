import React from 'react';
import Typography from '@material-ui/core/Typography';
import {compose,withState,withHandlers} from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import GoogleMapReact from 'google-map-react';
import Icon from '@material-ui/core/Icon';


const styles={
  root:{
    width:'100%',
    height:620,
    padding:15,
  },
  title:{
    marginBottom:15,
  },
  paper:{
    width:'90%',
    height:'90%',
    margin:'auto',
    overflow:'auto'
  }
}

const ComponentWrapper = ({
  //PROPS
    title,
  //OTHER
    classes,...props
})=> {

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {title&&<Typography variant='h5' className={classes.title}>{title}</Typography>}
        {props.children}
      </Paper>
    </div>

  )
}
var timeout = null
export default compose(
  withStyles(styles)
)(ComponentWrapper)
