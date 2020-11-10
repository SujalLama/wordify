import {react, useState} from 'react';
import {AppBar,Box, 
  Typography, Container, Grid, Paper, FormControl, 
  Input, Button } from '@material-ui/core';

import {makeStyles} from '@material-ui/styles';

 const useStyles = makeStyles({
  root: {
    backgroundColor: 'brown',
  },
  heading: {
    textTransform: 'uppercase',
    letterSpacing: '.3em',
    fontWeight: 'bolder',
    fontSize: '3em',
  },
  headSecond: {
    textTransform: 'uppercase',
    letterSpacing: '.2em',
    fontSize: '1.5em',
    color: '#fff'
  },
  headThird: {
    fontSize: '1.3em',
    textTransform: 'capitalize',
    letterSpacing: '.1em',
    wordSpacing: '.1em',
    textAlign: 'center'
  },
  box: {
    backgroundColor: '#444',
  },
  text: {
    fontSize: '1.5em',
    lineHeight: '1.6em',
    textTransform: 'capitalize',
    
    
  }, 
})


function App() {
  const [data, setData] = useState([]);
  const [rhymedata, setRhymedata] = useState([]);
  const [adjectivedata, setAdjectivedata] = useState([]);
  
  const [same, setSame] = useState('');
  const [rhyme, setRhyme] = useState('');
  const [adjective, setAdjective] = useState('');
  

  const classes = useStyles();

  const url = 'https://api.datamuse.com';

  const getWords = async (type, query) => {

    const response = await fetch(`${url}/words?${type}=${query}&max=10`);
    const data = await response.json();
    setData(data);
    
  }
  const getRhymeWords = async (type, query) => {

    const response = await fetch(`${url}/words?${type}=${query}&max=10`);
    const data = await response.json();
    setRhymedata(data);
    
  }
  const getAdjectiveWords = async (type, query) => {

    const response = await fetch(`${url}/words?${type}=${query}&max=10`);
    const data = await response.json();
    setAdjectivedata(data);
    
  }
  return (
      <>
      <Container>
        <AppBar position="static" className={classes.root}>
              <Box textAlign="center" py={4}>
                  <Typography variant="h4" className={classes.heading}>Wordify</Typography>
                  <Typography style={{wordSpacing: '.2em', letterSpacing: '.1em'}} variant="subtitle1" >Find The Best Words For Your Project</Typography>
              </Box>
        </AppBar>
        

        <Grid container spacing = {2}>
            <Grid item xs={12} md={4}>
              <Box textAlign="center" py={2} my={2} className={classes.box}>
                <Typography className={classes.headSecond}>Similar Words</Typography>
              </Box>
              
              <Paper>
                <Box textAlign="center">
                  <FormControl variant="outlined" >
                    <Box my={3}>
                    <Input 
                    value={same}
                    onChange={(e) => setSame(e.target.value)}
                    placeholder="Type the word"></Input>
                    </Box>
                    <Box mb={3}>
                      <Button variant="outlined" color="secondary"
                      onClick={() => getWords('ml',same)}
                      >
                        Find Words
                      </Button>
                    </Box>
                  </FormControl>
                   </Box>    
                      
                        {data &&
                        <div >
                            <h3 className={classes.headThird}>Words similar to <br></br><span style={{color: 'red'}}>{same}</span></h3>
                          <ul style={{paddingBottom: '1em', textAlign: 'center', marginRight: '3em', listStyle: 'none'}}>
                         {
                           data.map(item => {
                             const {word, index} = item;
                           return (<li key={index} className={classes.text}>{word}</li>)
                           })
                         } 
                        </ul>
                        </div>
                        }
                        
              </Paper>

              {/*Rhymes words */}
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center" py={2} my={2} className={classes.box}>
                <Typography className={classes.headSecond}>Rhyme Words</Typography>
              </Box>

              
              <Paper>
                <Box textAlign="center">
                  <FormControl variant="outlined" >
                    <Box my={3}>
                    <Input 
                    value={rhyme}
                    onChange={(e) => setRhyme(e.target.value)}
                    placeholder="Type the word"></Input>
                    </Box>
                    <Box mb={3}>
                      <Button variant="outlined" color="secondary"
                      onClick={() => getRhymeWords('rel_rhy',rhyme)}
                      >
                        Find Words
                      </Button>
                    </Box>
                  </FormControl>
                      </Box> 
                        {rhymedata &&
                        <div>
                            <h3 className={classes.headThird}>Words that rhymes with <br /> <span style={{color: 'red'}}>{rhyme}</span></h3>
                          <ul style={{paddingBottom: '1em', textAlign: 'center', marginRight: '3em', listStyle: 'none'}}>
                         {
                           rhymedata.map(item => {
                             const {word, index} = item;
                           return (<li key={index} className={classes.text}>{word}</li>)
                           })
                         } 
                        </ul>
                        </div>
                        }
              </Paper>
            </Grid>

            {/*Adjective words */}
            <Grid item xs={12} md={4}>
              <Box textAlign="center" py={2} my={2} className={classes.box}>
                <Typography className={classes.headSecond}>Adjective Words</Typography>
              </Box>

              
              <Paper className={classes.paper}>
                <Box textAlign="center">
                  <FormControl variant="outlined" >
                    <Box my={3}>
                    <Input 
                    value={adjective}
                    onChange={(e) => setAdjective(e.target.value)}
                    placeholder="Type the word"></Input>
                    </Box>
                    <Box mb={3}>
                      <Button variant="outlined" color="secondary"
                      onClick={() => getAdjectiveWords('rel_jjb',adjective)}
                      >
                        Find Words
                      </Button>
                    </Box>
                  </FormControl>
                      </Box> 
                        {adjectivedata &&
                        <div>
                            <h3 className={classes.headThird}>Words that describes <br></br>  <span style={{color: 'red'}}>{adjective}</span></h3>
                          <ul style={{paddingBottom: '1em', textAlign: 'center', marginRight: '3em', listStyle: 'none'}}>
                         {
                           adjectivedata.map(item => {
                             const {word, index} = item;
                           return (<li key={index} className={classes.text}>{word}</li>)
                           })
                         } 
                        </ul>
                        </div>
                        }
              </Paper>
            </Grid>
        </Grid>
          
          {/*footer */}
        <AppBar position="static" className={classes.foot}>
              <Box textAlign="center" py={1}>
                  <Typography variant="h6" style={{fontStyle: 'italic'}}>Created by Sujal lama. &copy; 2020</Typography>
              </Box>
        </AppBar>
        </Container>
      </>    
  );
}

export default App;
