export function ClinicalResultsTableCSV(props) {
    // Generate rows
    //var rows = [];
    /*
    var rows = [
        ["evidence description", "score", "comments/additional information"],
        ["1", "2", "3"]
    ]*/
    var rows = []
    var comments = "";
    var row = [];
    rows.push(["Evidence Description", "Score", "Comments/Additional Information"]);
    for (var key in props.clinicalEvidenceLabels) {
        comments = "";
        row.push("\"" + props.clinicalEvidenceLabels[key] + "\"");
        row.push(props.modifiedScores[key]);

        if(key === "c_1_1") {
            comments = "phastCons score:" + props.additionalInfo["c_1_1"]["phastcons"] + ";";
            comments = comments + "phyloP score:" + props.additionalInfo["c_1_1"]["phylop"] + ";";

        } else if(key === "c_1_2") {
            comments = "gnomAD Allele Frequency:" + props.additionalInfo["c_1_2"]["af"] + ";";
        } else if(key === "c_2_3") {
            comments = "CADD score:" + props.additionalInfo["c_2_3"]["cadd_score"] + ";";
        } 

        if(props.comments[key] !== "") {
            comments = comments + "comments:" + props.comments[key] + ";";
        }

        row.push("\"" + comments + "\"");
        rows.push(row);
        row = [];
    }   
    
    

    //Header
    //rows += ["Evidence Description", "Score", "Comments/Additional Information"];

    // Create object for CSV
    let csvContent = "";

    rows.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    return csvContent
}

export function FunctionalResultsTableCSV(props) {
    var rows = []
    var comments = "";
    var row = [];

    // Add the header
    rows.push(["Evidence Description", "Score", "Comments/Additional Information"]);
    
    // Add a each row in the table
    for (var key in props.functionalEvidenceLabels) {
        comments = "";
        row.push("\"" + props.functionalEvidenceLabels[key] + "\"");
        row.push(props.modifiedScores[key]);

        // Special cases with additional info
        if(key === "f_1_1") {
            comments = "ReMap 2020 Peaks:" + props.additionalInfo["f_1_1"]["crms"] + ";";
        } else if(key === "f_1_2") {
            comments = "cCREs:" + props.additionalInfo["f_1_2"]["ccre_descriptions"] + ";";
        } else if(key === "f_1_3") {
            comments = "Supporting Experiment:" + props.additionalInfo["f_1_3"] + ";";
        } else if(key === "f_1_f") {
            comments = "Supporting Experiment:" + props.additionalInfo["f_1_4"] + ";";
        } 

        if(props.comments[key] !== "") {
            comments = comments + "comments:" + props.comments[key] + ";";
        }

        // Add to table
        row.push("\"" + comments + "\"");
        rows.push(row);
        row = [];
    }   

    // Create object for CSV
    let csvContent = "";

    // Add commas to make the CSV
    rows.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    return csvContent
}