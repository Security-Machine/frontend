import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';


const sxWrapper: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>, HTMLDivElement
>['style'] = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'lightgrey',
    flexDirection: "row",
    flexWrap: 'wrap',
};

const sxCard = {
    maxWidth: 345,
    margin: "1rem",
};


export interface LinkCardProps {
    to: string;
    label: string;
    description: string;
    image: string;
    children: ReactNode;
}


export const LinkCard: FC<LinkCardProps> = ({
    to,
    label,
    description,
    image,
    children
}) => {
    return (
        <Card sx={sxCard}>
            <CardActionArea component={Link} to={to}>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={label}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {children}
            </CardActions>
        </Card>
    )
}


export const EmailPassCard = () => {
    return (
        <LinkCard
            to="/admin/email-password/sign-in"
            label="Email & password"
            image="assets/email-pwd.png"
            description="The classic way to sign-in."
        >
            <Button
                size="small"
                color="primary"
                component={Link}
                to={"/admin/email-password/sign-in"}
            >
                Sign-in
            </Button>
            <Button
                size="small"
                color="primary"
                component={Link}
                to={"/admin/email-password/sign-up"}
            >
                Sign-up
            </Button>
            <Button
                size="small"
                color="primary"
                component={Link}
                to={"/admin/email-password/lost-password"}
            >
                Lost pwd
            </Button>
        </LinkCard>
    )
}


export const ThirdPartyCard = () => {
    return (
        <LinkCard
            to="/admin/email-password/sign-in"
            label="3'rd party"
            image="assets/email-pwd.png"
            description="Log-in using a third-party provider."
        >
            <Button
                size="small"
                color="primary"
                component={Link}
                to={"/admin/email-password/sign-in"}
            >
                Sign-in
            </Button>
        </LinkCard>
    )
}


export const PasswordLessCard = () => {
    return (
        <LinkCard
            to="/admin/email-password/sign-in"
            label="PasswordLess"
            image="assets/email-pwd.png"
            description="Log-in using your phone or e-mail."
        >
            <Button
                size="small"
                color="primary"
                component={Link}
                to={"/admin/email-password/sign-in"}
            >
                Sign-in
            </Button>
        </LinkCard>
    )
}


export const ApplicationCard = () => {
    return (
        <LinkCard
            to="/admin/apps"
            label="Applications"
            image="assets/email-pwd.png"
            description="The list of applications on this server."
        >
            <Button
                size="small"
                color="primary"
                component={Link}
                to={"/admin/apps"}
            >
                List
            </Button>
            <Button
                size="small"
                color="primary"
                component={Link}
                to={"/admin/apps"}
            >
                Create
            </Button>
        </LinkCard>
    )
}


export const HomePage = () => {
    return (
        <div style={sxWrapper}>
            <EmailPassCard />
            <ThirdPartyCard />
            <PasswordLessCard />
            <ApplicationCard />
        </div>
    );
};
