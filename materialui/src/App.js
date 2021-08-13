import './App.css';
//import { MaterialPickers } from './Datetime';
//import { GridTemplate } from './GridTemplate';
//import { SearchAppBar } from './AppBar';
//import { TemporaryDrawer } from './Drawer2';
//import { TestGridNoWrap } from './GridTemplate2';
import { Grid } from '@material-ui/core';
import { MediaCard } from './CardTemplate';

function App() {
  return (
    <div className="App">
      <Grid container spacing={1}>
      <Grid item xs={3}/>
      <Grid item xs={3}/>
      <Grid item xs={3}>
        <MediaCard /> 
        <MediaCard /> 
      </Grid>
      </Grid>
    </div>
  );
}

/**
 * <Grid container spacing={3}>
        <Grid item xs={3} />
        <Grid item xs={3}>
          <TestGridNoWrap />
        </Grid>
        <Grid item xs={3} />
      </Grid>
 */

export default App;
