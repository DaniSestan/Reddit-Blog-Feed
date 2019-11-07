import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { fetchPosts, fetchUser, fetchPostsAndUsers } from "../actions";
import UserHeader from "./UserHeader";

class PostList extends React.Component {

    componentDidMount() {
        // this.props.fetchPosts('baseball');
        this.props.fetchPostsAndUsers('pokemon');
    }
    
    useStyles() {
        return makeStyles(theme => ({
            root: {
                width: '100%',
                maxWidth: 360,
                backgroundColor: theme.palette.background.paper,
            },
            inline: {
                display: 'inline',
            },
        }));
    }
    
    renderList() {
        const classes = this.useStyles();
        
        return this.props.posts.posts.map((post, index) => {
            return(
                <div key={index}>
                    <ListItem>
                        <ListItemText
                            primary={post.data.title}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Posted by {post.data.author}
                                    </Typography>
                                    <UserHeader author={post.data.author} />
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider />
                </div>
            )
        })
    }
    
    render () {
        const classes = this.useStyles();
        
        return (
            <Container>
                <List className={classes.root}>
                    {this.renderList()}
                </List>
            </Container>
        )
    }
}

const mapDispatchToProps = {
    fetchPostsAndUsers: fetchPostsAndUsers,
    fetchPosts: fetchPosts
    
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        users: state.users
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);