import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ColorfulButton from "./ColorfulButton";
import Chip from "@material-ui/core/Chip";
import {findCategory} from "../utils";
import ImagePlaceholder from '../vendor/assets/placeholder.png';

const AdvertisementItem = (props) => {
    const {category,description,image,owner,price,record_id,title,status} = props.data
    const activeCategory = findCategory(category,props.type).label;
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} style={{padding: '8px 0px'}}>
            <Card style={{maxWidth: 345,height : 400}}>
                <CardActionArea onClick={props.cardClick ?  () => props.cardClick() : null}>
                    <div className="advertisement-item-image-container">
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        style={{maxWidth : 256,maxHeight : 256,margin : '0 auto',width : 'auto',height : 'auto'}}
                        image={image && image == '1' ? `http://localhost:3001/advertisement/${record_id}/image` : ImagePlaceholder}
                        title="Contemplative Reptile"
                    />
                    </div>
                    {activeCategory ? <Chip variant="default" label={activeCategory} style={{position : 'absolute',top : 8,right : 8}} /> : null}
                    <CardContent>
                        <div style={{display : 'flex',justifyContent :'flex-start',alignItems :'center'}}>
                        <span style={{fontSize: 24}}>
                            {title}
                        </span>
                            <span style={{fontSize: 14,paddingLeft : 8}}>
                            {price}₺
                        </span>
                        </div>
                        {description ? <p>
                            {description}
                        </p> : <p><i>No description provided</i></p>}
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {props.info ?
                        <ColorfulButton style={{width: '100%'}} variant="outlined" color="primary"
                                        onClick={props.infoClick}>
                            Details
                        </ColorfulButton> :
                        [
                            <ColorfulButton size="small" variant="outlined" color="orange" onClick={props.editClick}>
                                Edit
                            </ColorfulButton>,
                            <ColorfulButton size="small" variant="outlined" color="red" onClick={props.deleteClick}>
                                Remove
                            </ColorfulButton>
                        ]
                    }
                    {props.isAdmin ? status && status == 1 ?
                        <ColorfulButton size="small" variant="outlined" color="primary" onClick={props.changeStatus}>
                             Make Passive
                        </ColorfulButton> : <ColorfulButton size="small" variant="outlined" color="primary" onClick={props.changeStatus}>
                            Make Active
                        </ColorfulButton> : null}
                </CardActions>
            </Card>
        </Grid>
    )
}

export default AdvertisementItem;