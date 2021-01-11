import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    MenuItem,
    Paper,
    Select,
    Radio,
    RadioGroup,
    TextField,
    Tooltip,
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            //width: '20%',
            //width: '25ch',
            display: "flex",
            height: "100%"
          },
    }, 
    paper: {
        width: "100%",
        height: "100%",
        padding: "2%",
        
    },
    grid: {
        padding: "0px",
        marginRight: "auto",
        marginLeft: "auto"

    },
    full_width: {
        width: "100%",
    }
}))


export default function StepOneForm(props) {
    const classes = useStyles();

    const handleChange = (key, event) => {
        //props.setResults({...props.results, [key]: event.target.value});
        props.setQuery({...props.query, [key]: event.target.value});

        if (key === "c_3_1") {
            if (event.target.value === "yes") {
                document.getElementById("c_3_1_additional").style.display="block"
            } else {
                document.getElementById("c_3_1_additional").style.display="none"
            }
        }
    }
   
    const handleNext = () => {
        props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
        props.setQuery({
            ...props.query,
            "patient_id": document.getElementById("patient_id").value,
            "variant_id": document.getElementById("variant_id").value,
            "target_gene": document.getElementById("target_gene").value,
            "chro": document.getElementById("chro").value,
            "pos": document.getElementById("pos").value,
            "alt": document.getElementById("alt").value,
        })
    };

    return (
        <React.Fragment>
            <form className={classes.root} autoComplete="off">
                <Grid className={classes.grid} container direction="row" justify="center" alignItems="center" alignContent="flex-end" spacing={3}>
                    <Paper className={classes.paper}>
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={5}>
                                <TextField fullWidth id="patient_id" label="Patient ID" helperText="(optional)" variant="outlined"/>
                            </Grid>
                            <Grid item xs={5}>
                                <TextField fullWidth id="variant_id" label="Variant ID" helperText="(optional)" variant="outlined"/>
                            </Grid>
                        </Grid>
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel component="legend">Reference Genome</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="ref_genome" id="ref_genome" name="ref_genome" value={props.query["ref_genome"]} onChange={(e) => handleChange('ref_genome', e)} row>
                                        <FormControlLabel value="hg19" control={<Radio />} label="hg19" row="True" />
                                        <FormControlLabel value="hg38" control={<Radio />} label="hg38" row="True" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel>Variant Coordinates</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <Grid justify="center" container spacing={3}>
                                    <Grid item xs={4}>
                                        <TextField fullWidth id="chro" label="chr" variant="outlined"/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField fullWidth id="pos" label="pos" variant="outlined"/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField fullWidth id="alt" label="alt" variant="outlined"/>
                                    </Grid>
                                </Grid>
                                <Grid justify="center" container spacing={3}>
                                    <Grid item xs={12}>
                                        OR
                                    </Grid>
                                </Grid>
                                <Grid justify="center" container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField fullWidth id="gnomad_coor" label="chr-pos-ref-alt" variant="outlined"/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel>Variant or locus previously statistically associated with the same or a similar phenotype?</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Select fullWidth id="c_1_3" value={props.query["c_1_3"] ? props.query["c_1_3"] : " "} onChange={(e) => handleChange('c_1_3', e)} variant="outlined">
                                        <MenuItem value={"yes"}>Yes</MenuItem>
                                        <MenuItem value={"no"}>No</MenuItem>
                                        <MenuItem value={"unknown"}>Unknown</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel>Variant shows familiar segregation in the family</FormLabel>
                                <Tooltip title={"If yes is selected, detailed questions concerning the variant segregation in the family will be asked"}>
                                    <InfoOutlinedIcon fontSize="small"/>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Select id="c_3_1" value={props.query["c_3_1"] ? props.query["c_3_1"] : " "} onChange={(e) => handleChange('c_3_1', e)} variant="outlined">
                                        <MenuItem value={"yes"}>Yes</MenuItem>
                                        <MenuItem value={"no"}>No</MenuItem>
                                        <MenuItem value={"unknown"}>Unknown</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <div id="c_3_1_additional" style={{display: "none"}}>
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={5}>
                                    <FormLabel>Variant segregation</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="c_3_1_additional" name="c_3_1_additional" value={props.query["c_3_1_additional"] ? props.query["c_3_1_additional"] : " "} onChange={(e) => handleChange('c_3_1_additional', e)}>
                                            <FormControlLabel value="trio" control={<Radio />} label="Variant segregate as expected in a trio* (parents and proband)"/>
                                            <FormControlLabel value="small_family" control={<Radio />} label="Variant segregate as expected in a small family* (trio and 1 or 2 siblings)"/>
                                            <FormControlLabel value="large_family" control={<Radio />} label="Variant segregate as expected in a large family* (over 5 individuals)"/>
                                        </RadioGroup>
                                        <FormHelperText>*Both parental samples were shown through identity testing to be the biological parents of the patient</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel>Variant observed in multiple, unrelated families with the same disease phenotype?</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Select id="c_4_1" value={props.query["c_4_1"] ? props.query["c_4_1"] : " "} onChange={(e) => handleChange('c_4_1', e)} variant="outlined">
                                        <MenuItem value={"yes"}>Yes</MenuItem>
                                        <MenuItem value={"no"}>No</MenuItem>
                                        <MenuItem value={"unknown"}>Unknown</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel>Target Gene</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <TextField fullWidth id="target_gene" label="" helperText="(required)" variant="outlined"/>
                            </Grid>
                        </Grid>
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel>Variant genotype in the patient</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Select id="new_c" value={props.query["new_c"] ? props.query["new_c"] : ""} onChange={(e) => handleChange('new_c', e)} variant="outlined">
                                        <MenuItem value={"heterozygous"}>Heterozygous</MenuItem>
                                        <MenuItem value={"homozygous"}>Homozygous</MenuItem>
                                        <MenuItem value={"compound_het"}>Compound Het</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </form>
            
            <div>
                {/*
                <Button disabled className={classes.backButton}>
                    Back
                </Button>
                */}
                <Button variant="contained" color="primary" onClick={handleNext}>
                    Next
                </Button>
            </div>
            
            
        </React.Fragment>
    )
}