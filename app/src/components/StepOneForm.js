import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    Link,
    MenuItem,
    Paper,
    Select,
    Radio,
    RadioGroup,
    TextField,
    Tooltip,
    Typography, 
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
    const [targetGeneError, setTargetGeneError] = useState({
        "error": false,
        "message": "",
    })
    const [refGenomeError, setRefGenomeError] = useState({
        "error": false,
        "message": "",
    })
    const [variantCoordError, setVariantCoordError] = useState({
        "error": false,
        "message": "",
    })

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

    const handleExample = () => {
        props.setQuery({
            ...props.query,
            "chro": "17",
            "pos": "4890930",
            "alt": "T",
            "target_gene": "CAMTA2",
            "ref_genome": "hg19",
            "gnomad_coor": "17-4890930-C-T"
        })
    }
   
    const handleNext = () => {
        var isError = false;

        // Check target gene
        if (document.getElementById("target_gene").value === "") {
            setTargetGeneError({...targetGeneError, "error": true, "message": "This field cannot be empty"})
            isError = true;
        } else {
            setTargetGeneError({...targetGeneError, "error": false, "message": ""})
        }
        // Check reference genome
        if (props.query["ref_genome"] === "") {
            setRefGenomeError({...refGenomeError, "error": true, "message": "This field cannot be empty"})
            isError = true;
        } else {
            setRefGenomeError({...refGenomeError, "error": false, "message": ""})
        }
        // Check variant coordinates
        var chro = document.getElementById("chro").value
        var pos = document.getElementById("pos").value
        var alt = document.getElementById("alt").value
        var gnomad = document.getElementById("gnomad_coor")
        if ((chro === "" && pos === "" && alt === "") && (gnomad === "")) {
            setVariantCoordError({...variantCoordError, "error": true, "message": "One of these fields must be filled"})
            isError = true;
        } else if ((chro === "" && pos === "" && alt === "") && (gnomad !== "")) {
            setVariantCoordError({...variantCoordError, "error": true, "message": "One of these fields must be filled"})
            isError = true;
        } else if ((chro !== "" && pos !== "" && alt !== "") && (gnomad === "")) {
            setVariantCoordError({...variantCoordError, "error": true, "message": "One of these fields must be filled"})
            isError = true;
        } else {
            setVariantCoordError({...variantCoordError, "error": false, "message": ""})
        }
        
        // If there are no errors on the page
        if (isError === false) {
            props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }  
    };

    return (
        <React.Fragment>
            <form className={classes.root} autoComplete="off">
                <Grid className={classes.grid} container direction="row" justify="center" alignItems="center" alignContent="flex-end" spacing={3}>
                    <Paper className={classes.paper}>
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={2}>
                                Example Variant:  
                            </Grid>
                            <Grid item xs={8}>
                                <Link href="#" onClick={handleExample}>
                                    17-4890930-C-T
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={5}>
                                <TextField 
                                    fullWidth 
                                    id="patient_id" 
                                    label="Patient ID" 
                                    helperText="(optional)" 
                                    variant="outlined"
                                    value={props.query["patient_id"]}
                                    onChange={(e) => handleChange('patient_id', e)} 
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField 
                                    fullWidth 
                                    id="variant_id" 
                                    label="Variant ID" 
                                    helperText="(optional)" 
                                    variant="outlined"
                                    value={props.query["variant_id"]}
                                    onChange={(e) => handleChange('variant_id', e)} 
                                />
                            </Grid>
                        </Grid>
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel component="legend">Reference Genome *</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl component="fieldset" error={refGenomeError["error"]}>
                                    <RadioGroup aria-label="ref_genome" id="ref_genome" name="ref_genome" value={props.query["ref_genome"]} onChange={(e) => handleChange('ref_genome', e)} row>
                                        <FormControlLabel value="hg19" control={<Radio />} label="GRCh37/hg19" row="True" />
                                        <FormControlLabel value="hg38" control={<Radio />} label="GRCh38/hg38" row="True" />
                                    </RadioGroup>
                                    <FormHelperText>{refGenomeError["message"]}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel>Variant Coordinates *</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl component="fieldset" error={variantCoordError["error"]}>
                                    <Grid justify="center" container spacing={3}>
                                        <Grid item xs={4}>
                                            <TextField 
                                                fullWidth 
                                                id="chro" 
                                                label="chr" 
                                                variant="outlined" 
                                                value={props.query["chro"]}
                                                error={variantCoordError["error"]}
                                                onChange={(e) => handleChange('chro', e)} 
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField 
                                                fullWidth 
                                                id="pos" 
                                                label="pos" 
                                                variant="outlined" 
                                                value={props.query["pos"]}
                                                error={variantCoordError["error"]}
                                                onChange={(e) => handleChange('pos', e)} 
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField 
                                                fullWidth 
                                                id="alt" 
                                                label="alt" 
                                                variant="outlined" 
                                                value={props.query["alt"]}
                                                error={variantCoordError["error"]}
                                                onChange={(e) => handleChange('alt', e)} 
                                            />
                                        </Grid>
                                        <FormHelperText>{variantCoordError["message"]}</FormHelperText>
                                    </Grid>
                                    <Grid justify="center" container spacing={3}>
                                        <Grid item xs={2}>
                                            OR
                                        </Grid>
                                    </Grid>
                                    <Grid justify="center" container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField 
                                                fullWidth 
                                                id="gnomad_coor" 
                                                label="chr-pos-ref-alt" 
                                                variant="outlined" 
                                                value={props.query["gnomad_coor"] || ""}
                                                error={variantCoordError["error"]}
                                                onChange={(e) => handleChange('gnomad_coor', e)} 
                                            />
                                            <FormHelperText>{variantCoordError["message"]}</FormHelperText>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel>Target Gene *</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <TextField 
                                    fullWidth 
                                    id="target_gene" 
                                    label="" 
                                    helperText={targetGeneError["message"]}
                                    variant="outlined"
                                    value={props.query["target_gene"] || ""}
                                    error={targetGeneError["error"]}
                                    onChange={(e) => handleChange('target_gene', e)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={10}>
                                <Divider />
                                <Typography variant="h4" align="left" gutterBottom>
                                    Variant Information
                                </Typography>
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
                                            <FormControlLabel value="trio" control={<Radio />} label="Variant segregate as expected in a trio ** (parents and proband)"/>
                                            <FormControlLabel value="small_family" control={<Radio />} label="Variant segregate as expected in a small family ** (trio and 1 or 2 siblings)"/>
                                            <FormControlLabel value="large_family" control={<Radio />} label="Variant segregate as expected in a large family ** (over 5 individuals)"/>
                                        </RadioGroup>
                                        <FormHelperText>** Both parental samples were shown through identity testing to be the biological parents of the patient</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel>Variant observed in multiple, unrelated families with the same disease phenotype</FormLabel>
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
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel>Variant or locus previously statistically associated with the same or a similar phenotype</FormLabel>
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
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={10}>
                                <FormHelperText>* Indicates the field is required</FormHelperText>
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