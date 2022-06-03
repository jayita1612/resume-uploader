import { Grid, TextField, Typography, FormControlLabel, Checkbox, Button, Box, Alert, InputLabel, MenuItem, Select, FormControl, FormLabel, Radio, RadioGroup, FormGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Input } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from 'react';
import { styled } from '@mui/material/styles'; 
function App() {

  const Input = styled( 'input')({
    display: 'none',
  });


  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [dob, setDob] = useState(null)
  const[ st, setSt] = useState('')
  const [gender, setGender] = useState()
  const [Pjl, setPjl] = useState([ ])
  const [pimage, setPimage] = useState('')
  const [rdoc, setRdoc] = useState('')
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })

// multi Cheack box
const getPjl = (e) =>{
  let data = Pjl
  data.push(e.target.value )
  setPjl(data)
}


const resetForm = () =>{
  setName( '' )
  setEmail( '' )
  setDob( 'null' )
  setSt( '' )
  setGender( '' )
  setPjl( [] )
  setPimage( '' )
  setRdoc( '' )
  document.getElementById('resume-form').reset()
}
// hundle form submit
const handleSubmit = (e) =>{
   e.preventDefault();
   const data = new FormData()
   data.append('name', name)
   data.append('email', email)
   data.append('dob', dob)
   data.append('st', st)
   data.append('gender', gender)
   data.append('pjl', Pjl)
   data.append('pimage', pimage)
   data.append('rdoc', rdoc)
   console.log(data)
   if (name && email){
     console.log(data.get('name'))
     console.log(data.get('email'))
     console.log(data.get('dob'))
     console.log(data.get('st'))
     console.log(data.get('gender'))
     console.log(data.get('pjl'))
     console.log(data.get('pimage'))
     console.log(data.get('rdoc'))
     setError({ status: true, msg: "Resume Uploaded Successfully", type: 'success'})
     resetForm()
   } else{
     setError({ status: true, msg: "All Fields are Required", type: 'error' })
   }
}
  return (
    <>
    <Box display="flex" justifyContent="center" sx={{backgroundColor: 'error.light', padding: 2 }}>
      <Typography variant='h2' component="div" sx={{ fontWeight: 'bold', color: 'white'}}>Resume Uploader</Typography>
    </Box>
    <Grid container justifyContent="center">
      <Grid item xs={5}>
        <Box component="Form"  sx={{ p:3 }} noValidate id="Reaume-form" onSubmit={handleSubmit}>
          <TextField id="Name" name="name" required fullWidth margin='normal' label='Name' onChange={(e) => setName(e.target.value)} />
          <TextField id="Email" email="email" required fullWidth margin='normal' label='Email' onChange={(e) => setEmail(e.target.value)} />
          <Box mt={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker label="Date of Birth" value={dob} onChange={(newValue)=>{ setDob(newValue )}} renderInput={(params)=><TextField {...params}/>}/>
            </LocalizationProvider>
          </Box>
          <FormControl fullWidth margin='normal'>
            <InputLabel id="state-select-lable">State</InputLabel>
            <Select labelId='state-select-lable' id='state-select' value={st} label='st' onChange={(e)=>{setSt(e.target.value)}}>
              <MenuItem value="WestBengal">WestBengal</MenuItem>
              <MenuItem value="Karnataka">Karnataka</MenuItem>
              <MenuItem value="Bihar">Bihar</MenuItem>
              <MenuItem value="Jharkhand">Jharkhand</MenuItem>
              <MenuItem value="Mardhapradash">Mardhapradash</MenuItem>
              <MenuItem value="UP">UP</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin='normal'>
          <FormLabel id="gender-radio">Gender</FormLabel>
          <RadioGroup row name="gender">
            <FormControlLabel value="Male" control={<Radio /> } label='Male' onChange={(e) => setGender(e.target.value)}/>
            <FormControlLabel value="Female" control={<Radio /> } label='Female' onChange={(e) => setGender(e.target.value)}/>
            <FormControlLabel value="Other" control={<Radio /> } label='Other' onChange={(e) => setGender(e.target.value)}/>
          </RadioGroup>
          </FormControl>
          <FormControl component='fieldset' fullwidth margin='normal'>
          <FormLabel component='legend'>Preferred Job Location :</FormLabel>
          <FormGroup row>
          <FormControlLabel control={<Checkbox />} label="Delhi" value="Delhi" onChange={(e) => getPjl(e)}/>
          <FormControlLabel control={<Checkbox />} label="Mumbai" value="Mumbai" onChange={(e) => getPjl(e)}/>
          <FormControlLabel control={<Checkbox />} label="Bangalor" value="Bangalor" onChange={(e) => getPjl(e)}/>
          <FormControlLabel control={<Checkbox />} label="west Bengal" value="West Bengal" onChange={(e) => getPjl(e)}/>
          <FormControlLabel control={<Checkbox />} label="pune" value="Pune" onChange={(e) => getPjl(e)}/>
          <FormControlLabel control={<Checkbox />} label="Rachi" value="Rachi" onChange={(e) => getPjl(e)}/>
          <FormControlLabel control={<Checkbox />} label="Asam" value="Asam" onChange={(e) => getPjl(e)}/>
          </FormGroup>
          </FormControl>
          <Stack direction="row" alignItems="center" spacing={4}>
            <label htmlFor='profile-photo'>
            <Input accept="image/*" id="profile-photo" type="file"  onChange={(e)=>{setPimage(e.target.files[0])}}/>
            <Button variant='contained' component='span'>Upload Photo</Button>
            </label>
            <label htmlFor='resume-file'>
            <Input accept="doc/*" id="resume-file" type="file"  onChange={(e)=>{setRdoc(e.target.files[0])}}/>
            <Button variant='contained' component='span'>Upload File</Button>
            </label>
            </Stack>
              <Button type='submit' variant='contained' sx={{ mt: 3, mb:2, px:5 }} color="error">Submit</Button>
              {error.status ? <Alert severity={error.type}> {error.msg}</Alert> : ''} 
          </Box>
        </Grid>

        <Grid item xs={7}>
        <Box display="flex" justifyContent="center" sx={{backgroundColor: 'info.light', padding: 1 }}>
      <Typography variant='h5' component="div" sx={{ fontWeight: 'bold', color: 'white'}}>List Of Candidates</Typography>
    </Box>
    <TableContainer component={ Paper }>
      <Table sx={{ minWidth: 650 }} aria-lable="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">DOB</TableCell>
            <TableCell align="center">State</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center"><Avatar src="#" /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } } } >
          <TableCell align="center">Jayita Biswas</TableCell>
            <TableCell align="center">jayitabiswas1612@gmail.com</TableCell>
            <TableCell align="center">0-0-0</TableCell>
            <TableCell align="center">WestBengal</TableCell>
            <TableCell align="center">Female</TableCell>
            <TableCell align="center">Bangalore</TableCell>
            <TableCell align="center">image</TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } } } >
          <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
         </TableBody>
      </Table>
    </TableContainer>
      </Grid>
    </Grid>
    </>
  );
}

export default App;
