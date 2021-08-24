import React, {useState} from 'react';
import { 
    ThemeProvider,
    makeStyles 
} from '@material-ui/core/styles';
import { 
    Accordion,
    AccordionDetails,
    AccordionSummary,
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
    Link,
    Typography, 
} from '@material-ui/core';
import clsx from 'clsx';
import theme from '../styles/theme';
import NavBar from '../components/NavBar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    pageHeader: {
        paddingTop: '50px',
    },
    accordionHeader: {
        paddingTop: '10px',
      },
    root: {
        display: 'flex',
    },
    card: {
        display: 'flex',
        padding: "2%",
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
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
    tableHead: {
        verticalAlign: 'top',
        fontWeight: 'normal',
        fontSize: '17px',
    },
    details: {
        flexDirection: "column"
      }
}));


export default function Faq() {
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
                                                <Typography variant="h4" align="left" gutterBottom>
                                                    FAQ/Help
                                                </Typography>
                                                <Divider />
                                                <br></br>
                                                <Typography variant="body1" color="textSecondary">
                                                    We hope that the website will be intuitive. You can use 
                                                    the example to score a variant and explore the process. 
                                                    This page will be expanded over time, as users ask us 
                                                    questions, so feel free to <Link href="/contact" color="secondary">contact us</Link> if you encounter 
                                                    a problem. 
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header">
                                                <Typography variant="h6" color="secondary">
                                                    What are the steps to obtain the RVE-Score?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body1" component={'span'} color="textSecondary" paragraph>
                                                    There are 3 steps involved when using RevUP to score regulatory variants:
                                                    <br></br>
                                                    <ul>
                                                        <li>Step 1 includes questions about the variant</li>
                                                        <li>Step 2 includes questions about the potential target gene and the variant</li>
                                                        <li>Step 3 allows users to modify answers and add comments/remarks</li>
                                                    </ul>
                                                    In step 3, users can modify their answers, as well as add information / 
                                                    remarks. For example, the user could add the reference of the paper where they 
                                                    found the information for a given evidence.
                                                    <br></br>  
                                                    Finally, the user will obtain the final score as well as a document 
                                                    summarizing the details provided.
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel9-content"
                                                id="panel9-header">
                                                <Typography variant="h6" color="secondary">
                                                    How to add information about the variant, the target gene 
                                                    or the genomic region that were not found by RevUP?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    RevUP queries automatically a maximum of features, but it 
                                                    may not find the latest CHIP-seq results for your region of 
                                                    interest, and therefore, this will not be reflected in the 
                                                    score. To compensate, users can manually modify the score 
                                                    during step 3, and add a comment / remark to explain why 
                                                    they modified the score.
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel9-content"
                                                id="panel9-header">
                                                <Typography variant="h6" color="secondary">
                                                    Is it better to input coordinates in hg37 or hg38?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    All of the external databases are queried using the GRCh38 coordinates, therefore it is better
                                                    if the user uses GRCh38 coordinates in RevUP. However, the user can also query RevUP using GRCh37
                                                    coordinates and a lift-over is performed using a Python implemantation of the UCSC LiftOver tool.
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel4-content"
                                                id="panel4-header">
                                                <Typography variant="h6" color="secondary">
                                                    When I have the RVE-score, how do I know if the variant is pathogenic?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography  variant="body1" color="textSecondary" paragraph>
                                                    The scoring system for potential regulatory variants is not a 
                                                    classification system for variant pathogenicity. You should refer 
                                                    to the latest <Link href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4544753/" target="_blank" color="secondary">ACMG / AMP guidelines</Link>.
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel9-content"
                                                id="panel9-header">
                                                <Typography variant="h6" color="secondary">
                                                    How is the answer "Unknown" scored?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    By default, "unknown" is selected, giving a score of 0 to the evidence. 
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel6-content"
                                                id="panel6-header">
                                                <Typography variant="h6" color="secondary">
                                                    What source of information is RevUP using?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails className={classes.details}>
                                                <Typography  variant="body1" color="textSecondary" paragraph>
                                                    To know the details behind the scoring system and which databases the tool 
                                                    is querying, refer to the Table 1 below.
                                                </Typography>

                                                <div>
                                                    <TableContainer>
                                                        <Table aria-label="table1" style={{ whiteSpace: 'pre-line' }}>
                                                            <colgroup>
                                                                <col style={{width:'20%'}}/>
                                                                <col style={{width:'20%'}}/>
                                                                <col style={{width:'20%'}}/>
                                                                <col style={{width:'20%'}}/>
                                                                <col style={{width:'20%'}}/>
                                                            </colgroup>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell className={classes.tableHead}>
                                                                        Evidence Level: Evidence for Pathogenicity
                                                                    </TableCell>
                                                                    <TableCell className={classes.tableHead}>
                                                                        Source of Information
                                                                    </TableCell>
                                                                    <TableCell className={classes.tableHead}>
                                                                        Information Extracted
                                                                    </TableCell>
                                                                    <TableCell className={classes.tableHead}>
                                                                        Scoring
                                                                    </TableCell>
                                                                    <TableCell className={classes.tableHead}>
                                                                        Query
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell rowspan={2}>
                                                                        C1.1: Variant position is evolutionarily conserved
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        PhyloP (Cooper <i>et al.</i>, 2005)
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        PhyloP Score
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        PhyloP &gt; 1.5 or
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        UCSC REST API;{"\n"}track: phyloP100way;{"\n"}hg38
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        PhastCons (Siepel <i>et al.</i>, 2005))
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        PhastCons Score
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        PhastCons &gt; 0.5
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        UCSC REST API;{"\n"}track: phastCons100way;{"\n"}hg38
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        C1.2 : Variant is rare in unaffected individuals in specific 
                                                                        sets of controls or reference population databases
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        gnomAD v3.1.1 (Karczewski <i>et al.</i>, 2020)  
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        Allele count (AC) {"\n"}
                                                                        Allele Number (AN) {"\n"}
                                                                        Number of homozygotes
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        gnomAD AF &lt; 0.05 
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        gnomAD GraphQL;{"\n"}dataset: gnomad_r3;{"\n"}hg38
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        C2.3 : Variant is considered deleterious by computational prediction methods 
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        CADD v1.6 (Rentzsch <i>et al.</i>, 2019)
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        CADD phred score
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        CADD &gt; 15
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        CADD REST API;{"\n"}v1.0;{"\n"}GRCh38
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        F1.1 : Variant position is implicated in TF binding based on experimental data 
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        ReMap 2020 (Chèneby <i>et al.</i>, 2020)
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        TF included in overlapping Cis-Regulatory Modules (CRMs)
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        If the variant position intersect with at least one CRM → 1;{"\n"}else → 0
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        Intersect with file downloaded from ReMap 2020, Homo Sapiens, 
                                                                        CRMs, hg38 (1.7 millions)
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        F1.2 : Variant localizes to a regulatory region based on genome annotations
                                                                    </TableCell>
                                                                    <TableCell rowspan={3}>
                                                                        ENCODE / SCREEN (Davis <i>et al.</i>, 2018)
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        cCRE details : cCRE, description and name
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        If the variant position intersect with at least one cCRE → 1;{"\n"}else → 0
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        UCSC REST API;{"\n"}track: encodeCcreCombined;{"\n"}hg38
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        F1.3 : Regulatory region and target gene are directly linked based 
                                                                        on annotation or experimental data
                                                                    </TableCell>
                                                                    <TableCell rowspan={2}>
                                                                        Method and cell type
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        if F1.2 = 0 → 0;{"\n"}
                                                                        else, if cCRE and potential target gene linked based on eQTL method → 1;{"\n"}
                                                                        else → 0
                                                                    </TableCell>
                                                                    <TableCell rowspan={2}>
                                                                        SCREEN GraphQL;{"\n"}GRCh38
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        F1.4 : Variant is statistically associated with expression levels 
                                                                        of the target gene
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        if F1.2 = 0 → 0; {"\n"}
                                                                        else, if cCRE and potential target gene linked based on Hi-C or 
                                                                        CHIA-PET method → 1; {"\n"}
                                                                        else → 0
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel2-content"
                                                id="panel2-header">
                                                <Typography variant="h6" color="secondary">
                                                    How to score compound Heterozygous variants?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    To date, the tool does not allow to score compound heterozygous 
                                                    variants in a combined fashion. Users should score both variants 
                                                    separately and then combine the results in a critical manner, as 
                                                    features may not be additive, and scores are not additive. 

                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel3-content"
                                                id="panel3-header">
                                                <Typography variant="h6" color="secondary">
                                                    How to score structural variants?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography  variant="body1"  color="textSecondary" paragraph>
                                                    To date, the tool only allow the scoring of non-coding SNV (
                                                    Single Nucleotide Variants). To obtain the score of a structural 
                                                    variant, user should refer to the tables in 
                                                    <Link href="https://doi.org/10.1016/j.tig.2020.04.006" target="_blank" color="secondary">
                                                        Van der Lee R, Correard S and Wasserman WW in “Deregulated Regulators: 
                                                        Disease-Causing cis Variants in Transcription Factor Genes” (Trends in Genetics, 2020)
                                                    </Link>
                                                    <br></br>
                                                    We are planning on working on this feature for a future release.
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel5-content"
                                                id="panel5-header">
                                                <Typography variant="h6" color="secondary">
                                                    What information are you keeping when I score a variant?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body1" color="textSecondary" gutterBottom>
                                                    In order to create statistics on the submission, we do keep metadata. 
                                                    We do not conserve users information (IP address) nor do we conserve the 
                                                    variant details (chromosome, position, reference allele, alternate allele), 
                                                    so we won’t be able to study individual variants that are submitted. Our 
                                                    goal is to measure how many users submit variants, the reference genome 
                                                    selected, how many users did functional analysis, etc.
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel7-content"
                                                id="panel7-header">
                                                <Typography variant="h6" color="secondary">
                                                    How do I report a bug, a question or suggest an amelioration?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    Use the <Link href="/contact" color="secondary">contact page</Link>!
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel8-content"
                                                id="panel8-header">
                                                <Typography variant="h6" color="secondary">
                                                    How should I cite this work?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    A manuscript describing RevUP is under review.  In the meantime, if you used this 
                                                    website to score a variant, please cite:
                                                    <br></br>
                                                    van der Lee R, Correard S, Wasserman WW. Deregulated Regulators: Disease-Causing 
                                                    cis Variants in Transcription Factor Genes. Trends Genet. 2020 Jul;36(7):523-539. 
                                                    doi: 10.1016/j.tig.2020.04.006. Epub 2020 May 22. PMID: 32451166.
                                                    <br></br>
                                                    {/* TODO: Add link to webpapge paper when published*/ }
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
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