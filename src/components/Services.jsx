import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { services } from "../constants";

const Services = () => {
	return (
		<Box
			sx={{
				flexGrow: 1,
				m: 2,
				paddingX: {
					xs: 0,
					sm: 2,
					md: 4,
					lg: 6,
					xl: 8,
				},
			}}
		>
			<Grid container spacing={2} justifyContent="center">
				<Grid item xs={12}>
					<Typography variant="h4" component="h4" fontWeight="700" gutterBottom align="center">
						Layanan Kami
					</Typography>
				</Grid>
				{services.map((service, index) => (
					<Grid item xs={12} sm={6} md={4} key={index}>
						<Card
							sx={{
								padding: "1rem",
								display: "flex",
								flexDirection: "column",
								height: "100%",
								transition: "0.3s",
								"&:hover": {
									boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
									transform: "scale(1.02)",
								},
							}}
						>
							<CardContent sx={{ flexGrow: 1 }}>
								<Box component="img" src={service.icon} alt={service.title} sx={{ width: "25%", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto" }} />
								<Typography variant="h6" textAlign="center" fontWeight="600" component="div" gutterBottom>
									{service.title}
								</Typography>
								<Typography variant="body1" textAlign="justify">
									{service.description}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Services;
