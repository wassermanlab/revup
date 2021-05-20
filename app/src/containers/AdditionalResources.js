import React, {useState} from 'react';
import { 
    ThemeProvider,
    makeStyles 
} from '@material-ui/core/styles';
import { 
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography, 
} from '@material-ui/core';
import clsx from 'clsx';
import theme from '../styles/theme';
import NavBar from '../components/NavBar';

const drawerWidth = 240;

const useStyles = makeStyles((custom_theme) => ({
    pageHeader: {
        paddingTop: '50px',
    },
    root: {
        display: 'flex',
        width: '100%',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    card: {
        display: 'flex',
        padding: "2%",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    },
    grid: {
        padding: "0px",
        marginRight: "auto",
        marginLeft: "auto"
    },
    tableHead: {
        verticalAlign: 'top',
        fontWeight: 'normal',
        fontSize: '17px',
    }
}));


export default function AdditionalResources() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <div className={classes.root}>
                <ThemeProvider theme={theme}>
                    <NavBar
                        open={open}
                        setOpen={setOpen}
                    />
                    { /*  TODO: Insert logo image here */ }
                    <main
                        className={clsx(classes.content, {
                        [classes.contentShift]: open,
                        })}
                    >
                        <div className={classes.drawerHeader} />
                        <Container maxWidth="lg">
                            <Grid container direction="row" justify="center" alignItems="center" alignContent="flex-end" spacing={3}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Card className={classes.card}>
                                            <CardContent>
                                                <Typography variant="h4">
                                                    Evidence Classification Tables for Regulatory Variants
                                                </Typography>
                                                <Divider />
                                                <br></br>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    The following tables outline the evidence classification used 
                                                    to score variants in RevUP. They were created by Van der Lee R, 
                                                    Correard S and Wasserman WW in “Deregulated Regulators: Disease-
                                                    Causing cis Variants in Transcription Factor Genes” (Trends in 
                                                    Genetics, 2020).
                                                </Typography>
                                                <br></br>
                                                <Typography variant="h5" align="left" color="secondary" gutterBottom>
                                                    <b>Clinical Evidence - is there a causal link between genotype and phenotype?</b>
                                                </Typography>
                                                <TableContainer>
                                                    <Table aria-label="clinical table" style={{whiteSpace: 'pre-line' }}>
                                                        <colgroup>
                                                            <col style={{width:'10%'}}/>
                                                            <col style={{width:'20%'}}/>
                                                            <col style={{width:'35%'}}/>
                                                            <col style={{ width:'35%'}}/>
                                                        </colgroup>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell colspan={2} className={classes.tableHead}>
                                                                    Evidence Level
                                                                </TableCell>
                                                                <TableCell className={classes.tableHead}>
                                                                    Evidence for Pathogenicity
                                                                </TableCell>
                                                                <TableCell className={classes.tableHead}>
                                                                    Examples
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell rowspan={2} align="center">
                                                                    5 {"\n"} (High)
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            5.2
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            Vb
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant introduction (in a model organism results in a phenotype that is consistent with the human disease
                                                                </TableCell>
                                                                <TableCell>
                                                                    - Transgenic model organism developed using CRISPR genome editing
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            5.1
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            *
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant neutralization (in a model organism or cell line) rescues or reverses phenotype
                                                                </TableCell>
                                                                <TableCell>
                                                                    - Knockout/knockdown/silencing of the variant in gain-offunction scenarios {"\n"}
                                                                    - Complementation in loss-of-function scenarios
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell rowspan={2} align="center">
                                                                    4
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            4.2
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant results (in a cellular phenotype) consistent with the disease phenotype {"\n"}
                                                                    - Insights are only relevant if the endophenotype assayed is consistent with the disease phenotype
                                                                </TableCell>
                                                                <TableCell>
                                                                - Patient-derived tissue/cells/induced pluripotent stem cells (iPSCs) {"\n"}
                                                                - Transgenic cell lines {"\n"}
                                                                - In vivo essays of cellular function
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            4.1
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant observed in multiple, unrelated families with the same disease phenotype {"\n"}
                                                                    - Typically only relevant when multiple well-described pedigrees are available, and in which the variant segregates with disease
                                                                </TableCell>
                                                                <TableCell>
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center">
                                                                    3
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            3.1
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant shows familial segregation with the disease {"\n"}
                                                                    - Variant or locus segregates with affected and unaffected disease status in family pedigree{"\n"}
                                                                    - Should be considered stronger with increasing segregation data in larger families. For example, de novo variants
                                                                    identified in a family trio are weak segregation evidence.
                                                                </TableCell>
                                                                <TableCell>
                                                                    - Trio whole-genome analysis {"\n"}
                                                                    - Linkage analysis
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell rowspan={5} align="center">
                                                                    2
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            2.5
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            @
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant is a striking noncoding event {"\n"}
                                                                    - Often involves a large genomic alteration containing many candidate regulatory elements and variants
                                                                </TableCell>
                                                                <TableCell>
                                                                    - Copy number changes, translocation/breakpoint mapping, aCGH, MLPA ...
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            2.4
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            @
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant is similar to another regulatory variant associated to the same suspected target gene and implicated in the same or a similar disease phenotype {"\n"}
                                                                    - Variants are often not the exact same, but should be justifiably similar: for example, strong overlap, affect the same TFBS.
                                                                </TableCell>
                                                                <TableCell>
                                                                    - ClinVar, DECIPHER, GeneMatcher
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            2.3
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            @
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant is considered deleterious by computational prediction methods {"\n"}
                                                                    - Using in silico tools designed to include noncoding variants
                                                                </TableCell>
                                                                <TableCell>
                                                                    - CADD, FATHMM, FunSeq2, ReMM, NCBoost, ncGERP ...
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            2.2
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            G
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Suspected target gene does not contain coding variants in the same individual {"\n"}
                                                                    - In the gene targeted by the regulatory variant or in other key genes for the phenotype under study {"\n"}
                                                                    - Assess accordance with expected inheritance of the phenotype; that is, present in one or both alleles {"\n"}
                                                                </TableCell>
                                                                <TableCell>
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            2.1
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            @
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            G
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Suspected target gene has been implicated in the same or a similar disease phenotype, or is otherwise relevant {"\n"}
                                                                    - OMIM disease genes, literature, and gene function can provide insight {"\n"}
                                                                    - Dosage sensitive and haploinsufficient genes may be of increased interest {"\n"}
                                                                </TableCell>
                                                                <TableCell>
                                                                    - Other human patients {"\n"}
                                                                    - Knockout mice, biological link with phenotype, pLI metric
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell rowspan={3} align="center">
                                                                    1 {"\n"} (Low)
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            1.3
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            @
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            *
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant or locus previously statistically associated with the same or a similar disease phenotype
                                                                </TableCell>
                                                                <TableCell>
                                                                    - GWAS, risk alleles {"\n"}
                                                                    - Somatic recurrence in cancer
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            1.2
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            @
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant is rare in unaffected individuals in specific sets of controls or reference population databases {"\n"}
                                                                    - Variant absent in databases of unaffected/control individuals; or present with a frequency less than expected given the penetrance and expressivity of the disease {"\n"}
                                                                    - Publications preceeding the appearance of large reference databases tend to depend on custom sets of control samples
                                                                </TableCell>
                                                                <TableCell>
                                                                    - gnomAD {"\n"}
                                                                    - Control samples
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            1.1
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            @
                                                                        </Grid>
                                                                        <Grid item xs={3}> 
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant position is evolutionarily conserved
                                                                </TableCell>
                                                                <TableCell>
                                                                    - Genome browser conservation tracks
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                <br></br>
                                                <Typography variant="h5" align="left" color="secondary" gutterBottom>
                                                    <b>Functional Evidence - does the variant have a damaging effect on the gene?</b>
                                                </Typography>
                                                <TableContainer>
                                                    <Table aria-label="clinical table" style={{whiteSpace: 'pre-line' }}>
                                                        <colgroup>
                                                            <col style={{width:'10%'}}/>
                                                            <col style={{width:'20%'}}/>
                                                            <col style={{width:'35%'}}/>
                                                            <col style={{width:'35%'}}/>
                                                        </colgroup>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell colspan={2} className={classes.tableHead}>
                                                                    Evidence Level
                                                                </TableCell>
                                                                <TableCell className={classes.tableHead}>
                                                                    Evidence for Pathogenicity
                                                                </TableCell>
                                                                <TableCell className={classes.tableHead}>
                                                                    Examples
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell rowspan={1} align="center">
                                                                    4 {"\n"} (High)
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            4.1
                                                                        </Grid>
                                                                        <Grid item xs={3}>   
                                                                        </Grid>
                                                                        <Grid item xs={3}> 
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant introduction (in a model organism) leads to changes in expression of target/reporter gene orchromatin environment {"\n"}
                                                                    - CRISPR genome editing, Cre-Lox recombination (endogenous) {"\n"}
                                                                    - Reporter gene constructs (exogenous)
                                                                </TableCell>
                                                                <TableCell>
                                                                    - Any relevant technique listed under F2, below
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell rowspan={1} align="center">
                                                                    3
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            3.1
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant introduction (in a cell line) leads to changes in expression of target/reporter gene or chromatin environment {"\n"}
                                                                    - Engineered cell line or in vitro model system
                                                                </TableCell>
                                                                <TableCell>
                                                                    - Luciferase/LacZ reporter assay {"\n"}
                                                                    - MPRA/STARR-seq {"\n"}
                                                                    - Any relevant technique listed under F2
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell rowspan={2} align="center">
                                                                    2
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            2.2
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant leads to changes in expression of the target gene (in patient tissue) {"\n"}
                                                                    - Patient material compared with controls. Material from for example, tissue biopsy, cultured cells, iPSCs
                                                                </TableCell>
                                                                <TableCell>
                                                                    - RT-qPCR/RNA-seq expression analysis {"\n"}
                                                                    - Allele-specific expression (ASE) {"\n"}
                                                                    - Staining, immunohistochemistry
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            2.1
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant causes a change in TF binding and/or chromatin environment{"\n"}
                                                                    - Strongest if the studied TF binding site and regulatory region are key proven regulators of target gene expression
                                                                </TableCell>
                                                                <TableCell>
                                                                    - ChIP-seq/ChIP-qPCR/ChIP-MS (in vivo) {"\n"}
                                                                    - EMSA (in vitro) {"\n"}
                                                                    - Allele-specific binding (ASB) {"\n"}
                                                                    - Changes to chromatin domains/environment, DNA methylation
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell rowspan={5} align="center">
                                                                    1 {"\n"} (Low)
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            1.5
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            *
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            R-G
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Regulatory region is shown to regulate gene expression of the target gene {"\n"}
                                                                    - Typically involves characterization of a newly identified enhancer
                                                                </TableCell>
                                                                <TableCell>
                                                                    - Transgene reporter expression
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            1.4
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            @
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V-G
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant is statistically associated with expression levels of the target gene
                                                                </TableCell>
                                                                <TableCell>
                                                                    - cis-eQTL
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            1.3
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            @
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            R-G
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Regulatory region and target gene are directly linked based on annotation or experimental data
                                                                </TableCell>
                                                                <TableCell>
                                                                    - Core and proximal promoter annotations {"\n"}
                                                                    - Chromosome conformation capture (e.g., 3C, 5C, Hi-C), ChIAPET
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            1.2
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            @
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant localizes to a regulatory region based on genome annotations
                                                                </TableCell>
                                                                <TableCell>
                                                                    - Known or predicted regulatory elements (enhancers, promoters) {"\n"}
                                                                    - Chromatin accessibility and histone ChIP-seq data
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            1.1
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            @
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant position is implicated in TF binding based on experimental data
                                                                </TableCell>
                                                                <TableCell>
                                                                    - TF ChIP-seq datasets (e.g., ENCODE and ReMAP)
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell rowspan={2} align="center">
                                                                    0 {"\n"} (No Value)
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            0.2
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            @
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V-G
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant and target gene locate to the same structural domain according to chromatin annotations
                                                                </TableCell>
                                                                <TableCell>
                                                                    - 3D genome browser, TADs
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Grid container justify="flex-start" spacing={3}>
                                                                        <Grid item xs={3}>
                                                                            0.1
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            @
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            V
                                                                        </Grid>
                                                                    </Grid>
                                                                </TableCell>
                                                                <TableCell>
                                                                    Variant predicted to change a TF binding (sequence) motif
                                                                </TableCell>
                                                                <TableCell>
                                                                    - TFBS resources, (e.g., JASPAR, CIS-BP, Hocomoco)
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                <Typography variant="body1" color="textSecondary" paragraph style={{whiteSpace: 'pre-line' , fontSize: "12px"}}>
                                                    <sup>a</sup>Symbols: {"\n"}
                                                    @, attainable with bioinformatics tools and databases; {"\n"}
                                                    G, suspected target gene; {"\n"}
                                                    R, regulatory region containing variant position; {"\n"}
                                                    V, variant; {"\n"}
                                                    *, conceptually possible but we did not find this in practice due to focus on rare disease
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>
                    </main>
                </ThemeProvider>
            </div>
        </React.Fragment>
    )
}