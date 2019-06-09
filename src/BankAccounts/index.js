import React from 'react';
import {compose,withProps} from 'recompose';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { withStyles } from '@material-ui/core/styles';
import Wrapper from 'Components/Wrapper'
import numeral from 'numeral'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';

const BankAccounts = ({
  //PROPS
    accounts,
  //OTHER
    ...props
})=> {
  const columns = [
    {
      Header:'Bank',
      accessor:'name',
      filterMethod: (filter, row) => {
        return row.name.toLowerCase().includes(filter.value.toLowerCase())
      },
      Filter:({filter,onChange})=>{
        return(
          <TextField
            fullWidth
            value={filter&&filter.value}
            onChange={(e)=>onChange(e.target.value)}
          />
        )
      }
    },
    {
      Header:'Account Type',
      accessor:'type',
      filterMethod: (filter, row) => {
        return row.type.includes(filter.value) || filter.value==='All'
      },
      Filter: ({ filter, onChange }) =>{
        return(
          <Select
            value={filter&&filter.value||"All"}
            onChange={(e)=>onChange(e.target.value)}
            fullWidth
          >
            <MenuItem value="All">
              <em>All</em>
            </MenuItem>
            <MenuItem value='Checking'>Checking</MenuItem>
            <MenuItem value='Savings'>Savings</MenuItem>
            <MenuItem value='Credit'>Credit</MenuItem>
          </Select>
        )
    }},
    {
      Header:'Balance',
      id:'balance',
      accessor:account=>numeral(account.balance).format('$0,0.00'),filterMethod: (filter, row) => {
        return row.type.includes(filter.value) || filter.value==='All'
      },
      filterMethod:(filter,row)=>{
        return numeral(row.balance).format('0.0')>Number(filter.value)
      },
      Filter:({filter,onChange})=>{
        return(
          <TextField
            fullWidth
            placeholder='Greater than...'
            InputProps={{
              startAdornment:(
                <InputAdornment position="start">
                  <Icon>keyboard_arrow_right</Icon>
                </InputAdornment>
              )
            }}
            value={filter&&filter.value}
            onChange={(e)=>onChange(e.target.value)}
            type="number"
          />
        )
      }
    },

  ]

  return (
    <Wrapper title='Bank Search'>
      <ReactTable
        data={accounts}
        columns={columns}
        filterable={true}
        defaultPageSize={10}
      />
    </Wrapper>
  )
}

const makeAccount = (name,type,balance) => ({name,type,balance})

export default compose(
  withProps(props=>({
    accounts:[
      makeAccount('Bank Of America','Savings',1221),
      makeAccount('Bank Of America','Checking',386),
      makeAccount('Bank Of America','Savings',1043),
      makeAccount('Chase','Credit',1400),
      makeAccount('Chase','Checking',889),
      makeAccount('Fidelity','Savings',34540),
    ]
  }))
)(BankAccounts)
