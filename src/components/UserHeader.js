import React from 'react';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import { connect } from 'react-redux';

import { fetchUsers } from '../actions'

class UserHeader extends React.Component {

    useStyles() {
        return makeStyles(theme => ({
            inline: {
                display: 'inline',
            }
        }));
    }

    render() {
        let karma = '';
        
        if(this.props.user)
            karma = this.props.user.comment_karma + this.props.user.link_karma;
                
        const classes = this.useStyles();

        return (
            <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textSecondary"
            >
                {"  —  Karma Rating: " + karma}
            </Typography>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.users.users.find(author => author.name === ownProps.author)
    }
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);