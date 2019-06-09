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
    margin:'auto'
  },
  mapWrapper:{
    width:'90%',
    height:400,
    margin:'auto',
    marginTop:30,
  },
  input:{
    textAlign:'center'
  }
}

const GeoSearch = ({
  //PROPS
    //required

    //optional

    //calculated
  //STATE
    lat,setLat,handleLatChange,
    latError,
    lng,setLng,handleLngChange,
    lngError,
    center,
  //OTHER
    classes,...props
})=> {

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant='h5' className={classes.title}> Map Search </Typography>
        <TextField
          error={Boolean(latError)}
          helperText={latError}
          label="Latitude"
          value={lat}
          onChange={handleLatChange}
          type="number"
          inputProps={{className:classes.input}}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          error={Boolean(lngError)}
          helperText={lngError}
          label="Longitude"
          value={lng}
          onChange={handleLngChange}
          type="number"
          inputProps={{className:classes.input}}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <div className={classes.mapWrapper}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCmpmXVC-QI8OE1W_cDC3TihIokecKf_io" }}
          center={center}
          defaultZoom={4}
         >
            <Icon fontSize='large' color='secondary' lat={center.lat} lng={center.lng}>person_pin</Icon>
         </GoogleMapReact>
         </div>
      </Paper>
    </div>

  )
}
var timeout = null
export default compose(
  withState('lat','setLat',""),
  withState('latError','setLatError',null),
  withState('lng','setLng',""),
  withState('lngError','setLngError',null),
  withState('center','setCenter',props=>({lat:0,lng:0})),
  withHandlers({
    updateCenter:props=>(center)=>{
      setTimeout(()=>{
        clearTimeout(timeout)
        timeout=setTimeout(function () {
          let newCenter = {lat:Number(center.lat),lng:Number(center.lng)}
          props.setCenter(newCenter)
        }, 100);
      })
    }
  }),
  withHandlers({
    handleLatChange:props=>(e)=>{
      props.setLat(e.target.value)
      let value = Number(e.target.value)
      if(value>=-90&&value<=90){
        props.updateCenter({lat:value,lng:props.lng})
      }else{
        console.log(value);
        props.setLatError('Invalid Value')
      }
    },
    handleLngChange:props=>(e)=>{
      props.setLng(e.target.value)
      let value = Number(e.target.value)
      if(value>=-180&&value<=180){
        props.updateCenter({lat:props.lat,lng:value})
      }else{
        console.log(value);
        props.setLngError('Invalid Value')
      }
    }
  }),
  withStyles(styles)
)(GeoSearch)
