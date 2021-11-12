import { Box, Grid } from "@material-ui/core";
import React from "react";
import Button from "../../../../shared/Frx-components/button/Button";
import "./CommercialPopup.scss";
export default class ArchivePopup extends React.Component<any, any> {
render(){
    return(
        <div className="popup-container">
            <Grid container>
            <Grid item xs={12}>
                <p>Do you want to archive the version or the full formulary: <span>"2021Care926-1"</span></p>
            </Grid>
            <Grid item xs={12}>
                <div className="action-btn">
                    <Button label="Cancel" htmlFor="upload-file" className="upload-button cancel-btn"/>
                    <Button label="Archive Version" htmlFor="upload-file" className="upload-button save-btn"/>
                    <Button label="Archive Full Formulary" htmlFor="upload-file" className="upload-button save-btn"/>
                </div>
            </Grid>
            </Grid>
        </div>
    );
}
}