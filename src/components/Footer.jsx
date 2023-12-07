import { Box, Grid, Typography, IconButton, Button } from "@mui/material";
import { navMenuItems } from "../constants";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<Box
			sx={{
				backgroundColor: "primary.main",
				color: "white",
				px: { xs: 2, sm: 8 },
				py: 4,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Grid container spacing={4} justifyContent="center" alignItems="center">
				<Grid item xs={12} sm={4} md={3}>
					<Typography variant="h6">CarHoster</Typography>
					<Typography variant="subtitle1">Your trusted car rental service</Typography>
					<Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
						<IconButton color="inherit" component={Link} to="/facebook" target="_blank">
							<FacebookIcon />
						</IconButton>
						<IconButton color="inherit" component={Link} to="https://instagram.com" target="_blank">
							<InstagramIcon />
						</IconButton>
						<IconButton color="inherit" component={Link} to="/twitter" target="_blank">
							<TwitterIcon />
						</IconButton>
					</Box>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Typography variant="h5">Quick Links</Typography>
					{navMenuItems.map((item, index) => (
						<Typography variant="body1" key={index}>
							<Link to={item.path} style={{ color: "inherit", textDecoration: "none" }}>
								{item.label}
							</Link>
						</Typography>
					))}
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Button component={Link} to="https://whatsapp.com" target="_blank" variant="contained" color="success" startIcon={<WhatsAppIcon />} fullWidth>
						Contact Us on WhatsApp
					</Button>
				</Grid>
			</Grid>
			<Box sx={{ mt: 4 }}>
				<Typography variant="body2" align="center">
					© {currentYear} CarHoster. All rights reserved.
				</Typography>
			</Box>
		</Box>
	);
};

export default Footer;
