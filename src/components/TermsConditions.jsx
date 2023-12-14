import { Box, Grid, Typography } from "@mui/material";
import { termsandconditions } from "../constants";

const TermsConditions = () => {
	return (
		<div id="terms">
			<Box
				sx={{
					flexGrow: 1,
					m: 2,
					marginTop: 8,
					paddingX: {
						xs: 0,
						sm: 5,
						md: 6,
						lg: 8,
					},
				}}
			>
				<Grid container spacing={4} justifyContent="center">
					<Grid item xs={12}>
						<Typography variant="h4" fontWeight="700" component="h4" gutterBottom align="center">
							Syarat dan Ketentuan
						</Typography>
					</Grid>
					{termsandconditions.map((term, index) => (
						<Grid item xs={12} sm={6} key={index}>
							<Box
								sx={{
									border: "1px solid #ddd",
									borderRadius: "4px",
									padding: "16px",
									boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
									transition: "0.3s",
									"&:hover": {
										backgroundColor: "rgba(0, 0, 0, 0.04)",
									},
									display: "flex",
									flexDirection: "column",
									alignItems: { xs: "center", sm: "start" },
								}}
							>
								<Typography variant="h5" fontWeight="600" component="h5" gutterBottom align="center">
									{term.title}
								</Typography>
								<Typography variant="body1" align="justify">
									{term.description}
								</Typography>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
		</div>
	);
};

export default TermsConditions;
